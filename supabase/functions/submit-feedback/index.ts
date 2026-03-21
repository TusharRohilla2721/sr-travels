import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  'https://srtravels.in',
  'https://www.srtravels.in',
  'https://sr-travels.vercel.app',
  'http://localhost:5173',
]

const SPAM_WORDS = ['casino', 'viagra', 'crypto', 'bitcoin', 'loan', 'forex', 'click here', 'win prize']

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

serve(async (req) => {
  const origin = req.headers.get('origin') || ''


  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
    })
  }


  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403, headers: { 'Content-Type': 'application/json' }
    })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
    })
  }

  const { name, city, state, from_city, to_city, journey_date, feedback, cf_turnstile_token } = body


  if (!name?.trim() || name.trim().length < 2) {
    return json400('Name must be at least 2 characters.', origin)
  }
  if (!city?.trim()) {
    return json400('City is required.', origin)
  }
  if (!feedback?.trim() || feedback.trim().length < 20) {
    return json400('Feedback must be at least 20 characters.', origin)
  }
  if (feedback.trim().length > 1000) {
    return json400('Feedback is too long (max 1000 chars).', origin)
  }


  const feedbackLower = feedback.toLowerCase()
  if (SPAM_WORDS.some(w => feedbackLower.includes(w))) {


    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
    })
  }



  const turnstileSecret = Deno.env.get('TURNSTILE_SECRET')
  if (turnstileSecret && cf_turnstile_token) {
    const formData = new FormData()
    formData.append('secret', turnstileSecret)
    formData.append('response', cf_turnstile_token)
    const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: formData
    })
    const tsData = await tsRes.json()
    if (!tsData.success) {
      return json400('Bot check failed. Please try again.', origin)
    }
  }


  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { error } = await supabase.from('testimonials').insert([{
    name:         name.trim(),
    city:         city.trim(),
    state:        state?.trim() || null,
    from_city:    from_city?.trim() || null,
    to_city:      to_city?.trim() || null,
    journey_date: journey_date || null,
    feedback:     feedback.trim(),
    approved:     false,
    rejected:     false,
  }])

  if (error) {
    console.error('DB insert error:', error)
    return new Response(JSON.stringify({ error: 'Failed to save. Please try again.' }), {
      status: 500, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
  })
})

function json400(message: string, origin: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 400, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
  })
}

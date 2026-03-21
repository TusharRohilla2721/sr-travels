import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  'https://srtravels.in',
  'https://www.srtravels.in',
  'https://sr-travels.vercel.app',
  'http://localhost:5173',
]

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
})

serve(async (req) => {
  const origin = req.headers.get('origin') || ''

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
  }

  let body: Record<string, string>
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders(origin) })
  }

  const { name, phone, message } = body

  if (!name?.trim() || name.trim().length < 2) {
    return new Response(JSON.stringify({ error: 'Name is required.' }), { status: 400, headers: corsHeaders(origin) })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { error } = await supabase.from('contact_inquiries').insert([{
    name:    name.trim(),
    phone:   phone?.trim() || null,
    message: message?.trim() || null,
  }])

  if (error) {
    return new Response(JSON.stringify({ error: 'Failed to save.' }), { status: 500, headers: corsHeaders(origin) })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders(origin) })
})

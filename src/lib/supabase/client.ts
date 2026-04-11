import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper to fetch approved testimonials (used in server components)
export async function getApprovedTestimonials(limit = 9) {
  const { data, error } = await supabase
    .from('approved_testimonials')
    .select('*')
    .limit(limit)

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data
}

// Helper to fetch active routes
export async function getActiveRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .eq('active', true)
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching routes:', error)
    return []
  }
  return data
}

// Helper to fetch gallery images
export async function getGalleryImages(category?: string) {
  let query = supabase.from('gallery').select('*').order('created_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching gallery:', error)
    return []
  }
  return data
}

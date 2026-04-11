import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import type { FeedbackInsert } from '@/types/database.types'

export async function POST(request: Request) {
  try {
    const body: FeedbackInsert = await request.json()

    // Basic validation
    if (!body.name || !body.review || !body.rating) {
      return NextResponse.json(
        { error: 'name, review, and rating are required' },
        { status: 400 }
      )
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('testimonials').insert([
      {
        name: body.name.trim(),
        review: body.review.trim(),
        rating: body.rating,
        location: body.location?.trim() ?? null,
        approved: false,
      },
    ] as any)

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Feedback submitted for review' })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

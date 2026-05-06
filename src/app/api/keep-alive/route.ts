import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization')
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`

    if (!process.env.CRON_SECRET || authHeader !== expectedToken) {
        return NextResponse.json(
            { error: 'Unauthorized. Valid CRON_SECRET required.' },
            { status: 401 }
        )
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
            { error: 'Supabase environment variables are missing.' },
            { status: 500 }
        )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const startTime = Date.now()
    const { error } = await supabase
        .from('testimonials')
        .select('id')
        .limit(1)

    const duration = Date.now() - startTime

    if (error) {
        console.error('[keep-alive] Supabase ping failed:', error.message)
        return NextResponse.json(
            {
                success: false,
                message: 'Database ping failed.',
                error: error.message,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        )
    }

    console.log(`[keep-alive] Supabase ping OK — ${duration}ms`)

    return NextResponse.json({
        success: true,
        message: 'Database is alive.',
        duration_ms: duration,
        timestamp: new Date().toISOString(),
    })
}
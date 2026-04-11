export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: {
          id: number
          created_at: string
          name: string
          review: string
          rating: number
          approved: boolean
          location: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          review: string
          rating: number
          approved?: boolean
          location?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          review?: string
          rating?: number
          approved?: boolean
          location?: string | null
          avatar_url?: string | null
        }
      }
      routes: {
        Row: {
          id: number
          from_city: string
          to_city: string
          duration: string
          price: number
          image_url: string | null
          active: boolean
        }
        Insert: {
          id?: number
          from_city: string
          to_city: string
          duration: string
          price: number
          image_url?: string | null
          active?: boolean
        }
        Update: {
          id?: number
          from_city?: string
          to_city?: string
          duration?: string
          price?: number
          image_url?: string | null
          active?: boolean
        }
      }
      gallery: {
        Row: {
          id: number
          image_url: string
          caption: string | null
          category: string
          created_at: string
        }
        Insert: {
          id?: number
          image_url: string
          caption?: string | null
          category: string
          created_at?: string
        }
        Update: {
          id?: number
          image_url?: string
          caption?: string | null
          category?: string
          created_at?: string
        }
      }
    }
    Views: {
      approved_testimonials: {
        Row: {
          id: number
          created_at: string
          name: string
          review: string
          rating: number
          location: string | null
          avatar_url: string | null
        }
      }
    }
  }
}

// Convenience types
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type ApprovedTestimonial = Database['public']['Views']['approved_testimonials']['Row']
export type Route = Database['public']['Tables']['routes']['Row']
export type GalleryImage = Database['public']['Tables']['gallery']['Row']

export type FeedbackInsert = Database['public']['Tables']['testimonials']['Insert']

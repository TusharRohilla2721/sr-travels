'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types/database.types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fallback images using Unsplash
const FALLBACK: GalleryImage[] = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80', caption: 'On the highway', category: 'journey', created_at: '' },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80', caption: 'Our fleet', category: 'fleet', created_at: '' },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80', caption: 'Bus interior', category: 'interior', created_at: '' },
  { id: 4, image_url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80', caption: 'Beautiful routes', category: 'journey', created_at: '' },
  { id: 5, image_url: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=600&q=80', caption: 'City stops', category: 'destination', created_at: '' },
  { id: 6, image_url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&q=80', caption: 'Sunset journey', category: 'journey', created_at: '' },
  { id: 7, image_url: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&q=80', caption: 'Rest stop', category: 'destination', created_at: '' },
  { id: 8, image_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80', caption: 'Night routes', category: 'fleet', created_at: '' },
]

const CATEGORIES = ['all', 'fleet', 'interior', 'journey', 'destination']

export default function Galleria() {
  const [images, setImages] = useState<GalleryImage[]>(FALLBACK)
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setImages(data)
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [activeCategory])

  const filtered = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory)

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container-sr">
        <p className="section-subtitle">Captured Moments</p>
        <div className="accent-line" />
        <h2 className="section-title">Galleria</h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest rounded-full transition-all duration-200 ${
                activeCategory === cat ? 'badge-accent badge' : 'badge'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map(img => (
            <div
              key={img.id}
              className="gallery-item break-inside-avoid card-sr overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(img)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={img.image_url}
                  alt={img.caption || 'SR Travels gallery'}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, var(--overlay), transparent)' }}
                >
                  {img.caption && (
                    <p className="text-xs" style={{ color: 'var(--text)' }}>{img.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white text-lg"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox.image_url}
              alt={lightbox.caption || ''}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            {lightbox.caption && (
              <p className="text-center text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

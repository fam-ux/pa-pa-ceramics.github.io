import { useState, useRef } from 'react'

export default function ImageGallery({ images, imageAlt, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEnlarged, setIsEnlarged] = useState(false)
  const [imageSources, setImageSources] = useState(() =>
    images.map(img => ({
      original: img,
      current: img,
      fallbackStep: 0
    }))
  )
  const baseUrl = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'

  const handleImageError = (index) => {
    setImageSources(prev => {
      const newSources = [...prev]
      const source = newSources[index]
      
      if (source.fallbackStep === 0) {
        source.current = `products/${source.original}`
        source.fallbackStep = 1
      } else if (source.fallbackStep === 1) {
        source.current = `/products/${source.original}`
        source.fallbackStep = 2
      }
      
      return newSources
    })
  }

  const scrollToImage = (index) => {
    setCurrentIndex(index)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <div className="grid h-48 place-items-center bg-gradient-to-b from-slate-50 to-slate-100">
        <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={imageAlt || productName}>
          <rect x="0" y="0" width="120" height="120" rx="14" fill="#f3f7f5"/>
          <circle cx="60" cy="60" r="40" fill="#ffffff" stroke="#e6e7eb" />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid h-48 place-items-center bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
        <img
          src={`${baseUrl}products/${imageSources[currentIndex].current}`}
          alt={`${imageAlt || productName} - Image ${currentIndex + 1}`}
          className="h-44 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
          loading="lazy"
          onError={() => handleImageError(currentIndex)}
          onClick={() => setIsEnlarged(true)}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
      
      <div className="flex justify-center gap-1 mt-2">
        {images.length > 1 ? images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToImage(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-slate-600'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        )) : (
          <div className="h-2 w-2 rounded-full bg-slate-300" />
        )}
      </div>

      {isEnlarged && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              onClick={() => setIsEnlarged(false)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
              aria-label="Close"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <img
              src={`${baseUrl}products/${imageSources[currentIndex].current}`}
              alt={`${imageAlt || productName} - Image ${currentIndex + 1}`}
              className="max-h-[90vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white"
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 4L7 12l8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white"
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
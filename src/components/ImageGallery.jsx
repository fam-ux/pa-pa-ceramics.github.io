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
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)
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
    resetZoom()
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    resetZoom()
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoom = (delta, clientX, clientY) => {
    const newScale = Math.min(Math.max(1, scale + delta), 5)

    if (newScale === 1) {
      resetZoom()
    } else if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const scaleChange = newScale / scale
      setPosition(prev => ({
        x: x - (x - prev.x) * scaleChange,
        y: y - (y - prev.y) * scaleChange
      }))
      setScale(newScale)
    }
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    handleZoom(delta, e.clientX, e.clientY)
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      imageRef.current.dataset.initialPinchDistance = distance
      imageRef.current.dataset.initialScale = scale
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      })
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const initialDistance = parseFloat(imageRef.current.dataset.initialPinchDistance)
      const initialScale = parseFloat(imageRef.current.dataset.initialScale)
      const newScale = Math.min(Math.max(1, initialScale * (distance / initialDistance)), 5)

      if (newScale === 1) {
        resetZoom()
      } else {
        setScale(newScale)
      }
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const closeEnlarged = () => {
    setIsEnlarged(false)
    resetZoom()
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
          style={{ touchAction: 'none' }}
          onClick={closeEnlarged}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              onClick={closeEnlarged}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
              aria-label="Close"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const rect = imageRef.current?.getBoundingClientRect()
                  if (rect) {
                    handleZoom(0.3, rect.left + rect.width / 2, rect.top + rect.height / 2)
                  }
                }}
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                aria-label="Zoom in"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const rect = imageRef.current?.getBoundingClientRect()
                  if (rect) {
                    handleZoom(-0.3, rect.left + rect.width / 2, rect.top + rect.height / 2)
                  }
                }}
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                aria-label="Zoom out"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              </button>
              {scale > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    resetZoom()
                  }}
                  className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                  aria-label="Reset zoom"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </button>
              )}
            </div>

            <div
              className="overflow-hidden"
              style={{
                cursor: isDragging ? 'grabbing' : (scale > 1 ? 'grab' : 'default'),
                touchAction: 'none'
              }}
            >
              <img
                ref={imageRef}
                src={`${baseUrl}products/${imageSources[currentIndex].current}`}
                alt={`${imageAlt || productName} - Image ${currentIndex + 1}`}
                className="max-h-[90vh] max-w-full object-contain"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: '0 0',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                draggable={false}
              />
            </div>

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
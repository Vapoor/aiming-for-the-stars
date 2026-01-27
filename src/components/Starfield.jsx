import React, { useEffect, useRef } from 'react'

const Starfield = ({ count = 300, speed = 0.01 }) => {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Use stable dimensions - get initial screen size and stick with it
    const getStableSize = () => {
      // Use document height for mobile stability
      const w = window.innerWidth
      const h = Math.max(window.innerHeight, document.documentElement.clientHeight)
      return { w, h }
    }

    let { w, h } = getStableSize()
    
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = w * dpr
      canvas.height = h * dpr
      
      ctx.scale(dpr, dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }

    setCanvasSize()

    const rand = (min, max) => Math.random() * (max - min) + min
    
    const initStars = () => {
      starsRef.current = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        z: rand(0.3, 1),
        r: rand(0.8, 2.5),
        tw: Math.random() * Math.PI * 2,
        twSpeed: rand(0.01, 0.03)
      }))
    }
    
    initStars()

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      
      // Draw deep space gradient
      const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h) * 0.8)
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)')
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.8)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Draw stars
      for (const star of starsRef.current) {
        star.tw += star.twSpeed
        const twinkle = 0.6 + Math.sin(star.tw) * 0.4
        const alpha = Math.min(1, star.z * twinkle * 0.9)
        
        ctx.globalAlpha = alpha
        ctx.fillStyle = `hsl(${rand(200, 240)}, 30%, ${85 + rand(0, 15)}%)`
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2)
        ctx.fill()
        
        if (star.r > 2) {
          ctx.globalAlpha = alpha * 0.3
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * star.z * 2, 0, Math.PI * 2)
          ctx.fill()
        }

        star.x -= speed * (1 + star.z)
        if (star.x < -10) {
          star.x = w + 10
          star.y = rand(0, h)
        }
      }
      
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    // Only resize on significant changes, not mobile viewport fluctuations
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const newSize = getStableSize()
        // Only resize if width changed significantly (orientation change)
        if (Math.abs(newSize.w - w) > 50) {
          w = newSize.w
          h = newSize.h
          setCanvasSize()
          initStars()
        }
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    // Prevent iOS Safari address bar changes from affecting canvas
    window.addEventListener('orientationchange', handleResize)

    return () => {
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 block pointer-events-none"
      style={{ 
        width: '100vw', 
        height: '100vh',
        minHeight: '100vh',
        zIndex: -1,
        // Prevent mobile browser zoom/pan
        touchAction: 'pan-y'
      }}
    />
  )
}

export default Starfield
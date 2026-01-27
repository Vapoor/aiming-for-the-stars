import React, { useEffect, useRef } from 'react'

const Starfield = ({ count = 350, speed = 0.2 }) => {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const rand = (min, max) => Math.random() * (max - min) + min
    starsRef.current = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      z: rand(0.2, 1),
      r: rand(1.2, 3.0), // bigger stars
      tw: Math.random() * Math.PI * 2
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // pure black background (remove purple gradient)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      // stars
      for (const s of starsRef.current) {
        s.tw += 0.02
        const twinkle = 0.7 + Math.sin(s.tw) * 0.3
        ctx.globalAlpha = Math.min(1, s.z * twinkle)
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2)
        ctx.fill()

        // parallax drift
        s.x -= speed * (0.6 + s.z)
        if (s.x < -5) {
          s.x = w + 5
          s.y = rand(0, h)
          s.z = rand(0.2, 1)
        }
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      // reinit stars for new size
      starsRef.current = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        z: rand(0.2, 1),
        r: rand(1.2, 3.0),
        tw: Math.random() * Math.PI * 2
      }))
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}

export default Starfield
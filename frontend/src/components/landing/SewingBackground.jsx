import { useEffect, useRef } from 'react'

export default function SewingBackground() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let tick = 0

    function setSize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ── Fabric weave ───────────────────────────────────────────────
    function drawFabric(t) {
      const w = canvas.width
      const h = canvas.height
      const gap = 44

      // Horizontal warp threads
      for (let y = 0; y < h + gap; y += gap) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 5) {
          const wy = y + Math.sin(x * 0.018 + t * 0.22) * 3.5
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy)
        }
        ctx.strokeStyle = 'rgba(201,168,76,0.042)'
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Vertical weft threads
      for (let x = 0; x < w + gap; x += gap) {
        ctx.beginPath()
        for (let y = 0; y <= h; y += 5) {
          const wx = x + Math.sin(y * 0.018 + t * 0.18) * 3.5
          y === 0 ? ctx.moveTo(wx, y) : ctx.lineTo(wx, y)
        }
        ctx.strokeStyle = 'rgba(201,168,76,0.028)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // ── Needle ─────────────────────────────────────────────────────
    class Needle {
      constructor() {
        const w = canvas.width
        const h = canvas.height
        this.depth = 0.2 + Math.random() * 0.8
        this.sc = 0.38 + this.depth * 0.9
        this.x = Math.random() * w
        this.baseY = 100 + Math.random() * (h - 200)
        this.vx = (Math.random() > 0.5 ? 1 : -1) * (0.22 + this.depth * 0.72)
        this.phase = Math.random() * Math.PI * 2
        this.freq = 0.022 + Math.random() * 0.028
        this.tilt = -Math.PI / 9 + (Math.random() - 0.5) * 0.5
        this.alpha = 0.12 + this.depth * 0.56
        this.L = 46 * this.sc
        this.W = 2.5 * this.sc
      }

      update(t) {
        const w = canvas.width
        this.x += this.vx
        if (this.x > w + 90) this.x = -90
        if (this.x < -90) this.x = w + 90
        // Sewing up-down with a slight hesitation at the bottom (fabric pierce)
        const raw = Math.sin(t * this.freq + this.phase)
        const shaped = Math.sign(raw) * Math.pow(Math.abs(raw), 0.7)
        this.y = this.baseY + shaped * 15 * this.sc
      }

      draw(ctx) {
        const { x, y, tilt, L, W, alpha, sc } = this
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(tilt)

        // Body — metallic silver gradient
        const g = ctx.createLinearGradient(-W, 0, W, 0)
        g.addColorStop(0,    `rgba(145,150,175,${alpha * 0.45})`)
        g.addColorStop(0.28, `rgba(218,222,240,${alpha})`)
        g.addColorStop(0.55, `rgba(205,210,232,${alpha})`)
        g.addColorStop(0.78, `rgba(190,195,218,${alpha * 0.85})`)
        g.addColorStop(1,    `rgba(145,150,175,${alpha * 0.45})`)
        ctx.beginPath()
        ctx.ellipse(0, 0, W, L * 0.82, 0, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Eye — oval cutout with gold ring
        ctx.beginPath()
        ctx.ellipse(0, -L * 0.63, W * 0.52, W * 1.45, 0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(5,5,8,${alpha * 1.6})`
        ctx.fill()
        ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.88})`
        ctx.lineWidth = 0.65 * sc
        ctx.stroke()

        // Gold thread through eye
        ctx.beginPath()
        ctx.moveTo(W * 0.9, -L * 0.63)
        ctx.quadraticCurveTo(W * 5.5, -L * 0.63 - 7 * sc, W * 4.5, -L * 0.88)
        ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.78})`
        ctx.lineWidth = 0.75 * sc
        ctx.setLineDash([])
        ctx.stroke()

        // Pointed tip
        ctx.beginPath()
        ctx.moveTo(-W * 0.32, L * 0.82)
        ctx.lineTo(0, L * 1.06)
        ctx.lineTo(W * 0.32, L * 0.82)
        ctx.fillStyle = `rgba(210,215,235,${alpha * 1.1})`
        ctx.fill()

        // Specular highlight streak
        ctx.beginPath()
        ctx.moveTo(W * 0.38, -L * 0.45)
        ctx.lineTo(W * 0.52, L * 0.32)
        ctx.strokeStyle = `rgba(245,245,255,${alpha * 0.32})`
        ctx.lineWidth = 0.55 * sc
        ctx.stroke()

        ctx.restore()
      }
    }

    // ── Stitch thread ──────────────────────────────────────────────
    class StitchThread {
      constructor() { this.spawn() }

      spawn() {
        const w = canvas.width
        const h = canvas.height
        this.y0 = 55 + Math.random() * (h - 110)
        this.cy = this.y0 + (Math.random() - 0.5) * 90
        this.progress = 0
        this.alpha = 0
        this.speed = 0.0025 + Math.random() * 0.0032
        this.delay = Math.random() * 280
        this.done = false
        this.dying = false
        // Stitch dash rhythm
        this.dashLen = 9 + Math.random() * 11
        this.gapLen  = 6 + Math.random() * 8
        this._spawnedAtTick = tick
        // Slightly angled (fabric can be slightly tilted)
        this.angleOffset = (Math.random() - 0.5) * 0.06
      }

      pt(t) {
        const w = canvas.width
        const x = -60 + t * (w + 120)
        const mt = 1 - t
        const y = mt * mt * this.y0 + 2 * mt * t * this.cy + t * t * this.y0
        return { x: x + Math.sin(t * Math.PI) * this.angleOffset * 40, y }
      }

      update(t) {
        const age = t - this._spawnedAtTick
        if (age < this.delay) return
        if (!this.dying) {
          this.alpha = Math.min(0.72, this.alpha + 0.013)
          this.progress = Math.min(1, this.progress + this.speed)
          if (this.progress >= 1) this.dying = true
        } else {
          this.alpha -= 0.004
          if (this.alpha <= 0) this.done = true
        }
      }

      draw(ctx) {
        if (this.alpha <= 0) return
        const steps = 90
        const maxI = Math.floor(steps * this.progress)

        // Continuous backing thread (thin, dim)
        ctx.strokeStyle = `rgba(201,168,76,${this.alpha * 0.28})`
        ctx.lineWidth = 0.7
        ctx.setLineDash([])
        ctx.beginPath()
        for (let i = 0; i <= maxI; i++) {
          const p = this.pt(i / steps)
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()

        // Stitch dashes (top thread) — brighter
        ctx.strokeStyle = `rgba(201,168,76,${this.alpha * 0.78})`
        ctx.lineWidth = 1.1
        ctx.setLineDash([this.dashLen, this.gapLen])
        ctx.beginPath()
        for (let i = 0; i <= maxI; i++) {
          const p = this.pt(i / steps)
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Needle hole dots at each stitch
        const totalX = canvas.width + 120
        const period = this.dashLen + this.gapLen
        const numDots = Math.floor((totalX * this.progress) / period)
        for (let i = 0; i <= numDots; i++) {
          const t = (i * period) / totalX
          if (t > this.progress) break
          const p = this.pt(t)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201,168,76,${this.alpha * 0.95})`
          ctx.fill()
        }
      }
    }

    // ── Sparkle ────────────────────────────────────────────────────
    class Sparkle {
      constructor() { this.spawn() }

      spawn() {
        const w = canvas.width
        const h = canvas.height
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = 3 + Math.random() * 9
        this.alpha = 0
        this.growing = true
        this.speed = 0.007 + Math.random() * 0.014
        this.done = false
        this._born = tick
        this.delay = Math.random() * 450
      }

      update(t) {
        if (t - this._born < this.delay) return
        if (this.growing) {
          this.alpha += this.speed
          if (this.alpha >= 0.75) this.growing = false
        } else {
          this.alpha -= this.speed * 0.6
          if (this.alpha <= 0) this.done = true
        }
      }

      draw(ctx) {
        if (this.alpha <= 0) return
        const { x, y, size, alpha } = this
        ctx.save()
        ctx.translate(x, y)

        // 4-pointed star (matching logo sparkles)
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2
          const innerSize = size * 0.18
          const ax = Math.cos(a)
          const ay = Math.sin(a)
          ctx.beginPath()
          ctx.moveTo(ax * innerSize, ay * innerSize)
          ctx.lineTo(ax * size, ay * size)
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`
          ctx.lineWidth = 0.9
          ctx.stroke()
        }

        // Center dot
        ctx.beginPath()
        ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,201,122,${alpha})`
        ctx.fill()

        ctx.restore()
      }
    }

    // ── Entities ───────────────────────────────────────────────────
    const needles  = Array.from({ length: 8 },  () => new Needle())
    const threads  = Array.from({ length: 18 }, () => new StitchThread())
    const sparkles = Array.from({ length: 14 }, () => new Sparkle())

    // Sort needles by depth so closer ones render on top
    needles.sort((a, b) => a.depth - b.depth)

    // ── Render loop ────────────────────────────────────────────────
    function animate() {
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawFabric(tick * 0.016)

      threads.forEach((th, i) => {
        th.update(tick)
        th.draw(ctx)
        if (th.done) threads[i] = new StitchThread()
      })

      needles.forEach(n => { n.update(tick); n.draw(ctx) })

      sparkles.forEach((sp, i) => {
        sp.update(tick)
        sp.draw(ctx)
        if (sp.done) sparkles[i] = new Sparkle()
      })

      raf = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}

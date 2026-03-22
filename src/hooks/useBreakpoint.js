useEffect(() => {
  const cardEls = cards.map((_, i) => document.getElementById(`${name}-c${i}`))
  const n = cardEls.length

  cardEls.forEach((c, i) => {
    if (!c) return
    c.style.transform = ''
    c.style.transition = 'none'
    gsap.set(c, { xPercent: -50, yPercent: -50, x: i === 0 ? 0 : '110vw', scale: i === 0 ? 1 : 0.94, opacity: i === 0 ? 1 : 0, zIndex: 50 + i })
  })

  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  for (let i = 1; i < n; i++) {
    const pos = i - 1
    tl.fromTo(cardEls[i], { x: '110vw', opacity: 0, scale: 0.94 }, { x: 0, opacity: 1, scale: 1, duration: 1 }, pos)
    tl.to(cardEls[i - 1], { x: histX, scale: 0.88, opacity: 0.35, duration: 1 }, pos)
    for (let j = 0; j < i - 1; j++) {
      const depth = i - j
      tl.to(cardEls[j], { x: histX - (depth - 1) * histGap, scale: Math.max(0.72, 0.88 - (depth - 1) * 0.05), opacity: Math.max(0.08, 0.35 - (depth - 1) * 0.12), duration: 1 }, pos)
    }
  }

  ScrollTrigger.create({ trigger: outerRef.current, start: 'top top', end: 'bottom bottom', pin: stickyRef.current, pinSpacing: false, scrub: 0.8, animation: tl })

  return () => ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === outerRef.current) t.kill() })
}, [isMobile])
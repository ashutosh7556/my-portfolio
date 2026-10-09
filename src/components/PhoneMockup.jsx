import { useState, useRef, useEffect } from 'react'
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi'

export default function PhoneMockup({ defaultVideo = '/videos/Chatboat_video.mp4' }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [showControlHint, setShowControlHint] = useState(false)
  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0.08,
  })

  const videoRef = useRef(null)
  const containerRef = useRef(null)

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Bound angles for a refined, premium 3D tilt
    const rotateY = ((x - centerX) / centerX) * 12
    const rotateX = -((y - centerY) / centerY) * 12

    // Dynamic light sheen position
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTransformStyle({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.22,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransformStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0.06,
    })
  }

  // Toggle video playback on click
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
    setShowControlHint(true)
    setTimeout(() => setShowControlHint(false), 1200)
  }

  // Toggle audio
  const toggleMute = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Live status bar clock
  const [liveClock, setLiveClock] = useState('9:41')
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes()
      const formatted = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`
      setLiveClock(formatted)
    }
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative flex items-center justify-center select-none w-full py-2"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Purple & Cyan Ambient Lighting behind phone */}
      <div
        className="absolute w-[360px] sm:w-[460px] md:w-[540px] h-[650px] sm:h-[780px] md:h-[860px] rounded-[70px] opacity-75 blur-[90px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, rgba(168, 85, 247, 0.35), rgba(6, 182, 212, 0.3) 55%, transparent 75%)`,
          transform: `translate(${transformStyle.rotateY * 2}px, ${-transformStyle.rotateX * 2}px)`,
        }}
      />

      {/* 3D Phone Chassis Wrapper */}
      <div
        ref={containerRef}
        className="relative transition-transform ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `perspective(1300px) rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1300px) rotateX(2.5deg) rotateY(-2.5deg) scale3d(1, 1, 1)',
          transitionDuration: isHovered ? '100ms' : '650ms',
        }}
      >
        {/* Hardware Buttons */}
        {/* Action Button (left) */}
        <div className="absolute -left-[5px] top-[95px] sm:top-[115px] w-[5px] h-[32px] sm:h-[38px] bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800 rounded-l-md border-l border-zinc-500/40 shadow-sm" />
        {/* Volume Up (left) */}
        <div className="absolute -left-[5px] top-[145px] sm:top-[175px] w-[5px] h-[55px] sm:h-[65px] bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800 rounded-l-md border-l border-zinc-500/40 shadow-sm" />
        {/* Volume Down (left) */}
        <div className="absolute -left-[5px] top-[215px] sm:top-[255px] w-[5px] h-[55px] sm:h-[65px] bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800 rounded-l-md border-l border-zinc-500/40 shadow-sm" />
        {/* Power / Lock Button (right) */}
        <div className="absolute -right-[5px] top-[165px] sm:top-[195px] w-[5px] h-[80px] sm:h-[95px] bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800 rounded-r-md border-r border-zinc-500/40 shadow-sm" />

        {/* Outer Titanium Phone Shell */}
        <div
          className="relative w-[300px] xs:w-[330px] sm:w-[380px] md:w-[415px] lg:w-[430px] h-[610px] xs:h-[670px] sm:h-[770px] md:h-[840px] lg:h-[870px] max-h-[86vh] rounded-[48px] sm:rounded-[56px] p-[10px] sm:p-[12px] bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-900 border-[3px] border-zinc-700/80 overflow-hidden"
          style={{
            boxShadow: `
              0 35px 90px -15px rgba(0, 0, 0, 0.95),
              0 0 50px -10px rgba(168, 85, 247, 0.25),
              0 0 60px -10px rgba(6, 182, 212, 0.25),
              inset 0 1px 2px rgba(255, 255, 255, 0.25),
              inset 0 -1px 2px rgba(0, 0, 0, 0.9)
            `,
          }}
        >
          {/* Inner Display Screen Area */}
          <div
            onClick={togglePlay}
            className="relative w-full h-full rounded-[38px] sm:rounded-[46px] bg-black overflow-hidden flex flex-col border border-zinc-800/80 cursor-pointer group/screen"
          >
            {/* Dynamic Island Pill */}
            <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-3 h-[24px] sm:h-[28px] w-[105px] sm:w-[120px] bg-black rounded-full border border-zinc-800/90 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[8px] sm:text-[9px] text-cyan-400/90 font-medium">LIVE</span>
              </div>
            </div>

            {/* iOS Status Bar */}
            <div className="relative z-30 pt-2.5 sm:pt-3 px-6 pb-1.5 flex items-center justify-between text-white text-[11px] sm:text-[12px] font-medium bg-black/50 backdrop-blur-md">
              <span className="font-semibold tracking-tight">{liveClock}</span>
              <div className="flex items-center gap-2 opacity-90">
                <span className="text-[10px] font-mono tracking-tighter">5G</span>
                {/* Signal bars */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <span className="w-[2px] h-[3px] bg-white rounded-sm" />
                  <span className="w-[2px] h-[5px] bg-white rounded-sm" />
                  <span className="w-[2px] h-[7px] bg-white rounded-sm" />
                  <span className="w-[2px] h-[9px] bg-white rounded-sm" />
                </div>
                {/* Battery icon */}
                <div className="w-4.5 h-2.5 border border-white/80 rounded-sm p-[1px] flex items-center">
                  <div className="h-full w-full bg-emerald-400 rounded-2px" />
                </div>
              </div>
            </div>

            {/* Video Player Display */}
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src={defaultVideo}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Discreet Sound Toggle Pill in corner */}
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                className="absolute bottom-6 right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all shadow-lg hover:scale-105"
                aria-label="Toggle Sound"
              >
                {isMuted ? (
                  <FiVolumeX size={15} className="text-white/70" />
                ) : (
                  <FiVolume2 size={15} className="text-cyan-400" />
                )}
              </button>

              {/* Play / Pause Indicator on Tap / Pause */}
              {(!isPlaying || showControlHint) && (
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-none transition-all shadow-2xl">
                  {isPlaying ? (
                    <FiPause size={26} className="text-cyan-400" />
                  ) : (
                    <FiPlay size={26} className="ml-1 text-cyan-400" />
                  )}
                </div>
              )}
            </div>

            {/* Home Indicator Bar */}
            <div className="relative z-30 h-4 sm:h-5 bg-black flex items-center justify-center">
              <div className="w-24 sm:w-28 h-1 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Dynamic Light Sheen / Glass Reflection Overlay */}
          <div
            className="absolute inset-0 rounded-[48px] sm:rounded-[56px] pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255,255,255,${transformStyle.glareOpacity}), transparent 65%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAPCleanup(animationFn, deps = []) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(animationFn)
    return () => ctx.current?.revert()
  }, deps)
}

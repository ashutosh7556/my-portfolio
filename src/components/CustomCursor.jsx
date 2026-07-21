import { useEffect } from 'react'
import { initCursor, initMagnetic } from '../animations/cursorAnimation'

export default function CustomCursor() {
  useEffect(() => {
    const cleanup = initCursor()
    initMagnetic()
    return cleanup
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="cursor-label" />
    </>
  )
}

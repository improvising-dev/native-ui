import { useLayoutEffect, useRef } from 'react'

export const useMountedRef = () => {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}

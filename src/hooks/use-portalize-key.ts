import React from 'react'

// Generates a random key
const keyGenerator = () => {
  return `portalize_${Math.random()
    .toString(36)
    .substring(2, 18)}-${Math.random()
    .toString(36)
    .substring(2, 18)}-${Math.random().toString(36).substring(2, 18)}`
}

// Custom hook that checks for uniqueness and retries if clashes
export const usePortalizeKey = () => {
  const usedKeys = React.useRef<Array<string>>([])

  const generateKey = () => {
    let foundUniqueKey = false
    let newKey = ''
    let tries = 0

    while (!foundUniqueKey && tries < 3) {
      // Limit number of tries to stop endless loop of pain
      tries++
      newKey = keyGenerator()

      if (!usedKeys.current.includes(newKey)) {
        foundUniqueKey = true
      }
    }

    // Will only run if exited while loop without finding a unique key
    if (!foundUniqueKey) {
      newKey = `portalize_${Date.now()}_${Math.floor(Math.random() * 1000)}` // fallback method
    }

    usedKeys.current.push(newKey)

    return newKey
  }

  // Removes our key to make it 'available' again
  const removeKey = (key: string) => {
    usedKeys.current = usedKeys.current.filter(k => k !== key)
  }

  return { generateKey, removeKey }
}

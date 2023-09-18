import React, { useEffect } from 'react'
import RNProgressBarModule, { Counter } from 'react-native-tooltip-progress-bar'

const App = () => {
  useEffect(() => {
    console.log(RNProgressBarModule)
  })

  return <Counter />
}

export default App

import React, { useEffect } from 'react'
import RNModuleTemplate, { Counter } from 'react-native-module-template'

const App = () => {
  useEffect(() => {
    console.log(RNModuleTemplate)
  })

  return <Counter />
}

export default App

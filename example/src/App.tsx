import React, { useEffect } from 'react'
import RNModuleTemplateModule, { Counter } from 'react-native-module-template'

const App = () => {
  useEffect(() => {
    console.log(RNModuleTemplateModule)
  })

  return <Counter />
}

export default App

import LibraryTemplate, { Counter } from 'library-template'
import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    console.log(LibraryTemplate)
  })

  return <Counter />
}

export default App

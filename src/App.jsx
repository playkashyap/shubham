import { useState } from 'react'
import AnimatedCursor from './hooks/AnimatedCursor'
import './App.css'


function App() {


  return (
    <>
      abc
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
    </>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import Content from './Content'

function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="App" style={{ padding: 20 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  )
}

export default App

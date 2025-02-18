import { useState } from 'react'

const Gifts = [
  'GIFT 1',
  'GIFT 2',
  'GIFT 3'
]
function App() {
  

  const [random, setGift] = useState('No Gift')
  
  const randomGift = () => {
    const index = Math.floor(Math.random()*Gifts.length)
    setGift(Gifts[index])
  }

  return (
    <div>
      <h1>{random}</h1>
      <button onClick={randomGift}>Get Random Gift</button>
    </div>
  )

}

export default App

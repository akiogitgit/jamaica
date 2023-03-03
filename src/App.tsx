import { useState } from 'react'
import { Button } from '@mantine/core'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mx-auto max-w-150 w-80vw'>
      <h1 className='text-center'>Jamaica</h1>
      <Button className='mt-10'>fff</Button>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App

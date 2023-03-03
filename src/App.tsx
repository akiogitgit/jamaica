import { useState } from 'react'
import { Button } from '@mantine/core'
import { calcJamaica } from './calcJamaica'

function App() {
  const [count, setCount] = useState(0)
  const [results, setResults] = useState<string[]>()
  // const res = calcJamaica([1, 2, 3, 4, 5], 61)
  // console.log(res)

  // 入力は　答えと、数字たち
  // 出力は、答えになる式一覧

  return (
    <div className='mx-auto max-w-150 w-80vw'>
      <h1 className='text-center'>Jamaica</h1>
      <Button
        className='mt-10'
        onClick={() => {
          setResults(calcJamaica([1, 2, 3, 4, 5], 61))
        }}
      >
        実行
      </Button>
      {JSON.stringify(results)}
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App

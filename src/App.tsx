import { useCallback, useState } from 'react'
import { Accordion } from '@mantine/core'
import { calcJamaica } from './calcJamaica'
import { Form, FormValues } from './Form'

function App() {
  const [results, setResults] = useState<string[]>()
  const [isExecuted, setExecuted] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const onSubmit = useCallback((values: FormValues) => {
    const { answer, numbers } = values
    setLoading(true)
    setExecuted(false)

    setTimeout(() => {
      const res = calcJamaica(numbers, answer)
      setResults(res)
      setLoading(false)
      setExecuted(true)
    })
  }, [])

  return (
    <div className='mx-auto mt-4 max-w-150 pb-25 w-90vw'>
      <h1 className='font-mono text-center'>ジャマイカ 自動判定ツール</h1>
      <div className='mx-auto w-40 sm:w-60'>
        <img src='/jamaica.webp' alt='' />
      </div>

      <div className='mt-4'>
        <Form onSubmit={onSubmit} />
      </div>

      <div
        className={`mx-auto h-58 mt-4 animate-spin w-60 ${
          !isLoading && 'hidden'
        }`}
      >
        <img src='/jamaica.webp' alt='' />
      </div>

      {isExecuted && (
        <>
          <div className='mt-10 '>
            <div className='border-b bg-gray-50 py-4 px-5'>判定</div>

            <div className='flex my-6 justify-center'>
              {results?.length ? (
                <div
                  className='rounded-md bg-blue-500 text-white py-2 px-6 text-2xl inline-block
                '
                >
                  出来る
                </div>
              ) : (
                <div className='text-center'>
                  <div
                    className='rounded-md bg-red-500 text-white py-2 px-6 text-2xl inline-block
              '
                  >
                    出来ない
                  </div>
                  <p className='mt-4 text-sm text-left text-gray-600'>
                    ※当プログラムの処理で出来ないだけなので、出来る可能性があります。
                  </p>
                </div>
              )}
            </div>
          </div>

          {results?.length ? (
            <Accordion>
              <Accordion.Item value='flexibility'>
                <Accordion.Control className='bg-gray-50'>
                  答えを1つだけ見る
                </Accordion.Control>
                <Accordion.Panel>
                  <div className='my-6 text-center text-lg'>{results[0]}</div>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value='focus-ring'>
                <Accordion.Control className='bg-gray-50'>
                  答えを最大10個見る
                </Accordion.Control>
                <Accordion.Panel>
                  <div className='my-2 text-center text-lg'>
                    {results.map((result, index) => (
                      <div className='border-b py-4' key={index}>
                        {result}
                      </div>
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  )
}

export default App

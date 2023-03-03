import { useCallback, useState } from 'react'
import { Accordion, Button, Flex, NumberInput, Stack } from '@mantine/core'
import { Numbers, calcJamaica } from './calcJamaica'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

type FormValues = {
  answer: number
  numbers: Numbers
}

const scheme = z.object({
  numbers: z
    .number()
    .min(1, { message: '白いサイコロの目は1以上で入力して下さい' })
    .max(6, { message: '白いサイコロの目は6以下で入力して下さい' })
    .array(),
  answer: z
    .number()
    .min(11, { message: '黒いサイコロの目の和は11以上で入力して下さい' })
    .max(66, { message: '黒いサイコロの目の和は66以下で入力して下さい' }),
})

function App() {
  const [results, setResults] = useState<string[]>()
  const [isExecuted, setExecuted] = useState(false)

  const form = useForm<FormValues>({
    initialValues: {
      answer: 11,
      numbers: [1, 2, 3, 4, 5],
    },
    validate: zodResolver(scheme),
  })

  const onSubmit = useCallback((values: FormValues) => {
    const { answer, numbers } = values

    const res = calcJamaica(numbers, answer)
    setResults(res)
    setExecuted(true)
  }, [])

  return (
    <div className='mx-auto mt-4 max-w-150 pb-25 w-90vw'>
      <h1 className='text-center'>Jamaica</h1>
      <div className='mx-auto w-60'>
        <img src='/jamaica.webp' alt='' />
      </div>

      <form onSubmit={form.onSubmit(onSubmit)} className='mt-4'>
        <Stack>
          {form.values.numbers.map((v, index) => (
            <NumberInput
              {...form.getInputProps(`numbers.${index}`)}
              key={index}
              min={1}
              max={6}
              label={`白い目${index + 1}`}
              size='md'
            />
          ))}

          <NumberInput
            {...form.getInputProps('answer')}
            min={11}
            max={66}
            label={'黒い目の合計'}
            size='md'
          />

          <div className='rounded-full border-emerald-700 border-b-4 mt-4 hover:(border-white transform translate-y-4px) '>
            <Button
              type='submit'
              color='teal'
              size='lg'
              radius='xl'
              className='w-full'
            >
              実行
            </Button>
          </div>
        </Stack>
      </form>

      {isExecuted && (
        <Accordion className='mt-10'>
          <Accordion.Item value='customization'>
            <Accordion.Control className='bg-gray-50'>
              出来るか出来ないか
            </Accordion.Control>
            <Accordion.Panel>
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

              {results?.length ? (
                <Accordion>
                  <Accordion.Item value='flexibility'>
                    <Accordion.Control className='bg-gray-50'>
                      答えを1つだけ見る
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className='my-6 text-center text-lg'>
                        {results[0]}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value='focus-ring'>
                    <Accordion.Control className='bg-gray-50'>
                      全部の答えを見る
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
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
}

export default App

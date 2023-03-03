import { useCallback, useState } from 'react'
import { Button, NumberInput, Stack } from '@mantine/core'
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
  }, [])

  return (
    <div className='mx-auto max-w-150 w-80vw'>
      <h1 className='text-center'>Jamaica</h1>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {form.values.numbers.map((v, i) => (
            <NumberInput
              {...form.getInputProps(`numbers.${i}`)}
              key={i}
              min={1}
              max={6}
              label={'白い目'}
            />
          ))}

          <NumberInput
            {...form.getInputProps('answer')}
            min={11}
            max={66}
            label={'黒い目の合計'}
          />

          <Button type='submit' className='mt-10'>
            実行
          </Button>
        </Stack>
      </form>

      {JSON.stringify(results)}
    </div>
  )
}

export default App

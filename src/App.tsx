import { useCallback, useState } from 'react'
import { Button, NumberInput } from '@mantine/core'
import { Numbers, calcJamaica } from './calcJamaica'
import { useForm } from '@mantine/form'

type FormValues = {
  answer: number
  numbers: Numbers
}

function App() {
  const [results, setResults] = useState<string[]>()

  const form = useForm<FormValues>({
    initialValues: {
      answer: 11,
      numbers: [1, 2, 3, 4, 5],
    },
  })

  const onSubmit = (values: FormValues) => {
    const { answer, numbers } = values
    const res = calcJamaica(numbers, answer)
    setResults(res)
  }

  // formいる？ いる。再レンダリング抑えられる => うそ
  // フォームの所はコンポーネントに切り出そう
  // 初期値入ってればいいんじゃね？
  // NumberInputのnumは、1~6
  // answerは、11,12,13,14,15,16,21,22,23,24,25,26

  return (
    <div className='mx-auto max-w-150 w-80vw'>
      <h1 className='text-center'>Jamaica</h1>

      <form onSubmit={form.onSubmit(onSubmit)}>
        {form.values.numbers.map((v, i) => (
          <NumberInput
            {...form.getInputProps(`numbers.${i}`)}
            key={i}
            min={1}
            max={6}
          />
        ))}

        <NumberInput {...form.getInputProps('answer')} min={11} max={66} />

        <Button type='submit' className='mt-10'>
          実行
        </Button>
      </form>

      {JSON.stringify(results)}
    </div>
  )
}

export default App

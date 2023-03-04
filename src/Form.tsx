import { Stack, NumberInput, Button, Flex } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FC, useCallback } from 'react'
import { Numbers } from './calcJamaica'
import { z } from 'zod'
import { useMediaQuery } from '@mantine/hooks'

export type FormValues = {
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

type Props = {
  onSubmit: (params: FormValues) => void
}

export const Form: FC<Props> = ({ onSubmit }) => {
  const matches = useMediaQuery('(min-width: 640px)')

  const form = useForm<FormValues>({
    initialValues: {
      answer: 11,
      numbers: [1, 2, 3, 4, 5],
    },
    validate: zodResolver(scheme),
  })

  const rollDice = useCallback(() => {
    const val1 = Math.round(Math.random() * (6 - 1) + 1)
    const val2 = Math.round(Math.random() * (6 - 1) + 1)
    const val3 = Math.round(Math.random() * (6 - 1) + 1)
    const val4 = Math.round(Math.random() * (6 - 1) + 1)
    const val5 = Math.round(Math.random() * (6 - 1) + 1)
    const val6 = Math.round(Math.random() * (6 - 1) + 1)
    const val10 = Math.round(Math.random() * (6 - 1) + 1) * 10

    form.setValues({
      numbers: [val1, val2, val3, val4, val5],
      answer: val6 + val10,
    })
  }, [])

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Flex>
          {form.values.numbers.map((v, index) => (
            <NumberInput
              {...form.getInputProps(`numbers.${index}`)}
              key={index}
              min={1}
              max={6}
              label={`${index === 0 ? '白い目' : ' '}`}
              size='md'
            />
          ))}
        </Flex>

        <NumberInput
          className='w-30'
          {...form.getInputProps('answer')}
          min={11}
          max={66}
          label={'黒い目の合計'}
          size='md'
        />

        <Flex align='center' gap='sm' className='mt-4'>
          <div className='rounded-md border-sky-700 border-b-4 hover:(border-white transform translate-y-4px) '>
            <Button
              onClick={rollDice}
              color='blue'
              size={`${matches ? 'lg' : 'md'}`}
              className='w-full'
            >
              サイコロを転がす
            </Button>
          </div>
          <div className='rounded-full border-emerald-700 border-b-4 w-1/1 hover:(border-white transform translate-y-4px) '>
            <Button
              type='submit'
              color='teal'
              size={`${matches ? 'lg' : 'md'}`}
              radius='xl'
              className='w-full'
            >
              判定
            </Button>
          </div>
        </Flex>
      </Stack>
    </form>
  )
}

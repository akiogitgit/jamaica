import { Stack, NumberInput, Button } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FC } from 'react'
import { Numbers, calcJamaica } from './calcJamaica'
import { z } from 'zod'

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
  const form = useForm<FormValues>({
    initialValues: {
      answer: 11,
      numbers: [1, 2, 3, 4, 5],
    },
    validate: zodResolver(scheme),
  })

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
  )
}

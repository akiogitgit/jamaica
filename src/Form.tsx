import { Stack, NumberInput, Button, Flex } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FC, useCallback } from 'react'
import { z } from 'zod'
import { useMediaQuery } from '@mantine/hooks'

// 入力はnumber | null
// 送信する時は、nullを許可しない
const schema = z.object({
  numbers: z.tuple([
    z
      .number()
      .min(1, { message: '1以上で入力して下さい' })
      .max(6, { message: '6以下で入力して下さい' })
      .nullable()
      .transform((val, ctx): number => {
        if (val === null) {
          ctx.addIssue({ code: 'custom', message: '入力は必須です' })
        }
        return val ?? 0
      }),
    z
      .number()
      .min(1, { message: '1以上で入力して下さい' })
      .max(6, { message: '6以下で入力して下さい' })
      .nullable()
      .transform((val, ctx): number => {
        if (val === null) {
          ctx.addIssue({ code: 'custom', message: '入力は必須です' })
        }
        return val ?? 0
      }),
    z
      .number()
      .min(1, { message: '1以上で入力して下さい' })
      .max(6, { message: '6以下で入力して下さい' })
      .nullable()
      .transform((val, ctx): number => {
        if (val === null) {
          ctx.addIssue({ code: 'custom', message: '入力は必須です' })
        }
        return val ?? 0
      }),
    z
      .number()
      .min(1, { message: '1以上で入力して下さい' })
      .max(6, { message: '6以下で入力して下さい' })
      .nullable()
      .transform((val, ctx): number => {
        if (val === null) {
          ctx.addIssue({ code: 'custom', message: '入力は必須です' })
        }
        return val ?? 0
      }),
    z
      .number()
      .min(1, { message: '1以上で入力して下さい' })
      .max(6, { message: '6以下で入力して下さい' })
      .nullable()
      .transform((val, ctx): number => {
        if (val === null) {
          ctx.addIssue({ code: 'custom', message: '入力は必須です' })
        }
        return val ?? 0
      }),
  ]),
  answer: z
    .number()
    .min(11, { message: '11以上で入力して下さい' })
    .max(66, { message: '66以下で入力して下さい' })
    .nullable()
    .transform((val, ctx): number => {
      if (val === null) {
        ctx.addIssue({ code: 'custom', message: '入力は必須です' })
      }
      return val ?? 0
    }),
})

// z.input<typeof schema> nullとユニオン
// z.output<typeof schema>
export type FormValues = z.output<typeof schema>

type NullableFormValues = z.input<typeof schema>

type Props = {
  onSubmit: (params: FormValues) => void
}

export const Form: FC<Props> = ({ onSubmit }) => {
  const matches = useMediaQuery('(min-width: 640px)')

  const form = useForm<NullableFormValues | FormValues>({
    initialValues: {
      answer: null,
      numbers: [null, null, null, null, null],
    },
    validate: zodResolver(schema),
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
    <form
      onSubmit={form.onSubmit(e => {
        const res = schema.parse(e)
        console.log(res)
        onSubmit(res)
      })}
    >
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

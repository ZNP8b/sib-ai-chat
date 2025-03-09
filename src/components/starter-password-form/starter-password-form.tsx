import { Button, Field, Input } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'

const PASSWORD_HASH =
  '7db2ebf4d918b454d8dc5d5fd944a24f85fac420da488702a5d8e296aeffce3a'

type PasswordInputType = {
  password: string
}

export function StarterPasswordForm() {
  const navigate = useNavigate()

  const schema = yup
    .object({
      password: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<PasswordInputType> = async data => {
    const hashedInput = await hashPassword(data.password)
    if (hashedInput === PASSWORD_HASH) {
      localStorage.setItem('isAuth', 'true')
      navigate(0)
    } else {
      setError('password', { type: 'custom', message: 'Неверный пароль' })
    }
  }

  return (
    <div className='flex h-full items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 items-center'
      >
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Пароль</Field.Label>
          <Input
            variant='subtle'
            type='password'
            placeholder='Введите пароль'
            size='lg'
            width='300px'
            {...register('password')}
          />
          <Field.ErrorText fontSize='13px'>
            {errors.password?.message}
          </Field.ErrorText>
        </Field.Root>

        <Button
          className='w-50'
          colorPalette='gray'
          size='lg'
          variant='surface'
          type='submit'
        >
          Войти
        </Button>
      </form>
    </div>
  )
}

async function hashPassword(password: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

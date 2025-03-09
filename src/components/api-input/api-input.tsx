import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Field, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

type apiUrlInputType = {
  apiUrl: string
}

export function ApiInput() {
  const apiUrl = localStorage.getItem('apiUrl')
  const navigate = useNavigate()

  const schema = yup
    .object({
      apiUrl: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const onSubmit: SubmitHandler<apiUrlInputType> = async data => {
    localStorage.setItem('apiUrl', data.apiUrl)
    navigate('/')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 items-center'
    >
      <Field.Root invalid={!!errors.apiUrl}>
        <Field.Label>API URL</Field.Label>
        <Input
          variant='subtle'
          type='text'
          placeholder='Введите ссылку на API'
          size='lg'
          width='250px'
          {...register('apiUrl')}
          defaultValue={apiUrl ? apiUrl : ''}
        />
        <Field.ErrorText fontSize='13px'>
          {errors.apiUrl?.message}
        </Field.ErrorText>
      </Field.Root>

      <Button
        className='w-50'
        colorPalette='gray'
        size='lg'
        variant='surface'
        type='submit'
      >
        Применить
      </Button>
    </form>
  )
}

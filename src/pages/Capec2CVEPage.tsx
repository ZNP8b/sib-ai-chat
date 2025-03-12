import { Button, Container, Field, Flex, Input, VStack } from '@chakra-ui/react'
import { api } from '@/api/api.ts'
import { useMutation } from '@tanstack/react-query'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

type Capec2CVEInputType = {
  capecId: string
}

export function Capec2CVEPage() {
  const [cweIds, setCweIds] = useState([])

  const schema = yup
    .object({
      capecId: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const onSubmit: SubmitHandler<Capec2CVEInputType> = async data => {
    mutation.mutate(data.capecId)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (capecId: string) => {
      return api.post('/get_cwe', { capec_id: capecId })
    },
    onSuccess: data => {
      console.log(data.data.cwe_ids)
      setCweIds(data.data.cwe_ids)
    },
    onError: err => {
      console.log(err)
      setError('capecId', { type: 'custom', message: 'CAPEC ID не найден' })
    },
  })

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Flex
          direction="column"
          justifyContent="center"
          gap={4}
          alignItems="center"
        >
          <Field.Root invalid={!!errors.capecId}>
            <div className="w-[250px] self-center">
              <Field.Label>CAPEC ID</Field.Label>

              <Input
                variant="subtle"
                type="text"
                placeholder="Пример: CAPEC-137"
                size="lg"
                {...register('capecId')}
              />
              <Field.ErrorText fontSize="13px">
                {errors.capecId?.message}
              </Field.ErrorText>
            </div>
          </Field.Root>

          <Button
            className="w-50"
            size="lg"
            variant="solid"
            type="submit"
            rounded="lg"
          >
            Запустить
          </Button>
        </Flex>
      </form>
      <VStack marginTop="16px">
        {cweIds.map(id => (
          <div>{id}</div>
        ))}
      </VStack>
    </Container>
  )
}

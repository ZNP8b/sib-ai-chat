import {
  Button,
  Card,
  CloseButton,
  Container,
  Dialog,
  Field,
  Flex,
  For,
  Heading,
  Input,
  Portal,
  ProgressCircle,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api.ts'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { CapecToCveSkeleton } from '@/components/capec-to-cve-components/capec-to-cve-skeleton.tsx'

type MitigationsDetectionsInputType = {
  techniques: string
}

interface mitigationsDetectionsResponse {
  techniques: [
    {
      stage: string
      technique: string
    },
  ]
  mitigations: [
    {
      techniqueId: string
      mitigationId: string
      mitigationName: string
      mitigationDescription: string
    },
  ]
  detections: [
    {
      techniqueId: string
      detectionId: string
      detectionName: string
      detectionDescription: string
    },
  ]
}

export function MitigationsDetectionsPage() {
  const [mitigationsDetections, setMitigationsDetections] =
    useState<mitigationsDetectionsResponse>()

  const schema = yup
    .object({
      techniques: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const onSubmit: SubmitHandler<
    MitigationsDetectionsInputType
  > = async data => {
    mutation.mutate(data.techniques)
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
    mutationFn: (techniques: string) => {
      return api.post('/get_mitigations_detections', { techniques })
    },
    onSuccess: data => {
      setMitigationsDetections(data.data)
    },
    onError: () => {
      setError('techniques', {
        type: 'custom',
        message: 'Произошла неизвестная ошибка.',
      })
    },
  })

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction='column'
          justifyContent='center'
          gap={4}
          alignItems='center'
        >
          <Field.Root invalid={!!errors.techniques}>
            <div className='w-[300px] self-center'>
              <Field.Label>Введите id техник через запятую</Field.Label>

              <Input
                variant='subtle'
                type='text'
                placeholder='Пример: T1001, T1001.001, T1001.002'
                size='lg'
                {...register('techniques')}
              />
              <Field.ErrorText fontSize='13px'>
                {errors.techniques?.message}
              </Field.ErrorText>
            </div>
          </Field.Root>

          <Button
            className='w-50'
            size='lg'
            variant='solid'
            type='submit'
            rounded='lg'
          >
            Запустить
            {mutation.isPending && (
              <ProgressCircle.Root value={null} size='xs'>
                <ProgressCircle.Circle css={{ '--thickness': '3px' }}>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            )}
          </Button>
        </Flex>
      </form>

      <Stack
        marginTop='30px'
        gap='4'
        direction='row'
        wrap='wrap'
        justify='center'
      >
        {mutation.isPending && <CapecToCveSkeleton />}

        {!mutation.isPending && <Heading>Техники:</Heading>}

        {!mutation.isPending && (
          <Flex wrap='wrap' gap='4' justify='center' mb='40px'>
            <For each={mitigationsDetections?.techniques}>
              {technique => (
                <Card.Root width='320px' variant='elevated'>
                  <Card.Body gap='2'>
                    <Card.Title mb='2'>{technique.technique}</Card.Title>
                    <Card.Description>Этап: {technique.stage}</Card.Description>
                  </Card.Body>
                </Card.Root>
              )}
            </For>
          </Flex>
        )}

        {!mutation.isPending && <Heading>Меры смягчения:</Heading>}

        {!mutation.isPending && (
          <Flex wrap='wrap' gap='4' justify='center'>
            <For each={mitigationsDetections?.mitigations}>
              {mitigation => (
                <Card.Root width='320px' variant='elevated'>
                  <Card.Body gap='2'>
                    <Card.Title mb='2'>{mitigation.mitigationId}</Card.Title>
                    <Card.Description lineClamp={3}>
                      {mitigation.mitigationDescription}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent='flex-end'>
                    <Dialog.Root
                      placement='center'
                      motionPreset='slide-in-bottom'
                    >
                      <Dialog.Trigger asChild>
                        <Button variant='outline'>Подробнее</Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>
                                {mitigation.mitigationName}
                              </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <Text>Техника: {mitigation.techniqueId}</Text>

                              <Text>Описание:</Text>
                              {mitigation.mitigationDescription}
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton colorPalette='purple' size='sm' />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                  </Card.Footer>
                </Card.Root>
              )}
            </For>
          </Flex>
        )}

        {!mutation.isPending && <Heading>Меры обнаружения:</Heading>}

        {!mutation.isPending && (
          <Flex wrap='wrap' gap='4' justify='center' mb='40px'>
            <For each={mitigationsDetections?.detections}>
              {detection => (
                <Card.Root width='320px' variant='elevated'>
                  <Card.Body gap='2'>
                    <Card.Title mb='2'>{detection.detectionId}</Card.Title>
                    <Card.Description lineClamp={3}>
                      {detection.detectionDescription}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent='flex-end'>
                    <Dialog.Root
                      placement='center'
                      motionPreset='slide-in-bottom'
                    >
                      <Dialog.Trigger asChild>
                        <Button variant='outline'>Подробнее</Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>
                                {detection.detectionName}
                              </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <Text>Техника: {detection.techniqueId}</Text>

                              <Text>Описание:</Text>
                              {detection.detectionDescription}
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton colorPalette='purple' size='sm' />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                  </Card.Footer>
                </Card.Root>
              )}
            </For>
          </Flex>
        )}
      </Stack>
    </Container>
  )
}

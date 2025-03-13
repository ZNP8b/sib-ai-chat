import {
  Box,
  Button,
  Card,
  CloseButton,
  Container,
  Dialog,
  Field,
  Flex,
  For,
  Input,
  Portal,
  ProgressCircle,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { api } from '@/api/api.ts'
import { useMutation } from '@tanstack/react-query'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { AxiosResponse } from 'axios'

type Capec2CWEInputType = {
  capecId: string
}

type CWE2CVEInputType = {
  cweId: string
}

export interface NvdCveResponse {
  resultsPerPage: number
  startIndex: number
  totalResults: number
  format: string
  version: string
  timestamp: string
  vulnerabilities: Vulnerability[]
}

export interface Vulnerability {
  cve: Cve
}

export interface Cve {
  id: string
  sourceIdentifier: string
  published: string
  lastModified: string
  vulnStatus: string
  cveTags: string[] // если теги могут быть другими типами, замените на (string | any)[]
  descriptions: Description[]
  metrics: Metrics
  weaknesses: Weakness[]
  references: Reference[]
}

export interface Description {
  lang: string
  value: string
}

export interface Metrics {
  cvssMetricV31: CvssMetricV31[]
}

export interface CvssMetricV31 {
  source: string
  type: string
  cvssData: CvssData
  exploitabilityScore: number
  impactScore: number
}

export interface CvssData {
  version: string
  vectorString: string
  baseScore: number
  baseSeverity: string
  attackVector: string
  attackComplexity: string
  privilegesRequired: string
  userInteraction: string
  scope: string
  confidentialityImpact: string
  integrityImpact: string
  availabilityImpact: string
}

export interface Weakness {
  source: string
  type: string
  description: Description[]
}

export interface Reference {
  url: string
  source: string
}

export function Capec2CVEPage() {
  const [cweIds, setCweIds] = useState([])
  const [CVEs, setCVEs] = useState<NvdCveResponse>()

  const schema = yup
    .object({
      capecId: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const cweSchema = yup.object({
    cweId: yup.string().required('Это поле обязательно для заполнения'),
  })

  const onSubmit: SubmitHandler<Capec2CWEInputType> = async data => {
    mutation.mutate(data.capecId)
  }

  const onCWESubmit: SubmitHandler<CWE2CVEInputType> = async data => {
    cveMutation.mutate(data.cweId)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {
    register: cweRegister,
    handleSubmit: cweHandleSubmit,
    formState: { errors: cweErrors },
    setError: cweSetError,
  } = useForm({
    resolver: yupResolver(cweSchema),
  })

  const mutation = useMutation({
    mutationFn: (capecId: string) => {
      return api.post('/get_cwe', { capec_id: capecId })
    },
    onSuccess: data => {
      setCweIds(data.data.cwe_ids)
    },
    onError: () => {
      setError('capecId', {
        type: 'custom',
        message: 'Произошла неизвестная ошибка.',
      })
    },
  })

  const cveMutation = useMutation({
    mutationFn: (cweId: string) => {
      return api.post('/get_nvd', { cwe_id: cweId })
    },
    onSuccess: (data: AxiosResponse<NvdCveResponse>) => {
      setCVEs(data.data)
    },
    onError: () => {
      cweSetError('cweId', {
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
          <Field.Root invalid={!!errors.capecId}>
            <div className='w-[250px] self-center'>
              <Field.Label>CAPEC ID</Field.Label>

              <Input
                variant='subtle'
                type='text'
                placeholder='Пример: CAPEC-137'
                size='lg'
                {...register('capecId')}
              />
              <Field.ErrorText fontSize='13px'>
                {errors.capecId?.message}
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

      <Box marginTop='12px'>
        {cweIds.map((cweId, index) => (
          <span key={cweId}>
            {cweId}
            {index !== cweIds.length - 1 && ', '}{' '}
          </span>
        ))}
      </Box>

      <form onSubmit={cweHandleSubmit(onCWESubmit)} className='mt-3!'>
        <Flex
          direction='column'
          justifyContent='center'
          gap={4}
          alignItems='center'
        >
          <Field.Root invalid={!!cweErrors.cweId}>
            <div className='w-[250px] self-center'>
              <Field.Label>CWE ID</Field.Label>

              <Input
                variant='subtle'
                type='text'
                placeholder='Пример: CWE-78'
                size='lg'
                {...cweRegister('cweId')}
              />
              <Field.ErrorText fontSize='13px'>
                {cweErrors.cweId?.message}
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
            {cveMutation.isPending && (
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
        {cveMutation.isPending && (
          <Container>
            <Flex wrap='wrap' gap='4' justify='center'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => (
                <Skeleton key={id} height='200px' width='320px' />
              ))}
            </Flex>
          </Container>
        )}
        {CVEs?.totalResults === 0 && !cveMutation.isPending && (
          <Text>Ничего не найдено</Text>
        )}
        {!cveMutation.isPending && (
          <For each={CVEs?.vulnerabilities}>
            {(cve, index) => (
              <Card.Root
                width='320px'
                variant='elevated'
                key={cve.cve.id + index}
              >
                <Card.Body gap='2'>
                  <Card.Title mb='2'>{cve.cve.id}</Card.Title>
                  <Card.Description lineClamp={3}>
                    {cve.cve.descriptions[0].value}
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
                            <Dialog.Title>{cve.cve.id}</Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>
                            <Text>Описание:</Text>
                            {cve.cve.descriptions[0].value}
                            <br />
                            <br />
                            <Text>
                              Опубликован:{' '}
                              {new Date(cve.cve.published).toLocaleDateString(
                                'ru-RU',
                              )}
                            </Text>

                            <Text>Статус: {cve.cve.vulnStatus}</Text>

                            {cve.cve?.metrics?.cvssMetricV31?.map(metric => {
                              return (
                                <div key={metric.source + metric.cvssData}>
                                  <Text>Источник: {metric.source}</Text>
                                  <Text>Тип: {metric.type}</Text>
                                  <Text>Версия: {metric.cvssData.version}</Text>
                                  <Text>
                                    Вектор атаки: {metric.cvssData.vectorString}
                                  </Text>
                                  <Text>
                                    Базовый балл: {metric.cvssData.baseScore}
                                  </Text>
                                  <Text>
                                    Базовая серьезность:{' '}
                                    {metric.cvssData.baseSeverity}
                                  </Text>
                                  <Text>
                                    Вектор атаки: {metric.cvssData.attackVector}
                                  </Text>
                                  <Text>
                                    Сложность атаки:{' '}
                                    {metric.cvssData.attackComplexity}
                                  </Text>
                                  <Text>
                                    Требуемые привилегии:{' '}
                                    {metric.cvssData.privilegesRequired}
                                  </Text>
                                  <Text>
                                    Взаимодействие с пользователем:{' '}
                                    {metric.cvssData.userInteraction}
                                  </Text>
                                  <Text>Область: {metric.cvssData.scope}</Text>
                                  <Text>
                                    Воздействие на конфиденциальность:{' '}
                                    {metric.cvssData.confidentialityImpact}
                                  </Text>
                                  <Text>
                                    Воздействие на целостность:{' '}
                                    {metric.cvssData.integrityImpact}
                                  </Text>
                                  <Text>
                                    Воздействие на доступность:{' '}
                                    {metric.cvssData.availabilityImpact}
                                  </Text>
                                  <Text>
                                    Балл эксплуатации:{' '}
                                    {metric.exploitabilityScore}
                                  </Text>
                                  <Text>
                                    Балл воздействия: {metric.impactScore}
                                  </Text>
                                </div>
                              )
                            })}
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
        )}
      </Stack>
    </Container>
  )
}

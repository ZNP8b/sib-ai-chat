import { ApiInput } from '@/components/api-input/api-input.tsx'
import { Button, Stack, Text } from '@chakra-ui/react'
import { BackArrowIcon } from '@/components/ui/back-arrow-icon.tsx'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api.ts'
import { useState } from 'react'

export function Settings() {
  const [pingResponse, setPingResponse] = useState(
    'Здесь будет результат проверки',
  )

  const mutation = useMutation({
    mutationFn: () => {
      return api.get('/ping')
    },
    onSuccess: data => {
      if (data.data.ping === 'pong') {
        setPingResponse('Сервер доступен 👍')
      } else {
        setPingResponse('Сервер недоступен ☹️')
      }
    },
    onError: () => {
      setPingResponse('Сервер недоступен ☹️')
    },
  })

  return (
    <Stack className='flex items-center justify-center h-full'>
      <div className='flex items-center w-full'>
        <BackArrowIcon className='absolute! top-4 left-4' />
        <Text className='mt-[-74px]!' fontSize='32px' margin='auto'>
          Настройки
        </Text>
      </div>
      <div className='h-full flex flex-col justify-center items-center mt-[-56px]!'>
        <ApiInput />
        <Button
          size='lg'
          variant='solid'
          type='submit'
          rounded='lg'
          marginTop='20px'
          onClick={() => mutation.mutate()}
        >
          Проверить доступность сервера
        </Button>
        <Text fontSize='2xl'>{pingResponse}</Text>
      </div>
    </Stack>
  )
}

import { ApiInput } from '@/components/api-input/api-input.tsx'
import {
  Button,
  ProgressCircle,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react'
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
    <Stack className='flex items-center justify-center h-full my-auto!'>
      <div className='flex items-center absolute top-[5px]'>
        <Text className='' fontSize='32px' margin='auto'>
          Настройки
        </Text>
      </div>
      <div className='h-full flex flex-col justify-center items-center my-auto!'>
        <ApiInput />
        <div className='flex flex-col items-center'>
          <Button
            size='lg'
            variant='solid'
            type='submit'
            rounded='lg'
            marginTop='20px'
            minWidth='150px'
            onClick={() => mutation.mutate()}
          >
            <span>Проверить доступность сервера</span>
            {mutation.isPending && (
              <ProgressCircle.Root value={null} size='xs'>
                <ProgressCircle.Circle css={{ '--thickness': '3px' }}>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            )}
          </Button>
          {mutation.isPending ? (
            <SkeletonText
              noOfLines={1}
              height='26px'
              width='220px'
              marginTop='10px'
              colorPalette='purple'
              variant='shine'
              alignSelf='center'
            />
          ) : (
            <Text fontSize='2xl'>{pingResponse}</Text>
          )}
        </div>
      </div>
    </Stack>
  )
}

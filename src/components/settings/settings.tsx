import { ApiInput } from '@/components/api-input/api-input.tsx'
import { Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { BackArrowIcon } from '@/components/ui/back-arrow-icon.tsx'

export function Settings() {
  return (
    <Stack className='flex items-center justify-center h-full'>
      <div className='flex items-center w-full'>
        <BackArrowIcon className='absolute! top-4 left-4' />
        <Text className='mt-[-74px]!' fontSize='32px' margin='auto'>
          Настройки
        </Text>
      </div>
      <div className='h-full flex items-center mt-[-56px]!'>
        <ApiInput />
      </div>
    </Stack>
  )
}

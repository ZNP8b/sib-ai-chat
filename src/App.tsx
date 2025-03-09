import { Button, Input, VStack } from '@chakra-ui/react'

function App() {
  return (
    <>
      <VStack h='100vh' alignItems='center' justifyContent='center'>
        test
        <div className='flex flex-col gap-2 items-center'>
          <Input
            variant='subtle'
            type='password'
            placeholder='Введите пароль'
            size='lg'
            className='focus-visible:border-transparent! focus-visible:outline-none!'
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            // width="300px"
          />
          <Button
            className='w-50'
            colorPalette='gray'
            size='lg'
            variant='surface'
          >
            Войти
          </Button>
        </div>
      </VStack>
    </>
  )
}

export default App

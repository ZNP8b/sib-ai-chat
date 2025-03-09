'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { BrowserRouter } from 'react-router'

export function Provider(props: ColorModeProviderProps) {
  return (
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </BrowserRouter>
  )
}

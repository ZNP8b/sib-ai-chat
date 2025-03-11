'use client'

import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Provider(props: ColorModeProviderProps) {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <Theme colorPalette='purple'>
            <ColorModeProvider {...props} />
          </Theme>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

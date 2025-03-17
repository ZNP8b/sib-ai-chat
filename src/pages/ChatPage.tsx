import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  Input,
  Stack,
  Field,
  Skeleton,
  Box,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api.ts'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

type MessageProps = {
  text: string
  actor: 'user' | 'bot'
  id?: number
}

function ParsedMessage({ text, actor }: MessageProps) {
  const reasoningMatch = text.match(/<reasoning>([\s\S]*?)<\/reasoning>/)
  const answerMatch = text.match(/<answer>([\s\S]*?)<\/answer>/)

  const reasoningText = reasoningMatch ? reasoningMatch[1].trim() : ''
  const answerText = answerMatch ? answerMatch[1].trim() : text // если тег <answer> не найден, используем весь текст

  const [showFullReasoning, setShowFullReasoning] = useState(false)

  const toggleReasoning = () => {
    setShowFullReasoning(!showFullReasoning)
  }
  const [isClamped, setIsClamped] = useState(false)
  const reasoningRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (reasoningRef.current) {
      const element = reasoningRef.current
      // Если scrollHeight больше clientHeight, значит текст обрезается (lineClamp действует)
      setIsClamped(element.scrollHeight > element.clientHeight)
    }
  }, [reasoningText, showFullReasoning])

  return (
    <Flex
      mb={1}
      p={4}
      bg={
        actor === 'user'
          ? { base: 'purple.500', _dark: 'purple.500' }
          : { base: 'gray.100', _dark: 'gray.700' }
      }
      color={
        actor === 'user' ? 'white' : { base: 'gray.600', _dark: 'gray.100' }
      }
      borderRadius='lg'
      w='fit-content'
      alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
      maxWidth='80%'
      direction='column'
    >
      {reasoningText && (
        <Box mb={4}>
          <Text fontWeight='bold' mb={1}>
            Рассуждение:
          </Text>
          <Text
            ref={reasoningRef}
            lineClamp={showFullReasoning ? undefined : 2}
            whiteSpace='pre-wrap'
          >
            {reasoningText}
          </Text>
          {isClamped && (
            <Button variant='plain' onClick={toggleReasoning} mt={2} size='sm'>
              {showFullReasoning ? 'Скрыть' : 'Подробнее'}
            </Button>
          )}
        </Box>
      )}
      {answerText && (
        <Box>
          {actor === 'bot' && answerMatch && (
            <Text fontWeight='bold' mb={1}>
              Ответ:
            </Text>
          )}
          <Text whiteSpace='pre-wrap'>
            <Markdown>{answerText}</Markdown>
          </Text>
        </Box>
      )}
    </Flex>
  )
}

// function Message({ text, actor }: MessageProps) {
//   return (
//     <Flex
//       p={4}
//       bg={
//         actor === 'user'
//           ? { base: 'purple.500', _dark: 'purple.500' }
//           : { base: 'gray.100', _dark: 'gray.700' }
//       }
//       color={
//         actor === 'user' ? 'white' : { base: 'gray.600', _dark: 'gray.100' }
//       }
//       borderRadius='lg'
//       w='fit-content'
//       alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
//       maxWidth='80%'
//     >
//       <Text>{text}</Text>
//     </Flex>
//   )
// }

type ChatInputType = {
  userMessage: string
}

export function ChatPage() {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      text: 'Привет! Я SIB AI чат-бот 🤖. Рад помочь тебе сформировать эффективные меры реагирования и ликвидации последствий. Напиши свой запрос, и мы вместе найдём лучшее решение! 😊👍',
      actor: 'bot',
      id: 0,
    },
    {
      text: 'Например, ты можешь использовать такой ввод:',
      actor: 'bot',
      id: 1,
    },
    {
      text: 'CVE-2025-20146 A vulnerability in the Layer 3 multicast feature of Cisco IOS XR Software for Cisco ASR 9000 Series Aggregation Services Routers, ASR 9902 Compact High-Performance Routers, and ASR 9903 Compact High-Performance Routers could allow an unauthenticated, remote attacker to cause a line card to reset, resulting in a denial of service (DoS) condition. This vulnerability is due to the incorrect handling of malformed IPv4 multicast packets that are received on line cards where the interface has either an IPv4 access control list (ACL) or a QoS policy applied. An attacker could exploit this vulnerability by sending crafted IPv4 multicast packets through an affected device. A successful exploit could allow the attacker to cause line card exceptions or a hard reset. Traffic over that line card would be lost while the line card reloads.',
      actor: 'bot',
      id: 2,
    },
  ])

  const schema = yup
    .object({
      userMessage: yup.string().required('Это поле обязательно для заполнения'),
    })
    .required()

  const onSubmit: SubmitHandler<ChatInputType> = async data => {
    setMessages(prev => [
      ...prev,
      {
        text: data.userMessage,
        actor: 'user',
      },
    ])
    mutation.mutate(data.userMessage)
  }

  useEffect(() => {
    if (messages.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (userMessage: string) => {
      return api.post('/inference', { user_message: userMessage })
    },
    onSuccess: data => {
      setMessages(prev => [
        ...prev,
        {
          text: data.data.output,
          actor: 'bot',
        },
      ])
    },
    onError: () => {
      setError('userMessage', {
        type: 'custom',
        message: 'Произошла неизвестная ошибка.',
      })
      setMessages(prev => [
        ...prev,
        {
          text: 'Произошла ошибка при запросе. Проверьте введеный API в [настройках](#/settings)',
          actor: 'bot' as const,
        },
      ])
    },
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ userMessage: '' })
    }
  }, [isSubmitSuccessful])

  return (
    <Container height='full'>
      <Flex>
        <Flex flexDirection='column' h='full' w='full'>
          <Stack
            overflow='auto'
            flex={1}
            mb={100}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#d5e3f7',
                borderRadius: '24px',
              },
            }}
          >
            {messages.map((message, index) => (
              <ParsedMessage
                key={message.id + message.actor + index}
                text={message.text}
                actor={message.actor}
              />
            ))}
            {mutation.isPending && (
              <Skeleton
                variant='shine'
                css={{
                  '--start-color': 'colors.gray.100',
                  '--end-color': 'colors.gray.200',
                }}
                _dark={{
                  '--start-color': 'colors.gray.600',
                  '--end-color': 'colors.gray.700',
                }}
                p={4}
                borderRadius='lg'
                w='fit-content'
                alignSelf={'flex-start'}
                maxWidth='80%'
                height={16}
                width={40}
              />
            )}
          </Stack>

          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field.Root invalid={!!errors.userMessage}>
                <Stack
                  position='fixed'
                  left={0}
                  right={0}
                  bottom={0}
                  p={4}
                  bg={{ base: 'gray.100', _dark: 'gray.700' }}
                >
                  <HStack>
                    <Input
                      _dark={{ '--chakra-colors-border': 'colors.gray.500' }}
                      placeholder='Введите ваш текст'
                      {...register('userMessage')}
                    />
                    <Button colorScheme='purple' type='submit'>
                      Отправить
                    </Button>
                  </HStack>
                  <Field.ErrorText fontSize='13px'>
                    {errors.userMessage?.message}
                  </Field.ErrorText>
                </Stack>
              </Field.Root>
            </form>
          </Container>
        </Flex>
      </Flex>
    </Container>
  )
}

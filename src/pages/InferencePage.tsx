import React, { useState, useEffect, useRef } from 'react'
import { useWebSocket } from '../components/hooks/useWebSocket.ts'
import Layout from '@/components/layout/Layout.tsx'

const DEFAULT_INSTRUCTION =
  'Вы — эксперт в области информационной безопасности, предоставляющий рекомендации по реагированию на кибератаки и ликвидации их последствий. На основании анализа предоставленных данных вы формируете четкие, структурированные меры, включая:\nреагирование (оперативные действия для нейтрализации угрозы);\nликвидацию последствий (устранение ущерба и восстановление систем);\nРезультаты вашей работы представлены в виде пошагового руководства, которое обеспечивает практическое применение предложенных мер техническими специалистами.'

interface ChatMessage {
  sender: string
  text: string
  timestamp: string
}

const InferencePage: React.FC = () => {
  const [instruction] = useState(DEFAULT_INSTRUCTION)
  const [inputText, setInputText] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [criticalError, setCriticalError] = useState(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)
  const [processedMessages, setProcessedMessages] = useState<Set<string>>(
    new Set(),
  )

  const token = localStorage.getItem('authToken') || ''

  const DEFAULT_BASE_URL =
    localStorage
      .getItem('apiUrl')
      ?.replace(/^http:/, 'ws:')
      .replace(/^https:/, 'wss:')

  const { messages, sendMessage, socket } = useWebSocket({
    path: '/ws/inference',
    token,
    baseURL: DEFAULT_BASE_URL,
  })

  const messageEndRef = useRef<HTMLDivElement | null>(null)

  // Прокрутка чата вниз при добавлении нового сообщения
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  // Обновление состояния подключения
  useEffect(() => {
    const updateConnectionState = () => {
      if (socket?.readyState === WebSocket.OPEN) {
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    }

    updateConnectionState()

    const interval = setInterval(updateConnectionState, 500)

    return () => clearInterval(interval)
  }, [socket])

  // Обработка новых сообщений WebSocket
  useEffect(() => {
    const safeText = (text?: string) => text || 'Нет данных'
    const safeError = (error?: string) => error || 'Неизвестная ошибка'

    messages.forEach(message => {
      const uniqueMessageId = JSON.stringify(message)

      // Игнорируем уже обработанные сообщения
      if (processedMessages.has(uniqueMessageId)) {
        return
      }

      setProcessedMessages(prev => new Set(prev).add(uniqueMessageId))

      if (message.response) {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'AI',
            text: safeText(message.response),
            timestamp: new Date().toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ])
        setIsLoading(false)
        setHasPendingRequest(false)
      }

      if (message.message) {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'System',
            text: safeText(message.message),
            timestamp: new Date().toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ])
      }

      if (message.error) {
        const errorText = safeError(message.error)

        if (errorText.includes('Модель или токенизатор не загружены')) {
          setCriticalError(true)
        }

        setChatMessages(prev => [
          ...prev,
          {
            sender: 'Error',
            text: errorText,
            timestamp: new Date().toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ])

        setIsLoading(false)
        setHasPendingRequest(false)
      }
    })
  }, [messages, processedMessages])

  // Отправка сообщения
  const handleSubmit = () => {
    if (!inputText.trim()) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'System',
          text: 'Введите текст для отправки.',
          timestamp: new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      return
    }

    if (criticalError) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'System',
          text: 'Ошибка: Модель или токенизатор не подключены.',
          timestamp: new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      return
    }

    if (hasPendingRequest) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'System',
          text: 'Подождите завершения текущей операции.',
          timestamp: new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      return
    }

    const userMessage = inputText.trim()
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'You',
        text: userMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    setInputText('')
    setIsLoading(true)
    setHasPendingRequest(true)

    sendMessage({
      instruction,
      input_text: userMessage,
      max_new_tokens: 256,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.9,
    })
  }

  useEffect(() => {
    // interface ChatMessage {
    //   sender: string
    //   text: string
    //   timestamp: string
    // }

    setChatMessages([
      {
        sender: "You",
        text: "Напиши меры реагирования и меры ликвидации последствий к CVE-2025-1664: The Essential Blocks – Page Builder Gutenberg Blocks, Patterns & Templates plugin for WordPress is vulnerable to Stored Cross-Site Scripting",
        timestamp: "10.02.2025"
      },
      {
        sender: "AI",
        text: "Меры реагирования:  \n" +
          "1. Немедленно деактивировать плагин Essential Blocks на всех сайтах, где он установлен.  \n" +
          "2. Установить последнюю версию плагина после подтверждения наличия патча от разработчика.  \n" +
          "3. Временно включить Web Application Firewall (WAF) с правилами для блокировки X-атак.  \n" +
          "4. Провести аудит журналов доступа на предмет подозрительной активности, связанной с использованием плагина.  \n" +
          "\n" +
          "Меры ликвидации последствий:  \n" +
          "1. Проверить и очистить все содержимое (посты, страницы, виджеты), созданное через уязвимый плагин, от внедренных скриптов.  \n" +
          "2. Обновить учетные данные администраторов и пользователей с привилегированным доступом.  \n" +
          "3. Выполнить полное сканирование сайта на наличие бэкдоров и других следов компрометации.  \n" +
          "4. Сообщить пользователям о возможной утечке данных и рекомендовать сменить пароли.  \n" +
          "5. Восстановить резервную копию сайта, созданную до эксплуатации уязвимости (при наличии).",
        timestamp: "10.02.2025"
      }
    ])
  }, [])


  return (
    <Layout>
      <div className="container! mx-auto! px-4! py-8! flex! flex-col! h-[85vh]!">
        {/* Поле сообщений */}
        <div className="flex-grow! overflow-y-auto! bg-gray-100! p-4! rounded! shadow-md!">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2! p-2! rounded ${
                msg.sender === 'You'
                  ? 'bg-blue-100! text-blue-900! self-end!'
                  : msg.sender === 'AI'
                    ? 'bg-green-100! text-green-900!'
                    : 'bg-red-100! text-red-900!'
              }`}
            >
              <div className="text-sm! text-gray-500">{msg.timestamp}</div>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>

        {/* Окно ввода */}
        <div className="mt-4!">
          <textarea
            className="border! rounded! w-full! p-2!"
            rows={3}
            placeholder={
              criticalError
                ? 'Ошибка: Модель или токенизатор не подключены.'
                : !isConnected
                  ? 'Введите ваш текст...'
                  : 'Подключение недоступно.'
            }
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            // disabled={!isConnected || isLoading || criticalError}
          ></textarea>
          <button
            onClick={handleSubmit}
            className={`mt-2! w-full! px-4! py-2! rounded! ${
              !!isConnected || isLoading || criticalError
                ? 'bg-gray-500!'
                : 'bg-purple-600!'
            } text-white!`}
            // disabled={!isConnected || isLoading || criticalError}
          >
            {/*{!isConnected*/}
            {/*  ? 'Подключение недоступно'*/}
            {/*  : isLoading*/}
            {/*    ? 'Генерация...'*/}
            {/*    : 'Отправить'}*/}
            Отправить
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default InferencePage

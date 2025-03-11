import { useEffect, useState, useRef } from 'react'

interface WebSocketMessage {
  response?: string
  message?: string
  error?: string
  status?: 'started' | 'finished' | 'ping'
  ping?: string
  details?: string
}

interface UseWebSocketOptions {
  path: string // Путь к WebSocket
  token: string // Токен для аутентификации
  baseURL?: string // Базовый URL для WebSocket
  reconnectInterval?: number // Интервал переподключения в мс
}

// const DEFAULT_BASE_URL = 'ws://localhost:8000/api';
// const DEFAULT_BASE_URL =
//   localStorage
//     .getItem('apiUrl')
//     ?.replace(/^http:/, 'ws:')
//     .replace(/^https:/, 'wss:') + '/api'

export const useWebSocket = ({
  path,
  token,
  baseURL,
  reconnectInterval = 2000,
}: UseWebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const reconnectAttempts = useRef(0)

  const fullWebSocketURL = `${baseURL}${path}?token=${encodeURIComponent(token)}`

  const connectSocket = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      return
    }

    const ws = new WebSocket(fullWebSocketURL)

    ws.onopen = () => {
      reconnectAttempts.current = 0
    }

    ws.onmessage = event => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data)
        setMessages(prev => [...prev.slice(-100), data])
      } catch (err) {
        console.error('Ошибка при обработке сообщения WebSocket:', err)
      }
    }

    ws.onclose = () => {
      if (reconnectAttempts.current < 3) {
        reconnectAttempts.current++
        setTimeout(connectSocket, reconnectInterval)
      }
    }

    setSocket(ws)
  }

  useEffect(() => {
    connectSocket()
    return () => {
      socket?.close()
    }
  }, [path, token, baseURL])

  const sendMessage = (data: object) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    }
  }

  return {
    socket,
    messages,
    sendMessage,
  }
}

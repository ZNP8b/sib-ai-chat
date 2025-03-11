import React, { useState, useEffect, useRef } from 'react'
import { startTraining } from '../api/training'
import Spinner from '../components/common/Spinner'
import { useWebSocket } from '../components/hooks/useWebSocket.ts'
import Layout from '@/components/layout/Layout.tsx'

const DEFAULT_MODEL = 'unsloth/Llama-3.2-3B-Instruct-bnb-4bit'

const TrainingPage: React.FC = () => {
  const [maxSeqLength, setMaxSeqLength] = useState(1024)
  const [maxSteps, setMaxSteps] = useState(15)
  const [numEpochs, setNumEpochs] = useState(1)
  const [isTraining, setIsTraining] = useState(false)
  const [message, setMessage] = useState('')
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  const { messages, socket } = useWebSocket({
    path: '/ws/training-status',
    token: localStorage.getItem('authToken') || '',
  })

  const messageEndRef = useRef<HTMLDivElement | null>(null)

  // Прокрутка чата вниз при добавлении нового сообщения
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Обновление состояния WebSocket
  useEffect(() => {
    const updateConnectionState = () => {
      if (socket?.readyState === WebSocket.OPEN) {
        setIsSocketConnected(true)
      } else {
        setIsSocketConnected(false)
      }
    }

    updateConnectionState()

    const interval = setInterval(updateConnectionState, 500)

    return () => clearInterval(interval)
  }, [socket])

  const handleStartTraining = async () => {
    if (isTraining) {
      setMessage('Тренировка уже запущена.')
      return
    }

    if (!isSocketConnected) {
      setMessage('Пожалуйста, дождитесь подключения к серверу.')
      return
    }

    setIsTraining(true)
    setMessage('')

    try {
      await startTraining({
        max_seq_length: maxSeqLength,
        max_steps: maxSteps,
        num_train_epochs: numEpochs,
        loadModel: DEFAULT_MODEL,
      })
      setMessage('Тренировка успешно запущена!')
    } catch (error: any) {
      console.error('Ошибка при запуске тренировки:', error)

      if (error.response && error.response.data && error.response.data.detail) {
        setMessage(`Ошибка: ${error.response.data.detail}`)
      } else {
        setMessage(
          'Ошибка: Не удалось запустить тренировку. Попробуйте ещё раз.',
        )
      }
    } finally {
      setIsTraining(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.reload()
  }

  // Фильтруем сообщения, убирая "ping: pong"
  const filteredMessages = messages.filter(
    msg => !(msg.ping === 'pong' || msg.status === 'ping'),
  )

  return (
    <Layout onLogout={handleLogout}>
      <h1 className='text-3xl font-bold mb-6'>Тренировка модели</h1>
      <div className='bg-gray-100 p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Параметры тренировки</h2>
        <div className='flex flex-wrap gap-4 mb-6'>
          <div className='flex-1 min-w-[400px]'>
            <label className='text-gray-700 font-bold mb-2 block'>
              Длина последовательности (max_seq_length)
            </label>
            <input
              type='number'
              value={maxSeqLength}
              onChange={e => setMaxSeqLength(Number(e.target.value))}
              className='border rounded px-3 py-2 w-full'
              min={1}
            />
          </div>
          <div className='flex-1 min-w-[400px]'>
            <label className='text-gray-700 font-bold mb-2 block'>
              Количество шагов (max_steps)
            </label>
            <input
              type='number'
              value={maxSteps}
              onChange={e => setMaxSteps(Number(e.target.value))}
              className='border rounded px-3 py-2 w-full'
              min={0}
            />
          </div>
          <div className='flex-1 min-w-[400px]'>
            <label className='text-gray-700 font-bold mb-2 block'>
              Количество эпох (num_epochs)
            </label>
            <input
              type='number'
              value={numEpochs}
              onChange={e => setNumEpochs(Number(e.target.value))}
              className='border rounded px-3 py-2 w-full'
              min={1}
            />
          </div>
        </div>

        <button
          onClick={handleStartTraining}
          disabled={isTraining || !isSocketConnected}
          className={`px-6 py-3 rounded text-white ${
            isTraining || !isSocketConnected
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isTraining ? <Spinner size='small' /> : 'Запустить тренировку'}
        </button>
        {message && (
          <p
            className={`mt-4 ${
              message.startsWith('Ошибка:') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className='mt-8 bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Статус тренировки</h2>
        {filteredMessages.length === 0 ? (
          <p className='text-gray-500'>Пока нет обновлений статуса.</p>
        ) : (
          <ul className='space-y-3'>
            {filteredMessages.map((msg, index) => (
              <li
                key={index}
                className='border-b pb-2 text-gray-700 last:border-b-0'
              >
                {msg.status === 'started' ? (
                  <span className='text-green-600'>[Начато]</span>
                ) : msg.status === 'finished' ? (
                  <span className='text-purple-600'>[Завершено]</span>
                ) : (
                  <span className='text-gray-600'>[Обновление]</span>
                )}
                : {msg.details || 'Без сообщения'}
              </li>
            ))}
          </ul>
        )}
        <div ref={messageEndRef}></div>
      </div>
    </Layout>
  )
}

export default TrainingPage

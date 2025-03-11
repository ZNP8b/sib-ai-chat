import React, { useEffect, useState } from 'react'
import { getCheckpoints, deleteCheckpoint } from '../api/checkpoints'
import Spinner from '../components/common/Spinner'
import { loadModel } from '../api/training'
import Layout from '@/components/layout/Layout.tsx'

const DEFAULT_HF_MODEL = 'unsloth/Llama-3.2-3B-Instruct-bnb-4bit'

const LoadModelPage: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [deletingCheckpoint, setDeletingCheckpoint] = useState<string | null>(
    null,
  )

  const fetchCheckpoints = async () => {
    setIsFetching(true)
    setMessage('')
    setFetchFailed(false)
    try {
      const response = await getCheckpoints()
      // Фильтруем скрытые файлы
      const availableCheckpoints = (response.checkpoints || []).filter(
        (checkpoint: string) => !checkpoint.startsWith('.'), // Игнорируем скрытые файлы
      )
      setCheckpoints(availableCheckpoints)

      if (availableCheckpoints.length > 0) {
        setSelectedModel(availableCheckpoints[0])
      } else {
        setSelectedModel(DEFAULT_HF_MODEL)
      }
    } catch (error) {
      console.error('Error fetching checkpoints:', error)
      setMessage(
        'Не удалось получить список чекпоинтов. Проверьте подключение или попробуйте ещё раз.',
      )
      setFetchFailed(true)
    } finally {
      setIsFetching(false)
    }
  }

  const handleLoadModel = async () => {
    if (!selectedModel) {
      setMessage('Пожалуйста, выберите модель.')
      return
    }

    setIsLoading(true)
    setMessage('')

    const modelToLoad = checkpoints.includes(selectedModel)
      ? `checkpoints/${selectedModel}`
      : selectedModel

    try {
      await loadModel({
        loadModel: modelToLoad,
        max_seq_length: 1024,
      })
      setMessage(`Модель "${selectedModel}" успешно загружена!`)
    } catch (error: any) {
      console.error('Error loading model:', error)
      const errorMessage =
        error.response?.data?.detail || 'Не удалось загрузить модель.'
      setMessage(`Не удалось загрузить модель: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCheckpoint = async (checkpointName: string) => {
    if (
      !window.confirm(
        `Вы уверены, что хотите удалить чекпоинт "${checkpointName}"?`,
      )
    ) {
      return
    }

    setDeletingCheckpoint(checkpointName)
    setMessage('')
    try {
      await deleteCheckpoint(checkpointName)
      setMessage(`Чекпоинт "${checkpointName}" успешно удалён.`)
      fetchCheckpoints()
    } catch (error) {
      console.error('Error deleting checkpoint:', error)
      setMessage('Не удалось удалить чекпоинт. Попробуйте ещё раз.')
    } finally {
      setDeletingCheckpoint(null)
    }
  }

  useEffect(() => {
    fetchCheckpoints()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.reload()
  }

  return (
    <Layout onLogout={handleLogout}>
      <h1 className='text-2xl font-bold'>Загрузка модели</h1>
      <div className='mt-4'>
        {isFetching ? (
          <div className='flex items-center justify-center mb-4'>
            <Spinner size='medium' />
          </div>
        ) : fetchFailed ? (
          <div className='mb-4'>
            <p className='text-gray-500'>
              Не удалось загрузить список чекпоинтов. Проверьте подключение к
              сети.
            </p>
            <button
              onClick={fetchCheckpoints}
              className='text-purple-600 hover:underline'
            >
              Повторить
            </button>
          </div>
        ) : checkpoints.length > 0 ? (
          <>
            <label className='block text-gray-700 font-bold mb-2'>
              Выберите модель
            </label>
            <select
              value={selectedModel || ''}
              onChange={e => setSelectedModel(e.target.value)}
              className='border rounded px-3 py-2 mb-4 w-full'
            >
              {checkpoints.map(checkpoint => (
                <option key={checkpoint} value={checkpoint}>
                  {checkpoint}
                </option>
              ))}
            </select>
            <div className='mt-4'>
              <h2 className='text-lg font-bold mb-2 text-gray-700'>
                Удаление чекпоинтов
              </h2>
              <ul className='space-y-2'>
                {checkpoints.map(checkpoint => (
                  <li
                    key={checkpoint}
                    className='flex justify-between items-center'
                  >
                    <span>{checkpoint}</span>
                    <button
                      onClick={() => handleDeleteCheckpoint(checkpoint)}
                      disabled={deletingCheckpoint === checkpoint}
                      className={`text-sm px-3 py-1 rounded ${
                        deletingCheckpoint === checkpoint
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {deletingCheckpoint === checkpoint
                        ? 'Удаление...'
                        : 'Удалить'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className='mb-4'>
            <p className='text-gray-500'>
              Нет доступных локальных чекпоинтов. Вы можете загрузить модель с
              Hugging Face.
            </p>
            <select
              value={selectedModel || DEFAULT_HF_MODEL}
              onChange={e => setSelectedModel(e.target.value)}
              className='border rounded px-3 py-2 mb-4 w-full'
            >
              <option value={DEFAULT_HF_MODEL}>{DEFAULT_HF_MODEL}</option>
            </select>
          </div>
        )}
        {!fetchFailed && (
          <button
            onClick={handleLoadModel}
            disabled={isLoading || !selectedModel || isFetching}
            className={`px-4 py-2 rounded text-white flex items-center justify-center disabled:opacity-50 disabled:bg-gray-700 ${
              isLoading || isFetching
                ? 'bg-gray-700'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? <Spinner size='small' /> : 'Загрузить модель'}
          </button>
        )}
        {message && (
          <span
            className={`mt-4 block ${
              message.startsWith('Не удалось')
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </Layout>
  )
}

export default LoadModelPage

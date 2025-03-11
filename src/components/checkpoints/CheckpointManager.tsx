import React, { useState, useEffect } from 'react'
import {
  getCheckpoints,
  uploadCheckpoint,
  deleteCheckpoint,
  downloadCheckpointFile,
} from '../../api/checkpoints'
import CheckpointList from './CheckpointList'
import CheckpointUploader from './CheckpointUploader'
import Spinner from '../common/Spinner'
import { API_URL } from '../../api/api'

const CheckpointManager: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [message, setMessage] = useState('')
  const [deletingCheckpoint, setDeletingCheckpoint] = useState<string | null>(
    null,
  )
  const [selectedFiles, setSelectedFiles] = useState<{
    [checkpoint: string]: string[]
  }>({}) // Файлы для выбранного чекпоинта

  const fetchCheckpoints = async () => {
    setIsLoading(true)
    setFetchFailed(false)
    setMessage('')
    try {
      const response = await getCheckpoints()
      const availableCheckpoints = response.checkpoints.filter(
        (checkpoint: string) => !checkpoint.startsWith('.'),
      )
      setCheckpoints(availableCheckpoints)
    } catch (error) {
      console.error('Error fetching checkpoints:', error)
      setMessage('Не удалось загрузить список чекпоинтов.')
      setFetchFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (folderName: string, files: File[]) => {
    setIsLoading(true)
    setMessage('')
    try {
      await uploadCheckpoint(folderName, files)
      setMessage(`Чекпоинт "${folderName}" успешно загружен.`)
      fetchCheckpoints()
    } catch (error) {
      console.error('Error uploading checkpoint:', error)
      setMessage('Не удалось загрузить чекпоинт. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (checkpointName: string) => {
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

  const handleViewFiles = async (checkpointName: string) => {
    setMessage('')
    try {
      const response = await fetch(
        `${API_URL}/list-checkpoint-files/${checkpointName}`,
      )
      const data = await response.json()
      setSelectedFiles(prev => ({
        ...prev,
        [checkpointName]: data.files,
      }))
    } catch (error) {
      console.error('Error fetching checkpoint files:', error)
      setMessage('Не удалось получить список файлов. Попробуйте ещё раз.')
    }
  }

  const handleDownloadFile = async (
    checkpointName: string,
    fileName: string,
  ) => {
    setMessage('')
    try {
      const response = await downloadCheckpointFile(checkpointName, fileName)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setMessage(`Файл "${fileName}" успешно скачан.`)
    } catch (error) {
      console.error('Error downloading file:', error)
      setMessage('Не удалось скачать файл. Попробуйте ещё раз.')
    }
  }

  useEffect(() => {
    fetchCheckpoints()
  }, [])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Менеджер чекпоинтов</h1>
      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner size='medium' />
        </div>
      ) : fetchFailed ? (
        <div className='text-center'>
          <p className='text-gray-500 mb-4'>
            Не удалось загрузить список чекпоинтов. Проверьте подключение к
            сети.
          </p>
          <button
            onClick={fetchCheckpoints}
            className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition'
          >
            Повторить запрос
          </button>
        </div>
      ) : (
        <>
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.startsWith('Не удалось')
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}
          <CheckpointUploader onUpload={handleUpload} />
          <CheckpointList
            checkpoints={checkpoints}
            onDelete={handleDelete}
            onDownloadFile={handleDownloadFile}
            onViewFiles={handleViewFiles}
            deletingCheckpoint={deletingCheckpoint}
            selectedFiles={selectedFiles}
          />
        </>
      )}
    </div>
  )
}

export default CheckpointManager

import React, { useState, useEffect } from 'react'
import { getDatasets, uploadDataset, deleteDataset } from '@/api/datasets.ts'
import DatasetList from './DatasetList'
import DatasetUploader from './DatasetUploader'
import Spinner from '../common/Spinner'
import { api } from '@/api/api.ts'

const DatasetManager: React.FC = () => {
  const [datasets, setDatasets] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [message, setMessage] = useState('')

  const fetchDatasets = async () => {
    setIsLoading(true)
    setFetchFailed(false)
    setMessage('')
    try {
      const response = await getDatasets()
      setDatasets(response.data.datasets)
    } catch (error) {
      console.error('Ошибка при получении списка датасетов:', error)
      setMessage('Не удалось загрузить список датасетов.')
      setFetchFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setMessage('')
    try {
      await uploadDataset(file)
      setMessage(`Датасет "${file.name}" успешно загружен.`)
      fetchDatasets()
    } catch (error) {
      console.error('Ошибка при загрузке датасета:', error)
      setMessage('Не удалось загрузить датасет. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (datasetName: string) => {
    if (
      !window.confirm(
        `Вы уверены, что хотите удалить датасет "${datasetName}"?`,
      )
    ) {
      return
    }

    setMessage('')
    setIsLoading(true)
    try {
      await deleteDataset(datasetName)
      setMessage(`Датасет "${datasetName}" успешно удалён.`)
      fetchDatasets()
    } catch (error) {
      console.error('Ошибка при удалении датасета:', error)
      setMessage('Не удалось удалить датасет. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (datasetName: string) => {
    setMessage('')
    try {
      const response = await api.get(`/download-dataset/${datasetName}`, {
        responseType: 'blob', // Указываем тип ответа для скачивания файла
      })

      // Создаем URL для скачивания файла
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', datasetName) // Название файла
      document.body.appendChild(link)
      link.click()
      link.remove()

      setMessage(`Датасет "${datasetName}" успешно скачан.`)
    } catch (error) {
      console.error('Ошибка при скачивании датасета:', error)
      setMessage('Не удалось скачать датасет. Попробуйте ещё раз.')
    }
  }

  useEffect(() => {
    fetchDatasets()
  }, [])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Менеджер датасетов</h1>
      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner size='medium' />
        </div>
      ) : fetchFailed ? (
        <div className='text-center'>
          <p className='text-gray-500 mb-4'>
            Не удалось загрузить список датасетов. Проверьте подключение к сети.
          </p>
          <button
            onClick={fetchDatasets}
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
          <DatasetUploader onUpload={handleUpload} />
          <DatasetList
            datasets={datasets}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        </>
      )}
    </div>
  )
}

export default DatasetManager

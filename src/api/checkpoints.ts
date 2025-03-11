import { api } from './api'

// Получение списка чекпоинтов
export const getCheckpoints = async () => {
  try {
    const response = await api.get('/list-checkpoints')
    return response.data
  } catch (error) {
    console.error('Failed to fetch checkpoints:', error)
    throw error // Выбрасываем ошибку для обработки в UI
  }
}

// Сохранение текущего состояния модели в чекпоинт
export const saveCheckpoint = (checkpointName: string) =>
  api.post('/save-checkpoint', { checkpoint_name: checkpointName })

// Загрузка чекпоинта
export const uploadCheckpoint = (folderName: string, files: File[]) => {
  const formData = new FormData()
  formData.append('folder_name', folderName)
  files.forEach(file => {
    formData.append('files', file)
  })

  return api.post('/upload-checkpoint', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// Скачивание файла из чекпоинта
export const downloadCheckpointFile = (
  checkpointName: string,
  fileName: string,
) =>
  api.get(`/download-checkpoint/${checkpointName}/${fileName}`, {
    responseType: 'blob',
  })

// Удаление чекпоинта
export const deleteCheckpoint = (checkpointName: string) =>
  api.delete(`/delete-checkpoint/${checkpointName}`)

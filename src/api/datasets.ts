import { api } from './api'

// Получение списка датасетов
export const getDatasets = () => api.get('/list-datasets')

// Загрузка датасета
export const uploadDataset = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/upload-dataset', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// Удаление датасета
export const deleteDataset = (datasetName: string) =>
  api.delete(`/delete-dataset/${datasetName}`)

// Скачивание датасета
export const downloadDataset = (datasetName: string) =>
  api.get(`/download-dataset/${datasetName}`, { responseType: 'blob' })

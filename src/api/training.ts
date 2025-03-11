import { api } from './api'

// Получение статуса тренировок
export const getTrainingStatus = () => api.get('/training-status')

// Запуск тренировки
export const startTraining = (config: {
  max_seq_length: number
  loadModel: string
  max_steps: number
  num_train_epochs: number
}) => api.post('/start-training', config)

// Загрузка модели
export const loadModel = (config: {
  loadModel: string
  max_seq_length: number
}) => api.post('/load-model', config)

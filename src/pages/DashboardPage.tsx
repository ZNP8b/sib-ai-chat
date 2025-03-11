import Layout from '@/components/layout/Layout.tsx'
import { Link } from 'react-router'
import React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className='relative! bg-gradient-to-br from-purple-700 to-pink-500 text-white py-20! px-8! rounded-lg shadow-lg overflow-hidden!'>
        <div className='absolute! inset-0! opacity-30 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500 to-pink-700'></div>
        <div className='relative! z-10'>
          <h1 className='text-5xl! font-extrabold! mb-6!'>
            Добро пожаловать в <span className='text-pink-300'>SIB AI</span>!
          </h1>
          <p className='text-xl! leading-relaxed! max-w-2xl!'>
            Управляйте вашими датасетами, моделями и процессами обучения с
            невероятной легкостью. SIB AI предлагает мощные инструменты для
            создания, тренировки и управления нейросетями, чтобы ваши проекты
            стали успешными.
          </p>
          <div className='mt-8!'>
            <button
              className='px-6! py-3! bg-pink-400! text-white font-semibold! rounded-lg! shadow-lg hover:bg-pink-500! transition! duration-200'
              onClick={() => alert('Explore features coming soon!')}
            >
              Узнать больше
            </button>
          </div>
        </div>
        <div className='absolute! bottom-0! right-0!'></div>
      </div>

      {/* Features Section */}
      <div className='mt-12! grid! grid-cols-1! md:grid-cols-3! gap-8!'>
        <div className='bg-white p-6! rounded-lg! shadow-md! text-center!'>
          <h2 className='text-2xl! font-bold! mb-4! text-purple-600'>
            Датасеты
          </h2>
          <p className='text-gray-600'>
            Загружайте, управляйте и анализируйте ваши данные. Легкий доступ к
            любым форматам и мощные инструменты для обработки.
          </p>
        </div>
        <div className='bg-white p-6! rounded-lg! shadow-md text-center!'>
          <h2 className='text-2xl! font-bold! mb-4 text-purple-600'>
            Чекпоинты
          </h2>
          <p className='text-gray-600!'>
            Храните версии ваших моделей. Легко переключайтесь между разными
            состояниями и находите оптимальные конфигурации.
          </p>
        </div>
        <div className='bg-white p-6! rounded-lg! shadow-md text-center'>
          <h2 className='text-2xl font-bold! mb-4 text-purple-600'>
            Обучение моделей
          </h2>
          <p className='text-gray-600'>
            Настраивайте параметры обучения. Отслеживайте прогресс и
            оптимизируйте модели с минимальными усилиями.
          </p>
        </div>
      </div>

      {/* Detailed Description Section */}
      <div className='mt-12! bg-gray-50 p-8! rounded-lg! shadow-lg'>
        <h2 className='text-3xl! font-bold mb-6! text-gray-800'>
          Почему стоит выбрать <span className='text-purple-600'>SIB AI</span>?
        </h2>
        <ul className='list-disc pl-6! space-y-4! text-gray-700'>
          <li>
            <strong>Гибкость:</strong> Полная поддержка кастомных моделей,
            датасетов и разнообразных форматов данных.
          </li>
          <li>
            <strong>Интуитивный интерфейс:</strong> Простое управление через
            удобный интерфейс с минимальным временем обучения.
          </li>
          <li>
            <strong>Скорость:</strong> Оптимизированные процессы обучения
            обеспечивают высочайшую производительность.
          </li>
          <li>
            <strong>Масштабируемость:</strong> Подходит как для небольших
            проектов, так и для крупных производственных задач.
          </li>
          <li>
            <strong>Интеграции:</strong> Поддержка популярных платформ, таких
            как <span className='text-pink-500'>Hugging Face</span> и локальных
            чекпоинтов.
          </li>
        </ul>
      </div>

      {/* Call to Action Section */}
      <div className='mt-12! text-center'>
        <h2 className='text-3xl! font-bold text-gray-800'>Готовы начать?</h2>
        <p className='text-gray-600 mt-4!'>
          Создайте, обучите и управляйте вашими моделями в одном месте.
          Попробуйте SIB AI уже сегодня!
        </p>
        <div className='mt-6!'>
          <Link
            className='px-6! py-3! bg-purple-600 text-white rounded-lg! shadow-lg! hover:bg-purple-700 transition duration-200'
            to='/'
          >
            Начать работу
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage

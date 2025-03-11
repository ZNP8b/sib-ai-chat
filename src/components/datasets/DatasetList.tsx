import React from 'react'

type DatasetListProps = {
  datasets: string[]
  onDelete: (datasetName: string) => void
  onDownload: (datasetName: string) => void
}

const DatasetList: React.FC<DatasetListProps> = ({
  datasets,
  onDelete,
  onDownload,
}) => {
  if (!datasets.length) {
    return <p className='text-gray-500'>Нет доступных датасетов.</p>
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4'>Доступные датасеты</h2>
      <ul className='space-y-3'>
        {datasets.map(dataset => (
          <li
            key={dataset}
            className='flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm'
          >
            <span>{dataset}</span>
            <div className='flex space-x-3'>
              <button
                onClick={() => onDownload(dataset)}
                className='text-purple-600 hover:text-purple-800'
              >
                Скачать
              </button>
              <button
                onClick={() => onDelete(dataset)}
                className='text-red-500 hover:underline'
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DatasetList

import React from 'react'

type CheckpointListProps = {
  checkpoints: string[]
  onDelete: (checkpointName: string) => void
  onDownloadFile: (checkpointName: string, fileName: string) => void
  onViewFiles: (checkpointName: string) => void
  deletingCheckpoint: string | null
  selectedFiles: { [checkpoint: string]: string[] }
}

const CheckpointList: React.FC<CheckpointListProps> = ({
  checkpoints,
  onDelete,
  onDownloadFile,
  onViewFiles,
  deletingCheckpoint,
  selectedFiles,
}) => {
  if (!checkpoints.length) {
    return <p className='text-gray-500'>Нет доступных чекпоинтов.</p>
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4'>Доступные чекпоинты</h2>
      <ul className='space-y-3'>
        {checkpoints.map(checkpoint => (
          <li key={checkpoint} className='bg-gray-100 p-3 rounded shadow-sm'>
            <div className='flex justify-between items-center'>
              <span>{checkpoint}</span>
              <div className='flex space-x-3'>
                <button
                  onClick={() => onViewFiles(checkpoint)}
                  className='text-purple-600 hover:text-purple-800'
                >
                  Просмотр файлов
                </button>
                <button
                  onClick={() => onDelete(checkpoint)}
                  disabled={deletingCheckpoint === checkpoint}
                  className={`px-3 py-1 rounded ${
                    deletingCheckpoint === checkpoint
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {deletingCheckpoint === checkpoint
                    ? 'Удаление...'
                    : 'Удалить'}
                </button>
              </div>
            </div>
            {selectedFiles[checkpoint]?.length > 0 && (
              <ul className='mt-2 pl-4 space-y-1'>
                {selectedFiles[checkpoint].map(file => (
                  <li key={file} className='flex justify-between items-center'>
                    <span className='text-gray-700'>{file}</span>
                    <button
                      onClick={() => onDownloadFile(checkpoint, file)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      Скачать
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckpointList

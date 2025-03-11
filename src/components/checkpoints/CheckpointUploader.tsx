import React, { useState } from 'react'

type CheckpointUploaderProps = {
  onUpload: (folderName: string, files: File[]) => void
}

const CheckpointUploader: React.FC<CheckpointUploaderProps> = ({
  onUpload,
}) => {
  const [folderName, setFolderName] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (folderName && files.length > 0) {
      onUpload(folderName, files)
      setFolderName('')
      setFiles([])
    }
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4'>Загрузить чекпоинт</h2>
      <input
        type='text'
        placeholder='Введите имя папки'
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
        className='border border-gray-300 rounded px-3 py-2 mb-3 w-full'
      />
      <input
        type='file'
        multiple
        onChange={handleFileChange}
        className='mb-3'
      />
      <button
        onClick={handleUpload}
        className='bg-purple-600 text-white px-4 py-2 rounded'
        disabled={!folderName || files.length === 0}
      >
        Загрузить
      </button>
    </div>
  )
}

export default CheckpointUploader

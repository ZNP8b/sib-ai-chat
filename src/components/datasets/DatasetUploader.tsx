import React, { useState } from 'react'

type DatasetUploaderProps = {
  onUpload: (file: File) => void
}

const DatasetUploader: React.FC<DatasetUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
      setFile(null)
    }
  }

  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold mb-2'>Загрузить датасет</h2>
      <input type='file' onChange={handleFileChange} className='mb-2' />
      <button
        onClick={handleUpload}
        className='bg-purple-600 text-white px-4 py-2 rounded'
        disabled={!file}
      >
        Загрузить
      </button>
    </div>
  )
}

export default DatasetUploader

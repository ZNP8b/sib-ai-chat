import React from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded shadow-lg p-6 w-full max-w-md relative'>
        {title && <h2 className='text-xl font-bold mb-4'>{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Modal

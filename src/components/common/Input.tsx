import React from 'react'

type InputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  error?: string
  icon?: React.ReactNode
  className?: string
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  icon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className='relative'>
        {icon && (
          <span className='absolute inset-y-0 left-3 flex items-center'>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded focus:ring-2 focus:outline-none ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
        />
      </div>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
}

export default Input

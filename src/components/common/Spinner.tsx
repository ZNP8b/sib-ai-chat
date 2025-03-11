import React from 'react'

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large'
  color?: string // Цвет спиннера
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'red-500',
}) => {
  const sizes = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-4',
    large: 'h-16 w-16 border-4',
  }

  return (
    <div
      className={`animate-spin rounded-full border-t-transparent border-l-transparent border-r-${color} border-b-${color} ${sizes[size]}`}
      style={{
        borderWidth: size === 'small' ? '2px' : '4px', // Динамическая толщина границы
      }}
    ></div>
  )
}

export default Spinner

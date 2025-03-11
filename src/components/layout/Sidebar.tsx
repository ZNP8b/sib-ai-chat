import React from 'react'
import { Link } from 'react-router'

type SidebarProps = {
  links: { name: string; path: string; role: string }[]
  isOpen: boolean
  toggleSidebar: () => void
  isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
  links,
  isOpen,
  toggleSidebar,
  isMobile,
}) => {
  return (
    <div
      className={`fixed! top-0! left-0! h-full! bg-gray-800 text-white w-64! transform! ${
        isOpen ? 'translate-x-0!' : '-translate-x-full!'
      } transition-transform duration-300 z-50 ${isMobile ? '' : 'shadow-md'}`}
    >
      <div className='p-4! flex! justify-between! items-center!'>
        <h2 className='text-lg! font-bold!'>Меню</h2>
        <button
          onClick={toggleSidebar}
          className='text-white bg-purple-600 hover:bg-purple-700 p-2! rounded-lg! focus:outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6! w-6!'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <ul className='space-y-2!'>
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className='block! px-4! py-2! rounded! hover:bg-gray-700'
              onClick={isMobile ? toggleSidebar : undefined}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

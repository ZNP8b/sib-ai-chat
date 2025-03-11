import React from 'react'

type NavbarProps = {
  toggleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
  <nav className='bg-gradient-to-br from-purple-700 to-purple-800 text-white px-6! py-4! flex! justify-between! items-center! shadow-md'>
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
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </button>
    <h1 className='text-xl! font-bold!'>
      <a href='/dashboard'>SIB AI</a>
    </h1>
  </nav>
)

export default Navbar

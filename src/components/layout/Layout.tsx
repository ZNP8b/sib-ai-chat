import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  )
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )

  // Определяем устройство (мобильное или ПК)
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < 768
      setIsMobile(isCurrentlyMobile)
      setIsSidebarOpen(!isCurrentlyMobile) // На ПК открыто, на мобильных закрыто
    }

    handleResize() // Установка начального состояния
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='flex! min-h-screen!'>
      <Sidebar
        links={[
          { name: 'Главная', path: '/dashboard', role: 'user' },
          { name: 'CAPEC -> Техники', path: '/', role: 'user' },
          { name: 'CAPEC -> CVE', path: '/', role: 'user' },
          { name: 'Чат с SIB AI', path: '/', role: 'user' },
          // { name: 'Датасеты', path: '/datasets', role: 'admin' },
          // { name: 'Чекпоинты', path: '/checkpoints', role: 'admin' },
          // { name: 'Тренировка', path: '/training', role: 'admin' },
          // { name: 'Загрузка модели', path: '/load-model', role: 'admin' },
        ]}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />
      <div
        className={`flex-1! transition-all ${
          isMobile || !isSidebarOpen ? 'ml-0!' : 'ml-64!'
        }`}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className='p-6! bg-gray-100!'>{children}</main>
      </div>
    </div>
  )
}

export default Layout

import React from 'react'
import DatasetManager from '../components/datasets/DatasetManager'
import Layout from '@/components/layout/Layout.tsx'

const DatasetsPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.reload()
  }

  return (
    <Layout onLogout={handleLogout}>
      <DatasetManager />
    </Layout>
  )
}

export default DatasetsPage

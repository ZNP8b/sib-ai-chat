import React from 'react'
import CheckpointManager from '../components/checkpoints/CheckpointManager'
import Layout from '@/components/layout/Layout.tsx'

const CheckpointsPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.reload()
  }

  return (
    <Layout onLogout={handleLogout}>
      <CheckpointManager />
    </Layout>
  )
}

export default CheckpointsPage

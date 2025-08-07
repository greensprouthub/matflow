import React, { Suspense, lazy } from 'react'
import './App.css'
const Pages = lazy(() => import('@/pages/index.jsx'))
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <Pages />
      </Suspense>
      <Toaster />
    </>
  )
}

export default App 
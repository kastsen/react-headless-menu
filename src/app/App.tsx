import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'

export default function App() {
  return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <RouterProvider router={router()} />
      </Suspense>
  )
}

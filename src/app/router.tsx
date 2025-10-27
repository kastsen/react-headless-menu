import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import MainLayout from "@/layouts/MainLayout";

export const router = () =>
    createBrowserRouter([
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '', element: <HomePage /> },

          { path: 'projects/all', element: <div>Все проекты</div> },
          { path: 'projects/create', element: <div>Создать проект</div> },
          { path: 'projects/templates', element: <div>Шаблоны проектов</div> },

          { path: 'team', element: <div>Команда</div> },

          { path: 'reports/all', element: <div>Все Отчёты</div> },
          { path: 'reports/create', element: <div>Создать Отчёт</div> },
          { path: 'reports/templates', element: <div>Шаблоны Отчётов</div> },

          { path: 'settings', element: <div>Настройки</div> },
        ],
      },
    ])

import { createBrowserRouter } from 'react-router-dom'
import Signup from '@features/auth/pages/signupPage'
import Login from '@features/auth/pages/LoginPage'
import Me from '@features/users/pages/Me'
import ProtectedRoute from '@shared/components/ProtectedRoutes'
import App from './App'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'signup', element: <Signup /> },
            { path: 'login', element: <Login /> },

            {
                element: <ProtectedRoute />,
                children: [{ path: 'me', element: <Me /> }]
            }
        ]
    }
])

import { Navbar } from '@shared/components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                pauseOnHover
            />
        </>
    )
}

export default App

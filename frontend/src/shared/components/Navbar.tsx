import { Link, useNavigate } from 'react-router-dom'
import { useAuthSession } from '@features/auth/hooks/useAuthSession'
import { toast } from 'react-toastify'
import { useAuth } from '@features/auth/hooks/useAuth'

export default function Navbar() {
    const { user, refresh } = useAuthSession()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        toast.info('Logged out')
        refresh()
        navigate('/login')
    }

    return (
        <nav className="flex gap-4 p-4 border-b">
            <Link to="/">Home</Link>

            {!user && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}

            {user && (
                <>
                    <Link to="/me">My Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    )
}

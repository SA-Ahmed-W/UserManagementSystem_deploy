import { useAuthSession } from '@features/auth/hooks/useAuthSession'

export default function Me() {
    const { user } = useAuthSession()

    if (!user) return null

    return (
        <div className="max-w-lg mx-auto mt-10 space-y-2">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p>
                <b>Name:</b> {user.fullName}
            </p>
            <p>
                <b>Email:</b> {user.email}
            </p>
            <p>
                <b>Role:</b> {user.role}
            </p>
            <p>
                <b>Status:</b> {user.status}
            </p>
        </div>
    )
}

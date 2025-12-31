import { type UserDTO } from '../services/users.api'

interface ToggleStatusModalProps {
    user: UserDTO | null
    loading?: boolean
    onConfirm: () => void
    onCancel: () => void
}

function ToggleStatusModal({ user, loading = false, onConfirm, onCancel }: ToggleStatusModalProps) {
    if (!user) return null

    const isActive = user.status === 'active'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/20 p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                    {isActive ? 'Deactivate user' : 'Activate user'}
                </h3>

                <p className="text-gray-300 mb-6">
                    Are you sure you want to {isActive ? 'deactivate' : 'activate'}{' '}
                    <span className="font-medium text-white">{user.fullName}</span>?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm transition">
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                            isActive
                                ? 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300'
                                : 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-300'
                        }`}>
                        {loading ? 'Processing…' : isActive ? 'Deactivate' : 'Activate'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToggleStatusModal

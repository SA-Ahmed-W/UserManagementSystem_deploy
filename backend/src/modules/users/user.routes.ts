import { Router } from 'express'
import { getProfile, updateProfile, changePassword, getAllUsers, activateUser, deactivateUser } from './user.controller.js'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { authorizeRoles } from '../../middlewares/role.middleware.js'

const router: Router = Router()

// User routes
router.get('/me', authenticate, getProfile)
router.put('/me', authenticate, updateProfile)
router.put('/me/password', authenticate, changePassword)

// Admin routes
router.get('/', authenticate, authorizeRoles('admin'), getAllUsers)
router.put('/:id/activate', authenticate, authorizeRoles('admin'), activateUser)
router.put('/:id/deactivate', authenticate, authorizeRoles('admin'), deactivateUser)

export default router

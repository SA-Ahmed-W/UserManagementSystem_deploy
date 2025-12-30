import { Router } from 'express'
import { signup, login, logout } from './auth.controller.js'

const router: Router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router

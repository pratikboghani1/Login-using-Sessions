import express from 'express'

const router = express.Router()

import Controller from '../controllers/controller.js'

router.get('/',Controller.home_controller)

router.get('/signup',Controller.signup_get)

router.post('/signup',Controller.signup_post)

router.get('/login',Controller.login_get)

router.post('/login',Controller.login_post)

router.get('/dashboard',Controller.dashboard_get)


export default router

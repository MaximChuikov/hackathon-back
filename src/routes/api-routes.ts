import {Router} from "express"
import auth from './auth-router'
import test from './test-router'
import user from './user-router'

const router = Router()

router.use(auth)
router.use(test)
router.use(user)

export default router
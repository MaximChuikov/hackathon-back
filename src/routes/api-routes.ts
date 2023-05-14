import {Router} from "express"
import auth from './auth-router'
import test from './test-router'

const router = Router()

router.use(auth)
router.use(test)

export default router
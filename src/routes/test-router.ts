import {query} from "express-validator";
import {check} from "../middlewares/request-middleware";
import testController from "../controllers/test-controller";
import authMid from "../middlewares/auth-middleware";
import roleAccess from "../middlewares/roleAccess";
import {Router} from "express";

const router = Router()

router.get('/2',
    query('text').isString(),
    check,
    testController.test1)

router.delete('/3', authMid, roleAccess.adminAccess, testController.test2)

router.get('/1', testController.errorTest)

export default router
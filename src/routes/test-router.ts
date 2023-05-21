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
    testController.test2)

router.delete('/3', authMid, roleAccess.adminAccess, testController.test2)

router.get('/1', testController.errorTest)
router.get('/6',  testController.goodTest)
router.get('/4', authMid, testController.goodTest)
router.get('/5', authMid, roleAccess.adminAccess,testController.goodTest)
export default router
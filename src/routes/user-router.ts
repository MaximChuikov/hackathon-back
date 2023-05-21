import authMid from "../middlewares/auth-middleware";
import roleAccess from "../middlewares/roleAccess";
import UserController from "../controllers/user-controller"
import {Router} from "express";

const router = Router()

router.post('/user/change/role/admin',
    authMid,
    roleAccess.adminAccess,
    UserController.changeRoleToAdmin)

router.post('/user/change/role/user',
    authMid,
    roleAccess.adminAccess,
    UserController.changeRoleToUser)

export default router
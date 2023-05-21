import {Request, Response, NextFunction} from 'express';
import {PrismaClient, Role} from '@prisma/client'
import userService from "../services/user-service";
const prisma = new PrismaClient()

class UserController {

    async changeRoleToAdmin(req: Request, res: Response, next: NextFunction) {
        try{
            const {userId} = req.body;
            const userData = await userService.changeUserRole(userId,Role.ADMIN);
            res.status(200).json(userData)
        }
        catch (e){
            next(e)
        }
    }

    async changeRoleToUser(req: Request, res: Response, next: NextFunction) {
        try{
            const {userId} = req.body;
            const userData = await userService.changeUserRole(userId,Role.USER);
            res.status(200).json(userData)
        }
        catch (e){
            next(e)
        }
    }

}

export default new UserController()
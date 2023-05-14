import {Role} from '@prisma/client'
import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api-error";

export default class RoleAccess {
    static adminAccess (req: Request, res: Response, next: NextFunction) {
        if (req.user?.role === Role.ADMIN) {
            next()
        }
        else {
            throw ApiError.InsufficientRole(Role.ADMIN)
        }
    }
}
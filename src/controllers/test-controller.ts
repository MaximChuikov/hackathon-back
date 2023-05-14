import {Request, Response, NextFunction} from 'express';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

class TestController {
    async test1(req: Request, res: Response, next: NextFunction) {
        res.status(201)
    }

    async test2(req: Request, res: Response, next: NextFunction) {
        res.status(201)
    }

    async errorTest(req: Request, res: Response, next: NextFunction) {
        try {
            //типо в сервисе ошибка
            await prisma.user.delete({where: {
                    user_id: 999
                }})
        }
        catch (e) {
            next(e)
        }

    }
}

export default new TestController()
import {PrismaClient, User} from '@prisma/client'

const prisma = new PrismaClient()

interface UserRegistrationData {
    email: string
    password_hash: string
}

class DbUser {
    async findUser(email: string): Promise<User> {
        return await prisma.user.findUnique({where: {email: email}})
    }

    async findUserById(user_id: number): Promise<User> {
        return await prisma.user.findUnique({where: {user_id: user_id}})
    }

    async addUser(data: UserRegistrationData) {
        return await prisma.user.create({
            data: data
        })
    }
}

export default new DbUser()
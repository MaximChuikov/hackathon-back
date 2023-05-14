import {User, Role} from "@prisma/client"

export default class UserDto {
    u_id: number
    role: Role

    constructor(model: User) {
        this.u_id = model.user_id
        this.role = model.role
    }
}

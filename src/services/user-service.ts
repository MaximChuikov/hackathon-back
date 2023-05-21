import {Role} from "@prisma/client";
import userDb from "../sql_requests/user";
import ApiError from "../exceptions/api-error";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";


class UserService {
    async changeUserRole(userId : number,roleToChange : Role){
        const user = await userDb.findUserById(userId)
        if (!user) {
            throw ApiError.BadRequest(`Такого пользователя не существует`)
        }
        const newUser = await userDb.updateUserRole(userId, roleToChange)

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.user_id, tokens.refreshToken);
        return newUser
    }
}

export default new UserService();

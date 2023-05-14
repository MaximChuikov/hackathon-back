import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import tokenService from './token-service'
import userDb from '../sql_requests/user'
import ApiError from '../exceptions/api-error'
import UserDto from '../dtos/user-dto'

class UserService {

    async registration(email: string, password: string) {
        const candidate = await userDb.findUser(email)
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const user = await userDb.addUser({
            email,
            password_hash: await bcrypt.hash(password, 3)
        })
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user.user_id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await userDb.findUser(email)
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password_hash);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.user_id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userDb.findUserById(userData.u_id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.user_id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

export default new UserService();

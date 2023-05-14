import jwt from 'jsonwebtoken'
import tokenDb from '../sql_requests/token'
import UserDto from "../dtos/user-dto";

class TokenService {
    generateTokens(payload: UserDto) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string): UserDto | null {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as UserDto;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): UserDto | null {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as UserDto
        } catch (e) {
            return null;
        }
    }

    async saveToken(user_id: number, refreshToken: string) {
        return await tokenDb.saveToken(user_id, refreshToken)
    }

    async removeToken(refreshToken: string) {
        return tokenDb.removeToken(refreshToken)
    }

    async findToken(refreshToken: string) {
        return tokenDb.selectByToken(refreshToken)
    }
}

export default new TokenService();
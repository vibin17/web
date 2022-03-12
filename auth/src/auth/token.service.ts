import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserTokenData } from "src/users/dto/auth-response.dto";


@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}
    
    generateAccessToken(payload: UserTokenData): string {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_KEY,
            expiresIn: '20m'
        })
    }

    generateRefreshToken(payload: UserTokenData): string {
        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_KEY,
            expiresIn: '30d'
          })
    }

    validateAccessToken(access: string): UserTokenData {
        try {
            return this.jwtService.verify(access, { secret: process.env.ACCESS_KEY })
        }
        catch {
            throw new UnauthorizedException({message: "Access токен недействителен"})
        }
    }

    validateRefreshToken(refresh: string): UserTokenData {
        try {
            return this.jwtService.verify(refresh, { secret: process.env.REFRESH_KEY })
        }
        catch {
            throw new UnauthorizedException({message: "Refresh токен недействителен"})
        }
    }
}
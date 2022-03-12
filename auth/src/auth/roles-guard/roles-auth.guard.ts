import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UserTokenData } from "src/users/dto/auth-response.dto";
import { AuthService } from "../auth.service";
import { TokenService } from "../token.service";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(private tokenService: TokenService, 
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) {
            return true
        }
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
    
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const userData: UserTokenData = this.tokenService.syncValidateAccessToken(token)
            return userData.roles.some(role => requiredRoles.includes(role))
        }
        catch {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}
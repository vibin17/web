import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, timeout } from "rxjs";
import { UserTokenData } from "src/products/dto/auth-response.dto";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(@Inject('AUTH_CLIENT') private readonly client: ClientProxy,            
                private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        const authHeader = <string> req.headers.authorization
        if (!authHeader) {
            throw new HttpException('Access токен отсутствует или некорректен', HttpStatus.UNAUTHORIZED)
        }
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if (bearer !== 'Bearer' || !token) {
            throw new HttpException('Access токен отсутствует или некорректен', HttpStatus.UNAUTHORIZED)
        }
        let response = await (lastValueFrom<{ userData: UserTokenData }>(this.client.send({
            role: 'auth',
            cmd: 'check'
        }, {
            access: token
        }).pipe(timeout(2000)))).catch(error => { 
            throw new HttpException('Авторизация не пройдена', HttpStatus.UNAUTHORIZED)
        })
        const userData: UserTokenData = response.userData

        if (requiredRoles.length == 0 && userData) {
            return true
        }
        return userData.roles.some(role => requiredRoles.includes(role))
    }
}
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, Observable, timeout } from "rxjs";
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
        const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Access токен отсутствует или некоректен', HttpStatus.UNAUTHORIZED)
            }
            let response
            try {
                response = await (lastValueFrom(this.client.send({
                    role: 'auth',
                    cmd: 'check'
                }, {
                    access: token
                }).pipe(timeout(2000))))
            } catch {
                throw new HttpException('Сервис авторизации недоступен', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const userData: UserTokenData = response.userData

            if (requiredRoles.length == 0 && userData) {
                return true
            }
            return userData.roles.some(role => requiredRoles.includes(role))
    }
}
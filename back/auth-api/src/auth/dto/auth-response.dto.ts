import { RolesEnum } from "../../users/schemas/roles.enum"

export type AuthResponseDto = {
    readonly userData: UserTokenData
    readonly access: string
    readonly refresh: string
}

export type UserTokenData = {
    readonly userName: string
    readonly phoneNumber: string
    readonly roles: RolesEnum[]
}

export type AuthCheckDto = {
    readonly userData: UserTokenData
}
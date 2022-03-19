import { RolesEnum } from "../../users/schemas/roles.enum"

export type AuthResponseDto = {
    userData: UserTokenData
    access: string
    refresh: string
}

export type UserTokenData = {
    userName: string
    phoneNumber: string
    roles: RolesEnum[]
}
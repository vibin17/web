export type AuthResponse = {
    userData: {
        userName: string
        phoneNumber: string
        roles: string[]
    }
    access: string
    refresh: string

}
export type SignInData = {
    userName: string
    password: string
}

export type SignUpData = {
    userName: string
    phoneNumber: string
    password: string
}
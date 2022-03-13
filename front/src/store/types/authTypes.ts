export type AuthState = {
    userData: {
        userName: string | null
        phoneNumber: string | null
        roles: string[] | null
    }
    access: string | null
    refresh: string | null
    signedIn: Boolean
    error?: string
}

export enum AuthActionTypes {
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILED = 'SIGN_IN_FAILED',
    SIGN_OUT = 'SIGN_OUT'
}

type SignInSuccessAction = {
    type: AuthActionTypes.SIGN_IN_SUCCESS
    payload: AuthState
}

type SignInFailedAction = {
    type: AuthActionTypes.SIGN_IN_FAILED
    payload: string
}

type SignOutAction = {
    type: AuthActionTypes.SIGN_OUT
}

export type AuthAction = SignInSuccessAction | SignInFailedAction | SignOutAction
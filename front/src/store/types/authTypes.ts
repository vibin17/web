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
    READ_LOCAL = 'READ_LOCAL'
}

type SignInSuccessAction = {
    type: AuthActionTypes.SIGN_IN_SUCCESS
    payload: AuthState
}

type SignInFailedAction = {
    type: AuthActionTypes.SIGN_IN_FAILED
    payload: string
}

type ReadLocalAction = {
    type: AuthActionTypes.READ_LOCAL
    payload: AuthState
}

export type AuthAction = SignInSuccessAction | SignInFailedAction | ReadLocalAction
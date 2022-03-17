export type AuthState = {
    userData: {
        userName: string | null
        phoneNumber: string | null
        roles: string[] | null
    }
    access: string | null
    refresh: string | null
    isSignedIn: Boolean
    error?: string
    isLoading?: boolean
}

export enum AuthActionTypes {
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILED = 'SIGN_IN_FAILED',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILED = 'SIGN_UP_FAILED',
    SIGN_OUT = 'SIGN_OUT',
    LOADING = 'LOADING'
}

type SignInSuccessAction = {
    type: AuthActionTypes.SIGN_IN_SUCCESS
    payload: AuthState
}

type SignInFailedAction = {
    type: AuthActionTypes.SIGN_IN_FAILED
    payload: string
}

type SignUpSuccessAction = {
    type: AuthActionTypes.SIGN_UP_SUCCESS
}

type SignUpFailedAction = {
    type: AuthActionTypes.SIGN_UP_FAILED
    payload: string
}

type SignOutAction = {
    type: AuthActionTypes.SIGN_OUT
}

type AuthLoadingAction = {
    type: AuthActionTypes.LOADING

}

export type AuthAction = SignInSuccessAction | SignInFailedAction | SignUpSuccessAction | SignUpFailedAction | SignOutAction | AuthLoadingAction
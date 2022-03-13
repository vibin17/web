import { AuthAction, AuthActionTypes, AuthState } from "../types/authTypes"

const initialState: AuthState = {
    userData: {
        userName: null,
        phoneNumber: null,
        roles: null
    },
    signedIn: false,
    access: null,
    refresh: null,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return { userData: {
                userName: action.payload.userData.userName,
                phoneNumber: action.payload.userData.phoneNumber,
                roles: action.payload.userData.roles
            },
            signedIn: true,
            access: action.payload.access,
            refresh: action.payload.refresh
        }

        case AuthActionTypes.SIGN_IN_FAILED:
            return {
                ...initialState,
                error: action.payload
            }
        
        case AuthActionTypes.SIGN_OUT:
            return {
                ...initialState
            }

        default:
            return state
    }
}
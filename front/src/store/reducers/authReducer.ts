import { AuthAction, AuthActionTypes, AuthState } from "../types/authTypes"

const initialState: AuthState = {
    userData: {
        userName: null,
        phoneNumber: null,
        roles: null
    },
    isSignedIn: false,
    access: null,
    refresh: null
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return { userData: {
                userName: action.payload.userData.userName,
                phoneNumber: action.payload.userData.phoneNumber,
                roles: action.payload.userData.roles
            },
            isSignedIn: action.payload.isSignedIn,
            access: action.payload.access,
            refresh: action.payload.refresh
        }

        case AuthActionTypes.SIGN_IN_FAILED:
            return {
                ...initialState,
                signInError: action.payload
            }

        case AuthActionTypes.SIGN_UP_SUCCESS:
            return {
                ...initialState
            }
            
        case AuthActionTypes.SIGN_UP_FAILED:
            return {
                ...initialState,
                signUpError: action.payload
            }
        
        case AuthActionTypes.SIGN_OUT:
            return {
                ...initialState
            }
        
        case AuthActionTypes.LOADING:
            return {
                ...initialState,
                isLoading: true
            }

        default:
            return state
    }
}
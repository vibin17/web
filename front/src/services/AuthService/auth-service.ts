import { AxiosResponse } from "axios";
import { authAPI } from "../../http";
import { AuthResponse, SignInData, SignUpData } from "../models/auth-models";

export default class AuthService {
    static async signIn(signInData: SignInData): Promise<AxiosResponse<AuthResponse>> {
        return authAPI.post('auth/signin', signInData)
    }
    static async signUp(signUpData: SignUpData): Promise<AxiosResponse<AuthResponse>> {
        return authAPI.post('auth/signup', signUpData)
    }
}
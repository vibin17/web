import { AxiosResponse } from "axios";
import { authAPI } from "../../http";
import { AuthResponse, SignInData } from "../../models/response/authModels";

export default class AuthService {
    static async signIn(signInData: SignInData): Promise<AxiosResponse<AuthResponse>> {
        return authAPI.post('auth/signin', signInData)
    }
}
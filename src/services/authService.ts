import api from "@/services/api";
import { LoginInput } from "@/schemas/loginSchema";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";

interface JwtPayload {
    exp: number;
    [key: string]: any;
}

export const AuthService = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    logout: () => localStorage.removeItem(TOKEN_KEY),
    isTokenExpired: (): boolean => {
        const token = AuthService.getToken();
        if (!token) return true;

        try {
            const { exp } = jwtDecode<JwtPayload>(token);
            const now = Date.now() / 1000;
            return exp < now;
        } catch {
            return true;
        }
    },
};

export async function loginUser(data: LoginInput): Promise<string> {
    try {
        const response = await api.post("/auth/login", data);
        const token = response.data.accessToken || response.data.token;

        if (!token) {
            throw new Error("Token não retornado.");
        }

        localStorage.setItem(TOKEN_KEY, token);
        return token;
    } catch (error: any) {
        const message = error.response?.data?.message || "Erro ao fazer login.";
        throw new Error(message);
    }
}

import api from "@/services/api";
import { LoginInput } from "@/schemas/loginSchema";
import { jwtDecode } from "jwt-decode";
import { RegisterInput } from "@/schemas/registerSchema";
import axios from "axios";
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
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 403) {
                const error = new Error("auth.error.accessDenied.title");
                (error as any).status = 403;
                (error as any).description =
                    "auth.error.accessDenied.description";
                throw error;
            }
        }
        throw err;
    }
}

export async function registerUser(data: RegisterInput): Promise<void> {
    try {
        await api.post("/auth/register", data);
    } catch (error: any) {
        const message = error.response.data;
        throw new Error(message);
    }
}

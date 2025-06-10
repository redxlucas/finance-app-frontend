// hooks/useAuthUser.ts
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "@/services/authService";

interface JwtPayload {
    name: string;
    login: string;
    exp: number;
    [key: string]: any;
}

export function useAuthUser() {
    const token = AuthService.getToken();

    const user = useMemo(() => {
        if (!token || AuthService.isTokenExpired()) return null;

        try {
            return jwtDecode<JwtPayload>(token);
        } catch {
            return null;
        }
    }, [token]);

    return user;
}

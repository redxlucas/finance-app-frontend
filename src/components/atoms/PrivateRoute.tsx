import { AuthService } from "@/services/authService";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    if (AuthService.isTokenExpired()) {
        AuthService.logout();
        return <Navigate to="/login" />;
    }

    return children;
}

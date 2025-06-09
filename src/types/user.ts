export enum LanguagePreference {
    PT_BR = "PT_BR",
    EN_US = "EN_US",
}

export enum ThemePreference {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

export interface RegisterRequest {
    login: string;
    password: string;
    completeName: string;
    birthDate: string;
    languagePreference: LanguagePreference;
    themePreference: ThemePreference;
}

export interface RegisterResponse {
    token: string;
}

export interface ApiError {
    message: string;
    errors?: { [key: string]: string };
}

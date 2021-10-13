import { AuthConfig } from "./modules/auth/configuration/auth-config";

export class AppConfig {
    public apiUrl: string = 'https://localhost:44383';
    public AuthConfig: AuthConfig = new AuthConfig({
        loginUrl: '/login',
        notAuthorizedUrl: '/not-authorized',
        authorizationUrl: '/api/users/login',
        identifierFieldName: 'username',
        passwordFieldName: 'password',
    });
}

export const AppConfigInstance = new AppConfig()
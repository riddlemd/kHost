export class AuthConfig {
    loginUrl: string = '';

    notAuthorizedUrl: string = '/not-authorized';

    authorizationUrl: string = '/api/login';

    identifierFieldName: string = 'username';

    passwordFieldName: string = 'password';

    constructor(init?:Partial<AuthConfig>) {
        Object.assign(this, init);
    }
}
import { AuthUser } from "../modules/auth/models/AuthUser";

export class User implements AuthUser {
    
    constructor(
        public username: string,
        public accessKey: string
    ) {

    }
}
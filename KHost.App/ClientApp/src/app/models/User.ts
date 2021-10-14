import { AuthUser } from "../modules/auth/models/AuthUser";

export class User implements AuthUser {

    username: string

    accessKey: string

    constructor({
        username,
        accessKey
    }: parameters) {
        this.username = username;
        this.accessKey = accessKey;
    }
}

interface parameters {
    username: string,
    accessKey: string
}
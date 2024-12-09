export class LoginModel {
    public email: string;
    public password: string;
    public rememberMe: boolean;

    constructor(email: string, password: string, remmeberMe: boolean) {
        this.email = email;
        this.password = password;
        this.rememberMe = remmeberMe;
    }
}

export class RegisterModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public repeatPassword: string;

    constructor(firstName: string, lastName: string, email: string, password: string, repeatPassword: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
    }
}

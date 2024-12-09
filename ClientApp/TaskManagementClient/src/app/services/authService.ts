import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../../constants";
import { Response } from "../models/response";
import { RegisterModel } from "../models/auth/out/registerModel";
import { LoginModel } from "../models/auth/out/loginModel";

const baseUrl = `${Constants.baseUrl}/auth`;

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    public register(registerModel: RegisterModel) {
        return this.httpClient.post<Response>(`${baseUrl}/register`, registerModel);
    }

    public logIn(loginModel: LoginModel) {
        return this.httpClient.post<Response>(`${baseUrl}/login`, loginModel);
    }

    public signOut() {
        return this.httpClient.get(`${baseUrl}/logout`);
    }
}
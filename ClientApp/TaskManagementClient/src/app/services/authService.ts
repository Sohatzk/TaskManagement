import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "../models/response";
import { RegisterModel } from "../models/auth/out/registerModel";
import { LoginModel } from "../models/auth/out/loginModel";
import { environment } from "../../environments/environment";

const baseUrl = `${environment.apiUrl}/auth`;

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

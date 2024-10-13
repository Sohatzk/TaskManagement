import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Constants } from "../../constants";
import { UserClaim } from "../models/auth/in/userClaim";
import { Response } from "../models/response";
import { RegisterModel } from "../models/auth/out/registerModel";

const baseUrl = `${Constants.baseUrl}/auth`;

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    public register(registerModel: RegisterModel) {
        return this.httpClient.post<Response>(
            `${baseUrl}/register`, registerModel);
    }

    public logIn(email: string, password: string) {
        return this.httpClient.post<Response>(
            `${baseUrl}/login`,
            {
                email: email,
                password: password
            });
    }

    public signOut() {
        return this.httpClient.get(`${baseUrl}/logout`);
    }

    public isLoggedIn(): Observable<boolean> {
        return this.user().pipe(
            map((userClaims) => {
                const hasClaims = userClaims.length > 0;
                return !hasClaims ? false : true;
            }),
            catchError((_error) => {
                return of(false);
            }));
    }

    public user() {
        return this.httpClient.get<UserClaim[]>(`${baseUrl}/user`);
    }
}
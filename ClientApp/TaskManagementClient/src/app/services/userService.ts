import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/users/in/user";
import { Observable } from "rxjs";
import { Constants } from "../../constants";

const baseUrl = `${Constants.baseUrl}/user`;

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(baseUrl);
    }
}
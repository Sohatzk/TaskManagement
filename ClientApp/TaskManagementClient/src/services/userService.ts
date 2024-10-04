import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../app/models/users/in/user";
import { Observable } from "rxjs";

const baseUrl = 'https://localhost:44385/api/user'

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(baseUrl)
    }
}
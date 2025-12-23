import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

const baseUrl = `${environment.apiUrl}/stress`;

@Injectable({ providedIn: 'root' })
export class StressService {
    constructor(private httpClient: HttpClient) {
    }

    public stress(): Observable<void> {
        return this.httpClient.get<void>(baseUrl);
    }
}
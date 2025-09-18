import { Constants } from "../../constants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WorkItemGridModel } from "../models/workItems/in/workItemGridModel";

const baseUrl = `${Constants.baseUrl}/workItem`;

@Injectable({providedIn: 'root'})
export class WorkItemService {
  constructor(private httpClient: HttpClient) { }

  public getWorkItems(): Observable<WorkItemGridModel[]> {
    return this.httpClient.get<WorkItemGridModel[]>(baseUrl);
  }
}

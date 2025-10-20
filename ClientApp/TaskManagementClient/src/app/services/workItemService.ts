import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WorkItemGridModel } from "../models/workItems/in/workItemGridModel";
import { Guid } from "guid-typescript";
import { WorkItemModel } from "../models/workItems/in/workItemModel";
import { environment } from "../../environments/environment";

const baseUrl = `${environment.apiUrl}/workItem`;

@Injectable({providedIn: 'root'})
export class WorkItemService {
  constructor(private httpClient: HttpClient) {
  }

  public getWorkItems(): Observable<WorkItemGridModel[]> {
    return this.httpClient.get<WorkItemGridModel[]>(baseUrl);
  }

  public getWorkItemById(id: Guid): Observable<WorkItemModel> {
    return this.httpClient.get<WorkItemModel>(baseUrl + `/${id}`);
  }

  public createWorkItem(workItem: WorkItemModel): Observable<Guid> {
    return this.httpClient.post<Guid>(baseUrl + '/create', workItem);
  }

  public updateWorkItem(workItem: WorkItemModel): Observable<void> {
    return this.httpClient.put<void>(baseUrl, workItem);
  }

  public deleteWorkItems(ids: Guid[]): Observable<void> {
    return this.httpClient.delete<void>(baseUrl, { body: ids });
  }
}

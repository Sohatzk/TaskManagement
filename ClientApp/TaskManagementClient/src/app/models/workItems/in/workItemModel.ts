import { Guid } from "guid-typescript";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";
import { WorkItemType } from "../../../shared/enums/workItemType";

export class WorkItemModel {
  id: Guid|null;
  workItemNumber: number;
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  userId: Guid|null;
  type: WorkItemType
  status: WorkItemStatus;
  createdAt: Date|null;
  updatedAt: Date|null;
  priority: number;
  severity: number;

  constructor() {
    this.id = null;
    this.workItemNumber = 0;
    this.title = '';
    this.description = '';
    this.firstName = '';
    this.lastName = '';
    this.userId = null;
    this.type = WorkItemType.Bug;
    this.status = WorkItemStatus.New;
    this.createdAt = null;
    this.updatedAt = null;
    this.priority = 0;
    this.severity = 0;
  }
}

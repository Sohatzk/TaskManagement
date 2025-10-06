import { Guid } from "guid-typescript";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";
import { WorkItemType } from "../../../shared/enums/workItemType";
export interface WorkItemGridModel {
  id: Guid;
  workItemNumber: number;
  title: string;
  firstName: string;
  lastName: string;
  type: WorkItemType;
  status: WorkItemStatus;
  updatedAt: Date;
}

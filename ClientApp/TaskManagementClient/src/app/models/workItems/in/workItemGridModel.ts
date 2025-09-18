import { Guid } from "guid-typescript";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";
export interface WorkItemGridModel {
  id: Guid;
  title: string;
  firstName: string;
  lastName: string;
  workItemStatus: WorkItemStatus;
  updatedAt: Date;
}

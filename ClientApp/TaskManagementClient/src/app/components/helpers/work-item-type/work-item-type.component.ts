import { Component, Input } from '@angular/core';
import { WorkItemType } from "../../../shared/enums/workItemType";
import { faBug, faSquareCheck, faTicket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work-item-type',
  templateUrl: './work-item-type.component.html',
  styleUrl: './work-item-type.component.css',
  standalone: false
})
export class WorkItemTypeComponent {
  @Input() workItemType!: WorkItemType;
  protected faBug = faBug;
  protected faSquareCheck = faSquareCheck;
  protected faTicket = faTicket;
  protected readonly WorkItemType = WorkItemType;
}

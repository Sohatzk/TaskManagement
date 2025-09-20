import { Component, inject, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { WorkItemGridModel } from "../../../models/workItems/in/workItemGridModel";
import { WorkItemService } from "../../../services/workItemService";
import { Dialog } from "@angular/cdk/dialog"
import { WorkItemComponent } from "../work-item/work-item.component";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";

@Component({
  selector: 'app-work-item-grid',
  templateUrl: './work-item-grid.component.html',
  styleUrl: './work-item-grid.component.css',
  standalone: false
})
export class WorkItemGridComponent implements OnInit {
  private dialog = inject(Dialog);
  workItems: WorkItemGridModel[] = [];
  selectedWorkItems: Guid[] = [];
  constructor(private workItemService: WorkItemService) { }

  ngOnInit(): void {
    this.getWorkItems();
  }

  getWorkItems(): void {
    this.workItemService.getWorkItems().subscribe({
      next: (response) => {
        this.workItems = response;
      },
      error: (err) => {
        console.error();
      },
    });
  }

  selectWorkItem(id: Guid): void {
    if (this.selectedWorkItems.includes(id)) {
      this.selectedWorkItems = this.selectedWorkItems.filter(itemId => itemId !== id);
      return;
    }

    this.selectedWorkItems.push(id);
  }

  selectAllWorkItems() : void {
    if (this.selectedWorkItems.length === this.workItems.length) {
      this.selectedWorkItems = [];
      return;
    }

    this.selectedWorkItems = this.workItems.map(item => item.id);
  }

  editWorkItem(id: Guid, event: Event) : void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(WorkItemComponent, { disableClose: true });
  }

  getStatusClass(status: WorkItemStatus): string {
    switch (status) {
      case WorkItemStatus.InProgress:
        return 'in-progress-status';
      case WorkItemStatus.Resolved:
        return 'resolved-status';
      case WorkItemStatus.Closed:
        return 'closed-status';
      case WorkItemStatus.Unresolved:
        return 'unresolved-status';
      default:
        return '';
    }
  }

  getStatusText(status: WorkItemStatus): string {
    switch (status) {
      case WorkItemStatus.New:
        return 'New';
      case WorkItemStatus.InProgress:
        return 'In Progress';
      case WorkItemStatus.Resolved:
        return 'Resolved';
      case WorkItemStatus.Closed:
        return 'Closed';
      case WorkItemStatus.Unresolved:
        return 'Unresolved';
      default:
        return '';
    }
  }
}

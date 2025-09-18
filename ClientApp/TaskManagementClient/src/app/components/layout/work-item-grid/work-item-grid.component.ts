import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { WorkItemGridModel } from "../../../models/workItems/in/workItemGridModel";
import { WorkItemService } from "../../../services/workItemService";

@Component({
  selector: 'app-work-item-grid',
  templateUrl: './work-item-grid.component.html',
  styleUrl: './work-item-grid.component.css',
  standalone: false
})
export class WorkItemGridComponent implements OnInit {
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

  editWorkItem(id: Guid, event: Event) {
    event.stopPropagation();
  }
}

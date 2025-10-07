import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UserService } from "../../../services/userService";
import { User } from "../../../models/users/in/user";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogRef } from "@angular/cdk/dialog";
import { WorkItemService } from "../../../services/workItemService";
import { Guid } from "guid-typescript";
import { WorkItemModel } from "../../../models/workItems/in/workItemModel";
import { WorkItemType } from "../../../shared/enums/workItemType";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";
import { finalize } from "rxjs";

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.css',
  standalone: false
})
export class WorkItemComponent implements OnInit {
  protected workItem!: WorkItemModel;
  protected users: User[] = [];
  protected faXmark = faXmark;
  protected isLoading: boolean = false;
  protected workItemForm!: FormGroup;

  constructor(
    private userService: UserService,
    private workItemService: WorkItemService,
    @Inject(MAT_DIALOG_DATA) protected data: { isEditMode: boolean, workItemId: Guid|null },
    @Optional() private dialogRef: DialogRef<any, any> | null,
    private fb: FormBuilder) {
    this.workItem = new WorkItemModel();
  }

  async ngOnInit() {
    this.isLoading = true;

    this.getUsers();

    this.workItemForm = this.fb.group({
      title: [this.workItem.title, [Validators.required]],
      workItemType: [this.workItem.type],
      workItemStatus: [this.workItem.status],
      userId: [this.workItem.userId],
      priority: [this.workItem.priority],
      severity: [this.workItem.severity],
      description: [this.workItem.description]
    });

    if (this.data.workItemId) {
      this.getWorkItem(this.data.workItemId)
    }

    this.workItemForm.get('title')?.valueChanges.subscribe(title => {
      this.changeWorkItemTitle(title);
    });

    this.workItemForm.get('workItemType')?.valueChanges.subscribe(type => {
      this.changeWorkItemType(type);
    });

    this.workItemForm.get('workItemStatus')?.valueChanges.subscribe(status => {
      this.changeWorkItemStatus(status);
    });

    this.workItemForm.get('userId')?.valueChanges.subscribe(userId => {
      this.changeAssignedUser(userId);
    });

    this.workItemForm.get('priority')?.valueChanges.subscribe(priority => {
      this.changePriority(priority);
    });

    this.workItemForm.get('severity')?.valueChanges.subscribe(severity => {
      this.changeSeverity(severity);
    });

    this.workItemForm.get('description')?.valueChanges.subscribe(description => {
      this.changeDescription(description);
    });

    this.isLoading = false;
  }

  private getWorkItem(workItemId: Guid): void {
    this.workItemService.getWorkItemById(workItemId).subscribe(workItem => {
      this.workItem = workItem;
      this.workItemForm.patchValue(
        {
          'title': this.workItem.title,
          'workItemType': this.workItem.type,
          'workItemStatus': this.workItem.status,
          'userId': this.workItem.userId,
          'priority': this.workItem.priority,
          'severity': this.workItem.severity,
          'description': this.workItem.description
        });
    });
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  protected get workItemTitle(): string {
    switch (this.workItem.type) {
      case WorkItemType.Bug:
        return 'Bug';
      case WorkItemType.UserStory:
        return 'User Story';
      case WorkItemType.Task:
        return 'Task';
      default:
        return '';
    }
  }

  protected close() {
    this.dialogRef?.close();
  }

  protected changeWorkItemTitle(title: string) {
    this.workItem.title = title;
  }

  protected changeWorkItemType(type: WorkItemType) {
    this.workItem.type = type;
  }

  protected changeWorkItemStatus(status: WorkItemStatus) {
    this.workItem.status = status;
  }

  protected changeAssignedUser(userId: Guid) {
    this.workItem.userId = userId;
  }

  protected changePriority(priority: number) {
    this.workItem.priority = priority;
  }

  protected changeSeverity(severity: number) {
    this.workItem.severity = severity;
  }

  protected changeDescription(description: string) {
    this.workItem.description = description;
  }

  protected onSaveClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.workItemForm?.invalid) {
      this.workItemForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    if (this.data.isEditMode) {
      this.workItemService.updateWorkItem(this.workItem).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          this.close();
        },
        error: err => {
          console.error('Update failed', err);
        }
      });
    } else {
      this.workItemService.createWorkItem(this.workItem).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (_) => {
          this.close();
        },
        error: err => {
          console.error('Create failed', err);
        }
      });
    }
  }

  protected readonly WorkItemType = WorkItemType;
  protected readonly WorkItemStatus = WorkItemStatus;
}

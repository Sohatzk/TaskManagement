import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { WorkItemGridModel } from "../../../models/workItems/in/workItemGridModel";
import { WorkItemService } from "../../../services/workItemService";
import { WorkItemComponent } from "../work-item/work-item.component";
import { WorkItemStatus } from "../../../shared/enums/workItemStatus";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorkItemType } from "../../../shared/enums/workItemType";
import { ConfirmationModalComponent } from "../../helpers/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-work-item-grid',
  templateUrl: './work-item-grid.component.html',
  styleUrl: './work-item-grid.component.css',
  standalone: false
})
export class WorkItemGridComponent implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;
  private dialog = inject(MatDialog);
  private currentDialogRef: MatDialogRef<WorkItemComponent>|null = null;
  protected workItems: WorkItemGridModel[] = [];
  protected selectedWorkItems: Guid[] = [];
  protected workItemForm!: FormGroup;
  protected isLoading: boolean = false;
  constructor(
    private workItemService: WorkItemService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getWorkItems();

    this.queryParamsSubscription = this.route.url.subscribe(() => {
      const isNewMode = this.route.snapshot.children.some(child =>
        child.url.some(s => s.path === 'new')
      );

      const workItemId = this.route.snapshot.queryParams['id'] as Guid;

      if (isNewMode) {
        this.openWorkItemModal(false);
      } else if (workItemId) {
        this.openWorkItemModal(true, workItemId);
      } else {
        this.closeWorkItemModal();
      }
    });

    this.workItemForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        type: [WorkItemType.Bug],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(10)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(10)]],
        rememberMe: [ false ]
      });
  }

  getWorkItems(): void {
    this.isLoading = true;
    this.workItemService.getWorkItems().subscribe({
      next: (response) => {
        this.workItems = response;
      },
      error: (err) => {
        console.error();
      },
    });
    this.isLoading = false;
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

  createWorkItemClicked(event: Event|null = null) : void {
    event?.preventDefault();
    event?.stopPropagation();

    const originalUrl = this.location.path();
    const newUrl = originalUrl + '/new';

    this.router.navigate(['new'], {
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    })
      .then(() => {
        this.openWorkItemModal(false);
      })
      .catch(err => {
        console.error("Navigation error:", err);
      });
  }


  editWorkItemClicked(id: Guid, event: Event|null = null) : void {
    event?.preventDefault();
    event?.stopPropagation();

    this.router.navigate([], {
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    })
      .then(() => {
        this.openWorkItemModal(true, id);
      })
      .catch(err => {
        console.error("Navigation error:", err);
      });
  }

  openWorkItemModal(isEditMode: boolean, id: Guid|null = null): void {
    if (!this.dialog.openDialogs.length) {
      this.currentDialogRef = this.dialog.open(WorkItemComponent, {
        disableClose: true,
        data: { isEditMode: isEditMode, workItemId: id }
      });

      this.currentDialogRef.afterClosed().subscribe(() => {
        this.cleanUrl(isEditMode);
        this.getWorkItems();
      });
    }
  }
  cleanUrl(isEditMode: boolean): void {
    if (isEditMode) {
      this.router.navigate([], {
        queryParams: { id: null },
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['../'], {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });
    }
  }
  closeWorkItemModal(): void {
    this.currentDialogRef?.close();
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

  protected onDeleteSelectedClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedWorkItems.length === 0) {
      return;
    }

    this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      data: {
        title: 'Delete Work Items',
        message: `Are you sure you want to delete the selected work items?`
      }
    }).afterClosed().subscribe((isOk) => {
      if (isOk) {
        this.deleteSelectedWorkItems();
      }
    });
  }


  private deleteSelectedWorkItems(): void {
    this.isLoading = true;

    this.workItemService.deleteWorkItems(this.selectedWorkItems).subscribe({
      next: () => {
        this.selectedWorkItems = [];
        this.getWorkItems();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }

    this.closeWorkItemModal();
  }
}

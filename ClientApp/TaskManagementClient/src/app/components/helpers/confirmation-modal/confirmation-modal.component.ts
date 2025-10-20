import { Component, Inject, Optional } from '@angular/core';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
  standalone: false
})
export class ConfirmationModalComponent {
  protected readonly faXmark = faXmark;

  constructor(
    @Optional() private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: { title: string, message: string }) { }

  protected close(isOk: boolean, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close(isOk);
  }
}

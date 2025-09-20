import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UserService } from "../../../services/userService";
import { User } from "../../../models/users/in/user";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
  standalone: false
})
export class WorkItemComponent implements OnInit {
  assignedTo = new FormControl('');
  search = new FormControl('');
  users: User[] = [];
  faXmark = faXmark;
  private dialogRef = inject(DialogRef, { optional: true });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  protected close() {
    this.dialogRef?.close();
  }
}

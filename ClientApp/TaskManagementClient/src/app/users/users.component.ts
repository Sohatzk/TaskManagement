import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../models/users/in/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error('Error fetching users', err);
      },
    });
  }
}

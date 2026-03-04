import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  ngOnInit(): void {
    // TODO: Load users from API
    this.users = [];
  }
}
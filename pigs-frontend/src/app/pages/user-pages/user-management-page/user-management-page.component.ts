import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent {

  selectedUser: CurrentUser = {
    email: "",
    password: "",
    contactInfo: { address: "", fullName: "", phoneNumber: 0 },
    name: "",
    id: "",
    photoURL: "",
    profile: 'NONE',
    path: "users",
  }

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Employees'
    })
  }

  updateSelectedUser(user: CurrentUser) {
    this.selectedUser = user;
  }
}

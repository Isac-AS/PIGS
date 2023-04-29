import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { CurrentUser } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {

  @Output() selectedUserEmitter: any = new EventEmitter<any>()

  userList: CurrentUser[] = [];
  displayedColumns: string[] = ['selected', 'name', 'phoneNumber', 'profile', 'delete']
  dataSource: MatTableDataSource<CurrentUser>;

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

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private database: DatabaseService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.userList);
    this.fetchUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchUsers() {
    this.database.readCollection<CurrentUser>("users").subscribe({
      next: (users) => {
        console.log("[DEBUG] - Users collection")
        console.log(users)
        this.userList = users;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(user_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deletePipeline(user_id)
        }
        console.log(result)
      }
    )
  }

  deletePipeline(user_id: string) {
    this.database.deleteDocument("users", user_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchUsers();
  }

  emitUser(user: CurrentUser) {
    this.selectedUserEmitter.emit(user)
  }

}

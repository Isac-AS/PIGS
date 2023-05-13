import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Menu } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {

  @Output() selectedMenuEmitter: any = new EventEmitter<any>()

  menuList: Menu[] = [];
  displayedColumns: string[] = ['selected', 'name', 'price', 'delete']
  dataSource: MatTableDataSource<Menu>;

  selectedMenu: Menu = {
    name: "",
    dishes: [],
    path: "menus",
    id: ""
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
    this.dataSource = new MatTableDataSource(this.menuList);
    this.fetchMenus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchMenus() {
    this.database.readCollection<Menu>("menus").subscribe({
      next: (menus) => {
        console.log("[DEBUG] - Menus collection")
        console.log(menus)
        this.menuList = menus;
        this.dataSource = new MatTableDataSource(this.menuList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(menu_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteMenu(menu_id)
        }
        console.log(result)
      }
    )
  }

  deleteMenu(menu_id: string) {
    this.database.deleteDocument("menus", menu_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchMenus();
  }

  emitMenu(menu: Menu) {
    this.selectedMenuEmitter.emit(menu)
  }

}

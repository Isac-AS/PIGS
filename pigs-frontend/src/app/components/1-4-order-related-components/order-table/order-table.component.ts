import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Order } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {

  @Output() selectedOrderEmitter: any = new EventEmitter<any>()

  OrderList: Order[] = [];
  displayedColumns: string[] = ['selected', 'name', 'price', 'delete']
  dataSource: MatTableDataSource<Order>;

  selectedOrder: Order = {
    dishes: [],
    menus: [],
    price: 0,
    path: "orders",
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
    this.dataSource = new MatTableDataSource(this.OrderList);
    this.fetchOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchOrders() {
    this.database.readCollection<Order>("orders").subscribe({
      next: (Orders) => {
        console.log("[DEBUG] - Orders collection")
        console.log(Orders)
        this.OrderList = Orders;
        this.dataSource = new MatTableDataSource(this.OrderList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(Order_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteOrder(Order_id)
        }
        console.log(result)
      }
    )
  }

  deleteOrder(Order_id: string) {
    this.database.deleteDocument("orders", Order_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchOrders();
  }

  emitOrder(Order: Order) {
    this.selectedOrderEmitter.emit(Order)
  }

}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AuxItem } from 'src/app/models/stock.model';

@Component({
  selector: 'app-aux-Item-table',
  templateUrl: './aux-Items-table.component.html',
  styleUrls: ['./aux-Items-table.component.scss']
})
export class AuxItemTableComponent {

  @Output() selectedAuxItemEmitter: any = new EventEmitter<any>()

  auxItemList: AuxItem[] = [];
  displayedColumns: string[] = ['selected', 'name', 'quantity', 'delete']
  dataSource: MatTableDataSource<AuxItem>;

  selectedAuxItem: AuxItem = {
    name: "",
    quantity: 0,
    minThreshold: 0,
    maxThreshold: 0,
    path: "auxItems",
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
    this.dataSource = new MatTableDataSource(this.auxItemList);
    this.fetchAuxItems();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAuxItems() {
    this.database.readCollection<AuxItem>("auxItems").subscribe({
      next: (auxItems) => {
        console.log("[DEBUG] - [AUX ITEM TABLE COMPONENT] - AuxItems collection:")
        console.log(auxItems)
        this.auxItemList = auxItems;
        this.dataSource = new MatTableDataSource(this.auxItemList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(auxItem_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteAuxItem(auxItem_id)
        }
        console.log(result)
      }
    )
  }

  deleteAuxItem(auxItem_id: string) {
    console.log("[DEBUG] - [INGREDIENT TABLE COMPONENT] - Attempting to delete:")
    console.log(auxItem_id)
    this.database.deleteDocument("auxItems", auxItem_id).catch(
      (error) => {
        console.log(error)
      })
  }

  emitAuxItem(auxItem: AuxItem) {
    this.selectedAuxItemEmitter.emit(auxItem)
  }

}

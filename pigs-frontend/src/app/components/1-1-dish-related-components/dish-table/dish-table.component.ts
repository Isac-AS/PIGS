import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Dish } from 'src/app/models/stock.model';

@Component({
  selector: 'app-dish-table',
  templateUrl: './dish-table.component.html',
  styleUrls: ['./dish-table.component.scss']
})
export class DishTableComponent {

  @Output() selectedDishEmitter: any = new EventEmitter<any>()

  dishList: Dish[] = [];
  displayedColumns: string[] = ['selected', 'name', 'price', 'delete']
  dataSource: MatTableDataSource<Dish>;

  selectedDish: Dish = {
    name: "",
    ingredients: [],
    path: "dishes",
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
    this.dataSource = new MatTableDataSource(this.dishList);
    this.fetchDishs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchDishs() {
    this.database.readCollection<Dish>("dishes").subscribe({
      next: (dishs) => {
        console.log("[DEBUG] - Dishes collection")
        console.log(dishs)
        this.dishList = dishs;
        this.dataSource = new MatTableDataSource(this.dishList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(dish_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteDish(dish_id)
        }
        console.log(result)
      }
    )
  }

  deleteDish(dish_id: string) {
    this.database.deleteDocument("dishes", dish_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchDishs();
  }

  emitDish(dish: Dish) {
    this.selectedDishEmitter.emit(dish)
  }

}

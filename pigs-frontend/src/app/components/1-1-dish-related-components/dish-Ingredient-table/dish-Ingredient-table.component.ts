import { Component, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { DishIngredient, Ingredient } from 'src/app/models/stock.model';

@Component({
  selector: 'app-dish-Ingredient-table',
  templateUrl: './dish-Ingredient-table.component.html',
  styleUrls: ['./dish-Ingredient-table.component.scss']
})
export class DishIngredientTableComponent implements OnChanges {


  @Output() selectedDishIngredientEmitter: any = new EventEmitter<any>()
  @Output() deleteDishIngredientEmitter: any = new EventEmitter<any>()

  dishIngredientList: DishIngredient[] = [];
  displayedColumns: string[] = ['selected', 'name', 'amount', 'delete']
  dataSource: MatTableDataSource<DishIngredient>;

  ingredient: Ingredient = {
    name: "",
    quantity: 0,
    maxThreshold: 0,
    minThreshold: 0,
    path: "ingredients",
    id: ""
  }

  selectedDishIngredient: DishIngredient = {
    ingredient: this.ingredient,
    amount: 0
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.dishIngredientList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dishIngredientList = changes['dishIngredientList'].currentValue;
    this.dataSource = new MatTableDataSource(this.dishIngredientList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeletionDialog(dishIngredient: DishIngredient) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteDishIngredient(dishIngredient)
        }
        console.log(result)
      }
    )
  }

  deleteDishIngredient(dishIngredient: DishIngredient) {
    this.deleteDishIngredientEmitter.emit(dishIngredient);
  }

  emitDishIngredient(dishIngredient: DishIngredient) {
    this.selectedDishIngredientEmitter.emit(dishIngredient);
  }

}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Ingredient } from 'src/app/models/stock.model';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss']
})
export class IngredientTableComponent {

  @Output() selectedIngredientEmitter: any = new EventEmitter<any>()

  ingredientList: Ingredient[] = [];
  displayedColumns: string[] = ['selected', 'name', 'quantity', 'delete']
  dataSource: MatTableDataSource<Ingredient>;

  selectedIngredient: Ingredient = {
    name: "",
    quantity: 0,
    minThreshold: 0,
    maxThreshold: 0,
    path: "ingredients"
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
    this.dataSource = new MatTableDataSource(this.ingredientList);
    this.fetchIngredients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchIngredients() {
    this.database.readCollection<Ingredient>("ingredients").subscribe({
      next: (ingredients) => {
        console.log("[DEBUG] - Ingredients collection")
        console.log(ingredients)
        this.ingredientList = ingredients;
        this.dataSource = new MatTableDataSource(this.ingredientList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(ingredient_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteIngredient(ingredient_id)
        }
        console.log(result)
      }
    )
  }

  deleteIngredient(ingredient_id: string) {
    this.database.deleteDocument("ingredients", ingredient_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchIngredients();
  }

  emitIngredient(ingredient: Ingredient) {
    this.selectedIngredientEmitter.emit(ingredient)
  }

}

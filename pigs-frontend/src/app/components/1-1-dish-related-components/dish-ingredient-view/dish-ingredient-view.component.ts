import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishIngredient } from 'src/app/models/stock.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-ingredient-view',
  templateUrl: './dish-ingredient-view.component.html',
  styleUrls: ['./dish-ingredient-view.component.scss']
})
export class DishIngredientViewComponent implements OnChanges {

  @Input() selectedDishIngredient!: DishIngredient;
  @Output() saveDishIngredientEmitter: any = new EventEmitter<any>()

  amountForm = this.fb.group({
    amount: [0, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedDishIngredient: DishIngredient = changes['selectedDishIngredient'].currentValue;
    if (updatedDishIngredient.amount > 0) {
      this.amountForm.setValue({
        amount: updatedDishIngredient.amount
      })
    }
  }

  emitCurrentDishIngredient() {
    this.selectedDishIngredient.amount = this.amountForm.value.amount!;
    this.saveDishIngredientEmitter.emit(this.selectedDishIngredient);
  }

}

import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuxItem } from 'src/app/models/stock.model';

@Component({
  selector: 'app-aux-Item-modification',
  templateUrl: './aux-Items-modification.component.html',
  styleUrls: ['./aux-Items-modification.component.scss']
})
export class AuxItemModificationComponent {

  @Input() selectedAuxItem!: AuxItem;

  auxItemForm = this.fb.group({
    name: ["", Validators.required],
    quantity: [0, Validators.required],
    minThreshold: [0, Validators.required],
    maxThreshold: [0, Validators.required],
  })

  auxItem: AuxItem = {
    name: "",
    quantity: 0,
    maxThreshold: 0,
    minThreshold: 0,
    path: "auxItems",
    id: ""
  }

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) { }

  async submit() {
    this.auxItem.name = this.auxItemForm.value.name!;
    this.auxItem.quantity = this.auxItemForm.value.quantity!;
    this.auxItem.minThreshold = this.auxItemForm.value.minThreshold!;
    this.auxItem.maxThreshold = this.auxItemForm.value.maxThreshold!;

    let promise = this.db.updateDocument(this.auxItem, this.auxItem.path, this.auxItem.id);
    promise.then((_) => {
      this._snackBar.open("AuxItem modified successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during auxItem modification, try later.", "Continue", { duration: 5000 });
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    let updatedAuxItem: AuxItem = changes['selectedAuxItem'].currentValue;
    this.auxItem = updatedAuxItem;
    if (updatedAuxItem) {
      this.auxItemForm.setValue({
        name: updatedAuxItem.name,
        quantity: updatedAuxItem.quantity,
        minThreshold: updatedAuxItem.minThreshold,
        maxThreshold: updatedAuxItem.maxThreshold,
      })
    }
  }
}

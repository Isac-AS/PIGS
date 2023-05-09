import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuxItem } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-aux-page',
  templateUrl: './add-aux-page.component.html',
  styleUrls: ['./add-aux-page.component.scss']
})
export class AddAuxPageComponent {

  auxItemForm = this.fb.group({
    name: ["", Validators.required],
    quantity: [null, Validators.required],
    minThreshold: [null, Validators.required],
    maxThreshold: [null, Validators.required],
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
    public globalService: GlobalService,
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Auxiliary Item'
    })
  }

  submit() {
    this.auxItem.name = this.auxItemForm.value.name!;
    this.auxItem.quantity = this.auxItemForm.value.quantity!;
    this.auxItem.minThreshold = this.auxItemForm.value.minThreshold!;
    this.auxItem.maxThreshold = this.auxItemForm.value.maxThreshold!;
    this.auxItem.id = this.db.createId()

    let promise = this.db.createDocument(this.auxItem, this.auxItem.path, this.auxItem.id);
    promise.then((_) => {
      this._snackBar.open("Aux Item added successfully!", "Continue", { duration: 5000 });
      this.clearForm();
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during auxItem addition, try later.", "Continue", { duration: 5000 });
    })
  }

  clearForm() {
    this.auxItemForm.reset();
  }
}

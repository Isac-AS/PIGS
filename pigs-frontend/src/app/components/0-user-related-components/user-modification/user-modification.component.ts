import { Component, Input, SimpleChanges } from '@angular/core';
import { CurrentUser } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss']
})
export class UserModificationComponent {

  @Input() selectedUser!: CurrentUser;

  errorMessage: string = "";

  userForm = this.fb.group({
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    profile: [null, Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]],
    address: ["", Validators.required],
    fullName: ["", Validators.required],
    phoneNumber: [0, Validators.required],
  })

  possibleProfiles = [
    { name: 'Empleado', value: 'EMPLOYEE' },
    { name: 'Manager', value: 'MANAGER' }
  ]

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) { }

  async submit() {
    this.selectedUser.name = this.userForm.value.username!;
    this.selectedUser.password = this.userForm.value.password!;
    this.selectedUser.email = this.userForm.value.email!;
    this.selectedUser.profile = this.userForm.value.profile!;
    this.selectedUser.contactInfo.address = this.userForm.value.address!;
    this.selectedUser.contactInfo.fullName = this.userForm.value.fullName!;
    this.selectedUser.contactInfo.phoneNumber = this.userForm.value.phoneNumber!;

    this.db.updateDocument(this.selectedUser, "users", this.selectedUser.id)
    this._snackBar.open("¡User modified successfully!", "Continue", { duration: 5000 });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedUser: CurrentUser = changes['selectedUser'].currentValue;
    if (updatedUser.profile != "NONE") {
      this.userForm.setValue({
        username: updatedUser.name,
        address: updatedUser.contactInfo.address,
        email: updatedUser.email,
        fullName: updatedUser.contactInfo.fullName,
        password: updatedUser.password,
        phoneNumber: updatedUser.contactInfo.phoneNumber,
        profile: null
      })
    }
  }
}

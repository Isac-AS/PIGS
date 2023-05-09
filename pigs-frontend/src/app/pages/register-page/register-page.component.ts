import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CurrentUser } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  errorMessage: string = "";

  userForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    profile: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]],
    address: [null, Validators.required],
    fullName: [null, Validators.required],
    phoneNumber: [null, Validators.required],
  })

  possibleProfiles = [
    { name: 'Empleado', value: 'EMPLOYEE' },
    { name: 'Manager', value: 'MANAGER' }
  ]

  userData: CurrentUser = {
    email: "",
    password: "",
    contactInfo: { address: "", fullName: "", phoneNumber: 0 },
    name: "",
    id: "",
    photoURL: "",
    profile: 'NONE',
    path: "users",
  };

  invalidAnswerFromBackend: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Registrarse'
    })
    this.invalidAnswerFromBackend = false;
  }

  async register() {
    this.userData.name = this.userForm.value.username!;
    this.userData.password = this.userForm.value.password!;
    this.userData.email = this.userForm.value.email!;
    this.userData.profile = this.userForm.value.profile!;
    this.userData.contactInfo.address = this.userForm.value.address!;
    this.userData.contactInfo.fullName = this.userForm.value.fullName!;
    this.userData.contactInfo.phoneNumber = this.userForm.value.phoneNumber!;

    const res = await this.auth.register(this.userData).catch(error => {
      switch (error.code) {

        case "auth/email-already-in-use":
          this.errorMessage = "Error: El email introducido ya está en uso";
          break;

        case "auth/internal-error":
          this.errorMessage = "Error del sistema. Inténtelo de nuevo";
          break;

        default:
          this.errorMessage = "Error desconocido. Inténtelo de nuevo";
      }
    });

    if (res) {
      this.userData.id = res.user!.uid;
      console.log(res.user!.uid)
      await this.db.createDocument(this.userData, this.userData.path, this.userData.id);
      const login_res = await this.auth.login(this.userForm.value.email!, this.userForm.value.password!).catch()
      if (login_res) {
        this.auth.updateCurrentUserData();
        this._snackBar.open("User created successfully!", "Continue", { duration: 5000 });
        this.router.navigate(['/']);
      }
    } else {
      this._snackBar.open("Error during user creation", "Continue", { duration: 5000 });
    }
  }
}

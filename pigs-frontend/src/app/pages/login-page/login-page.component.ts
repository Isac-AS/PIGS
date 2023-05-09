import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  userForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  invalidAnswerFromBackend: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Iniciar sesión'
    })
    this.invalidAnswerFromBackend = false;
  }

  async login() {
    const res = await this.auth.login(this.userForm.value.email!, this.userForm.value.password!).catch(error => {
      alert("Nombre de usuario o contraseña incorrectos")
      this._snackBar.open("Error during login.", "Continue", { duration: 5000 });
    });
    if (res) {
      this.auth.updateCurrentUserData();
      this._snackBar.open("Logged in successfully!", "Continue", { duration: 3000 });
      this.router.navigate(['/']);
    }
  }
}

import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedInCondition = false;
  currentUserName = '';
  isDarkThemeActive = true;

  constructor(
    public globalService: GlobalService,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.loggedInCondition = newValue.isLoggedIn;
        this.currentUserName = newValue.user.name;
        console.log("[DEBUG] - LoggedInCondition: ", this.loggedInCondition, "\tCurrentUserName: ", this.currentUserName)
      }
    })
    this.globalService.darkThemeActive.subscribe({
      next: newValue => {
        this.isDarkThemeActive = newValue.isDarkThemeActive;
      }
    })
    this.auth.updateCurrentUserData();
  }

  async logOut() {
    const res = await this.auth.logout().catch(async error => {
      alert('Parece haber habido un problema. Inténtelo de nuevo.')
    }
    );
    this.globalService.resetUser();
    this._snackBar.open("¡Sesión cerrada con éxito!", "Continuar", { duration: 5000 });
    this.router.navigate(["/"])
  }
}

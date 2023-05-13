import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Provider } from 'src/app/models/provider.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-provider-page',
  templateUrl: './add-provider-page.component.html',
  styleUrls: ['./add-provider-page.component.scss']
})
export class AddProviderPageComponent {

  selectedProvider: Provider = {
    name: "",
    items: [],
    contactInfo: {
      address: "",
      fullName: "",
      phoneNumber: 0
    },
    path: 'providers',
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Provider'
    })
    this.selectedProvider.id = this.db.createId();
  }

  saveProvider(updatedProvider: Provider) {
    this.selectedProvider = updatedProvider;
    let promise = this.db.createDocument(this.selectedProvider, this.selectedProvider.path, this.selectedProvider.id);
    promise.then((_) => {
      this._snackBar.open("Provider added successfully!", "Continue", { duration: 5000 });
      this.router.navigate(['/manage_providers'])
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during Provider addition, try later.", "Continue", { duration: 5000 });
    })
  }
}

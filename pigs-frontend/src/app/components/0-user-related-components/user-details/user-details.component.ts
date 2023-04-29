import { Component, Input } from '@angular/core';
import { CurrentUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() selectedUser!: CurrentUser;

  constructor() { }
}

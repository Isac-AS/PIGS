import { Component, Input } from '@angular/core';
import { Menu } from 'src/app/models/stock.model';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent {

  @Input() selectedMenu!: Menu;

  constructor() { }
}

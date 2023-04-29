import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from './services/global.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface CRUD_ARRAY_ENTRY {
  title: string,
  routes: CRUD_ARRAY_ENTRY_ROUTES[],
}

export interface CRUD_ARRAY_ENTRY_ROUTES {
  route: string,
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TFG_frontend';
  currentPageName = '';
  currentLoggedProfile = 'NONE';

  CRUD_ARRAY: CRUD_ARRAY_ENTRY[] = [
    {
      title: "Menu", 
      routes: [
        {route: "/add_menu", name: "Add Menu"},
        {route: "/manage_menus", name: "Manage Menus"},
      ]
    },
    {
      title: "Dish", 
      routes: [
        {route: "/add_dish", name: "Add Dish"},
        {route: "/manage_dishes", name: "Manage Dishes"},
      ]
    },
    {
      title: "Ingredients", 
      routes: [
        {route: "/add_ingredient", name: "Add Ingredient"},
        {route: "/manage_ingredients", name: "Manage Ingredients"},
      ]
    },
    {
      title: "Aux Items", 
      routes: [
        {route: "/add_aux", name: "Add Items"},
        {route: "/manage_aux", name: "Manage Items"},
      ]
    },
    {
      title: "Providers", 
      routes: [
        {route: "/add_providers", name: "Add Provider"},
        {route: "/manage_providers", name: "Manage Provider"},
      ]
    },
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public globalService: GlobalService,
  ) {
    // Subscription to pageName. All pages must change the page name in their constructor
    this.globalService.pageName.subscribe({
      next: newValue => {
        this.currentPageName = newValue.currentPageName;
      }
    })
    
    // Subscription to global service as the service that will have the visibility information 
    // controlling what is seen by the user depending on the role and logged in status.
    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.currentLoggedProfile = newValue.user.profile;
      }
    })
    
  }
}

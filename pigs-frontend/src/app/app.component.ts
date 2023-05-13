import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from './services/global.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface CRUD_ARRAY_ENTRY {
  title: string;
  routes: CRUD_ARRAY_ENTRY_ROUTES[];
  icon: string;
}

export interface CRUD_ARRAY_ENTRY_ROUTES {
  route: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TFG_frontend';
  currentPageName = '';
  currentLoggedProfile = 'NONE';

  CRUD_ARRAY: CRUD_ARRAY_ENTRY[] = [
    {
      title: 'Menu',
      routes: [
        { route: '/add_menu', name: 'Add Menu', icon: 'add' },
        { route: '/manage_menus', name: 'Manage Menus', icon: 'food_bank' },
      ],
      icon: 'fastfood',
    },
    {
      title: 'Dish',
      routes: [
        { route: '/add_dish', name: 'Add Dish', icon: 'add' },
        {
          route: '/manage_dishes',
          name: 'Manage Dishes',
          icon: 'lunch_dining',
        },
      ],
      icon: 'restaurant_menu',
    },
    {
      title: 'Ingredients',
      routes: [
        { route: '/add_ingredient', name: 'Add Ingredient', icon: 'add' },
        {
          route: '/manage_ingredients',
          name: 'Manage Ingredients',
          icon: 'kitchen',
        },
      ],
      icon: 'egg',
    },
    {
      title: 'Aux Items',
      routes: [
        { route: '/add_aux', name: 'Add Items', icon: 'add' },
        { route: '/manage_aux', name: 'Manage Items', icon: 'mop' },
      ],
      icon: 'clean_hands',
    },
    {
      title: 'Providers',
      routes: [
        { route: '/add_providers', name: 'Add Provider', icon: 'add' },
        {
          route: '/manage_providers',
          name: 'Manage Provider',
          icon: 'shopping_cart',
        },
      ],
      icon: 'add_shopping_cart',
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public globalService: GlobalService
  ) {
    // Subscription to pageName. All pages must change the page name in their constructor
    this.globalService.pageName.subscribe({
      next: (newValue) => {
        this.currentPageName = newValue.currentPageName;
      },
    });

    // Subscription to global service as the service that will have the visibility information
    // controlling what is seen by the user depending on the role and logged in status.
    this.globalService.loggedInfo.subscribe({
      next: (newValue) => {
        this.currentLoggedProfile = newValue.user.profile;
      },
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';

// User related
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserManagementPageComponent } from './pages/user-pages/user-management-page/user-management-page.component';

// Order related
import { NewOrderPageComponent } from './pages/orders-related-pages/new-order-page/new-order-page.component';
import { PendingOrdersComponent } from './pages/orders-related-pages/pending-orders/pending-orders.component';

// Item related
import { AddMenuPageComponent } from './pages/menu-related-pages/add-menu-page/add-menu-page.component';
import { ManageMenuPageComponent } from './pages/menu-related-pages/manage-menu-page/manage-menu-page.component';
import { AddDishPageComponent } from './pages/dish-related-pages/add-dish-page/add-dish-page.component';
import { ManageDishesPageComponent } from './pages/dish-related-pages/manage-dishes-page/manage-dishes-page.component';
import { AddIngredientPageComponent } from './pages/ingredients-related-pages/add-ingredient-page/add-ingredient-page.component';
import { ManageIngredientsPageComponent } from './pages/ingredients-related-pages/manage-ingredients-page/manage-ingredients-page.component';
import { AddAuxPageComponent } from './pages/auxiliary-items-related-pages/add-aux-page/add-aux-page.component';
import { ManageAuxPageComponent } from './pages/auxiliary-items-related-pages/manage-aux-page/manage-aux-page.component';

// Provider related
import { AddProviderPageComponent } from './pages/provider-related-pages/add-provider-page/add-provider-page.component';
import { ManageProvidersPageComponent } from './pages/provider-related-pages/manage-providers-page/manage-providers-page.component';


const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "user_management",
    component: UserManagementPageComponent
  },
  {
    path: "add_order",
    component: NewOrderPageComponent
  },
  {
    path: "pending_orders",
    component: PendingOrdersComponent
  },
  {
    path: "add_menu",
    component: AddMenuPageComponent
  },
  {
    path: "manage_menus",
    component: ManageMenuPageComponent
  },
  {
    path: "add_dish",
    component: AddDishPageComponent
  },
  {
    path: "manage_dishes",
    component: ManageDishesPageComponent
  },
  {
    path: "add_ingredient",
    component: AddIngredientPageComponent
  },
  {
    path: "manage_ingredients",
    component: ManageIngredientsPageComponent
  },
  {
    path: "add_aux",
    component: AddAuxPageComponent
  },
  {
    path: "manage_aux",
    component: ManageAuxPageComponent
  },
  {
    path: "add_providers",
    component: AddProviderPageComponent
  },
  {
    path: "manage_providers",
    component: ManageProvidersPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

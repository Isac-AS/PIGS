// Basic imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material
import { CustomMaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';


//----------------------
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

//----------------------
// Dialogs
import { EntryDeletionDialogComponent } from './components/entry-deletion-dialog/entry-deletion-dialog.component';

// Services
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';

//----------------------
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

// User related
import { UserTableComponent } from './components/0-user-related-components/user-table/user-table.component';
import { UserDetailsComponent } from './components/0-user-related-components/user-details/user-details.component';
import { UserModificationComponent } from './components/0-user-related-components/user-modification/user-modification.component';

// Menu
import { MenuDetailsComponent } from './components/1-0-menu-related-components/menu-details/menu-details.component';
import { MenuModificationComponent } from './components/1-0-menu-related-components/menu-modification/menu-modification.component';
import { MenuTableComponent } from './components/1-0-menu-related-components/menu-table/menu-table.component';
import { MenuDishListComponent } from './components/1-0-menu-related-components/menu-dish-list/menu-dish-list.component';

// Dish
import { DishDetailsComponent } from './components/1-1-dish-related-components/dish-details/dish-details.component';
import { DishTableComponent } from './components/1-1-dish-related-components/dish-table/dish-table.component';
import { DishModificationComponent } from './components/1-1-dish-related-components/dish-modification/dish-modification.component';
import { DishIngredientTableComponent } from './components/1-1-dish-related-components/dish-Ingredient-table/dish-Ingredient-table.component';
import { DishIngredientViewComponent } from './components/1-1-dish-related-components/dish-ingredient-view/dish-ingredient-view.component';

// Ingredient
import { IngredientTableComponent } from './components/1-2-ingredient-related-components/ingredient-table/ingredient-table.component';
import { IngredientDetailsComponent } from './components/1-2-ingredient-related-components/ingredient-details/ingredient-details.component';
import { IngredientModificationComponent } from './components/1-2-ingredient-related-components/ingredient-modification/ingredient-modification.component';

// Aux Items
import { AuxItemTableComponent } from './components/1-3-aux-Items-related-components/aux-Items-table/aux-Items-table.component';
import { AuxItemModificationComponent } from './components/1-3-aux-Items-related-components/aux-Items-modification/aux-Items-modification.component';
import { AuxItemDetailsComponent } from './components/1-3-aux-Items-related-components/aux-Items-details/aux-Items-details.component';

// Order
import { OrderListComponent } from './components/1-4-order-related-components/order-list/order-list.component';
import { OrderModificationComponent } from './components/1-4-order-related-components/order-modification/order-modification.component';
import { OrderDetailsComponent } from './components/1-4-order-related-components/order-details/order-details.component';
import { OrderTableComponent } from './components/1-4-order-related-components/order-table/order-table.component';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemePickerComponent,
    UserTableComponent,
    UserDetailsComponent,
    UserModificationComponent,
    MenuDetailsComponent,
    MenuModificationComponent,
    MenuTableComponent,
    DishDetailsComponent,
    DishModificationComponent,
    DishTableComponent,
    IngredientDetailsComponent,
    IngredientModificationComponent,
    IngredientTableComponent,
    AuxItemTableComponent,
    AuxItemModificationComponent,
    AuxItemDetailsComponent,
    DishIngredientTableComponent,
    DishIngredientViewComponent,
    MenuDishListComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderModificationComponent,
    OrderTableComponent,

    // Pages
    HomePageComponent,
    
    // User related
    LoginPageComponent,
    RegisterPageComponent,
    UserManagementPageComponent,

    // Orders related
    NewOrderPageComponent,
    PendingOrdersComponent,

    // Item related
    AddMenuPageComponent,
    ManageMenuPageComponent,
    AddDishPageComponent,
    ManageDishesPageComponent,
    AddIngredientPageComponent,
    ManageIngredientsPageComponent,
    AddAuxPageComponent,
    ManageAuxPageComponent,

    // Provider related
    AddProviderPageComponent,
    ManageProvidersPageComponent,

    // Dialogs
    EntryDeletionDialogComponent,
    EntryDeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    CustomMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

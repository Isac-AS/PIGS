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

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

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


@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemePickerComponent,

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

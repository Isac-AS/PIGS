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

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

// Dialogs
import { EntryDeletionDialogComponent } from './components/entry-deletion-dialog/entry-deletion-dialog.component';

// Services
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
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

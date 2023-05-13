import { CurrentUser } from "../models/user.model";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from "./database.service";
import { GlobalService } from "./global.service";
import { reload } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminUid: string = '1QpnBzjOCYe6y4mAxU1I2yP47kl1';

  constructor(
    private authFirebase: AngularFireAuth,
    private database: DatabaseService,
    private globalService: GlobalService
  ) { }

  login(email: string, password: string) {
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.authFirebase.signOut();
  }

  register(data: CurrentUser) {
    return this.authFirebase.createUserWithEmailAndPassword(data.email, data.password);
  }

  userState() {
    return this.authFirebase.authState;
  }

  async getUid() {
    const user = await this.authFirebase.currentUser;
    if (user) {
      return user!.uid
    } else {
      return null;
    }
  }

  async isAdmin(): Promise<boolean> {
    const currentUserId = await this.getUid();
    return currentUserId === this.adminUid;
  }

  async updateCurrentUserData() {
    const currentUserId = await this.getUid();
    console.log("[DEBUG] - Updating Current User Data...\tCurrentUserId: ", currentUserId);
    if (currentUserId != null) {
      this.database.readDocument<CurrentUser>("users", currentUserId!).subscribe({
        next: res => {
          if (res) {
            this.globalService.updateUser(res);
          } else {
            this.globalService.resetUser();
          }
        }
      })
    } else {
      this.globalService.resetUser();
    }
  }
}

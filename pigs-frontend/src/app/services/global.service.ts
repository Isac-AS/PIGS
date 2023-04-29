import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CurrentUser, LoggedInfo } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public pageName = new BehaviorSubject<any>({
        currentPageName: 'Página principal'
    });

    public loggedInfo = new BehaviorSubject<LoggedInfo>(
        {
            user: {
                email: "",
                password: "",
                contactInfo: { address: "", fullName: "", phoneNumber: 0 },
                name: "",
                id: "",
                photoURL: "",
                profile: 'NONE',
                path: "users",
            },
            isLoggedIn: false
        }
    );

    public darkThemeActive = new BehaviorSubject<any>({
        isDarkThemeActive: true,
    });

    public resetUser() {
        console.log("[DEBUG] - Setting user to None...")
        this.loggedInfo.next(
            {
                user: {
                    email: "",
                    password: "",
                    contactInfo: { address: "", fullName: "", phoneNumber: 0 },
                    name: "",
                    id: "",
                    photoURL: "",
                    profile: 'NONE',
                    path: "users",
                },
                isLoggedIn: false
            }
        );
        console.log("[DEBUG] - User set to None!")
        return null;
    }

    public updateUser(user: CurrentUser) {
        console.log("[DEBUG] - Updating User Info...")
        this.loggedInfo.next(
            {
                user: {
                    email: user.name,
                    password: "",
                    contactInfo: user.contactInfo,
                    name: user.name,
                    id: user.id,
                    photoURL: user.photoURL,
                    profile: user.profile,
                    path: "users",
                },
                isLoggedIn: true
            }
        )
        console.log("[DEBUG] - User Info Updated!")
        return null;
    }
}
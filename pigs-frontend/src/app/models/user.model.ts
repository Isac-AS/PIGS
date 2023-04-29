export interface CurrentUser {
    email: string,
    password: string,
    contactInfo: ContactInfo,
    name: string,
    id: string,
    photoURL: string,
    profile: 'OWNER' | 'MANAGER' | 'EMPLOYEE' | 'NONE',
    path: "users",
}

export interface ContactInfo {
    fullName: string,
    phoneNumber: number,
    address: string,
}

export interface LoggedInfo {
    user: CurrentUser,
    isLoggedIn: boolean
}
import { ContactInfo } from "./user.model";

export interface Provider {
    name: string,
    contactInfo: ContactInfo
}
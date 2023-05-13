import { ContactInfo } from "./user.model";

export interface Provider {
    name: string,
    contactInfo: ContactInfo,
    items: any[],
    path: "providers",
    id: string
}
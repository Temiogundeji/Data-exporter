import { Document } from "mongoose";

export interface IOrganization extends Document {
    name: string,
    about?: string,
    adminId: string,
    password: string
}
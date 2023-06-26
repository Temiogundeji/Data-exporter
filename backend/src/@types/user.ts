import mongoose, { Document } from 'mongoose';

export enum UserRole {
    User = "user",
    Admin = "admin"
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    email?: string;
    isActive: boolean;
    address?: string;
    city?: string;
    state?: string;
    country: string;
    dob?: string;
    phoneNumber?: string;
    password?: string;
    tempToken?: string;
    image?: string;
    loading?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    role: UserRole;
    organizationId: mongoose.Schema.Types.ObjectId,
}

export type RegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type ChangeStatusType = {
    deactivate: boolean;
};
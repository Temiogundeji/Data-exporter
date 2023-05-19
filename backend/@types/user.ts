import { Document } from 'mongoose';

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
    bvn?: number;
    phoneNumber?: string;
    pin?: string;
    tempToken?: string;
    image?: string;
    loading?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type RegisterType = {
    phoneNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: string;
    referer?: string;
    dob: string;
};

export type ChangeStatusType = {
    deactivate: boolean;
};
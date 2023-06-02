import Credential from "../models/Credential";
import { ICredential } from "../@types";
import { AppError } from "../utils";
import { HttpCode } from "../exceptions/AppError";
import { ObjectId } from "mongodb";

class CredentialService {
    async createCredential(credData: ICredential) {
        try {
            const credential = new Credential(credData);
            await credential.save();
            return credential;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Error creating credential"
            })
        }
    }

    async getCredentialByOrganizationId(organizationId: string) {
        try {
            const credential = await Credential.findById(organizationId);
            if (!credential) throw new Error("Credential not found");
            return credential;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Credential not found"
            })
        }
    }

    async updateCredential(credentialId: ObjectId, credentialData: ICredential) {
        try {
            const credential = await Credential.findByIdAndUpdate(credentialId, credentialData, {
                new: true
            });
            if (!credential) throw new Error("Credential not found");
            return credential;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Credential not found"
            })
        }
    }

    async deleteCredential(credentialId: ObjectId) {
        try {
            const credential = await Credential.findByIdAndDelete(credentialId);
            if (!credential) throw new Error("Credential not found");
            return credential;
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Credential not found"
            })
        }
    }
}

export default new CredentialService;
import Organization from "../models/Organization";
import { IOrganization } from "../@types";
import { AppError } from "../utils";
import { HttpCode } from "../exceptions/AppError";
import { ObjectId } from "mongodb";

class OrganizationService {
    async createOrganization(orgData: IOrganization) {
        try {
            const organization = new Organization(orgData);
            await organization.save();
            return organization;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Error creating organization"
            })
        }
    }

    async getOrganizationByOrganizationId(organizationId: string) {
        try {
            const organization = await Organization.findById(organizationId);
            if (!organization) throw new Error("Organization not found");
            return organization;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Organization not found"
            })
        }
    }

    async updateOrganization(organizationId: ObjectId, organizationData: IOrganization) {
        try {
            const organization = await Organization.findByIdAndUpdate(organizationId, organizationData, {
                new: true
            });
            if (!organization) throw new Error("Organization not found");
            return organization;
        }
        catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Organization not found"
            })
        }
    }

    async deleteOrganization(organizationId: ObjectId) {
        try {
            const organization = await Organization.findByIdAndDelete(organizationId);
            if (!organization) throw new Error("Organization not found");
            return organization;
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: "Organization not found"
            })
        }
    }
}

export default new OrganizationService;
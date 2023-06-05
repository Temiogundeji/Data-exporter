import { NextFunction, Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { AppError, Toolbox } from '../../utils';
import { organizationService } from '../../services';
import { HttpCode } from '../../exceptions/AppError';

const { apiResponse } = Toolbox;

async function updateOrganization(req: Request, res: Response, next: NextFunction) {
    try {
        const appUser = req.user as any;
        if (!appUser) throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: "Invalid organization"
        });
        const organization = await organizationService.getOrganizationByOrganizationId(req.body.organizationId);
        if (!organization) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND, description: "Organizations not found"
            });
        }
        if (appUser.organizationId !== organization.organizationId) {
            throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: "Invalid Organization ID" });
        }
        const updatedOrganization: any = await organizationService.updateOrganization(organization._id, req.body);
        return apiResponse(
            res,
            ResponseType.SUCCESS,
            StatusCode.OK,
            ResponseCode.SUCCESS,
            updatedOrganization as object
        );
    }
    catch (error) {
        return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCode.INTERNAL_SERVER_ERROR,
            ResponseCode.FAILURE,
            {},
            `looks like something went wrong: ${JSON.stringify(error)}`
        )
    }
}

export default updateOrganization;
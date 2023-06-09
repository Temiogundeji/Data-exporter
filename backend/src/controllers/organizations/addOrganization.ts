import { NextFunction, Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { AppError, Toolbox } from '../../utils';
import { organizationService } from '../../services';
import { HttpCode } from '../../exceptions/AppError';

const { apiResponse } = Toolbox;

async function addOrganization(req: Request, res: Response, next: NextFunction) {
    try {
        const appUser = req.user as any;
        if (!appUser) throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: "Invalid organization"
        });
        if (appUser._id !== req.body.adminId) {
            throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: "You do not have the permission to perform this operation." });
        }
        const newOrganization: any = await organizationService.createOrganization(req.body);
        return apiResponse(
            res,
            ResponseType.SUCCESS,
            StatusCode.OK,
            ResponseCode.SUCCESS,
            newOrganization as object
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

export default addOrganization;
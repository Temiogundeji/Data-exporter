import { NextFunction, Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { AppError, Toolbox } from '../../utils';
import { credentialService } from '../../services';
import { HttpCode } from '../../exceptions/AppError';

const { apiResponse } = Toolbox;

async function addCredentials(req: Request, res: Response, next: NextFunction) {
    try {
        const appUser = req.user as any;
        if (!appUser) throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: "Invalid credentials"
        });
        if (appUser.organizationId !== req.body.organizationId) {
            throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: "Invalid Organization ID" });
        }
        const newCredential: any = await credentialService.createCredential(req.body);
        return apiResponse(
            res,
            ResponseType.SUCCESS,
            StatusCode.OK,
            ResponseCode.SUCCESS,
            newCredential as object
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

export default addCredentials;
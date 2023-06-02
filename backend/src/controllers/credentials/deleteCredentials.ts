import { NextFunction, Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { AppError, Toolbox } from '../../utils';
import { credentialService } from '../../services';
import { HttpCode } from '../../exceptions/AppError';

const { apiResponse } = Toolbox;

async function deleteCredentials(req: Request, res: Response, next: NextFunction) {
    try {
        const appUser = req.user as any;
        if (!appUser) throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: "Invalid credentials"
        });
        const credential = await credentialService.getCredentialByOrganizationId(req.body.organizationId);
        if (!credential) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND, description: "Credentials not found"
            });
        }
        if (appUser.organizationId !== credential.organizationId) {
            throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: "Invalid Organization ID" });
        }
        const deletedCredential: any = await credentialService.deleteCredential(credential._id);
        return apiResponse(
            res,
            ResponseType.SUCCESS,
            StatusCode.OK,
            ResponseCode.SUCCESS,
            deletedCredential as object
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

export default deleteCredentials;
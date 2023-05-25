import { NextFunction, Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';
import { userService } from '../../services';
import { IUser } from '../../@types';

const { apiResponse } = Toolbox;


async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const appUser = req.user as any;
        const userDetails: any = await userService.getUserById(appUser._id);
        return apiResponse(
            res,
            ResponseType.SUCCESS,
            StatusCode.OK,
            ResponseCode.SUCCESS,
            userDetails as object
        );
    } catch (error) {
        return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCode.INTERNAL_SERVER_ERROR,
            ResponseCode.FAILURE,
            {},
            `looks like something went wrong: ${JSON.stringify(error)} `
        );
    }
}

export default getUser;

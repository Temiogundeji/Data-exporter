import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from '@casl/ability';

import User from "../models/User";
import { Toolbox } from "../utils";

import defineAbilityForUser from "../defineAbility";
import { ResponseCode, ResponseType, StatusCode } from "../@types";
/**
 * @DESC Check permission to perform various activities.
 */

const { apiResponse } = Toolbox;
const checkPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
        const userAbility = defineAbilityForUser(user);
        //Attach the ability to the request object.
        req.ability = userAbility;
        next();
    }
    catch (error) {
        if (error) {
            return apiResponse(
                res,
                ResponseType.FAILURE,
                StatusCode.BAD_REQUEST,
                ResponseCode.FAILURE,
                error
            )

        }

    }
}

export default checkPermissions;
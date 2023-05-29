import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ResponseCode, ResponseType } from '../@types';
import { AppError, StatusCode, Toolbox } from '../utils';
import { HttpCode } from '../exceptions/AppError';
import { env } from '../config';
import { IUser } from '../@types/user';

const { apiResponse, isXDaysFromNow } = Toolbox;

const Authentications = {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const authToken = req.headers.authorization;
            if (!authToken)
                throw new AppError(
                    {
                        httpCode: HttpCode.UNAUTHORIZED,
                        description: "Not authorized"
                    }
                );
            const tokenString = authToken.split('Bearer')[1].trim();
            if (!tokenString)
                throw new AppError(
                    {
                        httpCode: HttpCode.UNAUTHORIZED,
                        description: 'No token in header',
                    }
                );
            const decoded: any = jwt.verify(tokenString, env.JWT_SECRET as string);
            const user = await User.findById(decoded?.id).exec();

            if (!decoded || !user)
                throw new AppError(
                    {
                        httpCode: HttpCode.UNAUTHORIZED,
                        description: 'Invalid token',
                    }
                );
            if (user.isDeleted.status && isXDaysFromNow(user.isDeleted.date, 30))
                throw new AppError(
                    {
                        httpCode: HttpCode.UNAUTHORIZED,
                        description: 'This account has been deleted. Please contact support',
                    }
                );
            req.user = user;
            next();
        } catch (error: any) {
            return apiResponse(
                res,
                ResponseType.FAILURE,
                StatusCode.UNAUTHORIZED,
                ResponseCode.FAILURE,
                error.message as string
            );
        }
    },
};

export default Authentications;

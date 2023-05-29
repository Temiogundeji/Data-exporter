import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailer from '../../utils/mailer';
import User from '../../models/User';
import { env } from '../../config';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { AppError, HttpCode } from '../../exceptions/AppError';
import { Toolbox } from "../../utils";

const { apiResponse } = Toolbox;

const { APP_BASE_URL } = env;

const userHtml = fs.readFileSync(path.join(__dirname, '../../templates/signup.html'), {
    encoding: 'utf-8',
});

const signUpHTML = fs.readFileSync(path.join(__dirname, '../../templates/signup.html'), {
    encoding: 'utf-8',
});

async function login(req: Request, res: Response) {
    try {
        let user = await User.findOne({
            email: req.body.email,
        })
        if (!user || !bcrypt.compareSync(String(req.body.password), user.password)) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Invalid credentials', });
        }

        if (user.hasLoggedIn === false && !user.isActive) {
            user.hasLoggedIn = true;
            //update this to verify user through email
            user.isActive = true;
            try {
                // await mailer(
                //     user.email,
                //     'Welcome to Xportt!',
                //     userHtml.replace(`{{NAME}}`, `${user.firstName}`)
                // );
                
                // const tempToken = jwt.sign(
                //     { email: req.body.email },
                //     env.JWT_SECRET as string as string,
                //     {
                //         expiresIn: '7d',
                //     }
                // );
                await user.save();
                const { password, ...rest } = user;

                return apiResponse(
                    rest,
                    ResponseType.SUCCESS,
                    StatusCode.OK,
                    ResponseCode.SUCCESS,
                    {},
                    'Login Successful'
                );
            } catch (error) {
                throw new AppError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR, description: "Something went wrong"
                })
            }
        }

        if (!user?.isActive) {
            if (
                !user.expiresIn ||
                new Date(user.expiresIn).toLocaleDateString('en-CA') <=
                new Date().toLocaleDateString('en-CA')
            ) {
                user.expiresIn = new Date(new Date().setDate(new Date().getDate() + 7));
                await user.save();

                // const tempToken = jwt.sign(
                //     { email: req.body.email },
                //     env.JWT_SECRET as string as string,
                //     {
                //         expiresIn: '7d',
                //     }
                // );

                // const redirectUrl = `${APP_BASE_URL}/auth/verify?token=${tempToken}`;

                // await mailer(
                //     req.body.email,
                //     'Verify your Xportt account',
                //     signUpHTML.replace('{{NAME}}', `${user.firstName}`).replace('{{LINK}}', redirectUrl)
                // );
            }
            // return apiResponse(
            //     res,
            //     ResponseType.FAILURE,
            //     StatusCode.UNAUTHORIZED,
            //     ResponseCode.FAILURE,
            //     'Please verify your account by clicking the link we have sent to your email'
            // );
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string as string, {
            expiresIn: '30d',
        });
        user = user.toObject();
        const { password, id, ...rest } = user;

        return apiResponse(res, ResponseType.SUCCESS, StatusCode.OK, ResponseCode.SUCCESS, {
            ...rest,
            token,
        });
    } catch (error: any) {
        return apiResponse(
            res,
            ResponseType.FAILURE,
            StatusCode.INTERNAL_SERVER_ERROR,
            ResponseCode.FAILURE,
            {},
            `looks like something went wrong: ${JSON.stringify(error.message || error)} `
        );
    }
}

export default login;

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { customAlphabet } from 'nanoid';
import { numbers } from 'nanoid-dictionary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailer from '../../utils/mailer';
import User from '../../models/User';
import { ResponseCode, ResponseType, StatusCode } from '../../../@types';
import { Toolbox } from '../../utils';
import { logger, env } from '../../config';
import { userService } from '../../services';

const { apiResponse } = Toolbox;
const { APP_BASE_URL } = env;

const nanoid = customAlphabet(numbers, 5);

const signUpHTML = fs.readFileSync(path.join(__dirname, '../../templates/signup.html'), {
  encoding: 'utf-8',
});

async function signup(req: Request, res: Response) {
  try {
    const { phoneNumber, email, firstName, lastName, pin, gender, referer, dob } = req.body as any;

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.ALREADY_EXISTS,
        ResponseCode.FAILURE,
        {},
        'User already exists'
      );
    }

    const referralId = `${firstName}-${nanoid()}`.toLowerCase();
    const tempToken = jwt.sign({ email }, env.JWT_SECRET as string as string, {
      expiresIn: '7d',
    });
    const redirectUrl = `${APP_BASE_URL}/auth/verify?token=${tempToken}`;

    const newUser = await User.create({
      phoneNumber,
      firstName,
      lastName,
      pin: bcrypt.hashSync(String(pin), 10),
      email,
      gender,
      referralId: referralId,
      referer: referer ? referer : '',
      dob,
      expiresIn: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    logger('redirect url', redirectUrl);
    await mailer(
      email,
      'Verify your Pebblescore account',
      signUpHTML.replace('{{NAME}}', `${firstName}`).replace('{{LINK}}', redirectUrl)
    );

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      'Registration successful.'
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

export default signup;

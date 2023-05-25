import Joi from 'joi';
import joiDate from '@joi/date';
import { ChangeStatusType, RegisterType } from '../@types';

const joi = Joi.extend(joiDate);

const user = {
    async validateSignUp(payload: RegisterType) {
        const schema = joi.object({
            firstName: joi.string().required().label('First name is required'),
            lastName: joi.string().required().label('Last name is required'),
            email: joi.string().email().required().label('A valid email is required'),
            phoneNumber: joi.string().required().label('A valid phone number is required'),
            pin: joi.string().min(4).max(4).required().label('Pin is required. It must be 4 digits'),
            gender: joi.string().required().label('gender is required'),
            dob: joi
                .date()
                .format('YYYY-MM-DD')
                .required()
                .label('Date of birth is required. It must be in the format YYYY-MM-DD'),
            referer: joi.string().optional().allow(null, '').label('Referer is should be a valid string'),
        });
        const { error } = schema.validate(payload);
        if (error) throw error.details[0].context.label;
        return true;
    },
    async validateAuth(payload: RegisterType) {
        const schema = joi.object({
            email: joi.string().email().required().label('A valid email is required'),
            pin: joi
                .string()
                .min(4)
                .max(4)
                .optional()
                .label('Invalid or missing pin. It must be 4 digits'),
            tempToken: joi.string().min(6).max(6).optional().label('Invalid or missing token'),
        });
        const { error } = schema.validate(payload);
        if (error) throw error.details[0].context.label;
        return true;
    },
    async validateVerifyToken(payload: RegisterType) {
        const schema = joi.object({
            token: joi.string().required().label('Invalid or missing token in query'),
        });
        const { error } = schema.validate(payload);
        if (error) throw error.details[0].context.label;
        return true;
    },
    async validateToggleStatus(payload: ChangeStatusType) {
        const schema = joi.object({
            deactivate: joi.boolean().required().label('Invalid or missing request body.'),
            id: joi.string().required().label('Invalid or missing request body.'),
        });
        const { error } = schema.validate(payload);
        if (error) throw error.details[0].context.label;
        return true;
    },
};

export default user;

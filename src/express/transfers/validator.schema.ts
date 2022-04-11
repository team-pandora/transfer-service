import * as Joi from 'joi';
import { JoiMongoObjectId } from '../../utils/joi';

/**
 * GET /api/transfers?data=someData123
 */
const getTransferRequestSchema = Joi.object({
    query: {
        _id: JoiMongoObjectId.optional(),
        data: Joi.string().alphanum().optional(),
    },
    body: {},
    params: {},
});

/**
 * POST /api/transfers/
 * { data: 'someData123' }
 */
const createTransferRequestSchema = Joi.object({
    body: {
        data: Joi.string().alphanum().required(),
    },
    query: {},
    params: {},
});

export { getTransferRequestSchema, createTransferRequestSchema };

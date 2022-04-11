import * as Joi from 'joi';
import { JoiMongoObjectId } from '../../utils/joi';

/**
 * GET /api/transfers?filename=<filename>&classification=<classification>
 */
const getTransferRequestSchema = Joi.object({
    query: {
        _id: JoiMongoObjectId.optional(),
        requestId: Joi.string().alphanum().optional(),
        userId: Joi.string().alphanum().optional(),
        recipients: Joi.array().items(Joi.string().alphanum()).optional(),
        classification: Joi.string().alphanum().optional(),
        fileName: Joi.string().alphanum().optional(),
        destination: Joi.string().alphanum().optional(),
    },
    body: {},
    params: {},
});

/**
 * GET /api/transfers/<requestId>
 */
const getTransferByIdRequestSchema = Joi.object({
    query: {},
    body: {},
    params: {
        requestId: Joi.string().alphanum().required(),
    },
});

/**
 * POST /api/transfers/
 * {{ data: 'someData123' }}
 */
const createTransferRequestSchema = Joi.object({
    body: {
        data: Joi.string().alphanum().required(),
    },
    query: {},
    params: {},
});

/**
 * DELETE /api/transfers/<requestId>
 */
const deleteTransferRequestSchema = Joi.object({
    query: {},
    body: {},
    params: {
        requestId: Joi.string().alphanum().required(),
    },
});

export {
    getTransferRequestSchema,
    createTransferRequestSchema,
    getTransferByIdRequestSchema,
    deleteTransferRequestSchema,
};

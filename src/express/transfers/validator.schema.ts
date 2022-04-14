import * as Joi from 'joi';
import { JoiMongoObjectId } from '../../utils/joi';

/**
 * GET /api/transfers?filename=<filename>&classification=<classification>
 */
const getTransfersRequestSchema = Joi.object({
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
 * {{ requestId: 'reqId',
 * userId: 'userId',
 * recipients: ['recipient1', 'recipient2'],
 * classification: 'classification',
 * fileName: 'fileName',
 * fileSize: 1000,
 * destination: 'destination' }}
 */
const createTransferRequestSchema = Joi.object({
    body: {
        requestId: Joi.string().alphanum().required(),
        userId: Joi.string().alphanum().required(),
        recipients: Joi.array().items(Joi.string().alphanum()).required(),
        classification: Joi.string().alphanum().required(),
        fileName: Joi.string().alphanum().required(),
        fileSize: Joi.number().required(),
        destination: Joi.string().alphanum().required(),
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
    getTransfersRequestSchema,
    createTransferRequestSchema,
    getTransferByIdRequestSchema,
    deleteTransferRequestSchema,
};

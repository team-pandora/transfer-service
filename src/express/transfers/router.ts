import { Router } from 'express';
import { wrapMiddleware } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as TransfersController from './controller';
import {
    createTransferRequestSchema,
    deleteTransferRequestSchema,
    getTransferByIdRequestSchema,
    getTransferRequestSchema,
} from './validator.schema';

const transfersRouter: Router = Router();

transfersRouter.get('/', ValidateRequest(getTransferRequestSchema), wrapMiddleware(TransfersController.getTransfers));
transfersRouter.get(
    '/:id',
    ValidateRequest(getTransferByIdRequestSchema),
    wrapMiddleware(TransfersController.getTransferById),
);
transfersRouter.post(
    '/',
    ValidateRequest(createTransferRequestSchema),
    wrapMiddleware(TransfersController.createTransfer),
);
transfersRouter.delete(
    '/:id',
    ValidateRequest(deleteTransferRequestSchema),
    wrapMiddleware(TransfersController.deleteTransfer),
);

export default transfersRouter;

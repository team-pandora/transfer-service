import { Router } from 'express';
import { wrapMiddleware } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as TransfersController from './controller';
import { createTransferRequestSchema, getTransferRequestSchema } from './validator.schema';

const transfersRouter: Router = Router();

transfersRouter.get('/', ValidateRequest(getTransferRequestSchema), wrapMiddleware(TransfersController.getTransfers));
transfersRouter.post(
    '/',
    ValidateRequest(createTransferRequestSchema),
    wrapMiddleware(TransfersController.createTransfer),
);

export default transfersRouter;

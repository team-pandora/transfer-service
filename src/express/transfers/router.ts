import { Router } from 'express';
import { wrapMiddleware } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import * as TransfersController from './controller';
import * as TransfersValidator from './validator.schema';

const transfersRouter: Router = Router();

transfersRouter.get(
    '/',
    ValidateRequest(TransfersValidator.getTransfersRequestSchema),
    wrapMiddleware(TransfersController.getTransfers),
);

transfersRouter.get(
    '/:transferId',
    ValidateRequest(TransfersValidator.getTransferByIdRequestSchema),
    wrapMiddleware(TransfersController.getTransferById),
);

transfersRouter.post(
    '/',
    ValidateRequest(TransfersValidator.createTransferRequestSchema),
    wrapMiddleware(TransfersController.createTransfer),
);

transfersRouter.delete(
    '/:transferId',
    ValidateRequest(TransfersValidator.deleteTransferRequestSchema),
    wrapMiddleware(TransfersController.deleteTransfer),
);

export default transfersRouter;

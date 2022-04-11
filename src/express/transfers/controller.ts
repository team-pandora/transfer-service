import { Request, Response } from 'express';
import * as TransfersManager from './manager';

const getTransfers = async (req: Request, res: Response) => {
    res.json(await TransfersManager.getTransfers(req.query));
};

const createTransfer = async (req: Request, res: Response) => {
    res.json(await TransfersManager.createTransfer(req.body));
};

export { getTransfers, createTransfer };

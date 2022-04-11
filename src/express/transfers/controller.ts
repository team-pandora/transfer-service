import { Request, Response } from 'express';
import * as TransfersManager from './manager';

const getTransfers = async (req: Request, res: Response) => {
    res.json(await TransfersManager.getTransfers(req.query));
};

const getTransferById = async (req: Request, res: Response) => {
    res.json(await TransfersManager.getTransferById(req.params.id));
};

const createTransfer = async (req: Request, res: Response) => {
    res.json(await TransfersManager.createTransfer(req.body));
};

const deleteTransfer = async (req: Request, res: Response) => {
    res.json(await TransfersManager.deleteTransfer(req.params.id));
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

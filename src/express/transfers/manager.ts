import { ServerError } from '../error';
import { INewTransfer, ITransfer } from './interface';
import TransferModel from './model';

const getTransfers = (query: Partial<ITransfer>): Promise<ITransfer[]> => {
    return TransferModel.find(query).exec();
};

const getTransferById = async (requestId: string): Promise<ITransfer> => {
    const transfer: ITransfer | null = await TransferModel.findById(requestId).exec();

    if (!transfer) {
        throw new ServerError(404, 'Transfer not found');
    }

    return transfer;
};

const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

const deleteTransfer = (requestId: string): Promise<ITransfer | null> => {
    return TransferModel.findOneAndDelete({ requestId }).exec();
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

import { ServerError } from '../error';
import { INewTransfer, ITransfer } from './interface';
import TransferModel from './model';

const getTransfers = (query: Partial<ITransfer>): Promise<ITransfer[]> => {
    return TransferModel.find(query).exec();
};

const getTransferById = async (id: string): Promise<ITransfer> => {
    const transfer: ITransfer | null = await TransferModel.findById(id).exec();

    if (!transfer) {
        throw new ServerError(404, 'Transfer not found');
    }

    return transfer;
};

const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

const deleteTransfer = (id: string): Promise<ITransfer | null> => {
    return TransferModel.findByIdAndDelete(id).exec();
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

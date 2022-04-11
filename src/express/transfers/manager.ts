import { INewTransfer, ITransfer } from './interface';
import TransferModel from './model';

const getTransfers = (query: Partial<ITransfer>): Promise<ITransfer[]> => {
    return TransferModel.find(query).exec();
};

const getTransferById = (requestId: string): Promise<ITransfer | null> => {
    return TransferModel.findById(requestId).exec();
};

const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

const deleteTransfer = (requestId: string): Promise<ITransfer | null> => {
    return TransferModel.findByIdAndDelete(requestId).exec();
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

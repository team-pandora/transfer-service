import { INewTransfer, ITransfer } from './interface';
import TransferModel from './model';

const getTransfers = (query: Partial<ITransfer>): Promise<ITransfer[]> => {
    return TransferModel.find(query).exec();
};

const getTransferById = (id: string): Promise<ITransfer | null> => {
    return TransferModel.findById(id).exec();
};

const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

const deleteTransfer = (id: string): Promise<ITransfer | null> => {
    return TransferModel.findByIdAndDelete(id).exec()
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

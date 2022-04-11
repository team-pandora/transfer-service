import { INewTransfer, ITransfer } from './interface';
import TransferModel from './model';

/**
 * Get filtered transfers.
 * @param {Partial<ITransfer>} query - The query to filter the transfers.
 * @returns {Promise<ITransfer[]>} - Promise object containing the filtered transfers.
 */
const getTransfers = (query: Partial<ITransfer>): Promise<ITransfer[]> => {
    return TransferModel.find(query).exec();
};

/**
 * Create a new transfer.
 * @param {INewTransfer} transfer - The transfer to create.
 * @returns {Promise<ITransfer>} - Promise object containing the created transfer.
 */
const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

export { getTransfers, createTransfer };

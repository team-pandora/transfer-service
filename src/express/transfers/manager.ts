import { removeUndefinedFields } from '../../utils/object';
import { ServerError } from '../error';
import { INewTransfer, ITransfer, ITransferGetReq } from './interface';
import TransferModel from './model';

const getTransfers = (query: ITransferGetReq): Promise<ITransfer[]> => {
    const transferFilters = removeUndefinedFields({
        requestId: query.requestId,
        userId: query.userId,
        recipients: query.recipients,
        classification: query.classification,
        fileName: query.fileName,
        destination: query.destination,
    });

    let result = TransferModel.find(transferFilters);

    if (query.sortBy && query.sortOrder) {
        result = result.sort({ [query.sortBy]: query.sortOrder });
    }

    if (query.page && query.pageSize) {
        result = result.skip((query.page - 1) * query.pageSize).limit(query.pageSize);
    }

    return result.lean().exec();
};

const getTransferById = async (id: string): Promise<ITransfer> => {
    const transfer: ITransfer | null = await TransferModel.findById(id).lean().exec();

    if (!transfer) {
        throw new ServerError(404, 'Transfer not found');
    }

    return transfer;
};

const createTransfer = (transfer: INewTransfer): Promise<ITransfer> => {
    return TransferModel.create(transfer);
};

const deleteTransfer = async (id: string): Promise<ITransfer | null> => {
    const transfer: ITransfer | null = await TransferModel.findByIdAndDelete(id).lean().exec();

    if (!transfer) {
        throw new ServerError(404, 'Transfer not found');
    }

    return transfer;
};

export { getTransfers, getTransferById, createTransfer, deleteTransfer };

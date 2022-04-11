import * as mongoose from 'mongoose';

export interface ITransfer {
    _id: mongoose.Types.ObjectId;
    data: string;
    createdAt: Date;
    updatedAt: Date;
}

export type INewTransfer = Pick<ITransfer, 'data'>;

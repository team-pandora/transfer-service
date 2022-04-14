import * as mongoose from 'mongoose';

export interface ITransfer {
    _id: mongoose.Types.ObjectId;
    requestId: string;
    userId: string;
    recipients: string[];
    classification: string;
    fileName: string;
    fileSize: number;
    destination: string;
    createdAt: Date;
    updatedAt: Date;
}

export type INewTransfer = Omit<ITransfer, '_id' | 'createdAt' | 'updatedAt'>;

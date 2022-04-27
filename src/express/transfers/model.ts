import * as mongoose from 'mongoose';
import config from '../../config';
import { errorHandler } from '../../utils/mongoose';
import { ITransfer } from './interface';

const TransferSchema = new mongoose.Schema<ITransfer & mongoose.Document>(
    {
        requestId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
        },
        recipients: {
            type: [String],
            required: true,
        },
        classification: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    },
);

TransferSchema.index({ requestId: 1 });
TransferSchema.index({ userId: 1, createdAt: -1 });

TransferSchema.post(/save|update|findOneAndUpdate|insertMany/, errorHandler);

const TransferModel = mongoose.model<ITransfer & mongoose.Document>(
    config.mongo.transfersCollectionName,
    TransferSchema,
);

export default TransferModel;

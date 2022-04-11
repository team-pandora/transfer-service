import * as mongoose from 'mongoose';
import config from '../../config';
import { errorHandler } from '../../utils/mongoose';
import { ITransfer } from './interface';

const TransferSchema = new mongoose.Schema<ITransfer & mongoose.Document>(
    {
        data: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

TransferSchema.index({ data: 1 });

TransferSchema.post(/save|update|findOneAndUpdate|insertMany/, errorHandler);

const TransferModel = mongoose.model<ITransfer & mongoose.Document>(
    config.mongo.transfersCollectionName,
    TransferSchema,
);

export default TransferModel;

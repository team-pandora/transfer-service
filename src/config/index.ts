import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        transfersCollectionName: env.get('MONGO_TRANSFERS_COLLECTION_NAME').required().asString(),
    },
    transfers: {
        idRegex: env.get('ID_REGEX').default('^[a-zA-Z0-9-_.!@#$%^&*()[\\]{}<>"\':\\\\\\/\t ]{1,100}$').asRegExp(),
        fileNameRegex: env
            .get('FILE_NAME_REGEX')
            .default('^[a-zA-Z0-9-_.!@#$%^&*()[\\]{}<>"\':\\\\\\/\t ]{1,100}$')
            .asRegExp(),
    },
};

export default config;

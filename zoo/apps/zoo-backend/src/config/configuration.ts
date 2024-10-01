import * as process from 'node:process';

export interface IConfig {
    readonly mongo: {
        readonly url: string;
    };
    readonly environment: 'development' | 'production';
    readonly gigaChat: {
        clientSecretKey: string;
    }
}

export const CONFIG: IConfig = {
    environment: (process.env.NODE_ENV as 'development') || 'development',
    mongo: {
        url: `mongodb://${ process.env.MONGO_USERNAME }:${ process.env.MONGO_PASSWORD }@${ process.env.MONGO_HOST }:${ process.env.MONGO_PORT }/${ process.env.MONGO_DATABASE }?authSource=admin`
    },
    gigaChat: {
        clientSecretKey: process.env.GIGA_CHAT_CLIENT_SECRET_KEY || '',
    }
}

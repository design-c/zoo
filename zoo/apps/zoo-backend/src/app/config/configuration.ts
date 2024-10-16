import process from 'node:process';

export interface IDatabaseConfig {
    readonly uri: string;
}

export interface IJwtConfig {
    readonly secret: string;
    /** in minutes */
    readonly expiresIn: number;
}

export interface IAiConfig {
    readonly gigaChatApiKey: string;
}

export interface IConfiguration {
    readonly port: number;
    readonly database: IDatabaseConfig;
    readonly jwt: IJwtConfig;
    readonly ai: IAiConfig;
}

export default (): IConfiguration => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: `mongodb://${ process.env.MONGO_USERNAME }:${ process.env.MONGO_PASSWORD }@${ process.env.MONGO_HOST }:${ process.env.MONGO_PORT }/${ process.env.MONGO_DATABASE }?authSource=admin`
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'we_are_zoo',
        expiresIn: 60 * 60 * 24 * 31, // 1 month
    },
    ai: {
        gigaChatApiKey: process.env.GIGA_CHAT_CLIENT_SECRET_KEY || '',
    },
});

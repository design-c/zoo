import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'ru.amg.zoo',
    appName: 'zoo-mobile',
    webDir: '../../dist/apps/zoo-mobile',
    bundledWebRuntime: false,
    server: {
        androidScheme: 'https',
    },
};

export default config;

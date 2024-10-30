import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'ru.amg.zoo',
    appName: 'zoo-mobile',
    webDir: '../../dist/apps/zoo-mobile',
    bundledWebRuntime: false,
    server: {
        androidScheme: 'https',
    },
    plugins: {
        SplashScreen: {
            launchAutoHide: false,
            backgroundColor: '#297acc',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            splashFullScreen: false,
            splashImmersive: false,
        }
    }
};

export default config;

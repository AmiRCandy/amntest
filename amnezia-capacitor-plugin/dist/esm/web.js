import { WebPlugin } from '@capacitor/core';
export class AmneziaWGWeb extends WebPlugin {
    async connect(options) {
        console.log('AmneziaWG connect', options);
        throw new Error('Web not supported. Use Android/iOS.');
    }
    async disconnect() {
        console.log('AmneziaWG disconnect');
        return { status: 'disconnected' };
    }
    async getStatus() {
        return { status: 'disconnected' };
    }
}
//# sourceMappingURL=web.js.map
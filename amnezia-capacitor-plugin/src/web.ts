import { WebPlugin } from '@capacitor/core';
import type { AmneziaWGPlugin } from './definitions';

export class AmneziaWGWeb extends WebPlugin implements AmneziaWGPlugin {
    async connect(options: { config: string }): Promise<{ status: 'connected' | 'error', message?: string }> {
        console.log('AmneziaWG connect', options);
        throw new Error('Web not supported. Use Android/iOS.');
    }
    async disconnect(): Promise<{ status: 'disconnected' | 'error', message?: string }> {
        console.log('AmneziaWG disconnect');
        return { status: 'disconnected' };
    }
    async getStatus(): Promise<{ status: 'connected' | 'disconnected' }> {
        return { status: 'disconnected' };
    }
}

import { WebPlugin } from '@capacitor/core';
import type { AmneziaWGPlugin } from './definitions';
export declare class AmneziaWGWeb extends WebPlugin implements AmneziaWGPlugin {
    connect(options: {
        config: string;
    }): Promise<{
        status: 'connected' | 'error';
        message?: string;
    }>;
    disconnect(): Promise<{
        status: 'disconnected' | 'error';
        message?: string;
    }>;
    getStatus(): Promise<{
        status: 'connected' | 'disconnected';
    }>;
}

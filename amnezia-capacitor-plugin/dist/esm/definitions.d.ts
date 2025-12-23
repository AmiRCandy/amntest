export interface AmneziaWGPlugin {
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

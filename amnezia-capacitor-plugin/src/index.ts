import { registerPlugin } from '@capacitor/core';
import type { AmneziaWGPlugin } from './definitions';

const AmneziaWG = registerPlugin<AmneziaWGPlugin>('AmneziaWG', {
    web: () => import('./web').then(m => new m.AmneziaWGWeb()),
});

export * from './definitions';
export { AmneziaWG };

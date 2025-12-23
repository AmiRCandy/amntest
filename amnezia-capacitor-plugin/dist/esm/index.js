import { registerPlugin } from '@capacitor/core';
const AmneziaWG = registerPlugin('AmneziaWG', {
    web: () => import('./web').then(m => new m.AmneziaWGWeb()),
});
export * from './definitions';
export { AmneziaWG };
//# sourceMappingURL=index.js.map
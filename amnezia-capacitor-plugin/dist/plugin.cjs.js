'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const AmneziaWG = core.registerPlugin('AmneziaWG', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.AmneziaWGWeb()),
});

class AmneziaWGWeb extends core.WebPlugin {
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AmneziaWGWeb: AmneziaWGWeb
});

exports.AmneziaWG = AmneziaWG;
//# sourceMappingURL=plugin.cjs.js.map

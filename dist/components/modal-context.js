"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalProvider = exports.modalContext = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var modal_1 = require("../core/modal");
exports.modalContext = react_1.default.createContext({});
var ModalProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(new Map()), modalMap = _b[0], setModalMap = _b[1];
    var context = (0, react_1.useMemo)(function () {
        return {
            set: function (id, node) {
                setModalMap(function (prevState) { return new Map(prevState).set(id, node); });
            },
            delete: function (id) {
                setModalMap(function (prevState) {
                    var nextMap = new Map(prevState);
                    nextMap.delete(id);
                    return nextMap;
                });
            },
        };
    }, []);
    var modalList = (0, react_1.useMemo)(function () {
        return Array.from(modalMap.entries())
            .sort(function (_a, _b) {
            var keyA = _a[0];
            var keyB = _b[0];
            return keyA.localeCompare(keyB);
        })
            .map(function (_a) {
            var key = _a[0], modal = _a[1];
            return <react_native_1.View key={key}>{modal}</react_native_1.View>;
        });
    }, [modalMap]);
    (0, react_1.useEffect)(function () {
        modal_1.ModalService.mount(context);
        return function () {
            modal_1.ModalService.unmount();
        };
    }, []);
    return (<exports.modalContext.Provider value={context}>
      {children}
      {modalList}
    </exports.modalContext.Provider>);
};
exports.ModalProvider = ModalProvider;
//# sourceMappingURL=modal-context.js.map
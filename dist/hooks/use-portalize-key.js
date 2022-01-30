"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePortalizeKey = void 0;
var react_1 = __importDefault(require("react"));
// Generates a random key
var keyGenerator = function () {
    return "portalize_".concat(Math.random()
        .toString(36)
        .substring(2, 18), "-").concat(Math.random()
        .toString(36)
        .substring(2, 18), "-").concat(Math.random().toString(36).substring(2, 18));
};
// Custom hook that checks for uniqueness and retries if clashes
var usePortalizeKey = function () {
    var usedKeys = react_1.default.useRef([]);
    var generateKey = function () {
        var foundUniqueKey = false;
        var newKey = '';
        var tries = 0;
        while (!foundUniqueKey && tries < 3) {
            // Limit number of tries to stop endless loop of pain
            tries++;
            newKey = keyGenerator();
            if (!usedKeys.current.includes(newKey)) {
                foundUniqueKey = true;
            }
        }
        // Will only run if exited while loop without finding a unique key
        if (!foundUniqueKey) {
            newKey = "portalize_".concat(Date.now(), "_").concat(Math.floor(Math.random() * 1000)); // fallback method
        }
        usedKeys.current.push(newKey);
        return newKey;
    };
    // Removes our key to make it 'available' again
    var removeKey = function (key) {
        usedKeys.current = usedKeys.current.filter(function (k) { return k !== key; });
    };
    return { generateKey: generateKey, removeKey: removeKey };
};
exports.usePortalizeKey = usePortalizeKey;
//# sourceMappingURL=use-portalize-key.js.map
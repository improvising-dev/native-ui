"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalEvent = exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._eventHandlers = {};
    }
    EventEmitter.prototype.isValidType = function (type) {
        return typeof type === 'string';
    };
    EventEmitter.prototype.isValidHandler = function (handler) {
        return typeof handler === 'function';
    };
    EventEmitter.prototype.on = function (type, handler) {
        if (!type || !handler)
            return false;
        if (!this.isValidType(type))
            return false;
        if (!this.isValidHandler(handler))
            return false;
        var handlers = this._eventHandlers[type];
        if (!handlers)
            handlers = this._eventHandlers[type] = [];
        // when the same handler is passed, listen it by only once.
        if (handlers.indexOf(handler) >= 0)
            return false;
        handler._once = false;
        handlers.push(handler);
        return true;
    };
    EventEmitter.prototype.once = function (type, handler) {
        if (!type || !handler)
            return false;
        if (!this.isValidType(type))
            return false;
        if (!this.isValidHandler(handler))
            return false;
        var ret = this.on(type, handler);
        if (ret) {
            // set `_once` private property after listened,
            // avoid to modify event handler that has been listened.
            handler._once = true;
        }
        return ret;
    };
    EventEmitter.prototype.off = function (type, handler) {
        // listen off all events, when if no arguments are passed.
        // it does samething as `offAll` method.
        if (!type)
            return this.offAll();
        // listen off events by type, when if only type argument is passed.
        if (!handler) {
            this._eventHandlers[type] = [];
            return;
        }
        if (!this.isValidType(type))
            return;
        if (!this.isValidHandler(handler))
            return;
        var handlers = this._eventHandlers[type];
        if (!handlers || !handlers.length)
            return;
        // otherwise, listen off the specified event.
        for (var i = 0; i < handlers.length; i++) {
            var fn = handlers[i];
            if (fn === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    };
    EventEmitter.prototype.offAll = function () {
        this._eventHandlers = {};
    };
    EventEmitter.prototype.fire = function (type, data) {
        if (!type || !this.isValidType(type))
            return;
        var handlers = this._eventHandlers[type];
        if (!handlers || !handlers.length)
            return;
        var event = this.createEvent(type, data);
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            if (!this.isValidHandler(handler))
                continue;
            if (handler._once)
                event.once = true;
            // call event handler, and pass the event argument.
            handler(event);
            // if it's an once event, listen off it immediately after called handler.
            if (event.once)
                this.off(type, handler);
        }
    };
    EventEmitter.prototype.has = function (type, handler) {
        if (!type || !this.isValidType(type))
            return false;
        var handlers = this._eventHandlers[type];
        // if there are no any events, return false.
        if (!handlers || !handlers.length)
            return false;
        // at lest one event, and no pass `handler` argument, then return true.
        if (!handler || !this.isValidHandler(handler))
            return true;
        // otherwise, need to traverse the handlers.
        return handlers.indexOf(handler) >= 0;
    };
    EventEmitter.prototype.getHandlers = function (type) {
        if (!type || !this.isValidType(type))
            return [];
        return this._eventHandlers[type] || [];
    };
    EventEmitter.prototype.createEvent = function (type, data, once) {
        if (once === void 0) { once = false; }
        var event = { type: type, data: data, timestamp: Date.now(), once: once };
        return event;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
exports.globalEvent = new EventEmitter();
//# sourceMappingURL=event.js.map
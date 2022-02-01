export class EventEmitter {
    _eventHandlers = {};
    isValidType(type) {
        return typeof type === 'string';
    }
    isValidHandler(handler) {
        return typeof handler === 'function';
    }
    on(type, handler) {
        if (!type || !handler)
            return false;
        if (!this.isValidType(type))
            return false;
        if (!this.isValidHandler(handler))
            return false;
        let handlers = this._eventHandlers[type];
        if (!handlers)
            handlers = this._eventHandlers[type] = [];
        // when the same handler is passed, listen it by only once.
        if (handlers.indexOf(handler) >= 0)
            return false;
        handler._once = false;
        handlers.push(handler);
        return true;
    }
    once(type, handler) {
        if (!type || !handler)
            return false;
        if (!this.isValidType(type))
            return false;
        if (!this.isValidHandler(handler))
            return false;
        const ret = this.on(type, handler);
        if (ret) {
            // set `_once` private property after listened,
            // avoid to modify event handler that has been listened.
            handler._once = true;
        }
        return ret;
    }
    off(type, handler) {
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
        const handlers = this._eventHandlers[type];
        if (!handlers || !handlers.length)
            return;
        // otherwise, listen off the specified event.
        for (let i = 0; i < handlers.length; i++) {
            const fn = handlers[i];
            if (fn === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    }
    offAll() {
        this._eventHandlers = {};
    }
    fire(type, data) {
        if (!type || !this.isValidType(type))
            return;
        const handlers = this._eventHandlers[type];
        if (!handlers || !handlers.length)
            return;
        const event = this.createEvent(type, data);
        for (const handler of handlers) {
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
    }
    has(type, handler) {
        if (!type || !this.isValidType(type))
            return false;
        const handlers = this._eventHandlers[type];
        // if there are no any events, return false.
        if (!handlers || !handlers.length)
            return false;
        // at lest one event, and no pass `handler` argument, then return true.
        if (!handler || !this.isValidHandler(handler))
            return true;
        // otherwise, need to traverse the handlers.
        return handlers.indexOf(handler) >= 0;
    }
    getHandlers(type) {
        if (!type || !this.isValidType(type))
            return [];
        return this._eventHandlers[type] || [];
    }
    createEvent(type, data, once = false) {
        const event = { type, data, timestamp: Date.now(), once };
        return event;
    }
}
export const globalEvent = new EventEmitter();

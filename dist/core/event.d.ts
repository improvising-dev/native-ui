export declare type EventHandler = ((evt: Event) => void) & {
    _once?: boolean;
};
export interface Event {
    type: string;
    data: any;
    timestamp: number;
    once: boolean;
}
export declare class EventEmitter {
    _eventHandlers: Record<string, EventHandler[] | undefined>;
    isValidType(type: string): boolean;
    isValidHandler(handler: EventHandler): boolean;
    on(type: string, handler: EventHandler): boolean;
    once(type: string, handler: EventHandler): boolean;
    off(type?: string, handler?: EventHandler): void;
    offAll(): void;
    fire(type: string, data?: any): void;
    has(type: string, handler?: EventHandler): boolean;
    getHandlers(type: string): EventHandler[];
    createEvent(type: string, data?: any, once?: boolean): Event;
}
export declare const globalEvent: EventEmitter;

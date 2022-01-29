interface IUseKey {
    generateKey(): string;
    removeKey(key: string): void;
}
export declare const usePortalizeKey: () => IUseKey;
export {};

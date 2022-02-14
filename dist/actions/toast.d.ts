import { ToastVariant } from '../components/toast';
export declare const showToast: ({ variant, title, message, duration, onPress, }: {
    variant?: ToastVariant | undefined;
    title?: string | undefined;
    message?: string | undefined;
    duration?: number | undefined;
    onPress?: (() => void) | undefined;
}) => void;

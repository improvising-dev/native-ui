/// <reference types="react" />
import { SlideInModalProps } from './slide-in-modal';
export interface ActionSheetItem {
    title: string;
    subtitle?: string;
    destrutive?: boolean;
    onPressed?: () => void;
}
export interface ActionSheetProps extends SlideInModalProps {
    items: ActionSheetItem[];
}
export declare const ActionSheet: React.FC<ActionSheetProps>;

/// <reference types="react" />
import { ModalProps } from './modal';
export interface ActionSheetItem {
    title: string;
    subtitle?: string;
    destrutive?: boolean;
    onPressed?: () => void;
}
export interface ActionSheetProps extends ModalProps {
    items: ActionSheetItem[];
}
export declare const ActionSheet: React.FC<ActionSheetProps>;

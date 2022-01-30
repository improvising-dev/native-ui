/// <reference types="react" />
import { ControlledModalProps } from './modal';
export interface ActionSheetItem {
    title: string;
    subtitle?: string;
    destrutive?: boolean;
    onPressed?: () => void;
}
export interface ActionSheetProps extends ControlledModalProps {
    items: ActionSheetItem[];
}
export declare const ActionSheet: React.FC<ActionSheetProps>;

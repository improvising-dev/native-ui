import React from 'react';
import { ModalStateProps } from './modal';
export interface ActionSheetItem {
    title: string;
    subtitle?: string;
    destrutive?: boolean;
    onPressed?: () => void;
}
export interface ActionSheetProps extends ModalStateProps {
    items: ActionSheetItem[];
}
export declare const ActionSheet: React.FC<ActionSheetProps>;

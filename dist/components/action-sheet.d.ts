import React from 'react';
import { ModalStateProps } from './modal';
export interface ActionSheetItem {
    title: string;
    subtitle?: string;
    destructive?: boolean;
    onPressed?: () => void;
}
export interface ActionSheetProps extends ModalStateProps {
    items: ActionSheetItem[];
    header?: React.ReactNode;
}
export declare const ActionSheet: React.FC<ActionSheetProps>;

/// <reference types="react" />
export interface CheckBoxProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
}
export declare const CheckBox: React.FC<CheckBoxProps>;

/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface PageProps {
    scrollable?: boolean;
    style?: ViewStyle;
}
export declare const Page: React.FC<PageProps>;

/// <reference types="react" />
import { ViewProps } from 'react-native';
export interface PageProps extends ViewProps {
    scrollable?: boolean;
}
export declare const Page: React.FC<PageProps>;

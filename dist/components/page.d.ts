/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface PageProps {
    scrollable?: boolean;
    style?: ViewStyle;
}
declare const Page: React.FC<PageProps>;
export default Page;

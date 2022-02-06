import React from 'react';
import { ScrollView, ScrollViewProps } from './scroll-view';
export interface Page extends ScrollView {
}
export interface PageProps extends ScrollViewProps {
    scrollable?: boolean;
}
export declare const Page: React.ForwardRefExoticComponent<PageProps & React.RefAttributes<Page>>;

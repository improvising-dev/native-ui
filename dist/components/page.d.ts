import React from 'react';
import { View, ViewProps } from 'react-native';
import { ScrollView, ScrollViewProps } from './scroll-view';
export interface Page extends View {
}
export interface PageProps extends ViewProps {
}
export declare const Page: (props: PageProps & React.RefAttributes<Page>) => JSX.Element;
export interface ScrollPage extends ScrollView {
}
export interface ScrollPageProps extends ScrollViewProps {
}
export declare const ScrollPage: (props: ScrollPageProps & React.RefAttributes<ScrollPage>) => JSX.Element;

import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
export interface InfiniteList<ItemT> extends FlatList<ItemT> {
}
export interface InfiniteListProps<ItemT> extends Omit<FlatListProps<ItemT>, 'ItemSeparatorComponent' | 'ListHeaderComponent' | 'ListHeaderComponentStyle' | 'ListFooterComponent' | 'ListFooterComponentStyle' | 'ListEmptyComponent' | 'CellRendererComponent' | 'StickyHeaderComponent' | 'horizontal' | 'showsHorizontalScrollIndicator' | 'alwaysBounceHorizontal' | 'contentOffset' | 'contentInset' | 'contentInsetAdjustmentBehavior' | 'refreshing' | 'refreshControl' | 'onRefresh'> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    dividerSpacing?: number;
    horizontalSpacing?: number;
    topSpacing?: number;
    bottomSpacing?: number;
    onRefresh?: () => Promise<void>;
    onRefreshError?: (reason: any) => void;
    onLoadMore?: () => Promise<boolean>;
    onLoadMoreError?: (reason: any) => void;
}
declare const InfiniteListComponent: <ItemT>({ header, footer, dividerSpacing, horizontalSpacing, topSpacing, bottomSpacing, contentContainerStyle, onRefresh, onRefreshError, onLoadMore, onLoadMoreError, onEndReached, ...props }: InfiniteListProps<ItemT>, ref: React.ForwardedRef<InfiniteList<ItemT>>) => JSX.Element;
export declare const InfiniteList: React.MemoExoticComponent<(<ItemT>(props: InfiniteListProps<ItemT> & {
    ref?: React.ForwardedRef<InfiniteList<ItemT>> | undefined;
}) => ReturnType<typeof InfiniteListComponent>)>;
export {};

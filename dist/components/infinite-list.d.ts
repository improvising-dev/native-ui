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
export declare const InfiniteList: <ItemT>(props: InfiniteListProps<ItemT> & React.RefAttributes<InfiniteList<ItemT>>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;

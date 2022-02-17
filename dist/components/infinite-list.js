var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
import { typedForwardRef, typedMemo } from '../utils/typed-react';
import { ActivityIndicator } from './activity-indicator';
import { Spacer } from './spacer';
const InfiniteListComponent = (_a, ref) => {
    var { header, footer, dividerSpacing = 0, horizontalSpacing = 0, topSpacing = 0, bottomSpacing = 0, contentContainerStyle, onRefresh, onRefreshError, onLoadMore, onLoadMoreError, onEndReached } = _a, props = __rest(_a, ["header", "footer", "dividerSpacing", "horizontalSpacing", "topSpacing", "bottomSpacing", "contentContainerStyle", "onRefresh", "onRefreshError", "onLoadMore", "onLoadMoreError", "onEndReached"]);
    const theme = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const mounted = useRef(false);
    const locked = useRef(false);
    const handleRefresh = () => {
        if (onRefresh && !locked.current) {
            locked.current = true;
            setRefreshing(true);
            onRefresh()
                .then(() => {
                if (mounted.current) {
                    setRefreshing(false);
                    setHasNext(true);
                    requestAnimationFrame(() => {
                        locked.current = false;
                    });
                }
            })
                .catch(onRefreshError);
        }
    };
    const handleEndReached = (info) => {
        onEndReached === null || onEndReached === void 0 ? void 0 : onEndReached(info);
        if (onLoadMore && hasNext && !locked.current) {
            locked.current = true;
            setLoadingMore(true);
            onLoadMore()
                .then(result => {
                if (mounted.current) {
                    setHasNext(result);
                    setLoadingMore(false);
                    requestAnimationFrame(() => {
                        locked.current = false;
                    });
                }
            })
                .catch(onLoadMoreError);
        }
    };
    const renderSeparator = () => {
        if (dividerSpacing > 0) {
            return <Spacer height={dividerSpacing}/>;
        }
        return null;
    };
    const renderHeader = () => {
        if (header) {
            return <React.Fragment>{header}</React.Fragment>;
        }
        return null;
    };
    const renderFooter = () => {
        if (loadingMore) {
            return (<React.Fragment>
          {loadingMore && (<Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)} pointerEvents="box-none" style={{
                        padding: theme.spacing,
                        alignItems: 'center',
                    }}>
              <ActivityIndicator size={24}/>
            </Animated.View>)}
          {footer}
        </React.Fragment>);
        }
        return <React.Fragment>{footer}</React.Fragment>;
    };
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return (<FlatList ref={ref} ItemSeparatorComponent={renderSeparator} ListHeaderComponent={renderHeader} ListFooterComponent={renderFooter} contentContainerStyle={[
            Object.assign({ paddingHorizontal: horizontalSpacing, paddingBottom: bottomSpacing }, (Platform.OS === 'android' && {
                paddingTop: topSpacing,
            })),
            contentContainerStyle,
        ]} contentInset={{ top: topSpacing }} contentOffset={{ y: -topSpacing, x: 0 }} refreshing={refreshing} refreshControl={<RefreshControl enabled={Boolean(onRefresh)} progressViewOffset={topSpacing} refreshing={refreshing} onRefresh={handleRefresh}/>} onEndReached={handleEndReached} {...props}/>);
};
export const InfiniteList = typedMemo(typedForwardRef(InfiniteListComponent));

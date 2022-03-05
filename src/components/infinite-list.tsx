import React, { useLayoutEffect, useRef, useState } from 'react'
import { FlatList, FlatListProps, Platform, RefreshControl } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useTheme } from '../core/theme'
import { typedForwardRef, typedMemo } from '../utils/typed-react'
import { ActivityIndicator } from './activity-indicator'
import { Spacer } from './spacer'

export interface InfiniteList<ItemT> extends FlatList<ItemT> {}
export interface InfiniteListProps<ItemT>
  extends Omit<
    FlatListProps<ItemT>,
    | 'ItemSeparatorComponent'
    | 'ListHeaderComponent'
    | 'ListHeaderComponentStyle'
    | 'ListFooterComponent'
    | 'ListFooterComponentStyle'
    | 'ListEmptyComponent'
    | 'CellRendererComponent'
    | 'StickyHeaderComponent'
    | 'horizontal'
    | 'showsHorizontalScrollIndicator'
    | 'alwaysBounceHorizontal'
    | 'contentOffset'
    | 'contentInset'
    | 'contentInsetAdjustmentBehavior'
    | 'refreshing'
    | 'refreshControl'
    | 'onRefresh'
  > {
  header?: React.ReactNode
  footer?: React.ReactNode
  dividerSpacing?: number
  horizontalSpacing?: number
  topSpacing?: number
  bottomSpacing?: number
  onRefresh?: () => Promise<void>
  onRefreshError?: (reason: any) => void
  onLoadMore?: () => Promise<boolean>
  onLoadMoreError?: (reason: any) => void
}

const InfiniteListComponent = <ItemT,>(
  {
    header,
    footer,
    dividerSpacing = 0,
    horizontalSpacing = 0,
    topSpacing = 0,
    bottomSpacing = 0,
    contentContainerStyle,
    onRefresh,
    onRefreshError,
    onLoadMore,
    onLoadMoreError,
    onEndReached,
    ...props
  }: InfiniteListProps<ItemT>,
  ref: React.ForwardedRef<InfiniteList<ItemT>>,
) => {
  const theme = useTheme()

  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  const mounted = useRef(false)
  const locked = useRef(false)

  const handleRefresh = () => {
    if (onRefresh && !locked.current) {
      locked.current = true

      setRefreshing(true)
      onRefresh()
        .then(() => {
          if (mounted.current) {
            setRefreshing(false)
            setHasNext(true)

            requestAnimationFrame(() => {
              locked.current = false
            })
          }
        })
        .catch(onRefreshError)
    }
  }

  const handleEndReached = (info: { distanceFromEnd: number }) => {
    onEndReached?.(info)

    if (onLoadMore && hasNext && !locked.current) {
      locked.current = true

      setLoadingMore(true)
      onLoadMore()
        .then(result => {
          if (mounted.current) {
            setHasNext(result)
            setLoadingMore(false)

            requestAnimationFrame(() => {
              locked.current = false
            })
          }
        })
        .catch(onLoadMoreError)
    }
  }

  const renderSeparator = () => {
    if (dividerSpacing > 0) {
      return <Spacer height={dividerSpacing} />
    }

    return null
  }

  const renderHeader = () => {
    if (header) {
      return <React.Fragment>{header}</React.Fragment>
    }

    return null
  }

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <React.Fragment>
          {loadingMore && (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
              pointerEvents="box-none"
              style={{
                padding: theme.spacing,
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size={24} />
            </Animated.View>
          )}
          {footer}
        </React.Fragment>
      )
    }

    return <React.Fragment>{footer}</React.Fragment>
  }

  const renderRefreshControl = () => {
    if (!onRefresh) {
      return undefined
    }

    return (
      <RefreshControl
        progressViewOffset={topSpacing}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    )
  }

  useLayoutEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <FlatList<ItemT>
      ref={ref}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={[
        {
          paddingHorizontal: horizontalSpacing,
          paddingBottom: bottomSpacing,
          ...(Platform.OS === 'android' && {
            paddingTop: topSpacing,
          }),
        },
        contentContainerStyle,
      ]}
      contentInset={{ top: topSpacing }}
      contentOffset={{ y: -topSpacing, x: 0 }}
      refreshing={refreshing}
      refreshControl={renderRefreshControl()}
      onEndReached={handleEndReached}
      {...props}
    />
  )
}

export const InfiniteList = typedMemo(typedForwardRef(InfiniteListComponent))

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../core/theme';
import { Button } from './button';
import { Modal } from './modal';
import { Text } from './text';
export const ActionSheet = ({ items, header, visible, transition = 'slide-up', transitionDuration, onBackdropPress, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    return (<Modal zIndex={theme.componentTheme.actionSheet.zIndex} visible={visible} transition={transition} transitionDuration={transitionDuration} onBackdropPress={onBackdropPress} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
      {header}
      <View style={{
            backgroundColor: theme.backgroundColor.primary,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            overflow: 'hidden',
            paddingBottom: insets.bottom,
        }}>
        {items.map((item, index) => {
            return (<Button key={item.title} style={[
                    {
                        backgroundColor: theme.backgroundColor.primary,
                        height: theme.componentTheme.actionSheet.itemHeight,
                        borderRadius: 0,
                    },
                    index === 0 && {
                        borderTopLeftRadius: theme.borderRadius,
                        borderTopRightRadius: theme.borderRadius,
                    },
                ]} textStyle={{
                    color: theme.textColor.primary,
                }} onPress={() => {
                    var _a;
                    (_a = item.onPress) === null || _a === void 0 ? void 0 : _a.call(item);
                    onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
                }}>
              <Text style={[
                    theme.componentTheme.actionSheet.titleTextStyle,
                    {
                        color: item.destructive
                            ? theme.textColor.destructive
                            : theme.textColor.primary,
                    },
                ]}>
                {item.title}
              </Text>
              {item.subtitle && (<Text style={[
                        theme.componentTheme.actionSheet.subtitleTextStyle,
                        {
                            marginTop: 2,
                            color: item.destructive
                                ? theme.textColor.destructiveSecondary
                                : theme.textColor.secondary,
                        },
                    ]}>
                  {item.subtitle}
                </Text>)}
            </Button>);
        })}
      </View>
    </Modal>);
};

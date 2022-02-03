import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './text';
import { useTheme } from '../core/theme';
import { Button } from './button';
import { Modal } from './modal';
export const ActionSheet = ({ items, visible, transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    return (<Modal zIndex={theme.componentTheme.actionSheet.zIndex} visible={visible} transition="slide" transitionDuration={transitionDuration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.backgroundColor.primary,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            overflow: 'hidden',
            paddingBottom: insets.bottom,
        }}>
      {items.map((item, index) => {
            return (<Button key={item.title} style={Object.assign({ backgroundColor: theme.backgroundColor.primary, height: theme.componentTheme.actionSheet.itemHeight, borderRadius: 0 }, (index === 0 && {
                    borderTopLeftRadius: theme.borderRadius,
                    borderTopRightRadius: theme.borderRadius,
                }))} textStyle={{
                    color: theme.textColor.primary,
                }} onPressed={() => {
                    var _a;
                    (_a = item.onPressed) === null || _a === void 0 ? void 0 : _a.call(item);
                    onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
                }}>
            <Text style={Object.assign(Object.assign({}, theme.componentTheme.actionSheet.titleTextStyle), { color: item.destructive
                        ? theme.textColor.destructive
                        : theme.textColor.primary })}>
              {item.title}
            </Text>
            {item.subtitle && (<Text style={Object.assign(Object.assign({}, theme.componentTheme.actionSheet.subtitleTextStyle), { marginTop: 2, color: item.destructive
                            ? theme.textColor.destructiveSecondary
                            : theme.textColor.secondary })}>
                {item.subtitle}
              </Text>)}
          </Button>);
        })}
    </Modal>);
};

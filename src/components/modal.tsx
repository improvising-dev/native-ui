import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import Animated, {
  BaseAnimationBuilder,
  combineTransition,
  FadingTransition,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'
import { Portal } from './portal'

export type ModalTransition =
  | 'fade'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'

export interface ModalStateProps {
  visible: boolean
  transition?: ModalTransition
  transitionDuration?: number
  onBackdropPressed?: () => void
  onDismiss?: () => void
  onUnmounted?: () => void
}

export interface ModalProps extends ModalStateProps {
  zIndex?: number
  dismissible?: boolean
  backdrop?: boolean
  style?: StyleProp<ViewStyle>
}

export const Modal: React.FC<ModalProps> = ({
  children,
  zIndex = 100,
  dismissible = true,
  backdrop = true,
  transition = 'fade',
  style,
  visible,
  transitionDuration = 400,
  onBackdropPressed,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()

  if (!visible) {
    return null
  }

  const handleBackdropPress = () => {
    onBackdropPressed?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

  const renderBackdrop = () => {
    if (!backdrop) {
      return null
    }

    return (
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          layout={FadingTransition.duration(transitionDuration)}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.backgroundColor.modalBarrier,
              zIndex,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    let layout: BaseAnimationBuilder

    switch (transition) {
      case 'slide-up':
      case 'slide-down':
      case 'slide-left':
      case 'slide-right':
        layout = combineTransition(
          transition === 'slide-up'
            ? new SlideInUp()
            : transition === 'slide-down'
            ? new SlideInDown()
            : transition === 'slide-left'
            ? new SlideInLeft()
            : new SlideInRight(),
          transition === 'slide-up'
            ? new SlideOutDown()
            : transition === 'slide-down'
            ? new SlideOutUp()
            : transition === 'slide-left'
            ? new SlideOutRight()
            : new SlideOutLeft(),
        )
        break
      case 'scale':
        layout = combineTransition(new ZoomIn(), new ZoomOut())
        break
      case 'fade':
      default:
        layout = new FadingTransition()
        break
    }

    layout = layout.duration(transitionDuration)

    if (onUnmounted) {
      layout = layout.withCallback(onUnmounted)
    }

    return (
      <Animated.View layout={layout} style={[{ zIndex: zIndex + 1 }, style]}>
        {children}
      </Animated.View>
    )
  }

  return (
    <Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>
  )
}

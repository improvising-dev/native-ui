import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import { useAnimatedValue } from '../core/animation'
import { Performance } from '../core/performance'
import { useTheme } from '../core/theme'

export interface ModalProps {
  visible: boolean
  dismissible?: boolean
  zIndex?: number
  transition?: 'fade' | 'slide'
  to?: 'top' | 'bottom' | 'left' | 'right'
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  dismissible = true,
  zIndex = 100,
  transition = 'fade',
  to = 'top',
  duration = 400,
  style,
  useNativeDriver = Performance.animation.useNativeDriver,
  onDismiss,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()
  const value = useAnimatedValue(visible ? 1 : 0)

  useEffect(() => {
    Animated.timing(value, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver,
    }).start()
  }, [visible])

  const renderBackdrop = () => {
    return (
      <TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.backgroundColor.modalBarrier,
              zIndex,
              opacity: value,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    if (transition === 'slide') {
      return (
        <Animated.View
          style={{
            zIndex: zIndex + 1,
            transform: [
              to === 'top'
                ? {
                    translateY: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: [dimensions.height, 0],
                    }),
                  }
                : to === 'bottom'
                ? {
                    translateY: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-dimensions.height, 0],
                    }),
                  }
                : to === 'left'
                ? {
                    translateX: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: [dimensions.width, 0],
                    }),
                  }
                : {
                    translateX: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-dimensions.width, 0],
                    }),
                  },
            ],
            ...style,
          }}
        >
          {children}
        </Animated.View>
      )
    } else {
      return (
        <Animated.View
          style={{
            zIndex: zIndex + 1,
            opacity: value,
            ...style,
          }}
        >
          {children}
        </Animated.View>
      )
    }
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {renderBackdrop()}
      {renderContent()}
    </View>
  )
}

export interface ControlledModalProps extends Omit<ModalProps, 'visible'> {}
export interface ControlledModalRef {
  dismiss: () => void
}

export const ControlledModal = forwardRef<
  ControlledModalRef,
  PropsWithChildren<ControlledModalProps>
>(({ duration = 400, onDismiss, ...modalProps }, ref) => {
  const [visible, setVisible] = useState(false)

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(() => onDismiss?.(), duration)
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      dismiss: handleDismiss,
    }
  })

  return (
    <Modal
      duration={duration}
      visible={visible}
      onDismiss={handleDismiss}
      {...modalProps}
    />
  )
})

import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../core/theme'
import { Button } from './button'
import { SlideInModal, SlideInModalProps } from './slide-in-modal'

export interface ActionSheetItem {
  title: string
  subtitle?: string
  destrutive?: boolean
  onPressed?: () => void
}

export interface ActionSheetProps extends SlideInModalProps {
  items: ActionSheetItem[]
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  items,
  visible,
  onDismiss,
}) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <SlideInModal visible={visible} onDismiss={onDismiss}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background.primary,
          borderTopLeftRadius: theme.sizes.borderRadius,
          borderTopRightRadius: theme.sizes.borderRadius,
          overflow: 'hidden',
          paddingBottom: insets.bottom,
        }}
      >
        {items.map((item, index) => {
          return (
            <Button
              key={item.title}
              backgroundColor={theme.colors.background.primary}
              style={{
                height: 60,
                borderRadius: 0,
                ...(index === 0 && {
                  borderTopLeftRadius: theme.sizes.borderRadius,
                  borderTopRightRadius: theme.sizes.borderRadius,
                }),
              }}
              onPressed={item.onPressed}
            >
              {item.title}
            </Button>
          )
        })}
      </View>
    </SlideInModal>
  )
}

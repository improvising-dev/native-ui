import { Pressable } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useTheme } from '../core/theme'

export interface CheckBoxProps {
  value: boolean
  onValueChange?: (value: boolean) => void
}

export const CheckBox: React.FC<CheckBoxProps> = ({ value, onValueChange }) => {
  const theme = useTheme()
  const size = theme.sizes.checkBoxSize
  const iconSize = Math.floor(theme.sizes.checkBoxSize * 0.7)

  return (
    <Pressable
      onPress={() => onValueChange?.(!value)}
      style={{
        width: size,
        height: size,
        borderWidth: 2,
        borderRadius: size / 4,
        borderColor: value
          ? theme.colors.primary
          : theme.colors.text.primaryUnselected,
      }}
    >
      {value && (
        <Icon
          name="checkmark"
          fill={theme.colors.primary}
          width={iconSize}
          height={iconSize}
        />
      )}
    </Pressable>
  )
}

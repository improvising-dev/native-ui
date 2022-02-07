import * as React from 'react'
import Svg, { SvgProps, G, Path, Circle } from 'react-native-svg'

const Back: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
        data-name="arrow-back"
      />
    </G>
  </Svg>
)

const Forward: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
        data-name="arrow-forward"
      />
    </G>
  </Svg>
)

const Checkmark: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33Z"
        data-name="checkmark"
      />
    </G>
  </Svg>
)

const Close: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
        data-name="close"
      />
    </G>
  </Svg>
)

const Send: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"
        data-name="paper-plane"
      />
    </G>
  </Svg>
)

const Add: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <Path
        d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
        data-name="plus"
      />
    </G>
  </Svg>
)

const MoreHorizontal: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <G data-name="more-horizotnal">
        <Circle cx={12} cy={12} r={2} />
        <Circle cx={19} cy={12} r={2} />
        <Circle cx={5} cy={12} r={2} />
      </G>
    </G>
  </Svg>
)

const MoreVertical: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <G data-name="more-vertical">
        <Circle cx={12} cy={12} r={2} />
        <Circle cx={12} cy={5} r={2} />
        <Circle cx={12} cy={19} r={2} />
      </G>
    </G>
  </Svg>
)

export const Icon = {
  Back,
  Forward,
  Checkmark,
  Close,
  Send,
  Add,
  MoreHorizontal,
  MoreVertical,
}

export const DefaultComponentTheme = {
  actionSheet: {
    zIndex: 500,
    itemHeight: 60,
    titleTextStyle: { fontSize: 17 },
    subtitleTextStyle: { fontSize: 12 },
  },
  checkbox: {
    size: 18,
  },
  dialog: {
    zIndex: 1000,
    titleTextStyle: {
      fontSize: 19,
      fontWeight: '500',
    },
    messageTextStyle: { fontSize: 17 },
  },
  fullscreenLoading: {
    zIndex: 5000,
  },
  picker: {
    itemHeight: 50,
    titleTextStyle: { fontSize: 17 },
    subtitleTextStyle: { fontSize: 12 },
  },
} as const

export const DefaultTextTheme = {
  default: {
    fontSize: 17,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    lineHeight: 23,
  },
  button: {
    fontSize: 17,
    fontWeight: '500',
  },
  small: {
    fontSize: 15,
  },
} as const

export const DefaultTheme = {
  spacing: 15,
  borderRadius: 15,
  textTheme: DefaultTextTheme,
  componentTheme: DefaultComponentTheme,
} as const

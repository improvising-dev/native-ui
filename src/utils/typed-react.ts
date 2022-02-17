import React, { forwardRef, memo } from 'react'

export const typedMemo: <T>(component: T) => T = memo
export const typedForwardRef = forwardRef as <T, P = {}>(
  render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null,
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null

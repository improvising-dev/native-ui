import React from 'react'
import { ActionSheet, ActionSheetItem } from '../components/action-sheet'
import { showModal } from './modal'

export const showActionSheet = (
  items: ActionSheetItem[],
  { header }: { header?: React.ReactNode } = {},
) => {
  const { dispose } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <ActionSheet
        header={header}
        items={items}
        visible={visible}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
      />
    ),
  })
}

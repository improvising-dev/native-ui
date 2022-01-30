import React from 'react'
import { ActionSheet, ActionSheetItem } from '../components/action-sheet'
import { showModal } from './modal'

export const showActionSheet = (items: ActionSheetItem[]) => {
  const { dispose } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <ActionSheet
        items={items}
        visible={visible}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
      />
    ),
  })
}

import React from 'react'
import { ActionSheet, ActionSheetItem } from '../components/action-sheet'
import { showModal } from './modal'

export const showActionSheet = (items: ActionSheetItem[]) => {
  const disposeModal = showModal(
    <ActionSheet items={items} onDismiss={() => disposeModal()} />,
  )
}

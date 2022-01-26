import { memo, useEffect, useState } from 'react'
import { globalEvent } from '../core/event'
import { ActionSheet, ActionSheetItem } from './action-sheet'

export const ActionSheetDelegate: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)
  const [items, setItems] = useState<ActionSheetItem[]>([])

  useEffect(() => {
    globalEvent.on('ActionSheet.showActionSheet', event => {
      setItems(event.data)
      setVisible(true)
    })

    return () => {
      globalEvent.off('ActionSheet.showActionSheet')
    }
  }, [])

  return (
    <ActionSheet
      items={items}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  )
})

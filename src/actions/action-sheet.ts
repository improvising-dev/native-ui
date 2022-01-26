import { ActionSheetItem } from '../components/action-sheet'
import { globalEvent } from '../core/event'

export const showActionSheet = (items: ActionSheetItem[]) => {
  globalEvent.fire('ActionSheet.showActionSheet', items)
}

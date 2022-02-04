import { BaseController } from '../core/controller'

interface FullscreenLoadingMethods {
  setMessage: (value?: string) => void
}

export class FullscreenLoadingController extends BaseController<FullscreenLoadingMethods> {
  setMessage(message?: string) {
    this.methods?.setMessage(message)
  }
}

import { useEffect } from 'react'

export class BaseController<T> {
  protected methods?: T

  mount(methods: T) {
    this.methods = methods
  }

  unmount() {
    delete this.methods
  }
}

export const useMountController = <T,>({
  controller,
  methods,
}: {
  controller?: BaseController<T>
  methods: T
}) => {
  useEffect(() => {
    controller?.mount(methods)

    return () => {
      controller?.unmount()
    }
  }, [])
}

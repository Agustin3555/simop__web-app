export class LocalStorageEntity<T> {
  constructor(protected entity: string) {}

  set(value: T) {
    window.localStorage.setItem(this.entity, JSON.stringify(value))
  }

  get() {
    const value = window.localStorage.getItem(this.entity)

    return value ? (JSON.parse(value) as T) : null
  }

  delete() {
    window.localStorage.removeItem(this.entity)
  }
}

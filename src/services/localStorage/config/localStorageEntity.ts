export class LocalStorageEntity<T> {
  constructor(protected key: string) {}

  set(value: T) {
    window.localStorage.setItem(this.key, JSON.stringify(value))
  }

  get() {
    const value = window.localStorage.getItem(this.key)

    return value ? (JSON.parse(value) as T) : null
  }

  delete() {
    window.localStorage.removeItem(this.key)
  }
}

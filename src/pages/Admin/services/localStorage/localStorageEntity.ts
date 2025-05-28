export class LocalStorageEntity<T> {
  constructor(protected key: string, defaultValue: T) {
    const exists = localStorage.getItem(key) !== null

    if (!exists) localStorage.setItem(key, JSON.stringify(defaultValue))
  }

  get state() {
    const value = localStorage.getItem(this.key)

    return JSON.parse(value!) as T
  }

  set state(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  delete() {
    localStorage.removeItem(this.key)
  }
}

export class LocalStorageEntity<T> {
  constructor(
    protected key: string,
    private validate: (data: unknown) => data is T,
  ) {}

  get state() {
    const value = localStorage.getItem(this.key)

    if (!value)
      throw new Error(`No data found in localStorage for key "${this.key}"`)

    const parsed = JSON.parse(value)

    if (!this.validate(parsed))
      throw new Error(`Invalid data structure for key "${this.key}"`)

    return parsed
  }

  set state(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  delete() {
    localStorage.removeItem(this.key)
  }
}

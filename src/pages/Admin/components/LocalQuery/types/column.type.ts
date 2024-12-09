import { Meta } from '.'

interface Column<T> extends Meta {
  key: keyof T
  header: string
}

export type Columns<T> = Column<T>[]

import { Ref } from '.'

export interface GetAllProvider<T> {
  getAllProvider: () => Promise<T[]>
}

export interface GetForConnectProvider {
  getForConnectProvider: () => Promise<Ref[]>
}

export interface GetOneProvider<T> {
  getOneProvider: (id: number) => Promise<T>
}

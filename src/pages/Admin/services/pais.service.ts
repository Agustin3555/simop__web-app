import { publicInstance, Service } from '@/services/config'
import { PaisModel } from '../models'
import { PaisAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('pais')

export const PaisService: Service<PaisModel.Entity, PaisModel.CreateData> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return PaisAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return PaisAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return PaisAdapter.getOne.output(response.data)
  },

  create: async data => {
    const adaptedInput = PaisAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
}

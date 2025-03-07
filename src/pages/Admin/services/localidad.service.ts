import { publicInstance, Service } from '@/services/config'
import { LocalidadModel } from '../models'
import { LocalidadAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('localidades')

export const LocalidadService: Service<LocalidadModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return LocalidadAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return LocalidadAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return LocalidadAdapter.getOne.output(response.data)
  },

  create: async (data: LocalidadModel.CreateData) => {
    const adaptedInput = LocalidadAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: LocalidadModel.UpdateData) => {
    const adaptedInput = LocalidadAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { LocalidadModel } from '.'
import { LocalidadAdapter } from './localidad.adapter'

const collection = buildPath('localidades')

export const LocalidadService: Service<LocalidadModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return LocalidadAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return LocalidadAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return LocalidadAdapter.getOne.output(response.data)
  },

  create: async (data: LocalidadModel.CreateEntity) => {
    const adaptedInput = LocalidadAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return LocalidadAdapter.create.output(response.data)
  },

  updateOne: async (id, data: LocalidadModel.UpdateEntity) => {
    const adaptedInput = LocalidadAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return LocalidadAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

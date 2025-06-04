import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { ProvinciaModel } from '.'
import { ProvinciaAdapter } from './provincia.adapter'

const collection = buildPath('provincias')

export const ProvinciaService: Service<ProvinciaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ProvinciaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return ProvinciaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ProvinciaAdapter.getOne.output(response.data)
  },

  create: async (data: ProvinciaModel.CreateEntity) => {
    const adaptedInput = ProvinciaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return ProvinciaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: ProvinciaModel.UpdateEntity) => {
    const adaptedInput = ProvinciaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return ProvinciaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

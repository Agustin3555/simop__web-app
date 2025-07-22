import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { PaisModel } from '.'
import { PaisAdapter } from './pais.adapter'

const collection = buildPath('paises')

export const PaisService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return PaisAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return PaisAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return PaisAdapter.getOne.output(response.data)
  },

  create: async (data: PaisModel.CreateEntity) => {
    const adaptedInput = PaisAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return PaisAdapter.create.output(response.data)
  },

  updateOne: async (id, data: PaisModel.UpdateEntity) => {
    const adaptedInput = PaisAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return PaisAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<PaisModel.Entity>

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { PaisAdapter, PaisModel } from '.'

const collection = buildPath('paises')

export const PaisService: Service<PaisModel.Entity> = {
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

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: PaisModel.UpdateEntity) => {
    const adaptedInput = PaisAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

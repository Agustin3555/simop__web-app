import { publicInstance, Service } from '@/services/config'
import { TipoRecepcionModel } from '../models'
import { TipoRecepcionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-recepciones')

export const TipoRecepcionService: Service<TipoRecepcionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoRecepcionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoRecepcionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoRecepcionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoRecepcionModel.CreateEntity) => {
    const adaptedInput = TipoRecepcionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoRecepcionModel.UpdateEntity) => {
    const adaptedInput = TipoRecepcionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

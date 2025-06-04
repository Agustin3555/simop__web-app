import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRecepcionModel } from '.'
import { TipoRecepcionAdapter } from './tipoRecepcion.adapter'

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

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoRecepcionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoRecepcionModel.UpdateEntity) => {
    const adaptedInput = TipoRecepcionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoRecepcionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoEstadoObraModel } from '.'
import { TipoEstadoObraAdapter } from './tipoEstadoObra.adapter'

const collection = buildPath('tipos-estados-obra')

export const TipoEstadoObraService: Service<TipoEstadoObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoEstadoObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoEstadoObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoEstadoObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoEstadoObraModel.CreateEntity) => {
    const adaptedInput = TipoEstadoObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoEstadoObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoEstadoObraModel.UpdateEntity) => {
    const adaptedInput = TipoEstadoObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoEstadoObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

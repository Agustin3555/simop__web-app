import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoTematicaObraModel } from '.'
import { TipoTematicaObraAdapter } from './tipoTematicaObra.adapter'

const collection = buildPath('tipos-tematicas-obra')

export const TipoTematicaObraService: Service<TipoTematicaObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoTematicaObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoTematicaObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoTematicaObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoTematicaObraModel.CreateEntity) => {
    const adaptedInput = TipoTematicaObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoTematicaObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoTematicaObraModel.UpdateEntity) => {
    const adaptedInput = TipoTematicaObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoTematicaObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

import { publicInstance, Service } from '@/services/config'
import { TipoTematicaObraModel } from '../models'
import { TipoTematicaObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-tematicas-obra')

export const TipoTematicaObraService: Service<TipoTematicaObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoTematicaObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoTematicaObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoTematicaObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoTematicaObraModel.CreateData) => {
    const adaptedInput = TipoTematicaObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

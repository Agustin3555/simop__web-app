import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoTematicaObraModel } from '.'
import { TipoTematicaObraAdapter } from './tipoTematicaObra.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-tematicas-obra')

export const TipoTematicaObraService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoTematicaObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoTematicaObraAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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
} satisfies Service<TipoTematicaObraModel.Entity>

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoProgramaObraModel } from '.'
import { TipoProgramaObraAdapter } from './tipoProgramaObra.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-programas-obra')

export const TipoProgramaObraService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoProgramaObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoProgramaObraAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return TipoProgramaObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoProgramaObraModel.CreateEntity) => {
    const adaptedInput = TipoProgramaObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoProgramaObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoProgramaObraModel.UpdateEntity) => {
    const adaptedInput = TipoProgramaObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoProgramaObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoProgramaObraModel.Entity>

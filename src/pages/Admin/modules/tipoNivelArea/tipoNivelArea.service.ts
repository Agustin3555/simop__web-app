import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoNivelAreaModel } from '.'
import { TipoNivelAreaAdapter } from './tipoNivelArea.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-niveles-area')

export const TipoNivelAreaService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoNivelAreaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoNivelAreaAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return TipoNivelAreaAdapter.getOne.output(response.data)
  },

  create: async (data: TipoNivelAreaModel.CreateEntity) => {
    const adaptedInput = TipoNivelAreaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoNivelAreaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoNivelAreaModel.UpdateEntity) => {
    const adaptedInput = TipoNivelAreaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoNivelAreaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoNivelAreaModel.Entity>

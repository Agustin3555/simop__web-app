import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoNivelAreaModel } from '.'
import { TipoNivelAreaAdapter } from './tipoNivelArea.adapter'

const collection = buildPath('tipos-niveles-area')

export const TipoNivelAreaService: Service<TipoNivelAreaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoNivelAreaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoNivelAreaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

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
}

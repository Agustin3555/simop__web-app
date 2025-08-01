import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRedeterminacionModel } from '.'
import { TipoRedeterminacionAdapter } from './tipoRedeterminacion.adapter'

const collection = buildPath('tipos-redeterminaciones')

export const TipoRedeterminacionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoRedeterminacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoRedeterminacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoRedeterminacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoRedeterminacionModel.CreateEntity) => {
    const adaptedInput = TipoRedeterminacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoRedeterminacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoRedeterminacionModel.UpdateEntity) => {
    const adaptedInput = TipoRedeterminacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoRedeterminacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoRedeterminacionModel.Entity>

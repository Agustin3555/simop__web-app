import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoParalizacionModel } from '.'
import { TipoParalizacionAdapter } from './tipoParalizacion.adapter'

const collection = buildPath('tipos-paralizaciones')

export const TipoParalizacionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoParalizacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoParalizacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoParalizacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoParalizacionModel.CreateEntity) => {
    const adaptedInput = TipoParalizacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoParalizacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoParalizacionModel.UpdateEntity) => {
    const adaptedInput = TipoParalizacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoParalizacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoParalizacionModel.Entity>

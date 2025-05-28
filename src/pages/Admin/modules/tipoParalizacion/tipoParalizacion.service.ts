import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoParalizacionModel } from '.'
import { TipoParalizacionAdapter } from './tipoParalizacion.adapter'

const collection = buildPath('tipos-paralizaciones')

export const TipoParalizacionService: Service<TipoParalizacionModel.Entity> = {
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

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoParalizacionModel.UpdateEntity) => {
    const adaptedInput = TipoParalizacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

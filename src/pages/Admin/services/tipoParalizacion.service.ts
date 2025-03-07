import { publicInstance, Service } from '@/services/config'
import { TipoParalizacionModel } from '../models'
import { TipoParalizacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-paralizaciones')

export const TipoParalizacionService: Service<TipoParalizacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoParalizacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoParalizacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoParalizacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoParalizacionModel.CreateData) => {
    const adaptedInput = TipoParalizacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoParalizacionModel.UpdateData) => {
    const adaptedInput = TipoParalizacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoParalizacionModel } from '.'
import { TipoParalizacionAdapter } from './tipoParalizacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-paralizaciones')

export const TipoParalizacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoParalizacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoParalizacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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

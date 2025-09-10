import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoModificacionModel } from '.'
import { TipoModificacionAdapter } from './tipoModificacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-modificaciones')

export const TipoModificacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoModificacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoModificacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return TipoModificacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoModificacionModel.CreateEntity) => {
    const adaptedInput = TipoModificacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoModificacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoModificacionModel.UpdateEntity) => {
    const adaptedInput = TipoModificacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoModificacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoModificacionModel.Entity>

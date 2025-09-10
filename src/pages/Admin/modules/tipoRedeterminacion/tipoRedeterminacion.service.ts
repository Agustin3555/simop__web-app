import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoRedeterminacionModel } from '.'
import { TipoRedeterminacionAdapter } from './tipoRedeterminacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-redeterminaciones')

export const TipoRedeterminacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoRedeterminacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoRedeterminacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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

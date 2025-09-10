import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { PagoCertificacionModel } from '.'
import { PagoCertificacionAdapter } from './pagoCertificacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('pagos-certificaciones')

export const PagoCertificacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return PagoCertificacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(PagoCertificacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return PagoCertificacionAdapter.getOne.output(response.data)
  },

  create: async (data: PagoCertificacionModel.CreateEntity) => {
    const adaptedInput = PagoCertificacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return PagoCertificacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: PagoCertificacionModel.UpdateEntity) => {
    const adaptedInput = PagoCertificacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return PagoCertificacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<PagoCertificacionModel.Entity>

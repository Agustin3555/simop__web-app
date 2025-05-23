import { publicInstance, Service } from '@/services/config'
import { PagoCertificacionModel } from '../models'
import { PagoCertificacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('pagos-certificaciones')

export const PagoCertificacionService: Service<PagoCertificacionModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return PagoCertificacionAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return PagoCertificacionAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return PagoCertificacionAdapter.getOne.output(response.data)
    },

    create: async (data: PagoCertificacionModel.CreateEntity) => {
      const adaptedInput = PagoCertificacionAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    updateOne: async (id, data: PagoCertificacionModel.UpdateEntity) => {
      const adaptedInput = PagoCertificacionAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

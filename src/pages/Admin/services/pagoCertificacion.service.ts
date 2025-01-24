import { publicInstance, Service } from '@/services/config'
import { PagoCertificacionModel } from '../models'
import { PagoCertificacionAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('pagos-certificaciones')

export const PagoCertificacionService: Service<PagoCertificacionModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return PagoCertificacionAdapter.getAll.output(response.data)
    },

    getForConnect: async () => {
      const response = await publicInstance.get(collection('for-connect'))

      return PagoCertificacionAdapter.getForConnect.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return PagoCertificacionAdapter.getOne.output(response.data)
    },

    create: async (data: PagoCertificacionModel.CreateData) => {
      const adaptedInput = PagoCertificacionAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
  }

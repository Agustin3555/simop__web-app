import { publicInstance, Service } from '@/services/config'
import { TipoContratacionObraModel } from '../models'
import { TipoContratacionObraAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-contrataciones-obra')

export const TipoContratacionObraService: Service<TipoContratacionObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoContratacionObraAdapter.getAll.output(response.data)
    },

    getForConnect: async () => {
      const response = await publicInstance.get(collection('for-connect'))

      return TipoContratacionObraAdapter.getForConnect.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoContratacionObraAdapter.getOne.output(response.data)
    },

    create: async (data: TipoContratacionObraModel.CreateData) => {
      const adaptedInput = TipoContratacionObraAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
  }

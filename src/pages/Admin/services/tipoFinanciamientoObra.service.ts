import { publicInstance, Service } from '@/services/config'
import { TipoFinanciamientoObraModel } from '../models'
import { TipoFinanciamientoObraAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-financiamientos-obra')

export const TipoFinanciamientoObraService: Service<TipoFinanciamientoObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoFinanciamientoObraAdapter.getAll.output(response.data)
    },

    getForConnect: async () => {
      const response = await publicInstance.get(collection('for-connect'))

      return TipoFinanciamientoObraAdapter.getForConnect.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoFinanciamientoObraAdapter.getOne.output(response.data)
    },

    create: async (data: TipoFinanciamientoObraModel.CreateData) => {
      const adaptedInput = TipoFinanciamientoObraAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
  }
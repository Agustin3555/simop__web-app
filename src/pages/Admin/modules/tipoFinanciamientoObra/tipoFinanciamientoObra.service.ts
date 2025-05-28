import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoFinanciamientoObraModel } from '.'
import { TipoFinanciamientoObraAdapter } from './tipoFinanciamientoObra.adapter'

const collection = buildPath('tipos-financiamientos-obra')

export const TipoFinanciamientoObraService: Service<TipoFinanciamientoObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoFinanciamientoObraAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return TipoFinanciamientoObraAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoFinanciamientoObraAdapter.getOne.output(response.data)
    },

    create: async (data: TipoFinanciamientoObraModel.CreateEntity) => {
      const adaptedInput = TipoFinanciamientoObraAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    updateOne: async (id, data: TipoFinanciamientoObraModel.UpdateEntity) => {
      const adaptedInput = TipoFinanciamientoObraAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

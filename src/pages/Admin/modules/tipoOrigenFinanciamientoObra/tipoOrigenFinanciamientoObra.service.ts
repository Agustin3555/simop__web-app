import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoOrigenFinanciamientoObraModel } from '.'
import { TipoOrigenFinanciamientoObraAdapter } from './tipoOrigenFinanciamientoObra.adapter'

const collection = buildPath('tipos-origenes-financiamientos-obra')

export const TipoOrigenFinanciamientoObraService: Service<TipoOrigenFinanciamientoObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoOrigenFinanciamientoObraAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return TipoOrigenFinanciamientoObraAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoOrigenFinanciamientoObraAdapter.getOne.output(response.data)
    },

    create: async (data: TipoOrigenFinanciamientoObraModel.CreateEntity) => {
      const adaptedInput =
        TipoOrigenFinanciamientoObraAdapter.create.input(data)

      const response = await publicInstance.post(collection(), adaptedInput)

      return TipoOrigenFinanciamientoObraAdapter.create.output(response.data)
    },

    updateOne: async (
      id,
      data: TipoOrigenFinanciamientoObraModel.UpdateEntity,
    ) => {
      const adaptedInput =
        TipoOrigenFinanciamientoObraAdapter.updateOne.input(data)

      const response = await publicInstance.put(collection(id), adaptedInput)

      return TipoOrigenFinanciamientoObraAdapter.updateOne.output(response.data)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

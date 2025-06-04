import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoContratacionObraModel } from '.'
import { TipoContratacionObraAdapter } from './tipoContratacionObra.adapter'

const collection = buildPath('tipos-contrataciones-obra')

export const TipoContratacionObraService: Service<TipoContratacionObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoContratacionObraAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return TipoContratacionObraAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoContratacionObraAdapter.getOne.output(response.data)
    },

    create: async (data: TipoContratacionObraModel.CreateEntity) => {
      const adaptedInput = TipoContratacionObraAdapter.create.input(data)

      const response = await publicInstance.post(collection(), adaptedInput)

      return TipoContratacionObraAdapter.create.output(response.data)
    },

    updateOne: async (id, data: TipoContratacionObraModel.UpdateEntity) => {
      const adaptedInput = TipoContratacionObraAdapter.updateOne.input(data)

      const response = await publicInstance.put(collection(id), adaptedInput)

      return TipoContratacionObraAdapter.updateOne.output(response.data)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

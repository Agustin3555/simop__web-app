import { publicInstance, Service } from '@/services/config'
import { TipoRedeterminacionModel } from '../models'
import { TipoRedeterminacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-redeterminaciones')

export const TipoRedeterminacionService: Service<TipoRedeterminacionModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoRedeterminacionAdapter.getAll.output(response.data)
    },

    getForConnect: async () => {
      const response = await publicInstance.get(collection('for-connect'))

      return TipoRedeterminacionAdapter.getForConnect.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoRedeterminacionAdapter.getOne.output(response.data)
    },

    create: async (data: TipoRedeterminacionModel.CreateData) => {
      const adaptedInput = TipoRedeterminacionAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

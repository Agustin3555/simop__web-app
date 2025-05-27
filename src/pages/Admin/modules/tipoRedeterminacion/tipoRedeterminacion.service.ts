import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRedeterminacionAdapter, TipoRedeterminacionModel } from '.'

const collection = buildPath('tipos-redeterminaciones')

export const TipoRedeterminacionService: Service<TipoRedeterminacionModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoRedeterminacionAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return TipoRedeterminacionAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoRedeterminacionAdapter.getOne.output(response.data)
    },

    create: async (data: TipoRedeterminacionModel.CreateEntity) => {
      const adaptedInput = TipoRedeterminacionAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    updateOne: async (id, data: TipoRedeterminacionModel.UpdateEntity) => {
      const adaptedInput = TipoRedeterminacionAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

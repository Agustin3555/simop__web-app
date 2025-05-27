import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRepresentanteAdapter, TipoRepresentanteModel } from '.'

const collection = buildPath('tipos-representantes')

export const TipoRepresentanteService: Service<TipoRepresentanteModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoRepresentanteAdapter.getAll.output(response.data)
    },

    getRefs: async () => {
      const response = await publicInstance.get(collection('refs'))

      return TipoRepresentanteAdapter.getRefs.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoRepresentanteAdapter.getOne.output(response.data)
    },

    create: async (data: TipoRepresentanteModel.CreateEntity) => {
      const adaptedInput = TipoRepresentanteAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    updateOne: async (id, data: TipoRepresentanteModel.UpdateEntity) => {
      const adaptedInput = TipoRepresentanteAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

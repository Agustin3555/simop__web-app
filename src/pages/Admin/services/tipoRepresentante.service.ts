import { publicInstance, Service } from '@/services/config'
import { TipoRepresentanteModel } from '../models'
import { TipoRepresentanteAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-representantes')

export const TipoRepresentanteService: Service<TipoRepresentanteModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return TipoRepresentanteAdapter.getAll.output(response.data)
    },

    getForConnect: async () => {
      const response = await publicInstance.get(collection('for-connect'))

      return TipoRepresentanteAdapter.getForConnect.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return TipoRepresentanteAdapter.getOne.output(response.data)
    },

    create: async (data: TipoRepresentanteModel.CreateData) => {
      const adaptedInput = TipoRepresentanteAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
    updateOne: async (id, data: TipoRepresentanteModel.UpdateData) => {
      const adaptedInput = TipoRepresentanteAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

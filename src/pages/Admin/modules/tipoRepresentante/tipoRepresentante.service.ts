import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRepresentanteModel } from '.'
import { TipoRepresentanteAdapter } from './tipoRepresentante.adapter'

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

      const response = await publicInstance.post(collection(), adaptedInput)

      return TipoRepresentanteAdapter.create.output(response.data)
    },

    updateOne: async (id, data: TipoRepresentanteModel.UpdateEntity) => {
      const adaptedInput = TipoRepresentanteAdapter.updateOne.input(data)

      const response = await publicInstance.put(collection(id), adaptedInput)

      return TipoRepresentanteAdapter.updateOne.output(response.data)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

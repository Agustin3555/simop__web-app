import { publicInstance, Service } from '@/services/config'
import { RepresentanteObraModel } from '../models'
import { RepresentanteObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('representantes-obras')

export const RepresentanteObraService: Service<RepresentanteObraModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return RepresentanteObraAdapter.getAll.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

      return RepresentanteObraAdapter.getOne.output(response.data)
    },

    create: async (data: RepresentanteObraModel.CreateData) => {
      const adaptedInput = RepresentanteObraAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

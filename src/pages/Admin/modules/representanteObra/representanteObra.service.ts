import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RepresentanteObraModel } from '.'
import { RepresentanteObraAdapter } from './representanteObra.adapter'

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

    create: async (data: RepresentanteObraModel.CreateEntity) => {
      const adaptedInput = RepresentanteObraAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },

    updateOne: async (id, data: RepresentanteObraModel.UpdateEntity) => {
      const adaptedInput = RepresentanteObraAdapter.updateOne.input(data)

      await publicInstance.put(collection(id), adaptedInput)
    },

    deleteMany: async ids => await deleteManyHandler(collection, ids),
  }

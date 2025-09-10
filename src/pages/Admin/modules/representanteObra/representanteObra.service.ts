import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { RepresentanteObraModel } from '.'
import { RepresentanteObraAdapter } from './representanteObra.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('representantes-obras')

export const RepresentanteObraService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return RepresentanteObraAdapter.getAll.output(response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return RepresentanteObraAdapter.getOne.output(response.data)
  },

  create: async (data: RepresentanteObraModel.CreateEntity) => {
    const adaptedInput = RepresentanteObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RepresentanteObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RepresentanteObraModel.UpdateEntity) => {
    const adaptedInput = RepresentanteObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RepresentanteObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RepresentanteObraModel.Entity>

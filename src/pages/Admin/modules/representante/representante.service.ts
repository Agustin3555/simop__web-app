import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { RepresentanteModel } from '.'
import { RepresentanteAdapter } from './representante.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('representantes')

export const RepresentanteService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return RepresentanteAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(RepresentanteAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return RepresentanteAdapter.getOne.output(response.data)
  },

  create: async (data: RepresentanteModel.CreateEntity) => {
    const adaptedInput = RepresentanteAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RepresentanteAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RepresentanteModel.UpdateEntity) => {
    const adaptedInput = RepresentanteAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RepresentanteAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RepresentanteModel.Entity>

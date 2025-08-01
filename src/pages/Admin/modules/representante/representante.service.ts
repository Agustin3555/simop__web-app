import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RepresentanteModel } from '.'
import { RepresentanteAdapter } from './representante.adapter'

const collection = buildPath('representantes')

export const RepresentanteService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RepresentanteAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return RepresentanteAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

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

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RepresentanteAdapter, RepresentanteModel } from '.'

const collection = buildPath('representantes')

export const RepresentanteService: Service<RepresentanteModel.Entity> = {
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

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: RepresentanteModel.UpdateEntity) => {
    const adaptedInput = RepresentanteAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

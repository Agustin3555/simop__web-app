import { publicInstance, Service } from '@/services/config'
import { SubSecretariaModel } from '../models'
import { SubSecretariaAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('sub-secretarias')

export const SubSecretariaService: Service<SubSecretariaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return SubSecretariaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return SubSecretariaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return SubSecretariaAdapter.getOne.output(response.data)
  },

  create: async (data: SubSecretariaModel.CreateEntity) => {
    const adaptedInput = SubSecretariaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: SubSecretariaModel.UpdateEntity) => {
    const adaptedInput = SubSecretariaAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

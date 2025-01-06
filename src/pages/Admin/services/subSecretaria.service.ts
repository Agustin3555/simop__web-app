import { publicInstance, Service } from '@/services/config'
import { SubSecretariaModel } from '../models'
import { SubSecretariaAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('sub-secretarias')

export const SubSecretariaService: Service<SubSecretariaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return SubSecretariaAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return SubSecretariaAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return SubSecretariaAdapter.getOne.output(response.data)
  },

  create: async (data: SubSecretariaModel.CreateData) => {
    const adaptedInput = SubSecretariaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
}

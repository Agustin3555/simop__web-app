import { publicInstance, Service } from '@/services/config'
import { RepresentanteModel } from '../models'
import { RepresentanteAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('representantes')

export const RepresentanteService: Service<RepresentanteModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RepresentanteAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return RepresentanteAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RepresentanteAdapter.getOne.output(response.data)
  },

  create: async (data: RepresentanteModel.CreateData) => {
    const adaptedInput = RepresentanteAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
}
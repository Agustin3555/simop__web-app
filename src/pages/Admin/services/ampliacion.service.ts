import { publicInstance, Service } from '@/services/config'
import { AmpliacionModel } from '../models'
import { AmpliacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('ampliaciones')

export const AmpliacionService: Service<AmpliacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return AmpliacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return AmpliacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return AmpliacionAdapter.getOne.output(response.data)
  },

  create: async (data: AmpliacionModel.CreateData) => {
    const adaptedInput = AmpliacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: AmpliacionModel.UpdateData) => {
    const adaptedInput = AmpliacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

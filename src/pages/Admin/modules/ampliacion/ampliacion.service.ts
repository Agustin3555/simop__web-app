import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { AmpliacionAdapter } from './ampliacion.adapter'
import { AmpliacionModel } from '.'

const collection = buildPath('ampliaciones')

export const AmpliacionService: Service<AmpliacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return AmpliacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return AmpliacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return AmpliacionAdapter.getOne.output(response.data)
  },

  create: async (data: AmpliacionModel.CreateEntity) => {
    const adaptedInput = AmpliacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: AmpliacionModel.UpdateEntity) => {
    const adaptedInput = AmpliacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

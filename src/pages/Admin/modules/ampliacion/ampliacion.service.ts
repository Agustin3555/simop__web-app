import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { AmpliacionAdapter } from './ampliacion.adapter'
import { AmpliacionModel } from '.'

const collection = buildPath('ampliaciones')

export const AmpliacionService = {
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

    const response = await publicInstance.post(collection(), adaptedInput)

    return AmpliacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: AmpliacionModel.UpdateEntity) => {
    const adaptedInput = AmpliacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return AmpliacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<AmpliacionModel.Entity>

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { ParalizacionModel } from '.'
import { ParalizacionAdapter } from './paralizacion.adapter'

const collection = buildPath('paralizaciones')

export const ParalizacionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ParalizacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return ParalizacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ParalizacionAdapter.getOne.output(response.data)
  },

  create: async (data: ParalizacionModel.CreateEntity) => {
    const adaptedInput = ParalizacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return ParalizacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: ParalizacionModel.UpdateEntity) => {
    const adaptedInput = ParalizacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return ParalizacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<ParalizacionModel.Entity>

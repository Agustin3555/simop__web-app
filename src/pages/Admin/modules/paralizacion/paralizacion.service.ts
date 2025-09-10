import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { ParalizacionModel } from '.'
import { ParalizacionAdapter } from './paralizacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('paralizaciones')

export const ParalizacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return ParalizacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(ParalizacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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

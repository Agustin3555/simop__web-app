import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { FojaMedicionModel } from '.'
import { FojaMedicionAdapter } from './fojaMedicion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('fojas-mediciones')

export const FojaMedicionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return FojaMedicionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(FojaMedicionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return FojaMedicionAdapter.getOne.output(response.data)
  },

  create: async (data: FojaMedicionModel.CreateEntity) => {
    const adaptedInput = FojaMedicionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return FojaMedicionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: FojaMedicionModel.UpdateEntity) => {
    const adaptedInput = FojaMedicionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return FojaMedicionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<FojaMedicionModel.Entity>

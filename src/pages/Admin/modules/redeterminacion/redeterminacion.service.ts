import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { RedeterminacionModel } from '.'
import { RedeterminacionAdapter } from './redeterminacion.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('redeterminaciones')

export const RedeterminacionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return RedeterminacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(RedeterminacionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return RedeterminacionAdapter.getOne.output(response.data)
  },

  create: async (data: RedeterminacionModel.CreateEntity) => {
    const adaptedInput = RedeterminacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RedeterminacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RedeterminacionModel.UpdateEntity) => {
    const adaptedInput = RedeterminacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RedeterminacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RedeterminacionModel.Entity>

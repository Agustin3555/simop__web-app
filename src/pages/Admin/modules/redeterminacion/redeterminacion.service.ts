import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RedeterminacionModel } from '.'
import { RedeterminacionAdapter } from './redeterminacion.adapter'

const collection = buildPath('redeterminaciones')

export const RedeterminacionService: Service<RedeterminacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RedeterminacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return RedeterminacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RedeterminacionAdapter.getOne.output(response.data)
  },

  create: async (data: RedeterminacionModel.CreateEntity) => {
    const adaptedInput = RedeterminacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: RedeterminacionModel.UpdateEntity) => {
    const adaptedInput = RedeterminacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

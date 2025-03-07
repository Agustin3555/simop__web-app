import { publicInstance, Service } from '@/services/config'
import { RedeterminacionModel } from '../models'
import { RedeterminacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('redeterminaciones')

export const RedeterminacionService: Service<RedeterminacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RedeterminacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return RedeterminacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RedeterminacionAdapter.getOne.output(response.data)
  },

  create: async (data: RedeterminacionModel.CreateData) => {
    const adaptedInput = RedeterminacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: RedeterminacionModel.UpdateData) => {
    const adaptedInput = RedeterminacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

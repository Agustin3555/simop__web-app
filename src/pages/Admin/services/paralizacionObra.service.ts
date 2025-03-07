import { publicInstance, Service } from '@/services/config'
import { ParalizacionObraModel } from '../models'
import { ParalizacionObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-paralizaciones-obras')

export const ParalizacionObraService: Service<ParalizacionObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ParalizacionObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ParalizacionObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ParalizacionObraAdapter.getOne.output(response.data)
  },

  create: async (data: ParalizacionObraModel.CreateData) => {
    const adaptedInput = ParalizacionObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: ParalizacionObraModel.UpdateData) => {
    const adaptedInput = ParalizacionObraAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

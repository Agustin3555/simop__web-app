import { publicInstance, Service } from '@/services/config'
import { ModificacionObraModel } from '../models'
import { ModificacionObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipo-modificaciones-obra')

export const ModificacionObraService: Service<ModificacionObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ModificacionObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ModificacionObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ModificacionObraAdapter.getOne.output(response.data)
  },

  create: async (data: ModificacionObraModel.CreateData) => {
    const adaptedInput = ModificacionObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

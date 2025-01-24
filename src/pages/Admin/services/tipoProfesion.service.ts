import { publicInstance, Service } from '@/services/config'
import { TipoProfesionModel } from '../models'
import { TipoProfesionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-profesiones')

export const TipoProfesionService: Service<TipoProfesionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoProfesionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoProfesionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoProfesionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoProfesionModel.CreateData) => {
    const adaptedInput = TipoProfesionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

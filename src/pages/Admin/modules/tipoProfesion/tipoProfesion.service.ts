import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoProfesionModel } from '.'
import { TipoProfesionAdapter } from './tipoProfesion.adapter'

const collection = buildPath('tipos-profesiones')

export const TipoProfesionService: Service<TipoProfesionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoProfesionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoProfesionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoProfesionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoProfesionModel.CreateEntity) => {
    const adaptedInput = TipoProfesionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoProfesionModel.UpdateEntity) => {
    const adaptedInput = TipoProfesionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

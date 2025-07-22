import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoProfesionModel } from '.'
import { TipoProfesionAdapter } from './tipoProfesion.adapter'

const collection = buildPath('tipos-profesiones')

export const TipoProfesionService = {
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

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoProfesionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoProfesionModel.UpdateEntity) => {
    const adaptedInput = TipoProfesionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoProfesionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoProfesionModel.Entity>

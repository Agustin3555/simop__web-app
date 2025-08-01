import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { ModificacionModel } from '.'
import { ModificacionAdapter } from './modificacion.adapter'

const collection = buildPath('modificaciones')

export const ModificacionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ModificacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return ModificacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ModificacionAdapter.getOne.output(response.data)
  },

  create: async (data: ModificacionModel.CreateEntity) => {
    const adaptedInput = ModificacionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return ModificacionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: ModificacionModel.UpdateEntity) => {
    const adaptedInput = ModificacionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return ModificacionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<ModificacionModel.Entity>

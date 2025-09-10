import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { LocalidadModel } from '.'
import { LocalidadAdapter } from './localidad.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('localidades')

export const LocalidadService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return LocalidadAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(LocalidadAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return LocalidadAdapter.getOne.output(response.data)
  },

  create: async (data: LocalidadModel.CreateEntity) => {
    const adaptedInput = LocalidadAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return LocalidadAdapter.create.output(response.data)
  },

  updateOne: async (id, data: LocalidadModel.UpdateEntity) => {
    const adaptedInput = LocalidadAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return LocalidadAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<LocalidadModel.Entity>

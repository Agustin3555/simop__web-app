import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { ObraModel } from '.'
import { ObraAdapter } from './obra.adapter'

const collection = buildPath('obras')

export const ObraService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ObraAdapter.getAll.output(response.data)
  },

  getAllTotales: async () => {
    const response = await publicInstance.get(collection('totales'))

    return ObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return ObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ObraAdapter.getOne.output(response.data)
  },

  getOneDetalle: async (id: number) => {
    const response = await publicInstance.get(collection(id, 'detalle'))

    return ObraAdapter.getOne.output(response.data)
  },

  create: async (data: ObraModel.CreateEntity) => {
    const adaptedInput = ObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return ObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: ObraModel.UpdateEntity) => {
    const adaptedInput = ObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return ObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<ObraModel.Entity>

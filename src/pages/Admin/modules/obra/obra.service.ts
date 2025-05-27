import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { ObraModel, ObraAdapter } from '.'

const collection = buildPath('obras')

export const ObraService: Service<ObraModel.Entity> = {
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

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: ObraModel.UpdateEntity) => {
    const adaptedInput = ObraAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

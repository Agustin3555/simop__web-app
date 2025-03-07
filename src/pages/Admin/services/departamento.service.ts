import { publicInstance, Service } from '@/services/config'
import { DepartamentoModel } from '../models'
import { DepartamentoAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('departamentos')

export const DepartamentoService: Service<DepartamentoModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return DepartamentoAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return DepartamentoAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return DepartamentoAdapter.getOne.output(response.data)
  },

  create: async (data: DepartamentoModel.CreateData) => {
    const adaptedInput = DepartamentoAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: DepartamentoModel.UpdateData) => {
    const adaptedInput = DepartamentoAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

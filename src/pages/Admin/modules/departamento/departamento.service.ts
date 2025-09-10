import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { DepartamentoModel } from '.'
import { DepartamentoAdapter } from './departamento.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('departamentos')

export const DepartamentoService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return DepartamentoAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(DepartamentoAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return DepartamentoAdapter.getOne.output(response.data)
  },

  create: async (data: DepartamentoModel.CreateEntity) => {
    const adaptedInput = DepartamentoAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return DepartamentoAdapter.create.output(response.data)
  },

  updateOne: async (id, data: DepartamentoModel.UpdateEntity) => {
    const adaptedInput = DepartamentoAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return DepartamentoAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<DepartamentoModel.Entity>

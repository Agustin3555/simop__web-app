import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { EmpresaModel } from '.'
import { EmpresaAdapter } from './empresa.adapter'

const collection = buildPath('empresas')

export const EmpresaService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return EmpresaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return EmpresaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return EmpresaAdapter.getOne.output(response.data)
  },

  create: async (data: EmpresaModel.CreateEntity) => {
    const adaptedInput = EmpresaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return EmpresaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: EmpresaModel.UpdateEntity) => {
    const adaptedInput = EmpresaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return EmpresaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<EmpresaModel.Entity>

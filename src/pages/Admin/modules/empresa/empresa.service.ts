import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { EmpresaModel } from '.'
import { EmpresaAdapter } from './empresa.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('empresas')

export const EmpresaService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return EmpresaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(EmpresaAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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

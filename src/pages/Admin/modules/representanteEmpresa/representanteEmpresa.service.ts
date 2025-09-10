import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { RepresentanteEmpresaModel } from '.'
import { RepresentanteEmpresaAdapter } from './representanteEmpresa.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('representantes-empresas')

export const RepresentanteEmpresaService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return RepresentanteEmpresaAdapter.getAll.output(response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return RepresentanteEmpresaAdapter.getOne.output(response.data)
  },

  create: async (data: RepresentanteEmpresaModel.CreateEntity) => {
    const adaptedInput = RepresentanteEmpresaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RepresentanteEmpresaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RepresentanteEmpresaModel.UpdateEntity) => {
    const adaptedInput = RepresentanteEmpresaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RepresentanteEmpresaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RepresentanteEmpresaModel.Entity>

import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RepresentanteEmpresaModel } from '.'
import { RepresentanteEmpresaAdapter } from './representanteEmpresa.adapter'

const collection = buildPath('representantes-empresas')

export const RepresentanteEmpresaService: Service<RepresentanteEmpresaModel.Entity> =
  {
    getAll: async () => {
      const response = await publicInstance.get(collection())

      return RepresentanteEmpresaAdapter.getAll.output(response.data)
    },

    getOne: async id => {
      const response = await publicInstance.get(collection(id))

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
  }

import { publicInstance, Service } from '@/services/config'
import { RepresentanteEmpresaModel } from '../models'
import { RepresentanteEmpresaAdapter } from '../adapters'
import { buildPath } from '@/helpers'

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

    create: async (data: RepresentanteEmpresaModel.CreateData) => {
      const adaptedInput = RepresentanteEmpresaAdapter.create.input(data)

      await publicInstance.post(collection(), adaptedInput)
    },
  }

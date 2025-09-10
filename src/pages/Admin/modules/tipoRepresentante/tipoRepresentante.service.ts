import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { TipoRepresentanteModel } from '.'
import { TipoRepresentanteAdapter } from './tipoRepresentante.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('tipos-representantes')

export const TipoRepresentanteService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return TipoRepresentanteAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(TipoRepresentanteAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return TipoRepresentanteAdapter.getOne.output(response.data)
  },

  create: async (data: TipoRepresentanteModel.CreateEntity) => {
    const adaptedInput = TipoRepresentanteAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoRepresentanteAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoRepresentanteModel.UpdateEntity) => {
    const adaptedInput = TipoRepresentanteAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoRepresentanteAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<TipoRepresentanteModel.Entity>

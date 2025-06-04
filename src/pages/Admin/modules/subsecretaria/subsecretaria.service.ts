import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { SubsecretariaModel } from '.'
import { SubsecretariaAdapter } from './subsecretaria.adapter'

const collection = buildPath('sub-secretarias')

export const SubsecretariaService: Service<SubsecretariaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return SubsecretariaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return SubsecretariaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return SubsecretariaAdapter.getOne.output(response.data)
  },

  create: async (data: SubsecretariaModel.CreateEntity) => {
    const adaptedInput = SubsecretariaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return SubsecretariaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: SubsecretariaModel.UpdateEntity) => {
    const adaptedInput = SubsecretariaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return SubsecretariaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

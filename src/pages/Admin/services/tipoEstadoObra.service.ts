import { publicInstance, Service } from '@/services/config'
import { TipoEstadoObraModel } from '../models'
import { TipoEstadoObraAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-estados-obra')

export const TipoEstadoObraService: Service<TipoEstadoObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoEstadoObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoEstadoObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoEstadoObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoEstadoObraModel.CreateData) => {
    const adaptedInput = TipoEstadoObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
}

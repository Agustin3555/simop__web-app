import { publicInstance, Service } from '@/services/config'
import { CertificacionModel } from '../models'
import { CertificacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('certificaciones')

export const CertificacionService: Service<CertificacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return CertificacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return CertificacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return CertificacionAdapter.getOne.output(response.data)
  },

  create: async (data: CertificacionModel.CreateData) => {
    const adaptedInput = CertificacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: CertificacionModel.UpdateData) => {
    const adaptedInput = CertificacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}

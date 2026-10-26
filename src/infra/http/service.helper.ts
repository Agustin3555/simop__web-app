import { publicInstance } from '@/services/config'
import { buildPath, sendFields } from '@/helpers'
import { Service } from './service.type'

export const createService = <T>(name: string): Service<T> => {
  const coll = buildPath(name)

  return {
    getAll: async fields => {
      const res = await publicInstance.get(coll() + sendFields(fields))
      return res.data
    },

    getRefs: async ids => {
      const res = await publicInstance.get(coll('refs'), { ids })
      return res.data
    },

    create: async (data, fields) => {
      const res = await publicInstance.post(coll() + sendFields(fields), data)
      return res.data
    },

    updateOne: async (id, data, fields) => {
      const res = await publicInstance.put(coll(id) + sendFields(fields), data)
      return res.data
    },

    deleteMany: async ids => {
      await publicInstance.post(coll('delete-many'), { ids })
    },
  }
}

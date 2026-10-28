import { publicInstance } from '@/services/config'
import { ObraModel } from '.'
import { createService } from '@/infra/http/service.helper'

export const ObraService = createService<ObraModel.Entity>('obras')

const coll = ObraService.coll

export const ObraServiceExtension = {
  getUpdateAmounts: async () => {
    const res = await publicInstance.get(coll('update-amounts'))
    return res.data
  },

  updateAmounts: async () => {
    await publicInstance.post(coll('update-amounts'))
  },
}

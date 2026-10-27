import { ObraModel } from '.'
import { createService } from '@/infra/http/service.helper'

export const ObraService = createService<ObraModel.Entity>('obras')

// getUpdateAmounts: async () => {
//   const response = await publicInstance.get(collection('update-amounts'))

//   return ObraAdapter.getUpdateAmounts.output(response.data)
// },

// updateAmounts: async () => {
//   await publicInstance.post(collection('update-amounts'))
// },

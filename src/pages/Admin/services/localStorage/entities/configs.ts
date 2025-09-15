import { Configs } from '@/pages/Admin/contexts/configs.context'
import { LocalStorageEntity } from '../localStorageEntity'
import { z } from 'zod'

const configsSchema = z.record(
  z.string(),
  z.object({
    currentIdIndex: z.number(),
    selected: z.number(),
    items: z.array(
      z.object({
        title: z.string(),
        columns: z.array(z.string()),
        id: z.number(),
      }),
    ),
  }),
)

export const configsEntity = new LocalStorageEntity<Configs>(
  'configs',
  data => configsSchema.safeParse(data).success,
)

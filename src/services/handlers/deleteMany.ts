import { InputAdapter } from '@/adapters/config'
import { buildPath } from '@/helpers'
import { publicInstance } from '../config'

interface Data {
  ids: number[]
}

interface Body {
  ids: number[]
}

const adapter: {
  input: InputAdapter<Data, Body>
} = {
  input: data => {
    const convertedResource: Body = {
      ids: data.ids,
    }

    return convertedResource
  },
}

export const deleteManyHandler = async (
  collection: ReturnType<typeof buildPath>,
  ids: number[],
) => {
  const adaptedInput = adapter.input({ ids })

  await publicInstance.post(collection('delete-many'), adaptedInput)
}

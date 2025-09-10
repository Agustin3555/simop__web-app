import { OutputAdapter } from './types'

export const refsAdapter = <RawResponse, Response>(
  adapter: OutputAdapter<RawResponse, Response>,
  data: any,
) => {
  const { fields, rows } = data
  return { fields, rows: adapter(rows) }
}

export type InputAdapter<Data, Body> = (data: Data) => Body

export type OutputAdapter<RawResponse, Response> = (
  response: RawResponse,
) => Response

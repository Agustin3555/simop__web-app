import { Button } from '@/components'

interface FetchRefProps {
  value: string
  provider: (id: number) => Promise<unknown>
}

const FetchRef = ({ value, provider }: FetchRefProps) => {
  return <Button title={value} faIcon="fa-solid fa-eye" _type="secondary" />
}

export default FetchRef

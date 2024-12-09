import './LocalQuery.css'
import { useState } from 'react'
import { useHandleAction } from '@/hooks'
import { Icon, StateButton } from '@/components'
import { Table } from './components'
import { Columns } from './types'

interface LocalQueryProps<T> {
  provider: () => Promise<T[]>
  columns: Columns<T>
}

const LocalQuery = <T extends { id: number }>({
  provider,
  columns,
}: LocalQueryProps<T>) => {
  const [data, setData] = useState<T[]>()

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        const response = await provider()
        setData(response)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <div className="cmp-local-query">
      <header>
        <StateButton
          text="Traer los datos"
          hiddenText
          faIcon="fa-solid fa-cloud-arrow-down"
          {...handleActionResult}
        />
        {data && (
          <div className="total-items">
            <Icon faIcon="fa-solid fa-cubes-stacked" />
            <p>{data.length}</p>
          </div>
        )}
      </header>
      {data && <Table {...{ data, columns }} />}
    </div>
  )
}

export default LocalQuery

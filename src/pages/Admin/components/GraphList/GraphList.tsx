import './GraphList.css'
import { useGraphScreenshots, useMetaModel, useTable } from '../../hooks'
import { Fragment } from 'react/jsx-runtime'
import { PieByField } from './components'
import { Button, Separator } from '@/components'
import { useMemo } from 'react'
import { Method } from '@/services/config'
import { classList } from '@/helpers'
import { FallbackBanner } from '..'

interface GraphListProps {
  handlingClass?: string
}

const GraphList = ({ handlingClass }: GraphListProps) => {
  const { getPropFieldsRecord } = useMetaModel()
  const { graphedFields } = useTable().states
  const { graphListRef } = useGraphScreenshots()

  const propFieldsRecord = useMemo(() => getPropFieldsRecord(Method.GetAll), [])

  return (
    <div
      className={classList('cmp-graph-list', handlingClass)}
      ref={graphListRef}
    >
      {graphedFields.length ? (
        graphedFields.map((field, i) => (
          <Fragment key={field}>
            <PieByField propField={propFieldsRecord[field]} />
            {i !== graphedFields.length - 1 && <Separator />}
          </Fragment>
        ))
      ) : (
        <FallbackBanner>
          Seleccione una columna con el interruptor{' '}
          <Button faIcon="fa-solid fa-chart-pie" size="s" type="secondary" />
        </FallbackBanner>
      )}
    </div>
  )
}

export default GraphList

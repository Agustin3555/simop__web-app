import './GraphList.css'
import { useMetaModel, useTable } from '../../hooks'
import { Fragment } from 'react/jsx-runtime'
import { PieByField } from './components'
import { Separator } from '@/components'
import { useMemo } from 'react'
import { Method } from '@/services/config'
import { classList } from '@/helpers'

interface GraphListProps {
  handlingClass?: string
}

const GraphList = ({ handlingClass }: GraphListProps) => {
  const { getPropFieldsRecord } = useMetaModel()
  const { graphedFields } = useTable().states

  const propFieldsRecord = useMemo(() => getPropFieldsRecord(Method.GetAll), [])

  return (
    <div className={classList('cmp-graph-list', handlingClass)}>
      {graphedFields.map((field, i) => (
        <Fragment key={field}>
          <PieByField propField={propFieldsRecord[field]} />
          {i !== graphedFields.length - 1 && <Separator />}
        </Fragment>
      ))}
    </div>
  )
}

export default GraphList

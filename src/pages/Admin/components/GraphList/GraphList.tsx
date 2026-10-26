import './GraphList.css'

import { Fragment } from 'react/jsx-runtime'
import { PieByField } from './components'
import { Button, Separator } from '@/components'
import { useMemo } from 'react'
import { classList } from '@/helpers'
import { useConfigModule } from '../../hooks/useConfigModule.hook'
import { useGraphScreenshots } from '../../hooks/useGraphScreenshots.hook'
import { useTableDef } from '../../hooks/useTableDef.hook'
import { useTable } from '../../hooks/useTable.hook'
import FallbackBanner from '../FallbackBanner/FallbackBanner'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'

interface GraphListProps {
  handlingClass?: string
}

const GraphList = ({ handlingClass }: GraphListProps) => {
  const { getPropsRecord } = useTableDef()
  const selectedConfig = useConfigs(s => s.getSelectedConfig())
  const { graphedFields } = useTable().states
  const { graphListRef } = useGraphScreenshots()

  const selectedPropsRecord = useMemo(
    () => getPropsRecord(selectedConfig.columns),
    [],
  )
  return (
    <div
      className={classList('cmp-graph-list', handlingClass)}
      ref={graphListRef}
    >
      {graphedFields.length ? (
        graphedFields.map((field, i) => (
          <Fragment key={field}>
            <PieByField propField={selectedPropsRecord[field]} />
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

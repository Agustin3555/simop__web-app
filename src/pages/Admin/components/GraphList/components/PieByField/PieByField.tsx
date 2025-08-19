import './PieByField.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  useGraphScreenshots,
  useMetaModel,
  useTable,
} from '@/pages/Admin/hooks'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { AnnotationLayer } from './components'
import { PieSectorData } from './components/AnnotationLayer/AnnotationLayer'
import { Button, Toggle } from '@/components'
import { classList } from '@/helpers'
import { COLOR_MATCHER, palColorGS, RGBColor } from '@/styles/palette'
import { AddFn, PieSectorModes, Prop } from '@/pages/Admin/meta/utils'
import { Select } from '../../..'
import { generateColorScaleFromKeys } from '../../helpers'

const BASE_COLORS: RGBColor[] = [
  COLOR_MATCHER.A,
  COLOR_MATCHER.B,
  COLOR_MATCHER.C,
  COLOR_MATCHER.E,
  COLOR_MATCHER.F,
]

// TODO: optimizar

const renderActiveShape = (props: any) => {
  return <Sector {...props} outerRadius={86} />
}

const GRAPH_SIZE = { width: '100%', height: 232 }
const CHAR_LIMIT = 24
const WITH_DATA_KEY = 'WITH_DATA'
const NO_DATA_KEY = 'NO_DATA'

export const UNIQUE_MODE = { key: 'unique', title: 'Valor absoluto' }
export const WDND_MODE = {
  key: 'with-data-no-data',
  title: 'Presencia del dato',
}

export interface PieData {
  title: string
  color: string
  amount: number
}

interface PieByFieldProps {
  propField: Prop
}

const PieByField = ({ propField }: PieByFieldProps) => {
  const { key: fieldKey, title, pieSectorConfig } = propField
  const { defaultMode, modes } = pieSectorConfig

  const [mode, setMode] = useState(defaultMode)
  const [activeIndex, setActiveIndex] = useState<number>()
  const [dataUpdated, setDataUpdated] = useState<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const queryClient = useQueryClient()
  const { key: modelKey } = useMetaModel()
  const { table, states } = useTable()
  const { columnFilters, toggleGraphedField } = states
  const { captureInfoRef, isCaptured, toggleCapture, removeCapture } =
    useGraphScreenshots()

  const captured = isCaptured(fieldKey)

  useEffect(() => {
    captureInfoRef.current = {
      ...captureInfoRef.current,
      // TODO: para obtener el mode se tendrá que refactorizar bastante
      [fieldKey]: { column: title, mode },
    }
  }, [mode])

  useEffect(() => {
    const unsubscribe = queryClient
      .getQueryCache()
      .subscribe(({ query, type }) => {
        if (query.queryKey[0] === modelKey && type === 'updated')
          setDataUpdated(query.state.dataUpdatedAt)
      })

    return unsubscribe
  }, [])

  const pieSectorModes = useMemo(() => {
    let record = {} as PieSectorModes

    if (modes.unique)
      record[UNIQUE_MODE.key] = { title: UNIQUE_MODE.title, ...modes.unique }

    if (modes.customs) record = { ...record, ...modes.customs }

    return record
  }, [])

  const modeOptions = useMemo(
    () => [
      { value: WDND_MODE.key, title: WDND_MODE.title },
      ...Object.entries(pieSectorModes).map(([key, { title }]) => ({
        value: key,
        title,
      })),
    ],
    [],
  )

  const data = useMemo((): undefined | PieData[] => {
    if (!table) return

    const dataInTable = table
      .getFilteredRowModel()
      .rows.map(({ original }) => original)

    const counts = dataInTable.reduce<
      Record<string, { amount: number; title: string }>
    >((acc, row) => {
      const add: AddFn = (key, getTitle) => {
        const prev = acc[key]
        const exist = prev !== undefined

        acc[key] = exist
          ? { amount: prev.amount + 1, title: prev.title }
          : { amount: 1, title: getTitle() }
      }

      const value = row[fieldKey]

      if (mode === WDND_MODE.key) {
        value === undefined
          ? add(NO_DATA_KEY, () => 'SIN DATO')
          : add(WITH_DATA_KEY, () => 'CON DATO')
      } else {
        const { accumulate } = pieSectorModes[mode]

        value === undefined
          ? add(NO_DATA_KEY, () => 'SIN DATO')
          : accumulate(value, add)
      }

      return acc
    }, {})

    const colors = generateColorScaleFromKeys(BASE_COLORS, Object.keys(counts))

    return Object.entries(counts)
      .sort((a, b) => b[1].amount - a[1].amount)
      .map(([key, { amount, title }], i) => ({
        title,
        amount,
        color: key === NO_DATA_KEY ? palColorGS('200') : colors[i],
      }))
  }, [mode, dataUpdated, columnFilters])

  const pieSectorData = useMemo((): undefined | PieSectorData[] => {
    if (!data) return

    const total = data.reduce((sum, { amount }) => sum + amount, 0)

    let currentAngle = 0

    return data.map((d): PieSectorData => {
      const { title, amount } = d

      const percent = amount / total
      const angle = percent * 360
      const startAngle = currentAngle
      const midAngle = startAngle + angle / 2

      currentAngle += angle

      const shortenedTitle =
        title.length <= CHAR_LIMIT
          ? undefined
          : `${title.slice(0, CHAR_LIMIT)}...`

      return {
        cx: 150,
        cy: 150,
        midAngle,
        outerRadius: 70,
        shortenedTitle,
        hidden: percent <= 0.07,
        percent: Number((percent * 100).toFixed(2)),
        payload: d,
      }
    })
  }, [data])

  const sectorRefs = useMemo(() => {
    if (!pieSectorData) return

    return pieSectorData
      .filter(d => d.shortenedTitle || d.hidden)
      .map(({ percent, payload }) => ({ percent, ...payload }))
  }, [pieSectorData])

  const handleDeleteClick = useCallback(() => toggleGraphedField(fieldKey), [])

  const handleCaptureChange = useCallback(() => toggleCapture(fieldKey), [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDimensions({ width, height })
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
      removeCapture(fieldKey)
    }
  }, [containerRef.current, removeCapture])

  if (!(data && pieSectorData && sectorRefs)) return null

  return (
    <div className={classList('cmp-pie-by-field', { captured })}>
      <header>
        <div className="left">
          <small>Por: </small>
          <Select
            name={`select-mode-${fieldKey}`}
            title="Modo"
            options={modeOptions}
            selected={mode}
            setSelected={setMode}
          />
        </div>
        <Button
          title="Eliminar"
          faIcon="fa-solid fa-xmark"
          size="s"
          type="secondary"
          onAction={handleDeleteClick}
        />
      </header>
      <h3>{title}</h3>
      <div className="graph" style={GRAPH_SIZE}>
        <ResponsiveContainer ref={containerRef} {...GRAPH_SIZE}>
          <PieChart>
            <AnnotationLayer
              data={pieSectorData}
              {...{ activeIndex, dimensions }}
            />
            <Pie
              data={data}
              dataKey="amount"
              innerRadius={40}
              outerRadius={80}
              strokeWidth={1}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {data.map(({ color }, i) => (
                <Cell key={`cell-${i}`} fill={color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Toggle
          title="Agregar al informe"
          faIcon="fa-solid fa-paperclip"
          value={captured}
          onChange={handleCaptureChange}
        />
      </div>
      {sectorRefs.length !== 0 && (
        <ul>
          {sectorRefs.map(({ percent, title, color, amount }) => (
            <li key={title}>
              <div className="color" style={{ backgroundColor: color }} />
              <p className="text">
                <small>
                  {percent}% ({amount}):
                </small>{' '}
                {title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PieByField

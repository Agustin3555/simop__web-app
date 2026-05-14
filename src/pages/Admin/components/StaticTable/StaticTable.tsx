import './StaticTable.css'
import { useMemo } from 'react'
import { asRem } from '@/helpers'

const STEP = 16
const DEFAULT_SIZE = 4

interface StaticTableProps {
  columns: Record<
    string,
    {
      title: string
      size?: number
    }
  >
  data: Record<string, any>[]
}

const StaticTable = ({ columns: columnsRecord, data }: StaticTableProps) => {
  const columns = useMemo(
    () =>
      Object.entries(columnsRecord).map(([key, value]) => ({ key, ...value })),
    [columnsRecord],
  )

  const rows = useMemo(
    () => data.map(row => columns.map(({ key }) => row[key])),
    [data, columns],
  )

  return (
    <div className="cmp-static-table">
      <div className="table table-container">
        <div className="head">
          <div className="row">
            {columns.map(({ key, title, size = DEFAULT_SIZE }) => (
              <div
                className="cell main"
                key={key}
                style={{
                  width: asRem(size * STEP),
                }}
              >
                <div className="text">{title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="body">
          {rows.map((row, i) => (
            <div className="row" key={i}>
              {row.map((value, j) => (
                <div
                  className="cell"
                  key={columns[j].key}
                  style={{
                    width: asRem((columns[j].size ?? DEFAULT_SIZE) * STEP),
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="foot"></div> */}
      </div>
    </div>
  )
}

export default StaticTable

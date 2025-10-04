import './Selected.css'
import { MouseEventHandler } from 'react'
import { Icon } from '@/components'

export interface SelectedProps {
  keyName: string
  editMode: boolean
  disabled: boolean

  selected: string[]
  staticSelected?: string[]

  getItemTitle: (id: string) => string
  handleDeselectItemClick: MouseEventHandler<HTMLButtonElement>
}

const Selected = ({
  keyName,
  editMode,
  disabled,

  selected,
  staticSelected,

  getItemTitle,
  handleDeselectItemClick,
}: SelectedProps) => (
  <div className="cmp-selected">
    {selected.map(id => (
      <div key={id} className="item" data-option={id}>
        <input
          name={keyName}
          defaultValue={id}
          hidden
          {...(editMode && { disabled })}
        />
        <p>{getItemTitle(id)}</p>
        <button
          title="Eliminar selección"
          value={id}
          type="button"
          onClick={handleDeselectItemClick}
        >
          <Icon faIcon="fa-solid fa-xmark" />
        </button>
      </div>
    ))}
    {staticSelected?.map(id => (
      <div key={id} className="item" data-option={id}>
        <input
          name={keyName}
          defaultValue={id}
          hidden
          {...(editMode && { disabled })}
        />
        <p>{getItemTitle(id)}</p>
      </div>
    ))}
  </div>
)

export default Selected

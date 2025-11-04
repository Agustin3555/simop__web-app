import './Selected.css'
import { MouseEventHandler } from 'react'
import { useComboboxCore } from '@/pages/Admin/hooks'
import { Icon } from '@/components'
import { BaseComboboxProps } from '../../BaseCombobox'

export interface SelectedProps
  extends Pick<
    BaseComboboxProps,
    'selected' | 'staticSelected' | 'getItemTitle'
  > {
  disabled: boolean

  handleDeselectItemClick: MouseEventHandler<HTMLButtonElement>
}

const Selected = ({
  disabled,

  selected,
  staticSelected,

  getItemTitle,
  handleDeselectItemClick,
}: SelectedProps) => {
  const { keyName, isEditMode } = useComboboxCore()

  return (
    <div className="cmp-selected">
      {selected.map(id => (
        <div key={id} className="item" data-option={id}>
          <input
            name={keyName}
            defaultValue={id}
            hidden
            {...(isEditMode && { disabled })}
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
            {...(isEditMode && { disabled })}
          />
          <p>{getItemTitle(id)}</p>
        </div>
      ))}
    </div>
  )
}

export default Selected

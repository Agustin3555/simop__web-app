import './InputCombobox.css'
import { useCallback, useState } from 'react'
import { UseLabelProps } from '@/hooks'
import { Options, useCombobox, useInputHandler } from '../../hooks'
import { Input } from '@/components'
import { ComboboxLayout } from '..'
import { Control } from '../../types'

interface Props extends UseLabelProps, Control {}

const init: Options[] = [
  { id: 1, title: 'Aloe vera' },
  { id: 2, title: 'Lavandula angustifolia' },
  { id: 3, title: 'Rosmarinus officinalis' },
  { id: 4, title: 'Echinacea purpurea' },
  { id: 5, title: 'Cucumis sativus' },
  { id: 6, title: 'Capsicum annuum' },
  { id: 7, title: 'Solanum lycopersicum' },
  { id: 8, title: 'Mentha piperita' },
  { id: 9, title: 'Ocimum basilicum' },
  { id: 10, title: 'Zingiber officinale' },
  { id: 11, title: 'Coffea arabica' },
  { id: 12, title: 'Malus domestica' },
  { id: 13, title: 'Ficus elastica' },
  { id: 14, title: 'Allium sativum' },
  { id: 15, title: 'Chamaedorea elegans' },
  { id: 16, title: 'Spathiphyllum cochlearispathum' },
  { id: 17, title: 'Bambusa vulgaris' },
  { id: 18, title: 'Neoregalia spp.' },
  { id: 19, title: 'Lilium longiflorum' },
  { id: 20, title: 'Carica papaya' },
]

const InputCombobox = ({ name, title, required = false }: Props) => {
  const [options, setOptions] = useState<Options[]>(init)
  const [value, setValue] = useState('')
  const { basicProps, sortedOptions } = useCombobox({
    title,
    required,
    options,
  })

  const handleInputChange = useInputHandler(newValue => setValue(newValue))

  const handleOptionClick = useCallback(
    (value: string) => () => setValue(value),
    []
  )

  return (
    <ComboboxLayout
      {...{ basicProps }}
      selection={
        // BUG: al hacer focus se dispara el click del header
        <Input
          {...{ name, title, value, required }}
          hideLabel
          onChange={handleInputChange}
        />
      }
      fieldset={
        sortedOptions.length !== 0 && (
          <fieldset className="drop-down">
            {sortedOptions.map(({ id, title }) => (
              <div
                key={id}
                className="option"
                onClick={handleOptionClick(title)}
              >
                {title}
              </div>
            ))}
          </fieldset>
        )
      }
    />
  )
}

export default InputCombobox

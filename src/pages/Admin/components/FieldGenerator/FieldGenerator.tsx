import './FieldGenerator.css'
import { ReactNode, useState } from 'react'
import { Input, Separator } from '@/components'
import { classList } from '@/helpers'
import { useInputHandler } from '../../hooks'

interface Props {
  title: string
  initQuantity?: number
  children: ReactNode
}

const FieldGenerator = ({ title, initQuantity = 1, children }: Props) => {
  const [quantity, setQuantity] = useState(initQuantity)

  const handleInputChange = useInputHandler(value => setQuantity(Number(value)))

  return (
    <div className={classList('cmp-field-generator')}>
      <Input
        title={`Cantidad de ${title}`}
        type="number"
        value={quantity}
        min={0}
        long="s"
        onChange={handleInputChange}
      />
      <div className="content">
        <Separator invert />
        <div className="fields-container">
          {Array.from({ length: quantity }, (_, index) => (
            <div key={index} className="fields">
              {children}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FieldGenerator

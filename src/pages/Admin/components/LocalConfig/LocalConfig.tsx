import './LocalConfig.css'
import { useCallback, useState } from 'react'
import { useConfigs, useMetaModel } from '../../hooks'
import { Button } from '@/components'
import { SecureHoldButton } from '..'
import { ALL_CONFIG_KEY } from '../../providers'

const LocalConfig = () => {
  const [creating, setCreating] = useState(false)

  const { key } = useMetaModel()
  const { configs } = useConfigs()

  const handleDiscardClick = useCallback(() => setCreating(true), [])

  return (
    <div className="cmp-local-config">
      {configs[key]?.map(({ id, title, columns }) => (
        <div key={id} className="config">
          <header>
            <h4>{title}</h4>
            {id !== ALL_CONFIG_KEY && (
              <SecureHoldButton
                title="Eliminar configuración"
                faIcon="fa-solid fa-trash"
                type="secondary"
              />
            )}
          </header>
          {JSON.stringify(columns)}
        </div>
      ))}
      {creating ? (
        <div className="new-config">
          <Button
            title="Descartar"
            faIcon="fa-solid fa-xmark"
            size="s"
            type="secondary"
            onAction={handleDiscardClick}
          />
        </div>
      ) : (
        <Button faIcon="fa-solid fa-plus" />
      )}
    </div>
  )
}

export default LocalConfig

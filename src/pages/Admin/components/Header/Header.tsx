import './Header.css'
import { useHandleAction } from '@/hooks'
import { useNavState, useViews } from '../../hooks'
import { useAppStore } from '@/store/config'
import { Button, ExternalLink } from '@/components'
import { publicInstance } from '@/services/config'
import { apiAdminPath, apiUrl, uniquePass } from '@/env'
import { useCallback } from 'react'
import { useConfig } from '../../store'

// TODO: sacarlo
console.log('Unique Pass: ', uniquePass)
console.log('API URL: ', apiUrl)
console.log('API Admin Path: ', apiAdminPath)

const Header = () => {
  const { isOpen, toggleNav } = useNavState()
  const { select } = useViews()
  const toasting = useAppStore(store => store.toasting)
  const mainServerUrl = useConfig(s => s.config.mainServerUrl)

  const syncAction = useHandleAction(async ({ setSuccess, setError }) => {
    if (!mainServerUrl) return

    try {
      await publicInstance.post(`${apiAdminPath}/sync`, { url: mainServerUrl })

      toasting('success', 'Base de datos sincronizada con éxito')
      await setSuccess()
    } catch (error) {
      await setError()
    }
  })

  const handleActiveConfig = useCallback(() => select('config', 0), [select])

  return (
    <div className="cmp-header">
      <div className="right">
        <Button
          title={isOpen ? 'Cerrar' : 'Abrir'}
          faIcon="fa-solid fa-mattress-pillow"
          size="m"
          onAction={toggleNav}
        />
        {mainServerUrl && (
          <Button
            handlingClass="sync"
            text="Sincronizar"
            title="Sincronizar base de datos"
            faIcon="fa-solid fa-database"
            size="m"
            hold
            inverted
            {...syncAction}
          />
        )}
      </div>
      <div className="left">
        <ExternalLink
          title="Manual"
          faIcon="fa-solid fa-book"
          url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
        />
        <Button
          title="Ajustes"
          faIcon="fa-solid fa-gear"
          size="m"
          onAction={handleActiveConfig}
        />
      </div>
    </div>
  )
}

export default Header

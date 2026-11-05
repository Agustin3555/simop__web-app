import './Header.css'
import { useHandleAction } from '@/hooks'
import { useAppStore } from '@/store/config'
import { Button, ExternalLink } from '@/components'
import { publicInstance } from '@/services/config'
import { apiAdminPath } from '@/env'
import { useCallback } from 'react'
import { useConfig } from '../../store'
import { useNavState } from '../../hooks/useNavState.hook'
import { useViews } from '../../hooks/useViews.hook'

const Header = () => {
  const { isOpen, toggleNav } = useNavState()
  const { select } = useViews()
  const toasting = useAppStore(s => s.toasting)
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

  const handleActiveConfig = useCallback(() => select('config'), [select])

  return (
    <div className="cmp-header">
      <div className="right">
        <Button
          title={isOpen ? 'Cerrar' : 'Abrir'}
          iconClass="fa-solid fa-mattress-pillow"
          onAction={toggleNav}
        />
        {mainServerUrl && (
          <Button
            handlingClass="sync"
            text="Sincronizar"
            title="Sincronizar base de datos"
            iconClass="fa-solid fa-database"
            hold
            inverted
            {...syncAction}
          />
        )}
      </div>
      <div className="left">
        <ExternalLink
          title="Manual"
          iconClass="fa-solid fa-book"
          url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
        />
        <Button
          title="Ajustes"
          iconClass="fa-solid fa-gear"
          onAction={handleActiveConfig}
        />
      </div>
    </div>
  )
}

export default Header

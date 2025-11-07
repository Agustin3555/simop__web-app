import './Header.css'
import { useHandleAction } from '@/hooks'
import { useNavState } from '../../hooks'
import { useAppStore } from '@/store/config'
import { Button, ExternalLink } from '@/components'
import { publicInstance } from '@/services/config'
import { apiAdminPath, mainServerUrl } from '@/env'

const Header = () => {
  const { isOpen, toggleNav } = useNavState()
  const toasting = useAppStore(store => store.toasting)

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
            title={'Sincronizar base de datos'}
            faIcon="fa-solid fa-database"
            size="m"
            hold
            {...syncAction}
          />
        )}
      </div>
      <ExternalLink
        title="Manual"
        faIcon="fa-solid fa-book"
        url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
      />
    </div>
  )
}

export default Header

import './ConfigDropdown.css'
import { useHandleAction } from '@/hooks'
import { useAppStore } from '@/store/config'
import { useConfig } from '../../../../store'
import { Button } from '@/shared/components/Button/Button'
import { Dropdown } from '@/shared/components'
import { Section } from '@/shared/components/Section/Section'
import { Field } from '@/shared/components/Field/Field'
import { Input } from '@/shared/components/Input/Input'
import { Textarea } from '@/shared/components/Textarea/Textarea'
import { publicInstance } from '@/services/config'
import { apiAdminPath } from '@/env'

export const ConfigDropdown = () => {
  const toasting = useAppStore(s => s.toasting)
  const commentsReports = useConfig(s => s.config.commentsReports)
  const mainServerUrl = useConfig(s => s.config.mainServerUrl)
  const setConfig = useConfig(s => s.setConfig)

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
    <Dropdown
      handlingClass="cmp-config-dropdown"
      opener={attrs => (
        <Button
          title="Ajustes"
          iconClass="fa-solid fa-gear"
          htmlAttrs={attrs}
        />
      )}
    >
      <Section label="Sincronización de datos">
        <Field title="Intranet URL">
          <Input
            htmlAttrs={{
              defaultValue: mainServerUrl as string,
              onBlur: e => setConfig('mainServerUrl', e.target.value),
            }}
          />
        </Field>
        {mainServerUrl && (
          <Button
            handlingClass="sync"
            text="Sincronizar"
            iconClass="fa-solid fa-database"
            holdToConfirm
            {...syncAction}
          />
        )}
      </Section>
      <Section label="Informe">
        <Field title="Comentarios">
          <Textarea
            htmlAttrs={{
              defaultValue: commentsReports as string,
              onBlur: e => setConfig('commentsReports', e.target.value),
            }}
          />
        </Field>
      </Section>
    </Dropdown>
  )
}

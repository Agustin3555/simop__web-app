import './Config.css'
import { FocusEventHandler, useCallback } from 'react'
import { useConfig } from '../../store'
import { Input } from '@/components'
import { View } from '../../components'

export const Config = () => {
  const config = useConfig(s => s.config)
  const setConfig = useConfig(s => s.setConfig)

  const handleSetMainServerUrl = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(e => setConfig('mainServerUrl', e.target.value), [setConfig])

  return (
    <View viewKey="config">
      <div className="cmp-config">
        <div className="content">
          <Input
            title="Intranet"
            keyName="mainServerUrl"
            inputHTMLAttrs={{
              defaultValue: config.mainServerUrl as string,
              onBlur: handleSetMainServerUrl,
            }}
          />
        </div>
      </div>
    </View>
  )
}

import './Config.css'
import { FocusEventHandler, useCallback } from 'react'
import { useConfig } from '../../store'
import { Input } from '@/components'
import { InputArea, View } from '../../components'

export const Config = () => {
  const mainServerUrl = useConfig(s => s.config.mainServerUrl)
  const commentsReports = useConfig(s => s.config.commentsReports)
  const setConfig = useConfig(s => s.setConfig)

  const handleSetMainServerUrl = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(e => setConfig('mainServerUrl', e.target.value), [setConfig])

  const handleSetCommentsReports = useCallback<
    FocusEventHandler<HTMLTextAreaElement>
  >(e => setConfig('commentsReports', e.target.value), [setConfig])

  return (
    <View viewKey="config">
      <div className="cmp-config">
        <div className="content">
          <Input
            title="Intranet"
            keyName="mainServerUrl"
            inputHTMLAttrs={{
              defaultValue: mainServerUrl as string,
              onBlur: handleSetMainServerUrl,
            }}
          />
          <InputArea
            title="Comentarios en informes"
            keyName="commentsReports"
            textareaHTMLAttrs={{
              defaultValue: commentsReports as string,
              onBlur: handleSetCommentsReports,
            }}
          />
        </div>
      </div>
    </View>
  )
}

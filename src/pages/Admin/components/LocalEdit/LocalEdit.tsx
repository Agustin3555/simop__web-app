import './LocalEdit.css'
import { useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useEntities, useRowSelection, useScheme } from '../../hooks'
import { Button, Icon, StateButton } from '@/components'

const LocalEdit = () => {
  const { scheme } = useScheme()
  const { service, title, groups } = scheme

  const toasting = useAppStore(store => store.toasting)
  // const { data } = useEntities(scheme)
  const { selectedRowIds } = useRowSelection()

  const fieldGroups = useMemo(
    () =>
      groups.map(({ title, props }) => ({
        title,
        fields: Object.values(props).map(({ getFieldComponent }) =>
          getFieldComponent(),
        ),
      })),
    [],
  )

  // const { handleSubmit, actionState } = useSubmitAction(
  //   async ({ form, formData, setError, setSuccess }) => {
  //     try {
  //       const createData = groups.reduce((acc, { props }) => {
  //         Object.values(props).forEach(({ key, verboseKey, getFieldValue }) => {
  //           const value = getFieldValue(formData, form)

  //           if (value !== undefined) acc[verboseKey || key] = value
  //         })

  //         return acc
  //       }, {} as Record<string, unknown>)

  //       // console.log(createData)

  //       await service.create!(createData)
  //       toasting('success', 'Cambios aplicados con éxito')

  //       await setSuccess()
  //     } catch (error) {
  //       await setError()
  //     }
  //   },
  // )

  return (
    <div className="cmp-local-edit">
      {selectedRowIds.length === 1 ? (
        selectedRowIds
      ) : (
        <div className="banner-container">
          <div className="banner">
            <p className="text">
              Seleccione un/a <strong>{title.singular}</strong> a editar en
            </p>
            <Button
              text="Consultar"
              faIcon="fa-solid fa-search"
              _type="secondary"
              size="s"
              inverted
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LocalEdit

// <form onSubmit={handleSubmit}>
//   <div className="field-groups">
//     {fieldGroups.map(({ title, fields }, index) => (
//       <div key={index} className="group">
//         {title && <small>{title}</small>}
//         <div className="fields">{fields.map(item => item)}</div>
//       </div>
//     ))}
//   </div>
//   <div className="actions">
//     <StateButton
//       text="Confirmar"
//       faIcon="fa-solid fa-check"
//       {...{ actionState }}
//     />
//   </div>
// </form>

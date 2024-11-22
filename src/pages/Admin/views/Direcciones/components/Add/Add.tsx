import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import {
  Combobox,
  InputArea,
  InputCombobox,
  LocalAdd,
} from '@/pages/Admin/components'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setLoading, setError, setSuccess }) => {
      const data = {
        prop1: formData.get('prop1') as string,
        prop2: formData.get('prop2') as string,

        prop3: formData.get('prop3') as string,
        prop4: formData.get('prop4') as string,

        prop5: formData.get('prop5') as string,
        prop6: formData.get('prop6') as string,

        prop7: formData.get('prop7') as string,
        prop8: formData.get('prop8') as string,
      }

      console.log(data)
    }
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input name="prop1" title="Input 1" />
      <Input name="prop2" title="Input 2" required />

      <InputArea name="prop3" title="InputArea 1" />
      <InputArea name="prop4" title="InputArea 2" required />

      <InputCombobox name="prop5" title="InputCombobox 1" />
      <InputCombobox name="prop6" title="InputCombobox 2" required />

      <Combobox name="prop7" title="Combobox 1" />
      <Combobox name="prop8" title="Combobox 2" required />
    </LocalAdd>
  )
}

export default Add

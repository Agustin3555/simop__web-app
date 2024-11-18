import { useSubmitAction } from '@/hooks'
import { Input, StateButton } from '@/components'

const Add = () => {
  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formData, setLoading, setError, setSuccess }) => {}
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">
        <Input id="nombre" title="Nombre de la Subsecretaría" required />
      </div>
      <StateButton
        title="Confirmar"
        text="Confirmar"
        faIcon="fa-solid fa-check"
        {...{ actionState }}
      />
    </form>
  )
}

export default Add

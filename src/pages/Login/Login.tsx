import './Login.css'
import { useSubmitAction } from '@/hooks'
import { Input, StateButton } from '@/components'

const Login = () => {
  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formData, setLoading, setError, setSuccess }) => {
      console.log(formData.get('pass'))
    }
  )

  return (
    <article className="cmp-login">
      <img src="/src/assets/isologotipo-gobierno-del-chaco.webp" />
      <form onSubmit={handleSubmit}>
        <Input id="pass" title="Contraseña" type="password" />
        <StateButton
          title="Acceder"
          text="Acceder"
          faIcon="fa-solid fa-arrow-right"
          {...{ actionState }}
        />
      </form>
    </article>
  )
}

export default Login

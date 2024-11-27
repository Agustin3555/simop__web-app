import './Login.css'
import { useSubmitAction } from '@/hooks'
import { Input, StateButton } from '@/components'
import { useLocation } from 'wouter'

const Login = () => {
  const [, navigate] = useLocation()

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      const pass = formData.get('pass') as string

      if (pass === import.meta.env.VITE_UNIQUE_PASS) {
        navigate('/admin')

        await setSuccess()
      } else {
        await setError()
      }
    }
  )

  return (
    <article className="cmp-login">
      <div className="content">
        <img src="/isologotipo-gobierno-del-chaco.webp" />
        <form onSubmit={handleSubmit}>
          <Input name="pass" title="Contraseña" type="password" required />
          <StateButton
            text="Acceder"
            faIcon="fa-solid fa-arrow-right"
            {...{ actionState }}
          />
        </form>
      </div>
    </article>
  )
}

export default Login

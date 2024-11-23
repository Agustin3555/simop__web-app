import './Login.css'
import { useSubmitAction } from '@/hooks'
import { Input, StateButton } from '@/components'
import { useLocation } from 'wouter'

const Login = () => {
  const [, navigate] = useLocation()

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      const pass = formData.get('pass')

      if (pass === import.meta.env.VITE_UNIQUE_PASS) {
        setSuccess()

        navigate('/admin')
      } else {
        setError()
      }
    }
  )

  return (
    <article className="cmp-login">
      <img src="/isologotipo-gobierno-del-chaco.webp" />
      <form onSubmit={handleSubmit}>
        <Input id="pass" title="Contraseña" type="password" required />
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

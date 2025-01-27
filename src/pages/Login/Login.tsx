import './Login.css'
import { useSubmitAction } from '@/hooks'
import { Input, StateButton } from '@/components'
import { useLocation } from 'wouter'
import { useAppStore } from '@/store/config'

const Login = () => {
  const [, navigate] = useLocation()
  const toasting = useAppStore(store => store.toasting)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      const pass = formValues.get.string('pass')

      if (pass === import.meta.env.VITE_UNIQUE_PASS) {
        navigate('/admin')
        toasting('info', 'Bienvenido')

        await setSuccess()
      } else {
        await setError()
      }
    },
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

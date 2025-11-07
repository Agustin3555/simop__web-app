import './Login.css'
import { useSubmitAction } from '@/hooks'
import { useAppStore } from '@/store/config'
import { useLocation } from 'wouter'
import { Button, CardPage, Input } from '@/components'
import { uniquePass } from '@/env'

const Login = () => {
  const [, navigate] = useLocation()
  const toasting = useAppStore(store => store.toasting)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      const pass = formValues.get.string('pass')

      if (pass === uniquePass) {
        navigate('/admin')
        toasting('info', 'Bienvenido')

        await setSuccess()
      } else {
        await setError()
      }
    },
  )

  return (
    <CardPage>
      <article className="cmp-login">
        <img src="/isologotipo-gobierno-ministerio.webp" />
        <form onSubmit={handleSubmit}>
          <Input
            keyName="pass"
            title="Contraseña"
            isRequired
            inputHTMLAttrs={{ type: 'password' }}
          />
          <Button
            text="Acceder"
            faIcon="fa-solid fa-arrow-right"
            submit
            {...{ actionState }}
          />
        </form>
      </article>
    </CardPage>
  )
}

export default Login

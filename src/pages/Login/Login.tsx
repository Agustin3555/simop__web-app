import './Login.css'
import { useSubmitAction } from '@/hooks'
import { useAppStore } from '@/store/config'
import { useLocation } from 'wouter'
import { CardPage, Input } from '@/components'
import { uniquePass } from '@/env'
import { Button } from '@/shared/components/Button/Button'
import { Field } from '@/shared/components/Field/Field'

const Login = () => {
  const [, navigate] = useLocation()
  const toasting = useAppStore(s => s.toasting)

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
        <form className="form-style" onSubmit={handleSubmit}>
          <Field title="Contraseña">
            <Input
              keyName="pass"
              isRequired
              inputHTMLAttrs={{ type: 'password' }}
            />
          </Field>
          <Button
            text="Acceder"
            iconClass="fa-solid fa-arrow-right"
            size="l"
            submit
            {...{ actionState }}
          />
        </form>
      </article>
    </CardPage>
  )
}

export default Login

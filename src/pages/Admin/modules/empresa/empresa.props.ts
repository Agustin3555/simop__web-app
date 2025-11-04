import { COMMON_PROPS } from '../consts/commonProps.const'
import { EmpresaModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const EmpresaProps = defineProps<EmpresaModel.Entity>({
  cuit: createNumberProp({
    title: 'CUIT',
    config: {
      isBig: true,
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  direccion: createTextProp({
    title: 'Dirección declarada',
  }),
  numeroContacto: createNumberProp({
    title: 'Número de contacto',
    config: {
      isBig: true,
    },
  }),
  email: createTextProp({
    title: 'Email',
  }),
  pais: createRefProp({
    metaModelRef: 'pais',
  }),
  provincia: createRefProp({
    metaModelRef: 'provincia',
  }),
  localidad: createRefProp({
    metaModelRef: 'localidad',
  }),
  ...COMMON_PROPS,
})

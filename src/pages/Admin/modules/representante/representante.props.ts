import { COMMON_PROPS } from '../consts/commonProps.const'
import { RepresentanteModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const RepresentanteProps = defineProps<RepresentanteModel.Entity>({
  cuil: createNumberProp({
    title: 'CUIL',
    config: {
      isBig: true,
      field: {
        isRequired: true,
      },
    },
  }),
  apellido: createTextProp({
    title: 'Apellido',
    config: {
      field: { isRequired: true },
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
  }),
  direccion: createTextProp({
    title: 'Dirección',
  }),
  numeroMatricula: createTextProp({
    title: 'Número de Matricula',
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

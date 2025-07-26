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
        required: true,
      },
    },
  }),
  apellido: createTextProp({
    title: 'Apellido',
    config: {
      field: { required: true },
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
    metaModelKey: 'pais',
  }),
  provincia: createRefProp({
    metaModelKey: 'provincia',
  }),
  localidad: createRefProp({
    metaModelKey: 'localidad',
  }),
  ...COMMON_PROPS,
})

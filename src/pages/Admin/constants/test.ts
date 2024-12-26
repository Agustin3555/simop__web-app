import { Ref } from '@/types'
import { EmpresaModel, ObraModel } from '../models'
import { EmpresaService, ObraService } from '../services'

// text     string        Input
// longText string        InputArea           cellStyle
// number   number        Input
// date     string        Input     transform
// dateTime string        Input     transform
// boolean  boolean       Checkbox  transform cellStyle
// ref      {id, title}   Combobox  transform cellStyle
// refList  {id, title}[] Combobox  transform cellStyle

/*
  TODO: exportar todos los métodos de servicio como propiedad de un objeto para
  poder acceder automáticamente a cada uno de ellos
*/

interface Service {
  getAll: () => Promise<any[]>
  getForConnect: () => Promise<Ref[]>
  getOne: (id: number) => Promise<any>
  create: (data: any) => Promise<void>
}

export type Type =
  | 'text'
  | 'longText'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'boolean'
  | 'ref'
  | 'refList' // Solamente para visualizar los vínculos de uno a muchos que no tengan atributos de vinculo y que no sean relaciones ternarias, si lo es, se debe convertir en un modulo aparte

type Color = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

interface Field<T> {
  field?: T & {
    disabled?: boolean
    title?: string
  }
}

interface Column<T> {
  column?: T & {
    title?: string
  }
}

interface Required {
  required?: boolean
}

interface TextConfig extends Field<Required> {}

interface LongTextConfig extends Field<Required> {}

interface NumberConfig
  extends Field<
    Required & {
      min?: number
      max?: number
    }
  > {
  pre?: string
  suf?: string
}

interface DateConfig extends Field<Required> {}

interface DateTimeConfig extends Field<Required> {}

interface BooleanConfig
  extends Column<{
    falseColor?: Color
    trueColor?: Color
  }> {
  falseText?: string
  trueText?: string
}

/*
  TODO: evitar las referencias circulares infinitas, quizás sea necesario
  pasar la prop scheme envolviendo en una función que "corte" (elimine) las
  referencias innecesarias
*/
interface RefConfig<RelatedScheme extends Scheme<any>>
  extends Column<{ option?: boolean }> {
  scheme: RelatedScheme // El esquema relacionado
  accesorKey: keyof RelatedScheme['props'] // Claves del esquema relacionado
}

interface PropScheme<
  MainKey extends string,
  RelatedScheme extends Scheme<any> = any,
> {
  accesorKey: MainKey
  title: string
  type: Type

  refConfig?: RefConfig<RelatedScheme> // Se conecta con el esquema relacionado
}

interface Scheme<T extends string> {
  title: string
  service: Service
  props: Partial<Record<T, PropScheme<T>>>
}

const empresa: Scheme<keyof EmpresaModel.RawEntity> = {
  service: EmpresaService,
  title: 'Empresa',
  props: {
    nombre: {
      accesorKey: 'nombre',
      title: 'Nombre',
      type: 'text',
    },
  },
}

const obra: Scheme<keyof ObraModel.Entity> = {
  title: 'Obra',
  service: ObraService,
  props: {
    nombre: {
      accesorKey: 'nombre',
      title: 'Nombre',
      type: 'text',
    },
    obraRefaccionada: {
      accesorKey: 'obraRefaccionada',
      title: 'Obra refaccionada',
      type: 'boolean',
    },
    empresa: {
      accesorKey: 'empresa',
      title: 'Empresa',
      type: 'ref',
      refConfig: {
        scheme: empresa,
        accesorKey: '', // AQUÍ
      },
    },
  },
}

import { Service } from '@/services/config'

// text     string        Input
// textArea string        InputArea           cellStyle
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

export type Type =
  | 'text'
  | 'textArea'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'boolean'
  | 'ref'
  /*
    TODO: Solamente para visualizar los vínculos de uno a muchos que no tengan
    atributos de vinculo y que no sean relaciones ternarias, si lo es, se debe
    convertir en un modulo aparte.
  */
  | 'refList'

type Color = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

interface Field<T> {
  field?:
    | boolean
    | (T & {
        disabled?: boolean
        title?: string
      })
}

interface Column<T> {
  column?:
    | boolean
    | (T & {
        title?: string
      })
}

interface Required {
  required?: boolean
}

interface TextConfig extends Field<Required> {}

interface TextAreaConfig extends Field<Required> {}

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
  El scheme se debe obtener desde un método para evitar el problema de
  referencias circulares.
*/
interface GetScheme {
  getScheme: () => Scheme<unknown>
}

interface RefConfig extends Column<{ option?: boolean }>, GetScheme {}

interface RefListConfig extends Column<{ option?: boolean }>, GetScheme {}

export interface PropScheme<T> {
  accessorKey: keyof T
  title: string
  type: Type

  textConfig?: TextConfig
  textAreaConfig?: TextAreaConfig
  numberConfig?: NumberConfig
  dateConfig?: DateConfig
  dateTimeConfig?: DateTimeConfig
  booleanConfig?: BooleanConfig
  refConfig?: RefConfig
  refListConfig?: RefListConfig
}

export interface Scheme<T> {
  accessorKey: string
  title: {
    singular: string
    plural: string
  }
  service: Service

  groups: {
    title?: string
    props: Partial<Record<keyof T, PropScheme<T>>>
  }[]
}

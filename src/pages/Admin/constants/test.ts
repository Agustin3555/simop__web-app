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
  field?: T & { title?: string }
}

interface Column<T> {
  column?: T & { title?: string }
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

interface RefConfig extends Column<{ option?: boolean }> {
  // Referencia hacia otro esquema completo
}

interface PropScheme<T> {
  accesorKey: keyof T | string
  title: string
  type: Type

  textConfig?: TextConfig
  longTextConfig?: LongTextConfig
  numberConfig?: NumberConfig
  dateConfig?: DateConfig
  dateTimeConfig?: DateTimeConfig
  booleanConfig?: BooleanConfig
  refConfig?: RefConfig
}

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

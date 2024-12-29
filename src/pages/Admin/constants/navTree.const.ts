import { Scheme } from '@/models/config'
import { EmpresaModel } from '../models'

export interface SectionNode {
  title?: string
  sections?: SectionNode[]
  scheme?: Scheme<unknown>
}

export const TREE: SectionNode[] = [
  // {
  //   title: 'Administración',
  //   sections: [
  //     {
  //       title: 'Organigrama',
  //       sections: [
  //         { scheme: ViewKey.SUB_SECRETARIA },
  //         { scheme: ViewKey.DIRECCION },
  //         { scheme: ViewKey.DEPARTAMENTO },
  //       ],
  //     },
  //     {
  //       title: 'Ubicación Geográfica',
  //       sections: [
  //         { scheme: ViewKey.PAIS },
  //         { scheme: ViewKey.PROVINCIA },
  //         { scheme: ViewKey.LOCALIDAD },
  //       ],
  //     },
  //     {
  //       title: 'Tipos',
  //       sections: [
  //         { scheme: ViewKey.TIPO_CONTRATACION_OBRA },
  //         { scheme: ViewKey.TIPO_ESTADO_OBRA },
  //         { scheme: ViewKey.TIPO_FINANCIAMIENTO_OBRA },
  //         { scheme: ViewKey.MODIFICACION_OBRA },
  //         { scheme: ViewKey.PARALIZACION_OBRA },
  //         { scheme: ViewKey.TIPO_PROGRAMA_OBRA },
  //         { scheme: ViewKey.TIPO_TEMATICA_OBRA },
  //         { scheme: ViewKey.TIPO_REPRESENTANTE_EMPRESA },
  //         { scheme: ViewKey.TRAMITE },
  //         { scheme: ViewKey.TIPO_PROFESION },
  //       ],
  //     },
  //     {
  //       title: 'Inspectores',
  //       sections: [
  //         { scheme: ViewKey.INSPECTOR },
  //         { scheme: ViewKey.TIPO_INSPECTOR },
  //       ],
  //     },
  //   ],
  // },
  {
    title: 'Empresas',
    sections: [
      { scheme: EmpresaModel.scheme },
      // { scheme: ViewKey.REPRESENTANTE_EMPRESA },
    ],
  },
  // {
  //   title: 'Obras',
  //   sections: [
  //     { scheme: ViewKey.OBRA },
  //     { scheme: ViewKey.FOJA_MEDICION },
  //     { scheme: ViewKey.CERTIFICACION },
  //     { scheme: ViewKey.PAGO_CERTIFICACION },
  //   ],
  // },
]

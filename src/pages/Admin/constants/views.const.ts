import { MetaModel } from '../meta'
import { AUX_VIEWS, AuxViewKey } from './auxViews.const'
import { META_MODELS, MetaModelKey } from './metaModels.const'

export interface ViewInfo {
  title: string
  faIcon?: string
}

export const asModuleView = (key: MetaModelKey) => key
export const asAuxView = (key: AuxViewKey) => key

export const VIEWS_INFO: Record<string, Required<ViewInfo>> = {}

const DEFAULT_FA_ICON = 'fa-solid fa-cube'

Object.entries<MetaModel>(META_MODELS).forEach(([key, { title, faIcon }]) => {
  VIEWS_INFO[key] = { title: title.plural, faIcon: faIcon ?? DEFAULT_FA_ICON }
})

Object.entries<ViewInfo>(AUX_VIEWS).forEach(([key, { title, faIcon }]) => {
  VIEWS_INFO[key] = { title, faIcon: faIcon ?? DEFAULT_FA_ICON }
})

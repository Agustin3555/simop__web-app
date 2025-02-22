export interface Long {
  long?: 's' | 'm' | 'l'
}

export interface Control extends Long {
  name?: string
  title?: string
  hideLabel?: boolean
  required?: boolean
}

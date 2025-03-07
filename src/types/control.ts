export interface Long {
  long?: 's' | 'm' | 'l'
}

export interface Control extends Long {
  keyName: string
  title: string
  hideLabel?: boolean
  required?: boolean
  editMode?: boolean
}

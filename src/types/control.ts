export interface InputField {
  keyName: string
  title: string
  hideLabel: boolean
  isRequired: boolean
  isEditMode: boolean
}

export type InputFieldPartial = Pick<InputField, 'keyName' | 'title'> &
  Partial<Omit<InputField, 'keyName' | 'title'>>

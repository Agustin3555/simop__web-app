type ColorGS =
  | 'black'
  | 'white'
  | '50'
  | '100'
  | '150'
  | '100'
  | '150'
  | '200'
  | '250'
  | '300'
  | '350'
  | '400'
  | '450'
  | '500'
  | '550'
  | '600'
  | '650'
  | '700'
  | '750'
  | '800'
  | '850'
  | '900'
  | '950'

export const getRGB = (
  r: string | number,
  g: string | number,
  b: string | number,
) => `rgb(${r}, ${g}, ${b})`

export const palColorGS = (color: ColorGS) => {
  const colorMatcher: Record<ColorGS, number> = {
    black: 0,
    white: 255,
    '50': 242,
    '100': 230,
    '150': 217,
    '200': 204,
    '250': 191,
    '300': 176,
    '350': 166,
    '400': 153,
    '450': 140,
    '500': 128,
    '550': 115,
    '600': 102,
    '650': 89,
    '700': 77,
    '750': 64,
    '800': 51,
    '850': 38,
    '900': 26,
    '950': 13,
  }

  const value = colorMatcher[color]

  return getRGB(value, value, value)
}

export const COLOR = {
  AD3: [12, 13, 28],
  AD2: [35, 39, 82],
  AD1: [35, 39, 82],
  A: [35, 39, 82],
  AL1: [130, 136, 207],
  AL2: [35, 39, 82],
  AL3: [229, 230, 245],
  BD3: [20, 22, 11],
  BD2: [20, 22, 11],
  BD1: [95, 107, 50],
  B: [133, 149, 70],
  BL1: [168, 179, 122],
  BLD2: [202, 209, 175],
  BL3: [237, 239, 227],
  C: [188, 80, 80],
}

export const palColor = (color: keyof typeof COLOR) =>
  getRGB(COLOR[color][0], COLOR[color][1], COLOR[color][2])

export enum FontSize {
  '2XS' = 0.6875,
  XS = 0.8125,
  S = 1,
  M = 1.25,
  L = 1.5,
  XL = 2,
  XL2 = 2.5,
  XL3 = 4,
}
export enum Size {
  XS3 = 0.125,
  XS2 = 0.25,
  XS = 0.5,
  S = 0.75,
  M = 1,
  L = 1.5,
  XL = 2,
  XL2 = 2.5,
  XL3 = 5,
}

export const scaleSize = (fontSize: FontSize | Size) => fontSize * 16

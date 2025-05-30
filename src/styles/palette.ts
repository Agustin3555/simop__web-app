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

export enum FontSize {
  XS2 = 0.6875,
  XS = 0.8125,
  S = 1,
  M = 1.25,
  L = 1.5,
  XL = 2,
  XL2 = 2.5,
  XL3 = 4,
}

type ColorKeys =
  | 'AD3'
  | 'AD2'
  | 'AD1'
  | 'A'
  | 'AL1'
  | 'AL2'
  | 'AL3'
  | 'BD3'
  | 'BD2'
  | 'BD1'
  | 'B'
  | 'BL1'
  | 'BL2'
  | 'BL3'
  | 'C'

const COLOR_MATCHER: Record<ColorKeys, [number, number, number]> = {
  AD3: [12, 13, 28],
  AD2: [35, 39, 82],
  AD1: [57, 64, 135],
  A: [80, 89, 188],
  AL1: [130, 136, 207],
  AL2: [179, 183, 226],
  AL3: [229, 230, 245],

  BD3: [20, 22, 11],
  BD2: [58, 65, 30],
  BD1: [95, 107, 50],
  B: [133, 149, 70],
  BL1: [168, 179, 122],
  BL2: [202, 209, 175],
  BL3: [237, 239, 227],

  C: [188, 80, 80],
}

const COLOR_GS_MATCHER = {
  black: 0,
  '950': 13,
  '900': 26,
  '850': 38,
  '800': 51,
  '750': 64,
  '700': 77,
  '650': 89,
  '600': 102,
  '550': 115,
  '500': 128,
  '450': 140,
  '400': 153,
  '350': 166,
  '300': 179,
  '250': 191,
  '200': 204,
  '150': 217,
  '100': 230,
  '50': 242,
  white: 255,
}

export const palSize = (size: Size | FontSize) => size * 16

const buildRGB = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`

export const palColor = (color: ColorKeys) => buildRGB(...COLOR_MATCHER[color])

export const palColorGS = (color: keyof typeof COLOR_GS_MATCHER) => {
  const value = COLOR_GS_MATCHER[color]

  return buildRGB(value, value, value)
}

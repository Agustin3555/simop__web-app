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
  | 'AD5'
  | 'AD4'
  | 'AD3'
  | 'AD2'
  | 'AD1'
  | 'A'
  | 'AL1'
  | 'AL2'
  | 'AL3'
  | 'AL4'
  | 'AL5'
  | 'BD5'
  | 'BD4'
  | 'BD3'
  | 'BD2'
  | 'BD1'
  | 'B'
  | 'BL1'
  | 'BL2'
  | 'BL3'
  | 'BL4'
  | 'BL5'
  | 'CD5'
  | 'CD4'
  | 'CD3'
  | 'CD2'
  | 'CD1'
  | 'C'
  | 'CL1'
  | 'CL2'
  | 'CL3'
  | 'CL4'
  | 'CL5'
  | 'D'
  | 'E'
  | 'F'

export const COLOR_MATCHER: Record<ColorKeys, [number, number, number]> = {
  AD5: [8, 9, 19],
  AD4: [22, 25, 53],
  AD3: [37, 41, 87],
  AD2: [51, 57, 120],
  AD1: [66, 73, 154],
  A: [80, 89, 188],
  AL1: [112, 119, 200],
  AL2: [143, 149, 212],
  AL3: [175, 179, 224],
  AL4: [206, 209, 236],
  AL5: [238, 238, 248],

  BD5: [23, 0, 13],
  BD4: [64, 0, 36],
  BD3: [105, 0, 58],
  BD2: [147, 0, 81],
  BD1: [188, 0, 104],
  B: [229, 0, 127],
  BL1: [234, 46, 150],
  BL2: [238, 92, 173],
  BL3: [243, 138, 196],
  BL4: [248, 184, 219],
  BL5: [252, 230, 242],

  CD5: [13, 15, 7],
  CD4: [37, 42, 20],
  CD3: [61, 69, 32],
  CD2: [85, 95, 45],
  CD1: [109, 122, 57],
  C: [133, 149, 70],
  CL1: [155, 168, 103],
  CL2: [177, 187, 137],
  CL3: [199, 206, 170],
  CL4: [221, 225, 203],
  CL5: [243, 244, 237],

  D: [188, 80, 80],

  E: [6, 53, 101],

  F: [242, 109, 249],
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

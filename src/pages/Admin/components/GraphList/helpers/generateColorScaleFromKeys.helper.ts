import { RGBColor } from '@/styles/palette'

// Función para ajustar brillo (factor > 1 = más claro, < 1 = más oscuro)
const adjustBrightness = (
  [r, g, b]: [number, number, number],
  factor: number,
) => {
  return [
    Math.min(255, Math.max(0, Math.round(r * factor))),
    Math.min(255, Math.max(0, Math.round(g * factor))),
    Math.min(255, Math.max(0, Math.round(b * factor))),
  ]
}

// Hash para que la misma key siempre dé el mismo color
const hashToIndex = (value: string | number, totalColors: number) => {
  let hash = 0
  const str = value.toString()

  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash)

  return Math.abs(hash) % totalColors
}

// Generar paleta completa con variaciones
const generateFullPalette = (baseColors: RGBColor[]) => {
  const variations = 20

  const factors = Array.from(
    { length: variations },
    (_, i) => 0.625 + (i / (variations - 1)) * 0.75,
  )

  const palette: string[] = []

  baseColors.forEach(base => {
    factors.forEach(factor => {
      const [r, g, b] = adjustBrightness(base, factor)
      palette.push(`rgb(${r}, ${g}, ${b})`)
    })
  })

  return palette
}

// Mapear keys a colores
export const generateColorScaleFromKeys = (
  baseColors: RGBColor[],
  keys: string[],
) => {
  const palette = generateFullPalette(baseColors)

  return keys.map(key => palette[hashToIndex(key, palette.length)])
}

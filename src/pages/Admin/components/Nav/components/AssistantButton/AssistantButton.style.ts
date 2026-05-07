const rand = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min)

export const randomBlob = (shape: HTMLElement) => {
  const r = Array.from({ length: 4 }, () => rand(25, 65))
  shape.style.borderRadius = `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}%`
}

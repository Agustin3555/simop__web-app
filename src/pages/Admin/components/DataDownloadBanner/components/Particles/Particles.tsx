import { useMemo } from 'react'
import { clsx, varList } from '@/helpers'

const SIZES = ['s', 's', 's', 'm', 'm', 'l']

const generateParticles = (count: number) =>
  Array.from({ length: count }, () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
  }))

const Particles = () => {
  const particles = useMemo(() => generateParticles(16), [])

  return particles.map(({ x, y, size }, i) => (
    <div key={i} className={clsx('particle-container', size)}>
      <div style={varList({ x, y })} />
    </div>
  ))
}

export default Particles

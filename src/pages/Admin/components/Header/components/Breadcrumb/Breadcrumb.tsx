import './Breadcrumb.css'
import { useMemo } from 'react'
import { useSearch } from 'wouter'
import { SectionNode, TREE } from '@/pages/Admin/constants/navTree.const'
import { TABLE_DEFS } from '@/pages/Admin/constants/metaModelDefinitions.const'
import { clsx } from '@/helpers'

type BreadcrumbItem = {
  label: string
  isActive: boolean
}

const findBreadcrumbPath = (
  tree: SectionNode[],
  targetKey: string,
  path: BreadcrumbItem[] = [],
): BreadcrumbItem[] | null => {
  for (const node of tree) {
    if (node.tableKey === targetKey) {
      return [
        ...path,
        { label: TABLE_DEFS[node.tableKey].title.plural, isActive: true },
      ]
    }

    if (node.sections) {
      const result = findBreadcrumbPath(node.sections, targetKey, [
        ...path,
        { label: node.title!, isActive: false },
      ])
      if (result) return result
    }
  }

  return null
}

export const Breadcrumb = () => {
  const search = useSearch()

  const breadcrumbs = useMemo(() => {
    const params = new URLSearchParams(search)
    const moduleKey = params.get('module')
    if (!moduleKey) return []

    const path = findBreadcrumbPath(TREE, moduleKey)
    return path || []
  }, [search])

  if (breadcrumbs.length === 0) return null

  return (
    <ol className="cmp-breadcrumb" aria-label="Breadcrumb">
      {breadcrumbs.map(({ label, isActive }, i) => (
        <li key={i} className={clsx('label', { isActive })}>
          <span className="label">{label}</span>
          {i < breadcrumbs.length - 1 && <span className="separator">/</span>}
        </li>
      ))}
    </ol>
  )
}

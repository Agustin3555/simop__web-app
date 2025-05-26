import './Tree.css'
import { Section } from './components'
import { TREE } from '@/pages/Admin/constants/navTree.const'

const Tree = () => (
  <div className="cmp-tree">
    {TREE.map(section => (
      <Section key={section.viewKey ?? section.title} {...section} />
    ))}
  </div>
)

export default Tree

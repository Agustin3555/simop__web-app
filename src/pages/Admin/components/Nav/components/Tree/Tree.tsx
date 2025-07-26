import './Tree.css'
import { Node } from './components'
import { TREE } from '@/pages/Admin/constants/navTree.const'

const Tree = () => (
  <div className="cmp-tree">
    {TREE.map(section => (
      <Node key={section.viewKey ?? section.title} {...section} />
    ))}
  </div>
)

export default Tree

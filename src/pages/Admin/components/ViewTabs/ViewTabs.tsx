import View, { ViewProps } from '../View/View'
import Tabs, { TabsProps } from '../Tabs/Tabs'

export type ViewTabsProps = Omit<ViewProps, 'children'> & TabsProps

const ViewTabs = (props: ViewTabsProps) => (
  <View viewKey={props.viewKey}>
    <Tabs {...props} />
  </View>
)

export default ViewTabs

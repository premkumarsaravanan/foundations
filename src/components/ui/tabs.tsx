import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export interface TabConfig {
  tabIdentifier: string
  displayText: string
  onTabClick: (tabIdentifier: string) => void
  active: boolean
}

interface TabsProps {
  tabConfigs: TabConfig[]
}

export const selectTab = (event: React.SyntheticEvent, tabConfig: TabConfig) => {
  event.preventDefault()
  tabConfig.onTabClick(tabConfig.tabIdentifier)
}

const { tabs, isToggle, isFullwidth, isMedium, isActive } = bulma
const tabsClasses = `${tabs} ${isToggle} ${isFullwidth} ${isMedium}`

const Tabs: React.FunctionComponent<TabsProps> = ({ tabConfigs }) => (
  <div className={tabsClasses} role="tablist">
    <ul>
      {tabConfigs.map(tabConfig => (
        <li className={`${tabConfig.active ? isActive : ''}`} key={tabConfig.tabIdentifier}>
          <a
            id={tabConfig.tabIdentifier}
            href={`#${tabConfig.tabIdentifier}`}
            role="tab"
            aria-controls={tabConfig.tabIdentifier}
            aria-selected={tabConfig.active}
            onClick={(error: React.SyntheticEvent) => selectTab(error, tabConfig)}
          >
            {tabConfig.displayText}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default Tabs

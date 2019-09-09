import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import appCardStyles from '@/styles/blocks/app-card.scss?mod'

export type InfoType =
  | '404'
  | 'CLIENT_APPS_EMPTY'
  | 'INSTALLED_APPS_EMPTY'
  | 'DEVELOPER_APPS_EMPTY'
  | 'ADMIN_APPROVALS_EMPTY'
  | ''

export interface InfoProps {
  infoType: InfoType
}

const infoText = (infoType: InfoType) => {
  switch (infoType) {
    case '404':
      return 'Page not found'
    case 'CLIENT_APPS_EMPTY':
      return 'We are sorry, there are no apps listed compatible with your account'
    case 'INSTALLED_APPS_EMPTY':
      return 'You have no apps installed - try browsing the apps list for apps you might find useful'
    case 'DEVELOPER_APPS_EMPTY':
      return 'You currently have no apps listed. Go to the submit app page to submit an app. After submission, you will need to edit the app and set status to isListed to appear in the marketplace'
    case 'ADMIN_APPROVALS_EMPTY':
      return 'There are no updates that require approval'
    default:
      return ''
  }
}

const Info: React.SFC<InfoProps> = ({ infoType }) => (
  <div className={`${bulma.container} ${bulma.isRelative} py-8`}>
    <div className={`${bulma.card} ${appCardStyles.appCard}`}>
      <div className={bulma.cardContent}>
        <h3 className={`${bulma.title} ${bulma.is6}`}>{infoText(infoType)}</h3>
      </div>
    </div>
  </div>
)

export default Info

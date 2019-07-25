import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetail, AppDetailProps } from '../app-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const props: AppDetailProps = {
  data: appDetailDataStub.data
}

describe('AppDetailModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AppDetail {...props} />))).toMatchSnapshot()
  })
})

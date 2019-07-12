import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Client, ClientProps } from '../client'
import { clientDataStub } from '@/sagas/__stubs__/client'

const props: ClientProps = {
  appDetail: { appDetailData: { data: { id: 'xxxx' } }, error: false, loading: false },
  fetchAppDetail: jest.fn(),
  clientState: {
    loading: false,
    clientData: clientDataStub
  }
}

describe('Client', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Client {...props} />))).toMatchSnapshot()
  })
})

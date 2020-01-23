import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  DeveloperSubmitAppSuccessfully,
  DeveloperSubmitAppSuccessfullyProps
} from '../developer-submit-app-successfully'

describe('DeveloperSubmitAppSuccessfully', () => {
  it('renders correctly', () => {
    const props: DeveloperSubmitAppSuccessfullyProps = {
      onClickHandler: () => jest.fn()
    }

    expect(toJson(shallow(<DeveloperSubmitAppSuccessfully {...props} />))).toMatchSnapshot()
  })
})

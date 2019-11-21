import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { Input, InputProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
import { FaSearch } from 'react-icons/fa'

const props: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text'
}

const hasRightIconInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  rightIcon: <FaSearch />
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Input {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot with right icon', () => {
    expect(toJson(shallow(<Input {...hasRightIconInputProps} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ username: '' }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <Input {...props} />
          </Form>
        )}
      />
    )
    expect(wrapper.find('label')).toHaveLength(1)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'abcxyz',
        name: 'username'
      }
    })
    expect(wrapper.find('input').prop('value')).toEqual('abcxyz')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

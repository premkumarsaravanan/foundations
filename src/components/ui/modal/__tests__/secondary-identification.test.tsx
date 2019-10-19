import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import { SecondaryIdentification, mapStateToProps, mapDispatchToProps } from '../secondary-identification'
import { ReduxState } from '@/types/core'
import { IDENTIFICATION_FORM_DEFAULT_VALUES } from '../../forms/identification'
describe('SecondaryIdentification', () => {
  describe('SecondaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contactModel: contact,
        initFormValues: {},
        loading: false,
        updateIdentification: jest.fn(),
        isDesktopMode: false
      }
      const wrapper = shallow(<SecondaryIdentification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: false,
          checklistDetailData: {
            contact,
            idCheck: null
          }
        },
        auth: {
          refreshSession: {
            desktopMode: 'DESKTOP'
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contactModel: contact,
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
        isDesktopMode: false
      }
      expect(result).toEqual(expected)
    })

    it('should return correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contactModel: {},
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
        isDesktopMode: false
      }
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('updateIdentification', () => {
      const mockDispatch = jest.fn()
      const { updateIdentification } = mapDispatchToProps(mockDispatch)
      updateIdentification({} as any)
      expect(mockDispatch).toBeCalled()
    })
  })
})

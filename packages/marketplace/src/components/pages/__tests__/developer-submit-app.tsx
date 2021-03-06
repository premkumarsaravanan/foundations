import * as React from 'react'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import { match } from 'react-router'
import { shallow, mount } from 'enzyme'
import { getMockRouterProps } from '@/utils/mock-helper'
import {
  SubmitApp,
  SubmitAppProps,
  renderScopesCheckbox,
  SubmitAppMappedActions,
  handleSubmitApp,
  handleClickOpenModal,
  handleCloseModal,
  // handleAcceptTerms,
  // handleDeclineTerms,
  CustomCreateAppModel,
  handleSubmitModalContinue,
  handleSubmitModalViewDocs,
  handleBeforeSubmit,
  renderErrors,
  labelTextOfField,
} from '../developer-submit-app'
import { appDetailDataStub } from '../../../sagas/__stubs__/app-detail'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'
import { Loader, Checkbox } from '@reapit/elements'
import MockDate from 'mockdate'
import DOCS_LINKS from '@/constants/docs-links'
import { getCookieString, setCookieString, COOKIE_MAX_AGE_INFINITY, COOKIE_FIRST_SUBMIT } from '@/utils/cookie'

jest.mock('@/utils/cookie', () => ({
  getCookieString: jest.fn(),
  setCookieString: jest.fn(),
}))

const submitAppMappedActionsProps: SubmitAppMappedActions = {
  submitApp: jest.fn(),
  submitAppSetFormState: jest.fn(),
  submitRevision: jest.fn(),
  submitRevisionSetFormState: jest.fn(),
}

const mockRouterProps = getMockRouterProps(null)

describe('DeveloperSubmitApp', () => {
  describe('renderErrors', () => {
    it('should return null is error object is empty', () => {
      const result = renderErrors({})
      expect(result).toBeNull()
    })
    it('should errors correctly and not render FIELD_ERROR_DESCRIPTION', () => {
      const Component = () =>
        renderErrors({
          name: 'test',
          telephone: 'test',
          homePage: ['test', 'test'],
          unknownField: 'test',
        })

      const wrapper = mount(<Component />)

      const fieldUnknownNode = wrapper.find('[data-test="unknownField"]')
      expect(fieldUnknownNode.text()).toBe('unknownField: test')

      const fieldHomePageNode = wrapper.find('[data-test="homePage"]')
      expect(fieldHomePageNode.text()).toBe(`${labelTextOfField['homePage']}: test, test`)

      const fieldNameNode = wrapper.find('[data-test="name"]')
      expect(fieldNameNode.text()).toBe(`${labelTextOfField['name']}: test`)

      const fieldTelephoneNode = wrapper.find('[data-test="telephone"]')
      expect(fieldTelephoneNode.text()).toBe(`${labelTextOfField['telephone']}: test`)

      const headingNode = wrapper.find('h6')
      expect(headingNode.text()).toBe('The following validation errors have occurred:')
    })
    it('should render field render FIELD_ERROR_DESCRIPTION correctly', () => {
      const Component = () =>
        renderErrors({
          [FIELD_ERROR_DESCRIPTION]: 'test-heading',
        })

      const wrapper = mount(<Component />)
      const headingNode = wrapper.find('h6')
      expect(headingNode.text()).toBe('test-heading')
    })
  })

  it('should match a snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '',
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should show when fetch data loading', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: true,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: { loading: true, submitAppData: null, formState: 'PENDING' },
      developerId: null,
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    const wrapper = mount(<SubmitApp {...props} />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })
  it('should match submit revision form snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: appDetailDataStub,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should match snapshot when there are two app images', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: appDetailDataStub,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    const wrapper = shallow(<SubmitApp {...props} />)
    const screenshot1Value = wrapper.find('#screenshot1+span+span>a') // see css selectors
    const screenshot2Value = wrapper.find('#screenshot2+span+span>a') // see css selectors
    expect(screenshot1Value).toBeDefined()
    expect(screenshot2Value).toBeDefined()
  })
  it('should match submit revision form when appDetailState is loading snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: true,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should match submit revision form when appDetailState is having errors snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: true,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should match submit revision form when appDetailState is having null snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should match submit app successfully snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'SUCCESS',
      },
      developerId: '2',
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should match submit revision successfully snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'SUCCESS' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    expect(shallow(<SubmitApp {...props} />)).toMatchSnapshot()
  })
  it('should show enough scope checkbox', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: true,
        error: false,
        appDetailData: null,
        authentication: {
          loading: false,
          code: '',
        },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'SUBMITTING',
      },
      developerId: null,
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    const wrapper = mount(<SubmitApp {...props} />)
    expect(wrapper.find(Checkbox)).toHaveLength(2)
  })
  it('should go back to my apps page if click "Back To Apps" when editing an app', () => {
    const mockHistory = mockRouterProps.history
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: {
        loading: false,
        error: false,
        appDetailData: appDetailDataStub,
        authentication: { loading: false, code: '' },
        isStale: false,
      },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }],
        },
        formState: 'PENDING',
      },
      developerId: '2',
      match: {
        params: {
          appid: '1',
        },
      } as match<{ appid?: string }>,
      history: mockHistory,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || [],
    }
    const wrapper = mount(<SubmitApp {...props} />)
    const goBackButton = wrapper.findWhere(n => n.type() === 'button' && n.text().toLowerCase() === 'back to apps')
    goBackButton.simulate('click')
    expect(props.history.push).toBeCalled()
  })
})
describe('renderScopesCheckbox run correctly', () => {
  it('should match snapshot when has scopes', () => {
    const scopes = [
      { name: 'AgencyCloud/properties.read', description: 'Read data about properties' },
      { name: 'AgencyCloud/properties.write', description: 'Write data about developers' },
    ]
    const checkboxes = renderScopesCheckbox(scopes, undefined)
    expect(checkboxes).toMatchSnapshot()
  })
  it('should match snapshot when have errorScope', () => {
    const scopes = []
    const checkboxes = renderScopesCheckbox(scopes, 'error string')
    expect(checkboxes).toMatchSnapshot()
  })
})
describe('handleSubmitApp', () => {
  const paramsBase = {
    appId: 'appId',
    submitApp: jest.fn(),
    submitRevision: jest.fn(),
    setSubmitError: jest.fn(),
    // isAgreedTerms: false,
    // setShouldShowError: jest.fn(),
  }
  const appModel = { redirectUris: '' } as CustomCreateAppModel
  const actions = {} as any
  afterEach(() => jest.clearAllMocks())
  // it('should call setShouldShowError when not agree', () => {
  //   const params = { ...paramsBase }
  //   const spy = jest.spyOn(params, 'setShouldShowError')
  //   const fn = handleSubmitApp(params)
  //   fn(appModel, actions)
  //   expect(spy).toHaveBeenCalledWith(true)
  // })
  it('should call submitApp when dont have appId', () => {
    const params = { ...paramsBase, appId: null, isAgreedTerms: true }
    const spy = jest.spyOn(params, 'submitApp')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spy).toHaveBeenCalledTimes(1)
  })
  it('should call submitRevision when have appId', () => {
    const params = { ...paramsBase, appId: 'appid', isAgreedTerms: true }
    const spy = jest.spyOn(params, 'submitRevision')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call submitApp with correct params when !appId and authFlow = clientCredentials', () => {
    const params = {
      appId: undefined,
      submitApp: jest.fn(),
      submitRevision: jest.fn(),
      setSubmitError: jest.fn(),
      isAgreedTerms: true,
      setShouldShowError: jest.fn(),
    }
    const appModel = {
      authFlow: 'clientCredentials',
      redirectUris: 'https://google.com',
      signoutUris: 'https://google.com',
    } as CustomCreateAppModel
    const actions = {} as any
    const spySubmitApp = jest.spyOn(params, 'submitApp')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spySubmitApp).toHaveBeenCalledWith(
      {
        authFlow: 'clientCredentials',
      },
      actions,
    )
  })

  it('should call submitApp with correct params when !appId and authFlow = authorisationCode', () => {
    const params = {
      appId: undefined,
      submitApp: jest.fn(),
      submitRevision: jest.fn(),
      setSubmitError: jest.fn(),
      isAgreedTerms: true,
      setShouldShowError: jest.fn(),
    }
    const appModel = {
      authFlow: 'authorisationCode',
      redirectUris: 'https://google.com',
      signoutUris: 'https://google.com',
    } as CustomCreateAppModel
    const actions = {} as any
    const spySubmitApp = jest.spyOn(params, 'submitApp')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spySubmitApp).toHaveBeenCalledWith(
      {
        ...appModel,
        redirectUris: ['https://google.com'],
        signoutUris: ['https://google.com'],
      },
      actions,
    )
  })

  it('should call submitRevision with correct params when have appId and authFlow = clientCredentials', () => {
    const params = {
      appId: 'id1',
      submitApp: jest.fn(),
      submitRevision: jest.fn(),
      setSubmitError: jest.fn(),
      isAgreedTerms: true,
      setShouldShowError: jest.fn(),
    }
    const appModel = {
      authFlow: 'clientCredentials',
      redirectUris: 'https://google.com',
      signoutUris: 'https://google.com',
    } as CustomCreateAppModel
    const actions = {} as any
    const spySubmitRevision = jest.spyOn(params, 'submitRevision')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spySubmitRevision).toHaveBeenCalledWith('id1', {})
  })

  it('should call submitRevision with correct params when have appId and authFlow = authorisationCode', () => {
    const params = {
      appId: 'id1',
      submitApp: jest.fn(),
      submitRevision: jest.fn(),
      setSubmitError: jest.fn(),
      isAgreedTerms: true,
      setShouldShowError: jest.fn(),
    }
    const appModel = {
      authFlow: 'authorisationCode',
      redirectUris: 'https://google.com',
      signoutUris: 'https://google.com',
    } as CustomCreateAppModel
    const actions = {} as any
    const spySubmitRevision = jest.spyOn(params, 'submitRevision')
    const fn = handleSubmitApp(params)
    fn(appModel, actions)
    expect(spySubmitRevision).toHaveBeenCalledWith('id1', {
      redirectUris: ['https://google.com'],
      signoutUris: ['https://google.com'],
    })
  })
})
describe('handleClickOpenModal', () => {
  it('should call preventDefault and setTermModalIsOpen', () => {
    const eventMock = {
      preventDefault: jest.fn(),
    }
    const setTermModalIsOpen = jest.fn()
    const spy = jest.spyOn(eventMock, 'preventDefault')
    handleClickOpenModal(setTermModalIsOpen)(eventMock)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(setTermModalIsOpen).toHaveBeenCalledWith(true)
  })
})
describe('handleCloseModal', () => {
  it('should call setTermModalIsOpen', () => {
    const setTermModalIsOpen = jest.fn()
    handleCloseModal(setTermModalIsOpen)()
    expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
  })
})

describe('handleSubmitModalContinue', () => {
  const mockDateString = '2020-02-18'

  beforeAll(() => {
    MockDate.set(new Date(mockDateString))
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call setIsSubmitModalOpen & setCookieString', () => {
    const setIsSubmitModalOpen = jest.fn()
    const fn = handleSubmitModalContinue(setIsSubmitModalOpen)
    fn()
    expect(setIsSubmitModalOpen).toHaveBeenCalledWith(false)
    expect(setCookieString).toHaveBeenCalledWith(COOKIE_FIRST_SUBMIT, mockDateString, COOKIE_MAX_AGE_INFINITY)
  })
})

describe('handleSubmitModalViewDocs', () => {
  const { location } = window

  beforeAll(() => {
    delete window.location
    window.location = { assign: jest.fn() } as any
  })

  afterAll(() => {
    window.location = location
  })
  it('should call window.location.assign', () => {
    const spy = jest.spyOn(window, 'open')
    handleSubmitModalViewDocs()
    expect(spy).toHaveBeenCalledWith(DOCS_LINKS.DEVELOPER_PORTAL, '_blank')
  })
})

describe('handleBeforeSubmit', () => {
  it('should call setIsSubmitModalOpen when !firstSubmitCookie', () => {
    ;(getCookieString as any).mockImplementation(() => null)
    const validateFunction = jest.fn()
    const setIsSubmitModalOpen = jest.fn()
    const fn = handleBeforeSubmit(validateFunction, setIsSubmitModalOpen)
    const result = fn({ key: 'val' } as CustomCreateAppModel)
    expect(result).toEqual({ message: 'firstSubmit' })
  })
  it('should return validateFunc when firstSubmitCookie', () => {
    ;(getCookieString as any).mockImplementation(() => '2020-01-01')
    const validateFunction = jest.fn()
    const setIsSubmitModalOpen = jest.fn()
    const fn = handleBeforeSubmit(validateFunction, setIsSubmitModalOpen)
    const result = fn({ key: 'val' } as CustomCreateAppModel)
    expect(result).toEqual(validateFunction({ key: 'val' }))
  })
})

// describe('handleAcceptTerms', () => {
//   it('should call setIsAgreedTerms and setTermModalIsOpen', () => {
//     const setTermModalIsOpen = jest.fn()
//     const setIsAgreedTerms = jest.fn()
//     handleAcceptTerms(setIsAgreedTerms, setTermModalIsOpen)()
//     expect(setIsAgreedTerms).toHaveBeenCalledWith(true)
//     expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
//   })
// })
// describe('handleDeclineTerms', () => {
//   it('should call preventDefault and setTermModalIsOpen', () => {
//     const setTermModalIsOpen = jest.fn()
//     const setIsAgreedTerms = jest.fn()
//     handleDeclineTerms(setIsAgreedTerms, setTermModalIsOpen)()
//     expect(setIsAgreedTerms).toHaveBeenCalledWith(false)
//     expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
//   })
// })

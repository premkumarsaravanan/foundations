import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, FormState } from '@/types/core'
import {
  Input,
  ImageInput,
  TextArea,
  Button,
  Checkbox,
  Loader,
  Alert,
  H3,
  Grid,
  GridItem,
  FlexContainerBasic,
  FormSection,
  FormHeading,
  FormSubHeading,
  GridFourCol,
  GridFourColItem,
  LevelRight,
  SelectBox,
  SelectBoxOptions,
  Formik,
  Form,
  FormikHelpers,
  H6,
  RadioSelect,
  FlexContainerResponsive,
  Helper,
} from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'

import { validate } from '@/utils/form/submit-app'
import { connect } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { AppDetailState } from '@/reducers/app-detail'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppModel, ScopeModel, AppDetailModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import DeveloperSubmitAppSuccessfully from './developer-submit-app-successfully'
import { selectCategories } from '../../selector/app-categories'
import styles from '@/styles/pages/developer-submit-app.scss?mod'
import linkStyles from '@/styles/elements/link.scss?mod'
import { getCookieString, setCookieString, COOKIE_FIRST_SUBMIT, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import { SubmitAppReadDocModal } from '@/components/ui/submit-app-read-doc-modal'
import dayjs from 'dayjs'
import DOCS_LINKS from '@/constants/docs-links'
import DAY_FORMATS from '@/constants/date-formats'

export type CustomCreateAppModel = Omit<CreateAppModel, 'redirectUris' | 'signoutUris'> & {
  redirectUris?: string
  signoutUris?: string
}

export interface SubmitAppMappedActions {
  submitApp: (
    appModel: CreateAppModel,
    actions: SubmitAppFormikActions,
    setSubmitError: (error: string) => void,
  ) => void
  submitAppSetFormState: (formState: FormState) => void
  submitRevision: (id: string, revision: CreateAppModel) => void
  submitRevisionSetFormState: (formState: FormState) => void
}

export interface SubmitAppMappedProps {
  submitAppState: SubmitAppState
  appDetailState: AppDetailState
  submitRevisionState: SubmitRevisionState
  developerId: string | null
  categories: CategoryModel[]
}

export const labelTextOfField = {
  name: 'Name',
  supportEmail: 'Support email',
  telephone: 'Telephone',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  summary: 'Summary',
  description: 'Description',
  redirectUris: 'Redirect URI(s)',
  signoutUris: 'Sign Out URI(s)',
  screen1ImageUrl: 'Screenshot 1',
  iconImageUrl: 'Icon',
  scopes: 'Permissions',
  authFlow: 'Authentication flow',
}

export type SubmitAppProps = SubmitAppMappedActions & SubmitAppMappedProps & RouteComponentProps<{ appid?: string }>

export const renderErrors = (errors: Record<string, string | string[]>) => {
  const isErrorsEmpty = typeof errors !== 'object' || Object.keys(errors).length === 0
  if (isErrorsEmpty) {
    return null
  }

  const description = errors[FIELD_ERROR_DESCRIPTION]

  return (
    <div className="has-text-danger">
      <H6 className="has-text-danger mb-1">{description || 'The following validation errors have occurred:'}</H6>
      <div>
        {Object.keys(errors).map(key => {
          const value = errors[key]

          if (key === FIELD_ERROR_DESCRIPTION) {
            return null
          }

          if (typeof value === 'string') {
            return (
              <div data-test={key} key={key}>
                {labelTextOfField[key] || key}: {errors[key]}
              </div>
            )
          }

          return (
            <div data-test={key} key={key}>
              {labelTextOfField[key] || key}: {(errors[key] as string[]).join(', ')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const renderScopesCheckbox = (scopes: ScopeModel[] = [], errorScope?: string) => (
  <>
    {scopes.map((item: ScopeModel) => {
      // TODO - short term hack to remove temporary scopes from API response
      if (
        item.name !== 'Marketplace/developers.read' &&
        item.name !== 'Marketplace/developers.write' &&
        item.name !== 'TestResourceServer/test.scope'
      ) {
        return (
          <GridFourColItem key={item.name}>
            <Checkbox name="scopes" labelText={item.description || ''} id={item.name || ''} value={item.name} />
          </GridFourColItem>
        )
      }
    })}
    {errorScope && (
      <div className={`has-text-danger has-text-right ${styles.errorScope}`} data-test="input-error">
        {errorScope}
      </div>
    )}
  </>
)

export const generateInitialValues = (appDetail: AppDetailModel | null, developerId: string | null) => {
  let initialValues

  if (appDetail) {
    const {
      category,
      authFlow,
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      media,
      name,
      isListed,
      isDirectApi,
      scopes: appScopes,
      redirectUris = [],
      signoutUris = [],
    } = appDetail

    const icon = (media || []).filter(({ order }) => order === 0)[0]
    const iconImageUrl = icon ? icon.uri : ''
    const images = (media || [])
      .filter(({ type }) => type !== 'icon')
      .reduce((a, c, i) => ({ ...a, [`screen${i + 1}ImageUrl`]: c.uri }), {})
    // ^reason of using index instead of `order` property is because all images
    // in media have order of 0 (see ticket [CLD-623] to learn more)

    initialValues = {
      name,
      categoryId: category?.id || '',
      authFlow,
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      iconImageUrl,
      isListed,
      isDirectApi,
      scopes: appScopes ? appScopes.map(item => item.name) : [],
      redirectUris: redirectUris.join(','),
      signoutUris: signoutUris.join(','),
      ...images,
    }
  } else {
    initialValues = {
      categoryId: '',
      authFlow: '',
      screen5ImageUrl: '',
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      developerId,
      scopes: [],
      redirectUris: '',
      signoutUris: '',
    }
  }

  return initialValues
}

export const handleSubmitApp = ({
  appId,
  submitApp,
  submitRevision,
  // isAgreedTerms,
  // setShouldShowError,
}) => (appModel: CustomCreateAppModel, actions: FormikHelpers<CustomCreateAppModel>) => {
  // if (!isAgreedTerms) {
  //   setShouldShowError(true)
  //   return
  // }
  const { redirectUris, signoutUris, ...otherData } = appModel
  const appToSubmit =
    appModel.authFlow === 'clientCredentials'
      ? otherData
      : {
          ...otherData,
          redirectUris: redirectUris ? redirectUris.split(',') : [],
          signoutUris: signoutUris ? signoutUris.split(',') : [],
        }
  if (!appId) {
    submitApp(appToSubmit, actions)
  } else {
    if (appToSubmit.authFlow) {
      delete appToSubmit.authFlow
    }
    submitRevision(appId, appToSubmit)
  }
}

export const handleClickOpenModal = setTermModalIsOpen => event => {
  event.preventDefault()
  setTermModalIsOpen(true)
}
export const handleCloseModal = setTermModalIsOpen => () => {
  setTermModalIsOpen(false)
}

export const handleAcceptTerms = (setIsAgreedTerms, setTermModalIsOpen) => () => {
  setIsAgreedTerms(true)
  setTermModalIsOpen(false)
}
export const handleDeclineTerms = (setIsAgreedTerms, setTermModalIsOpen) => () => {
  setIsAgreedTerms(false)
  setTermModalIsOpen(false)
}

/**
 * Before submit, run this to check first submit,
 * and validate all fields
 */
export const handleBeforeSubmit = (validateFunction, setIsSubmitModalOpen) => (values: CustomCreateAppModel) => {
  const firstSubmitCookie = getCookieString(COOKIE_FIRST_SUBMIT)
  if (!firstSubmitCookie) {
    setIsSubmitModalOpen(true)
    // return FormikErrors-like object to prevent formik from submit data
    return { message: 'firstSubmit' }
  }
  return validateFunction(values)
}

export const handleSubmitModalContinue = setIsSubmitModalOpen => () => {
  setIsSubmitModalOpen(false)
  setCookieString(COOKIE_FIRST_SUBMIT, dayjs().format(DAY_FORMATS.YYYY_MM_DD), COOKIE_MAX_AGE_INFINITY)
}

export const handleSubmitModalViewDocs = () => {
  const newTab = window.open(DOCS_LINKS.DEVELOPER_PORTAL, '_blank')

  if (newTab) {
    newTab.focus()
  }
}

const getGoBackToAppsFunc = ({ history }: Pick<RouteComponentProps, 'history'>) =>
  React.useCallback(() => history.push(Routes.DEVELOPER_MY_APPS), [history])

export const SubmitApp: React.FC<SubmitAppProps> = ({
  submitAppSetFormState,
  submitApp,
  submitAppState,
  submitRevisionSetFormState,
  submitRevision,
  submitRevisionState,
  appDetailState,
  developerId,
  match,
  history,
  categories,
}) => {
  let initialValues
  let formState
  let appId
  /* terms state */
  // const [termModalIsOpen, setTermModalIsOpen] = React.useState<boolean>(false)
  // const [isAgreedTerms, setIsAgreedTerms] = React.useState<boolean>(false)
  // const [shouldShowError, setShouldShowError] = React.useState<boolean>(false)
  /* toggle checked input */
  // const handleOnChangeAgree = setIsAgreedTerms.bind(null, prev => !prev)

  // submit modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(!getCookieString(COOKIE_FIRST_SUBMIT))

  const goBackToApps = getGoBackToAppsFunc({ history })

  const isSubmitRevision = Boolean(match.params && match.params.appid)
  const isSubmitApp = !isSubmitRevision

  if (isSubmitApp) {
    const { loading } = submitAppState
    formState = submitAppState.formState

    if (loading) {
      return <Loader />
    }

    initialValues = generateInitialValues(null, developerId)
  }

  if (isSubmitRevision) {
    const { loading, error, appDetailData } = appDetailState
    formState = submitRevisionState.formState

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <Alert type="danger" message="Failed to fetch. Please try later." />
    }

    if (!appDetailData) {
      return null
    }

    appId = appDetailData.data.id
    initialValues = generateInitialValues(appDetailData.data, developerId)
  }

  const scopes = (submitAppState.submitAppData && submitAppState.submitAppData.scopes) || []

  const isSubmitting = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  const submitAppSuccessfully = !isSubmitRevision && isSuccessed
  const submitRevisionSuccessfully = isSubmitRevision && isSuccessed

  if (submitAppSuccessfully) {
    return (
      <DeveloperSubmitAppSuccessfully
        onGoBackToApps={goBackToApps}
        onSubmitAnotherApp={() => submitAppSetFormState('PENDING')}
      />
    )
  }

  if (submitRevisionSuccessfully) {
    submitRevisionSetFormState('PENDING')
    history.push(Routes.DEVELOPER_MY_APPS)
  }

  const categoryOptions: SelectBoxOptions[] = categories.map(category => ({
    value: category.id as string,
    label: category.name as string,
  }))

  return (
    <>
      <FlexContainerBasic
        hasPadding
        flexColumn
        className={`${isSubmitting ? 'disabled' : ''} ${styles.container}`}
        data-test="app-input-form"
      >
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          {isSubmitApp ? <H3>Submit App</H3> : <H3>Edit App</H3>}
          <Formik
            validate={handleBeforeSubmit(validate, setIsSubmitModalOpen)}
            initialValues={initialValues}
            onSubmit={handleSubmitApp({
              appId,
              submitApp,
              submitRevision,
              // isAgreedTerms,
              // setShouldShowError ,
            })}
          >
            {({ setFieldValue, values, errors }) => {
              return (
                <Form noValidate={true}>
                  <FormSection data-test="submit-app-form">
                    <Helper>
                      For more information on how to complete this form, please view our &quot;Step-by-step&quot;
                      guide&nbsp;
                      <a
                        className={linkStyles.link}
                        href="https://foundations-documentation.reapit.cloud/developer-portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </Helper>
                    <FormHeading>App Listing</FormHeading>
                    <FormSubHeading>
                      The section below relates to the fields that comprise the listing of your application as it will
                      appear to a user in the Marketplace. It also includes details we will use to enable us to contact
                      you about your submitted application, how best to make your app discoverable to users and to
                      determine where to launch it from the marketplace.
                    </FormSubHeading>
                    <Grid isMultiLine>
                      <GridItem>
                        <Input
                          dataTest="submit-app-name"
                          type="text"
                          labelText="Name"
                          id="name"
                          name="name"
                          placeholder="The name of your app as it will appear to users"
                        />
                      </GridItem>
                      <GridItem>
                        <SelectBox id="categoryId" name="categoryId" options={categoryOptions} labelText="Category" />
                      </GridItem>
                    </Grid>
                    <Grid>
                      <GridItem>
                        <Input
                          dataTest="submit-app-support-email"
                          type="email"
                          labelText="Support email"
                          id="supportEmail"
                          name="supportEmail"
                          placeholder="The contact to your support team if your users have a problem"
                        />
                      </GridItem>
                      <GridItem>
                        <Input
                          dataTest="submit-app-phone"
                          type="tel"
                          labelText="Telephone"
                          id="phone"
                          name="telephone"
                          placeholder="Should one of our developers need to contact you about your app"
                        />
                      </GridItem>
                    </Grid>
                    <Grid>
                      <GridItem>
                        <Input
                          dataTest="submit-app-home-page"
                          type="text"
                          labelText="Home page"
                          id="homePage"
                          name="homePage"
                          placeholder="Your company homepage. HTTP:// or HTTPS://"
                        />
                      </GridItem>
                      <GridItem>
                        <Input
                          dataTest="submit-app-launch-uri"
                          type="text"
                          labelText="Launch URI"
                          id="launch Url"
                          name="launchUri"
                          placeholder="The launch page for your app. HTTPS only other than for http://localhost"
                        />
                      </GridItem>
                    </Grid>
                    <Grid>
                      <GridItem>
                        <TextArea
                          id="summary"
                          dataTest="submit-app-summary"
                          labelText="Summary"
                          name="summary"
                          placeholder={
                            'A short strapline summary for your app listing. Must be between 50 and 150 characters'
                          }
                        />
                      </GridItem>
                      <GridItem>
                        <TextArea
                          id="description"
                          dataTest="submit-app-description"
                          labelText="Description"
                          name="description"
                          placeholder={
                            'A detailed description for your app listing. Must be between 150 and 1000 characters'
                          }
                        />
                      </GridItem>
                    </Grid>
                  </FormSection>
                  <FormSection>
                    <FormHeading>AUTHENTICATION FLOW</FormHeading>
                    <FormSubHeading>
                      Please select an authentication flow for your application.{' '}
                      <strong>You can only do this once when you submit your app</strong>. If your application is{' '}
                      <strong>user facing</strong>, you should select &quot;Authorization Code&quot;. This will allow
                      you to use our hosted authentication service, Reapit Connect. If you are developing a{' '}
                      <strong>server-side machine to machine</strong> application such as a feed to another system, you
                      should select &quot;Client Credentials&quot;.{' '}
                      <strong>This flow must not be used for applications without a server-side component</strong>. For
                      more information on authentication, see our platform documentation{' '}
                      <a
                        className={linkStyles.link}
                        href="https://foundations-documentation.reapit.cloud/api/api-documentation#authentication"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>{' '}
                      before progressing.
                    </FormSubHeading>
                    <Grid>
                      <GridItem>
                        <RadioSelect
                          setFieldValue={setFieldValue}
                          state={values['authFlow']}
                          disabled={!isSubmitApp}
                          options={[
                            { label: 'AUTHORIZATION CODE (Reapit Connect)', value: 'authorisationCode' },
                            { label: 'CLIENT CREDENTIALS', value: 'clientCredentials' },
                          ]}
                          name="authFlow"
                          id="authFlow"
                        />
                      </GridItem>
                    </Grid>
                  </FormSection>
                  <Grid>
                    <GridItem>
                      <Input
                        disabled={values['authFlow'] === 'clientCredentials'}
                        dataTest="submit-app-redirect-uri"
                        type="text"
                        labelText="Redirect URI(s)"
                        id="redirectUris"
                        name="redirectUris"
                        placeholder="Enter your callback URI’s. For multiple URI's, separate using a comma. HTTPS only other than for http://localhost"
                      />
                    </GridItem>
                  </Grid>
                  <Grid>
                    <GridItem>
                      <Input
                        disabled={values['authFlow'] === 'clientCredentials'}
                        dataTest="submit-app-signout-uris"
                        type="text"
                        labelText="Sign Out URI(s)"
                        id="signoutUris"
                        name="signoutUris"
                        placeholder="Enter the URI that your application should navigate to when a user logs out. For multiple URI's, separate using a comma. HTTPS other than for http://localhost"
                      />
                    </GridItem>
                  </Grid>
                  <FormSection>
                    <FormHeading>Images</FormHeading>
                    <FormSubHeading>
                      The icon field will appear as the main brand representation of your app in marketplace listings
                      and installed apps pages. You can also select a minimum of one and up to five screenshots of your
                      application, that will appear in a carousel in the details view of your app listing.
                    </FormSubHeading>
                    <GridFourCol>
                      <GridFourColItem>
                        <div className="control">
                          <label className="label">Icon</label>
                          <ImageInput
                            id="iconImage"
                            dataTest="submit-app-icon"
                            labelText="Upload Image"
                            name="iconImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 1</label>
                          <ImageInput
                            id="screenshot1"
                            dataTest="submit-app-screenshot1"
                            labelText="Upload Image"
                            name="screen1ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 2</label>
                          <ImageInput
                            id="screenshot2"
                            dataTest="submit-app-screenshot2"
                            labelText="Upload Image"
                            name="screen2ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 3</label>
                          <ImageInput
                            id="screenshot3"
                            dataTest="submit-app-screenshot3"
                            labelText="Upload Image"
                            name="screen3ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 4</label>
                          <ImageInput
                            id="screenshot4"
                            dataTest="submit-app-screenshot4"
                            labelText="Upload Image"
                            name="screen4ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 5</label>
                          <ImageInput
                            id="screenshot5"
                            dataTest="submit-app-screenshot5"
                            labelText="Upload Image"
                            name="screen5ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                    </GridFourCol>
                  </FormSection>
                  <FormSection>
                    <FormHeading>Marketplace Status</FormHeading>
                    <FormSubHeading>
                      This section refers to the listing status in the Marketplace. If your App is an external
                      application i.e. it is just an API feed app or is a web application that exists out of the
                      Marketplace ecosystem, please select, &ldquo;Direct API&rdquo;. Your app will still need to be
                      listed in the Marketplace and installed by clients so they can grant permissions however, it will
                      not appear as a launchable app for users from the Marketplace. It is a hard requirement that
                      launchable apps conform closely to our &ldquo;Elements&rdquo;, brand guidelines so if your app
                      does not, please also select &ldquo;Direct API&rdquo;. When you have done your initial app submit,
                      please return here to set the &ldquo;is Listed&rdquo; status to make the app installable for
                      users.
                    </FormSubHeading>
                    <Grid>
                      <GridItem>
                        <Checkbox name="isDirectApi" labelText="Direct API" id="isDirectApi" />
                      </GridItem>
                      {isSubmitRevision && (
                        <GridItem>
                          <Checkbox name="isListed" labelText="Is Listed" id="isListed" />
                        </GridItem>
                      )}
                    </Grid>
                  </FormSection>
                  <FormSection>
                    <FormHeading>Permissions</FormHeading>
                    <FormSubHeading>
                      To access a client&apos;s data, you will need to specify the entities you need access to on a read
                      or write basis. You should be familiar with these entities from the sandbox. When the user
                      installs your application, they will have to consent to your usage based on these permissions. If
                      you do not have the correct permissions on an entity basis, your app will receive a 403 error.
                    </FormSubHeading>
                    <GridFourCol>{renderScopesCheckbox(scopes, errors.scopes)}</GridFourCol>
                  </FormSection>
                  <FormSection>
                    {renderErrors((errors as unknown) as Record<string, string | string[]>)}
                    <LevelRight>
                      <Grid>
                        {/* <GridItem>
                        <FlexContainerBasic
                          className={`${styles['terms-submit-app']}`}
                          centerContent={false}
                          hasPadding={false}
                        >
                          <div className="field field-checkbox">
                            <input
                              type="checkbox"
                              checked={isAgreedTerms}
                              onChange={handleOnChangeAgree}
                              className="checkbox"
                              id="terms-submit-app"
                              name="terms-submit-app"
                            />
                            <label htmlFor="terms-submit-app" className={`pb-4 mb-4 ${styles['label-terms']}`}>
                              I AGREE TO THE{' '}
                              <span className={styles['terms-link']} onClick={handleClickOpenModal(setTermModalIsOpen)}>
                                &lsquo;TERMS AND CONDITIONS&rsquo;
                              </span>
                            </label>
                          </div>
                        </FlexContainerBasic>
                        <TermsAndConditionsModal
                          visible={termModalIsOpen}
                          onAccept={handleAcceptTerms(setIsAgreedTerms, setTermModalIsOpen)}
                          onDecline={handleDeclineTerms(setIsAgreedTerms, setTermModalIsOpen)}
                          afterClose={handleCloseModal(setTermModalIsOpen)}
                        />
                      </GridItem> */}

                        <GridItem>
                          {!isSubmitApp && (
                            <Button onClick={goBackToApps} variant="primary" type="button">
                              Back To Apps
                            </Button>
                          )}
                          <Button
                            type="submit"
                            dataTest="submit-app-button"
                            variant="primary"
                            loading={Boolean(isSubmitting)}
                            disabled={Boolean(isSubmitting)}
                          >
                            Submit App
                          </Button>
                        </GridItem>
                      </Grid>
                    </LevelRight>
                  </FormSection>

                  {/* {shouldShowError && (
                  <Alert
                    message="Please indicate that you have read and agree to the terms and conditions"
                    type="danger"
                  />
                )} */}
                  <Input
                    dataTest="submit-app-developer-id"
                    type="hidden"
                    labelText="Developer ID"
                    id="developerId"
                    name="developerId"
                  />
                </Form>
              )
            }}
          </Formik>
        </FlexContainerResponsive>
      </FlexContainerBasic>
      <SubmitAppReadDocModal
        visible={isSubmitModalOpen}
        onContinueClick={handleSubmitModalContinue(setIsSubmitModalOpen)}
        onViewDocClick={handleSubmitModalViewDocs}
      />
    </>
  )
}

const mapStateToProps = (state: ReduxState): SubmitAppMappedProps => ({
  submitAppState: state.submitApp,
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision,
  developerId: state.auth.loginSession ? state.auth.loginSession.loginIdentity.developerId : null,
  categories: selectCategories(state),
})

const mapDispatchToProps = (dispatch: any): SubmitAppMappedActions => ({
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions, setSubmitError: (error: string) => void) => {
    dispatch(submitApp({ ...appModel, actions, setSubmitError }))
  },
  submitRevision: (id, revision) => {
    dispatch(submitRevision({ ...revision, id }))
  },
  submitRevisionSetFormState: formState => dispatch(submitRevisionSetFormState(formState)),
  submitAppSetFormState: formState => dispatch(submitAppSetFormState(formState)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitApp))

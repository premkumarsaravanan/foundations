import * as React from 'react'
import { Formik, Form } from 'formik'
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
  GridFiveCol,
  GridFourColItem,
  LevelRight,
  FlexContainerResponsive,
  SelectBox,
  SelectBoxOptions
} from '@reapit/elements'
import { validate } from '@/utils/form/submit-app'
import { transformObjectToDotNotation, ScopeObject, transformDotNotationToObject } from '@/utils/common'
import { connect } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { AppDetailState } from '@/reducers/app-detail'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppModel, ScopeModel, AppDetailModel, CategoryModel } from '@/types/marketplace-api-schema'
import Routes from '@/constants/routes'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import DeveloperSubmitAppSuccessfully from './developer-submit-app-successfully'
import { selectCategories } from '../../selector/app-categories'

export interface SubmitAppMappedActions {
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) => void
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

export type SubmitAppProps = SubmitAppMappedActions & SubmitAppMappedProps & RouteComponentProps<{ appid?: string }>

export const renderScopesCheckbox = (scopes: ScopeModel[] = []) =>
  scopes.map((item: ScopeModel) => {
    // TODO - short term hack to remove temporary scopes from API response
    if (
      item.name !== 'Marketplace/developers.read' &&
      item.name !== 'Marketplace/developers.write' &&
      item.name !== 'TestResourceServer/test.scope'
    ) {
      return (
        <GridFourColItem key={item.name}>
          <Checkbox name={`scopes.${item.name}`} labelText={item.description || ''} id={item.name || ''} />
        </GridFourColItem>
      )
    }

    return null
  })

export const generateInitialValues = (appDetail: AppDetailModel | null, developerId: string | null) => {
  let initialValues

  if (appDetail) {
    const {
      category,
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
      scopes: appScopes
    } = appDetail

    const icon = (media || []).filter(({ order }) => order === 0)[0]
    const iconImageUrl = icon ? icon.uri : ''
    const images = (media || [])
      .filter(({ order }) => order !== 0)
      .reduce((a, c) => ({ ...a, [`screen${c.order}ImageUrl`]: c.uri }), {})

    initialValues = {
      name,
      categoryId: category?.id || '',
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      iconImageUrl,
      isListed,
      scopes: transformDotNotationToObject(appScopes),
      ...images
    }
  } else {
    initialValues = {
      categoryId: '',
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
      developerId
    }
  }

  return initialValues
}

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
  categories
}) => {
  let initialValues
  let formState
  let appid

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

    appid = appDetailData.data.id
    initialValues = generateInitialValues(appDetailData.data, developerId)
  }

  const scopes = (submitAppState.submitAppData && submitAppState.submitAppData.scopes) || []

  const isSubmitting = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  const submitAppSuccessfully = !isSubmitRevision && isSuccessed
  const submitRevisionSuccessfully = isSubmitRevision && isSuccessed

  if (submitAppSuccessfully) {
    return <DeveloperSubmitAppSuccessfully onClickHandler={() => submitAppSetFormState('PENDING')} />
  }

  if (submitRevisionSuccessfully) {
    submitRevisionSetFormState('PENDING')
    history.push(Routes.DEVELOPER_MY_APPS)
  }

  const categoryOptions: SelectBoxOptions[] = categories.map(category => ({
    value: category.id as string,
    label: category.name as string
  }))

  return (
    <FlexContainerBasic
      hasPadding
      flexColumn
      className={`${isSubmitting ? 'disabled' : ''}`}
      data-test="app-input-form"
    >
      <FlexContainerResponsive flexColumn hasBackground hasPadding>
        <H3>Submit App</H3>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={(appModel, actions) => {
            const scopes = transformObjectToDotNotation(appModel.scopes)
            if (!appid) {
              submitApp({ ...appModel, scopes }, actions)
            } else {
              submitRevision(appid, { ...appModel, scopes })
            }
          }}
          render={() => {
            return (
              <Form noValidate={true}>
                <Grid data-test="submit-app-form">
                  <GridItem>
                    <FormSection>
                      <FormHeading>App Listing</FormHeading>
                      <FormSubHeading>
                        These fields refer to the name and icon of your application as they will appear to a user in the
                        Marketplace and in their installed apps.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
                          <Input dataTest="submit-app-name" type="text" labelText="Name" id="name" name="name" />
                        </GridItem>
                        <GridItem>
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
                        </GridItem>
                      </Grid>
                      {isSubmitRevision && (
                        <Grid>
                          <GridItem>
                            <Checkbox name="isListed" labelText="Is Listed" id="isListed" />
                          </GridItem>
                        </Grid>
                      )}
                    </FormSection>
                    <FormSection>
                      <FormHeading>APP CATEGORY</FormHeading>
                      <FormSubHeading>
                        To ensure your App is searchable on the Marketplace, please choose the most relevant category
                        from the list below.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
                          <SelectBox id="categoryId" name="categoryId" options={categoryOptions} labelText="CATEGORY" />
                        </GridItem>
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <FormHeading>App Details</FormHeading>
                      <FormSubHeading>
                        Information that will be the user facing listing for your app. "Summary" will be the short app
                        strapline whereas "description", will be more detailed. These fields have a min/max charset of
                        50/150 and 150/1000 respectively.
                      </FormSubHeading>
                      <TextArea id="summary" dataTest="submit-app-summary" labelText="Summary" name="summary" />
                      <TextArea
                        id="description"
                        dataTest="submit-app-description"
                        labelText="Description"
                        name="description"
                      />
                    </FormSection>
                  </GridItem>
                  <GridItem>
                    <FormSection>
                      <FormHeading>Contact Details</FormHeading>
                      <FormSubHeading>
                        Should one of our developers need to get in touch about your app listing.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
                          <Input
                            dataTest="submit-app-support-email"
                            type="email"
                            labelText="Support email"
                            id="supportEmail"
                            name="supportEmail"
                          />
                        </GridItem>
                        <GridItem>
                          <Input
                            dataTest="submit-app-phone"
                            type="tel"
                            labelText="Telephone"
                            id="phone"
                            name="telephone"
                          />
                        </GridItem>
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <FormHeading>Websites</FormHeading>
                      <FormSubHeading>
                        Homepage refers to your company's corporate site. The launch URI is default homepage for your
                        listed application.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
                          <Input
                            dataTest="submit-app-home-page"
                            type="text"
                            labelText="Home page"
                            id="homePage"
                            name="homePage"
                          />
                        </GridItem>
                        <GridItem>
                          <Input
                            dataTest="submit-app-launch-uri"
                            type="text"
                            labelText="Launch Url"
                            id="launch Url"
                            name="launchUri"
                          />
                        </GridItem>
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <FormHeading>Screenshots</FormHeading>
                      <FormSubHeading>
                        You can select a minimum of one and up to four screenshots of your application, that will appear
                        in a carousel in the details view of your app listing.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
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
                        </GridItem>
                        <GridItem>
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
                        </GridItem>
                      </Grid>
                    </FormSection>
                  </GridItem>
                </Grid>
                <FormSection>
                  <FormHeading>Permissions</FormHeading>
                  <FormSubHeading>
                    To access a client's data, you will need to specify the entities you need access to on a read or
                    write basis. You should be familar with these entities from the sandbox. When the user installs your
                    application, they will have to consent to your usage based on these permissions. If you do not have
                    the correct permissions on an entity basis, your app will receive a 403 error.
                  </FormSubHeading>
                  <GridFiveCol>{renderScopesCheckbox(scopes)}</GridFiveCol>
                </FormSection>
                <FormSection>
                  <LevelRight>
                    <Button
                      type="submit"
                      dataTest="submit-app-button"
                      variant="primary"
                      loading={Boolean(isSubmitting)}
                      disabled={Boolean(isSubmitting)}
                    >
                      Submit App
                    </Button>
                  </LevelRight>
                </FormSection>
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
        />
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

const mapStateToProps = (state: ReduxState): SubmitAppMappedProps => ({
  submitAppState: state.submitApp,
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision,
  developerId: state.auth.loginSession ? state.auth.loginSession.loginIdentity.developerId : null,
  categories: selectCategories(state)
})

const mapDispatchToProps = (dispatch: any): SubmitAppMappedActions => ({
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) => {
    dispatch(submitApp({ ...appModel, actions }))
  },
  submitRevision: (id, revision) => {
    dispatch(submitRevision({ ...revision, id }))
  },
  submitRevisionSetFormState: formState => dispatch(submitRevisionSetFormState(formState)),
  submitAppSetFormState: formState => dispatch(submitAppSetFormState(formState))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitApp))

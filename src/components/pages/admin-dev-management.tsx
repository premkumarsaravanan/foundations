import * as React from 'react'
import { History } from 'history'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, match } from 'react-router'
import { ReduxState } from '@/types/core'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Info,
  FlexContainerResponsive,
  Button,
  Loader,
  Section,
  setQueryParams
} from '@reapit/elements'
import Routes from '@/constants/routes'
import AdminDevManagementFilterForm, {
  AdminDevManagementFilterFormValues
} from '@/components/ui/admin-dev-management-filter-form'
import AdminSetDeveloperStatusModal from '@/components/ui/developer-set-status'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { adminDevManagementRequestData, AdminDevManagementRequestDataValues } from '@/actions/admin-dev-management'
import qs from 'querystring'

export interface AdminDevManagementMappedActions {
  fetchData: (requestdata: AdminDevManagementRequestDataValues) => void
}

export interface AdminDevManagementMappedProps {
  adminDevManagementState: AdminDevManamgenetState
  filterValues: AdminDevManagementFilterFormValues
  onPageChange: any
  onSearch: any
}

export type AdminDevManagementProps = AdminDevManagementMappedActions & AdminDevManagementMappedProps

export const AdminDevManagement: React.FC<AdminDevManagementProps> = ({
  adminDevManagementState,
  filterValues,
  onPageChange,
  onSearch,
  fetchData
}) => {
  const [isSetStatusModalOpen, setIsSetStatusModalOpen] = React.useState(false)
  const [developer, setDeveloper] = React.useState({} as DeveloperModel)

  const { loading, data } = adminDevManagementState
  const pageNumber = data?.pageNumber || 1

  const resetModal = succeed => () => {
    setIsSetStatusModalOpen(false)
    setDeveloper({})
    if (succeed) {
      fetchData({ page: pageNumber, queryString: qs.stringify(filterValues as { name: string; company: string }) })
    }
  }

  const columns = [
    {
      Header: '#',
      id: 'id',
      Cell: ({ row: { index } }) => <>{(pageNumber - 1) * REVISIONS_PER_PAGE + index + 1}</>
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Company', accessor: 'company' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'telephone' },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: ({ row: { original } }) => {
        const { id, isInactive } = original as DeveloperModel

        return (
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              if (id) {
                setDeveloper({ ...original, isInactive: isInactive! })
                setIsSetStatusModalOpen(true)
              }
            }}
          >
            {isInactive ? 'Enable' : 'Deactive'}
          </Button>
        )
      }
    }
  ]

  if (loading || !data) {
    return <Loader />
  }

  if (!loading && data?.data?.length === 0) {
    return <Info infoType="DEVELOPER_EMPTY" />
  }

  return (
    <ErrorBoundary>
      <FlexContainerResponsive>
        <Section className="mw-100">
          <AdminDevManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
          <Table scrollable={true} loading={false} data={data.data} columns={columns} />
          <Pagination
            onChange={onPageChange}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            pageNumber={data.pageNumber}
          />
        </Section>
      </FlexContainerResponsive>

      <AdminSetDeveloperStatusModal
        visible={isSetStatusModalOpen}
        afterClose={resetModal(false)}
        onSuccess={resetModal(true)}
        developer={developer}
      />
    </ErrorBoundary>
  )
}

export const onPageChangeHandler = (history: History<any>, queryParams: AdminDevManagementFilterFormValues) => (
  page: number
) => {
  const query = setQueryParams(queryParams) ? `?${setQueryParams(queryParams)}` : ''

  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}${query}`)
}

export const onSearchHandler = (history: History<any>, match: match<{ page?: any }>) => (
  queryParams: AdminDevManagementFilterFormValues
) => {
  const page = match.params.page || 1
  const query = setQueryParams(queryParams) ? `?${setQueryParams(queryParams)}` : ''

  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}${query}`)
}

export const mapStateToProps = (state: ReduxState, ownState: RouteComponentProps<any>) => {
  const { history, match } = ownState
  const queryParams = new URLSearchParams(ownState.location.search)
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const filterValues = { name, company } as AdminDevManagementFilterFormValues

  return {
    adminDevManagementState: state.adminDevManagement,
    filterValues,
    onPageChange: onPageChangeHandler(history, filterValues),
    onSearch: onSearchHandler(history, match)
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
  fetchData: (requestData: AdminDevManagementRequestDataValues) => dispatch(adminDevManagementRequestData(requestData))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDevManagement))

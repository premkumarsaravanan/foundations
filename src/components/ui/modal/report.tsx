import React from 'react'
import ReactToPrint from 'react-to-print'
import { connect } from 'react-redux'
import { Button, Table } from '@reapit/elements'
import styles from '@/styles/ui/report.scss?mod'
import { ContactModel, IdentityCheckModel } from '@/types/contact-api-schema'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { SectionsStatus } from '@/reducers/checklist-detail'
import dayjs from 'dayjs'
import { getPepSearchStatus } from '@/utils/pep-search'

const defaultStatus = {
  profile: false,
  primaryId: false,
  secondaryId: false,
  declarationRisk: false,
  addresses: false,
  pepSearch: false,
  experian: true
}

export const handleTrigger = () => (
  <Button className="mr-2" variant="primary" type="button">
    Print Report
  </Button>
)

export const handleContent = ({ printRef }) => () => {
  return printRef.current
}

export type ReportContainerProps = {
  contact: ContactModel
  idCheck: IdentityCheckModel
  status: SectionsStatus
}

export const ReportContainer: React.FC<ReportContainerProps> = ({ contact, idCheck, status }) => {
  const printRef = React.useRef<HTMLDivElement>(null)

  const { title, forename, surname } = contact
  const name = `${title} ${forename} ${surname}`.trim()

  const data = React.useMemo(() => {
    return [
      {
        section: 'Personal Detail',
        description: () => {
          const { dateOfBirth, communications } = contact
          return (
            <div>
              {name && <p>Name: {name}</p>}
              {dateOfBirth && <p>Date of Birth: {dayjs(dateOfBirth).format('DD/MM/YYYY')}</p>}
              {communications &&
                communications.map(item => (
                  <p>
                    {item.label}: {item.detail}
                  </p>
                ))}
            </div>
          )
        },
        status: status.profile
      },
      {
        section: 'Primary ID',
        description: () => {
          const { typeId, details, expiry } = oc(idCheck).documents[0]({})
          return (
            <div>
              {typeId && <p>Type: {typeId}</p>}
              {details && <p>Reference: {details}</p>}
              {expiry && <p>Expiry Date: {dayjs(expiry).format('DD/MM/YYYY')}</p>}
            </div>
          )
        },
        status: status.primaryId
      },
      {
        section: 'Secondary ID',
        description: () => {
          const { typeId, details, expiry } = oc(idCheck).documents[1]({})
          return (
            <div>
              {typeId && <p>Type: {typeId}</p>}
              {details && <p>Reference: {details}</p>}
              {expiry && <p>Expiry Date: {dayjs(expiry).format('DD/MM/YYYY')}</p>}
            </div>
          )
        },
        status: status.secondaryId
      },
      {
        section: 'Address History',
        description: () => {
          const addresses = oc(contact).addresses([])
          const metaAddress = oc(contact).metadata.addresses([])
          const mAddress = addresses.map((item, index) => ({ ...item, ...metaAddress[index] }))
          return (
            mAddress &&
            mAddress.map(item => {
              const { buildingName, buildingNumber, line1, line2, line3, postcode, year, month, documentType } = item
              return (
                <div>
                  <p>
                    {buildingNumber} {buildingName} {line1} {line2}
                  </p>
                  <p>
                    {line3} {postcode}
                  </p>
                  {year && <p>No. Years: {year}</p>}
                  {month && <p>No. Months: {month}</p>}
                  {documentType && <p>Doc: {documentType}</p>}
                </div>
              )
            })
          )
        },
        status: status.addresses
      },
      {
        section: 'Declaration and Risk Assessment',
        description: () => {
          const { reason, type } = oc(contact).metadata.declarationRisk({})
          return (
            <div>
              {type && <p>Type: {type}</p>}
              {reason && <p>Reason: {reason}</p>}
            </div>
          )
        },
        status: status.declarationRisk
      },
      {
        section: 'PEP Search',
        description: () => {
          const pepSearchStatus = getPepSearchStatus()
          const { param, time } = pepSearchStatus && contact.id && pepSearchStatus[contact.id]
          return (
            <div>
              Search conducted for "{param}" on {time}
            </div>
          )
        },
        status: status.pepSearch
      },
      {
        section: 'Experian',
        description: () => <div></div>,
        status: status.experian
      }
    ]
  }, [contact, idCheck])

  const columns = [
    {
      Header: 'Section',
      accessor: 'section'
    },
    {
      Header: 'Description',
      id: 'description',
      accessor: 'description',
      Cell: ({ row }) => {
        console.log(row)
        return row.original.description()
      }
    },
    {
      Header: 'Status',
      id: 'status',
      accessor: d => (d.status ? 'Completed' : 'Incomplete')
    }
  ]

  return (
    <>
      <p className={styles.status}>Status: {contact.identityCheck}</p>
      <p className={styles.title}>{name}</p>
      <div ref={printRef} className={styles.reportContainer}>
        <Table data={data} columns={columns} loading={false} bordered striped />
      </div>
      <div className={styles.footerContainer}>
        <ReactToPrint trigger={handleTrigger} content={handleContent({ printRef })} />
        <Button variant="primary" type="button">
          Email Report
        </Button>
      </div>
    </>
  )
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: oc(state).checklistDetail.checklistDetailData.contact({}),
    idCheck: oc(state).checklistDetail.checklistDetailData.idCheck({}),
    status: oc(state).checklistDetail.status(defaultStatus)
  }
}

export const mapDispatchToProps = () => {
  return {
    onEmailReport: () => {
      console.log('send Email')
    }
  }
}

export const ReportContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer)

ReportContainerRedux.displayName = 'ReportContainerRedux'

export default ReportContainerRedux

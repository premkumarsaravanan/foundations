import React, { memo } from 'react'
import { AppointmentTile } from '@reapit/elements'
import { AppointmentModel } from '@/types/appointments'
import CurrentLocButton from '@/components/container/current-loc-button'
import { oc } from 'ts-optchain'
import { getTime } from '@/utils/datetime'

export interface AppointmentListProps {
  data: AppointmentModel[]
}

export const AppointmentList = memo(({ data }: AppointmentListProps) => {
  if (data.length === 0) {
    return <div className="py-8 px-3 text-center">No appointments</div>
  }
  return (
    <div className="px-3">
      {data.map(item => {
        const line1 = oc<AppointmentModel>(item).property.line1('---')
        const line2 = oc<AppointmentModel>(item).property.line2('---')
        const line3 = oc<AppointmentModel>(item).property.line3('---')
        const line4 = oc<AppointmentModel>(item).property.line4('---')
        const postcode = oc<AppointmentModel>(item).property.postcode('---')
        const buildingName = oc<AppointmentModel>(item).property.buildingName('---')
        const buildingNumber = oc<AppointmentModel>(item).property.buildingNumber('---')
        const type = oc<AppointmentModel>(item).type('---')
        const start = getTime(oc<AppointmentModel>(item).start(''))
        const end = getTime(oc<AppointmentModel>(item).end(''))

        return (
          <AppointmentTile key={item.id} heading={line1}>
            <ul>
              <li>Property Address</li>
              <li>Building Name: {buildingName}</li>
              <li>Building Number: {buildingNumber}</li>
              <li>Address 1: {line1}</li>
              <li>Address 2: {line2}</li>
              <li>Address 3: {line3}</li>
              <li>Address 4: {line4}</li>
              <li>Postcode: {postcode}</li>
              {/* <li>Contact Name: {name}</li> */}
              <li>Start Time: {start}</li>
              <li>End Time: {end}</li>
              <li>Type of Appointment: {type}</li>
            </ul>

            <div className="mt-4">
              <CurrentLocButton />
            </div>
          </AppointmentTile>
        )
      })}
    </div>
  )
})

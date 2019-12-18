import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setDestination } from '@/actions/direction'
import { setSelectedAppointment } from '@/actions/appointments'
import { Button } from '@reapit/elements'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'
import { homeTabChange } from '@/actions/home'

export type ViewDirectionButtonProps = {
  handleOnClick: () => void
}

export const ViewDirectionButton = ({ handleOnClick }: ViewDirectionButtonProps) => {
  return (
    <Button className="is-centered" variant="info" type="button" onClick={handleOnClick}>
      Directions
    </Button>
  )
}

export type ViewDirectionButtonMappedActions = {
  handleOnClick: () => void
}

export type ViewDirectionButtonOwnProps = {
  appointment: AppointmentModel
}

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ViewDirectionButtonOwnProps
): ViewDirectionButtonMappedActions => ({
  handleOnClick: () => {
    const appointment = ownProps.appointment
    dispatch(setSelectedAppointment(appointment))
    dispatch(setDestination(appointment))
    dispatch(homeTabChange('MAP'))
  }
})

const ViewDirectionWithRedux = connect<null, ViewDirectionButtonMappedActions, ViewDirectionButtonOwnProps>(
  null,
  mapDispatchToProps
)(ViewDirectionButton)

ViewDirectionWithRedux.displayName = 'ViewDirectionWithRedux'

export default ViewDirectionWithRedux

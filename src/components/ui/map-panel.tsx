import * as React from 'react'
import { Button } from '@reapit/elements'
import { oc } from 'ts-optchain'
import mapStyles from '@/styles/pages/map.scss?mod'
import { isIOS } from '@/utils/device-detection'
import { isMobile } from '../../utils/device-detection'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setDestination } from '@/actions/direction'

const { mapPanel } = mapStyles

export interface MapPanelProps {
  duration: string
  distance: string
  currentLocation: { lat?: number; lng?: number }
  destination: { lat?: number; lng?: number }
  filterType: string
  showAllAppointment: () => void
}

export const MapPanel = ({
  duration,
  distance,
  currentLocation,
  destination,
  filterType,
  showAllAppointment
}: MapPanelProps) => {
  const openDefaultMap = () => {
    if (isIOS()) {
      window.open(
        `maps://maps.google.com/maps?saddr=${currentLocation.lat},${currentLocation.lng}&daddr=${destination.lat},${destination.lng}`
      )
    } else {
      window.open(
        `https://maps.google.com/maps?saddr=${currentLocation.lat},${currentLocation.lng}&daddr=${destination.lat},${destination.lng}`
      )
    }
  }

  if (!destination.lat || !destination.lng) {
    return null
  }

  return (
    <div className={mapPanel}>
      <div>
        <p className="is-size-4">{duration}</p>
        <p>{distance}</p>
      </div>
      <div>
        <Button className="is-medium" type="button" variant="primary" onClick={openDefaultMap}>
          Start Journey
        </Button>
      </div>
      {!isMobile() ? (
        <div>
          <Button className="is-medium" type="button" variant="primary" onClick={showAllAppointment}>
            Show all appointments for {filterType}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export const mapStateToProps = (state: ReduxState) => {
  const filterType = oc(state).appointments.time('Today')
  return {
    filterType
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showAllAppointment: () => {
      dispatch(setDestination(null))
    }
  }
}

const MapPanelWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPanel)
MapPanelWithRedux.displayName = 'MapPanelWithRedux'

export default MapPanelWithRedux

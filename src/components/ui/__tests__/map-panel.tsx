import * as React from 'react'
import { shallow } from 'enzyme'
import { MapPanel, MapPanelProps } from '../map-panel'
import toJson from 'enzyme-to-json'

describe('MapPanel', () => {
  it('should match a snapshot when valid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      destination: { lat: 52.158215, lng: -0.433459 }
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when invalid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      destination: { lat: undefined, lng: undefined }
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })
})

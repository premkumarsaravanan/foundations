import React from 'react'
import { storiesOf } from '@storybook/react'
import { Map } from './index'

const MAP_API_KEY = process.env.MAP_API_KEY || ''

const onLoadedDirection = response => {
  console.log(response)
}

const onLoaded = response => {
  console.log(response)
}

storiesOf('Map', module).add('Map', () => {
  return (
    <Map
      apiKey={MAP_API_KEY}
      libraries="places"
      autoFitBounds={true}
      coordinates={[
        {
          id: '123',
          position: {
            lat: 10.801147,
            lng: 106.655838,
          },
          address: {
            buildingName: '',
            buildingNumber: '65',
            line1: 'Lindsey Close',
            line2: 'Great Denham',
            line3: 'Bedford',
            line4: 'Bedfordshire',
            postcode: 'MK40 4GT',
            country: '',
            geolocation: {
              latitude: 52.1284,
              longitude: -0.507145,
            },
          },
        },
      ]}
      onLoaded={onLoaded}
      onLoadedDirection={onLoadedDirection}
      center={{ lat: 10.801147, lng: 106.655838 }}
      zoom={10}
    />
  )
})

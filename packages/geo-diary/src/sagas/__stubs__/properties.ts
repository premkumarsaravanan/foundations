import { PropertyModel } from '@reapit/foundations-ts-definitions'

export const propertyStub: PropertyModel = {
  id: 'string',
  created: '2020-01-21T07:51:06.766Z',
  modified: '2020-01-21T07:51:06.766Z',
  marketingMode: 'string',
  currency: 'string',
  address: {
    buildingName: 'string',
    buildingNumber: 'string',
    line1: 'string',
    line2: 'string',
    line3: 'string',
    line4: 'string',
    postcode: 'string',
    country: 'string',
    geolocation: {
      latitude: 0,
      longitude: 0
    }
  },
  areaId: 'string',
  strapline: 'string',
  description: 'string',
  summary: 'string',
  departmentId: 'string',
  negotiatorId: 'string',
  bedrooms: 0,
  receptions: 0,
  bathrooms: 0,
  councilTax: 'string',
  internetAdvertising: true,
  viewingArrangements: 'string',
  externalArea: {
    type: 'string',
    min: 0,
    max: 0
  },
  internalArea: {
    type: 'string',
    min: 0,
    max: 0
  },
  epc: {
    exempt: true,
    eer: 0,
    eerPotential: 0,
    eir: 0,
    eirPotential: 0
  },
  selling: {
    instructed: '2020-01-21T07:51:06.766Z',
    price: 0,
    qualifier: 'string',
    status: 'string',
    tenure: {
      type: 'string',
      expiry: '2020-01-21T07:51:06.766Z'
    },
    vendorId: 'string'
  },
  letting: {
    instructed: '2020-01-21T07:51:06.766Z',
    availableFrom: '2020-01-21T07:51:06.766Z',
    availableTo: '2020-01-21T07:51:06.766Z',
    rent: 0,
    rentFrequency: 'string',
    term: 'string',
    status: 'string',
    landlordId: 'string'
  },
  type: ['string'],
  style: ['string'],
  situation: ['string'],
  parking: ['string'],
  age: ['string'],
  locality: ['string'],
  rooms: [
    {
      name: 'string',
      dimensions: 'string',
      description: 'string'
    }
  ],
  officeIds: ['string'],
  metadata: {
    additionalProp1: {},
    additionalProp2: {},
    additionalProp3: {}
  },
  _links: {
    additionalProp1: {
      href: 'string'
    },
    additionalProp2: {
      href: 'string'
    },
    additionalProp3: {
      href: 'string'
    }
  },
  _embedded: {
    additionalProp1: {},
    additionalProp2: {},
    additionalProp3: {}
  }
}

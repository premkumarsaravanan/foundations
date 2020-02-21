export type AppointmentContact = {
  id: string

  name: string

  homePhone: string

  workPhone: string

  mobilePhone: string

  email: string
}

export type AppointmentAttendee = {
  id: string

  type: string

  contacts: [AppointmentContact]
}

export type AppointmentFollowUp = {
  due: string

  responseId: string

  notes: string
}

export type Appointment = {
  id: string

  created: string

  modified: string

  start: string

  end: string

  typeId: string

  description: string

  recurring: boolean

  cancelled: boolean

  followUp: AppointmentFollowUp

  propertyId: string

  organiserId: string

  negotiatorIds: string[]

  officeIds: string[]

  attendee: AppointmentAttendee

  accompanied: boolean

  negotiatorConfirmed: boolean

  attendeeConfirmed: boolean

  propertyConfirmed: boolean

  metadata: {
    [name: string]: any
  }

  _eTag: string
  _links: {
    [name: string]: any
  }
  _embedded: {
    [name: string]: any
  }
}

export type UpdateAppointmentInputAttendee = {
  id: string

  type: string

  confirmed: boolean
}

export type CreateAppointmentInputAttendee = {
  id: string
  type: string
}

export type CreateAppointmentInputRecurrence = {
  interval: number

  type: string

  until: string
}

export type UpdateAppointmentInputRecurrence = {
  type: string

  interval: number

  until: string
}

export type UpdateAppointmentInputFollowUp = {
  responseId: string
  notes: string
}

export type SearchAppointmentArgs = {
  start: string
  end: string
  followUpOn: string
  typeId: string
  description: string
  organiserId: string
  negotiatorIds: string[]
  officeIds: string[]
  attendee: CreateAppointmentInputAttendee
  propertyId: string
  accompanied: boolean
  negotiatorConfirmed: boolean
  attendeeConfirmed: boolean
  propertyConfirmed: boolean
  recurrence: CreateAppointmentInputRecurrence
  metadata: {
    [name: string]: any
  }
}

export type CreateAppointmentArgs = {
  start: string
  end: string
  followUpOn: string
  typeId: string
  description: string
  organiserId: string
  negotiatorIds: string[]
  officeIds: string[]
  attendee: CreateAppointmentInputAttendee
  propertyId: string
  accompanied: boolean
  negotiatorConfirmed: boolean
  attendeeConfirmed: boolean
  propertyConfirmed: boolean
  recurrence: CreateAppointmentInputRecurrence
  metadata: {
    [name: string]: any
  }
}

export type UpdateAppointmentArgs = {
  id: string
  start: string
  end: string
  followUpOn: string
  typeId: string
  description: string
  propertyId: string
  organiserId: string
  cancelled: boolean
  negotiatorIds: string[]
  officeIds: string[]
  attendee: UpdateAppointmentInputAttendee
  accompanied: boolean
  negotiatorConfirmed: boolean
  attendeeConfirmed: boolean
  propertyConfirmed: boolean
  followUp: UpdateAppointmentInputFollowUp
  recurrence: UpdateAppointmentInputRecurrence
  metadata: {
    [name: string]: any
  }
  _eTag: string
}

export type GetAppointmentByIdArgs = {
  id: string
}

export type GetAppointmentsResult = {
  pageNumber: number
  pageSize: number
  pageCount: number
  totalCount: number
  readonly _links?: {
    [name: string]: {
      href?: string
    }
  }
  _embedded: [Appointment]
}

export type GetAppointmentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  typeId?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  propertyId?: string[]
  start: string
  end: string
  includeCancelled?: boolean
  includeUnconfirmed?: boolean
}

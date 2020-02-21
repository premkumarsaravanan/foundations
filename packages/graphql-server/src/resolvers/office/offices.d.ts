/**
 * Request body used to set the address of a new office
 */
export interface CreateOfficeAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * Request body used to create a new office
 * example:
 * [object Object]
 */
export interface CreateOfficeModel {
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: CreateOfficeAddressModel
  /**
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata to set against the office
   */
  metadata?: {
    [name: string]: {}
  }
}
export interface LinkModel {
  href?: string
}
/**
 * Representation of the physical address of a building or premise
 */
export interface OfficeAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * Representation of an office
 * example:
 * 2019-08-14T12:30:02.0000000Z
 */
export interface OfficeModel {
  /**
   * The unique identifier of the office
   */
  id?: string
  /**
   * The date and time when the office was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the office was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: OfficeAddressModel
  /**
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata that has been set against the office
   */
  metadata?: {
    [name: string]: {}
  }
  /**
   * The ETag for the current version of the office. Used for managing update concurrency
   */
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: LinkModel
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}
export interface PagedResultOfficeModel_ {
  _embedded?: OfficeModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface PagingLinkModel {
  href?: string
}
/**
 * Request body used to update the address of an existing office
 */
export interface UpdateOfficeAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * Request body used to update an existing office
 * example:
 * [object Object]
 */
export interface UpdateOfficeModel {
  /**
   * The name of the office
   */
  name?: string
  /**
   * The name of the office manager
   */
  manager?: string
  /**
   * The address of the office
   */
  address?: UpdateOfficeAddressModel
  /**
   * The work phone number of the office
   */
  workPhone?: string
  /**
   * The email address of the office
   */
  email?: string
  /**
   * App specific metadata to set against the office
   */
  metadata?: {
    [name: string]: {}
  }
}

export interface GetOfficeParams {
  id: string
}

export interface GetOfficesParams {
  pageSize?: number

  pageNumber?: number

  sortBy?: string

  id?: string[]

  address?: string

  name?: string
}

export interface UpdateOfficeParams extends UpdateOfficeModel {
  id: string
  _eTag: string
}

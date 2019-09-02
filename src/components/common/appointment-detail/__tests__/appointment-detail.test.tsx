import React from 'react'
import { shallow } from 'enzyme'
import {
  AppointmentModal,
  renderTitle,
  renderStartAndEndDate,
  renderArrangement,
  renderNotes,
  renderAddress,
  renderAttendees,
  renderCheckMark,
  renderCommunicationDetail,
  renderCommunicationType,
  mapStateToProps,
  mapDispatchToProps
} from '../appointment-detail'
import { appointmentDataStub } from '../../../../sagas/__stubs__/appointment'

describe('AppointmentModal', () => {
  describe('AppointmentModal', () => {
    it('should render correctly', () => {
      const mockProps = {
        appointment: appointmentDataStub,
        visible: true,
        afterClose: jest.fn(),
        isLoading: false
      }
      const wrapper = shallow(<AppointmentModal {...mockProps} />)
      expect(wrapper.find('Modal')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly when loading', () => {
      const mockProps = {
        appointment: appointmentDataStub,
        visible: true,
        afterClose: jest.fn(),
        isLoading: true
      }
      const wrapper = shallow(<AppointmentModal {...mockProps} />)
      expect(wrapper.find('Loader')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderTitle', () => {
    it('should run correctly', () => {
      const input = {
        id: 'BED1600597',
        created: '2019-05-12T17:58:40',
        modified: '2016-12-18T16:03:45',
        start: '2016-12-18T16:30:00',
        end: '2016-12-18T17:30:00',
        type: 'IA',
        recurring: false,
        cancelled: false,
        property: {
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
            longitude: -0.507145
          }
        },
        attendees: [
          {
            id: 'JJS',
            type: 'negotiator',
            name: 'Chase MacLean',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'chase.maclean@reapitestates.net'
              }
            ]
          },
          {
            id: 'JJS',
            type: 'seller',
            name: 'Chase MacLean',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'chase.maclean@reapitestates.net'
              }
            ]
          }
        ]
      }
      const title = renderTitle(input)
      const wrapper = shallow(<div>{title}</div>)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('[data-test="title-name"]').text()).toEqual('Chase MacLean')
    })

    it('should run correctly when no attendees', () => {
      const input = {
        id: 'BED1600597',
        created: '2019-05-12T17:58:40',
        modified: '2016-12-18T16:03:45',
        start: '2016-12-18T16:30:00',
        end: '2016-12-18T17:30:00',
        type: 'IA',
        recurring: false,
        cancelled: false,
        property: {
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
            longitude: -0.507145
          }
        },
        attendees: []
      }
      const title = renderTitle(input)
      const wrapper = shallow(<div>{title}</div>)
      expect(wrapper.find('[data-test="title-name"]').text()).toEqual('')
    })
  })
  describe('renderStartAndEndDate', () => {
    it('should matchSnapshot', () => {
      const input = {
        startDate: '2016-12-18T16:30:00',
        endDate: '2016-12-18T17:30:00'
      }
      const dateData = renderStartAndEndDate(input.startDate, input.endDate)
      const wrapper = shallow(<div>{dateData}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly and show Today', () => {
      const input = {
        startDate: '2016-12-18T16:30:00',
        endDate: '2016-12-18T17:30:00'
      }
      const dateData = renderStartAndEndDate(input.startDate, input.endDate)
      const wrapper = shallow(<div>{dateData}</div>)
      expect(wrapper.find('[data-test="appointment-date"]').text()).not.toEqual('Today')
    })
    it('should run correctly and not show Today', () => {
      const input = {
        startDate: '2019-01-01T16:30:00',
        endDate: '2019-01-01T17:30:00'
      }
      const dateData = renderStartAndEndDate(input.startDate, input.endDate)
      const wrapper = shallow(<div>{dateData}</div>)
      expect(wrapper.find('[data-test="appointment-date"]').text()).toEqual('01 Jan 2019')
    })
  })

  describe('renderArrangement', () => {
    it('should matchSnapshot', () => {
      const input = '123'
      const data = renderArrangement(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly and show not Today', () => {
      const input = '123'
      const data = renderArrangement(input)
      expect(data).not.toBeNull()
    })
    it('should run correctly and show Today', () => {
      const input = undefined
      const data = renderArrangement(input)
      expect(data).toBeNull()
    })
  })

  describe('renderNotes', () => {
    it('should matchSnapshot', () => {
      const input = '123'
      const data = renderNotes(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly and show not Today', () => {
      const input = '123'
      const data = renderNotes(input)
      expect(data).not.toBeNull()
    })
    it('should run correctly and show Today', () => {
      const input = undefined
      const data = renderNotes(input)
      expect(data).toBeNull()
    })
  })
  describe('renderAddress', () => {
    it('should matchSnapshot', () => {
      const input = {
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
          longitude: -0.507145
        }
      }
      const data = renderAddress(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly and show not Today', () => {
      const input = {
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
          longitude: -0.507145
        }
      }
      const data = renderAddress(input)
      expect(data).not.toBeNull()
    })
    it('should run correctly and show Today', () => {
      const input = undefined
      const data = renderAddress(input)
      expect(data).toBeNull()
    })
  })

  describe('renderAttendees', () => {
    it('should matchSnapshot', () => {
      const input = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        },
        {
          id: 'JJS',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        }
      ]
      const data = renderAttendees(input)
      expect(data).toMatchSnapshot()
    })
    it('should run correctly and show not Today', () => {
      const input = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        },
        {
          id: 'JJS',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        }
      ]
      const data = renderAttendees(input)
      expect(data).not.toBeNull()
    })
    it('should run correctly and show Today', () => {
      const input = undefined
      const data = renderAttendees(input)
      expect(data).toBeNull()
    })
  })
  describe('renderCheckMark', () => {
    it('should match snapshot', () => {
      const input = true
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('to show TiTick when isConfirmed', () => {
      const input = true
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiTick')).toHaveLength(1)
    })
    it('to show TiTimes when !isConfirmed', () => {
      const input = false
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiTimes')).toHaveLength(1)
    })
  })

  describe('renderCommunicationDetail', () => {
    it('should match snapshot', () => {
      const input = [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
      const data = renderCommunicationDetail(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should show when have comminicationDetail', () => {
      const input = [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
      const data = renderCommunicationDetail(input)
      expect(data).not.toBeNull()
    })
    it('should return null when doesnt have', () => {
      const input = undefined
      const data = renderCommunicationDetail(input)
      expect(data).toBeNull()
    })
  })

  describe('renderCommunicationType', () => {
    it('should match snapshot', () => {
      const input = 'E-Mail'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return <TiMail />', () => {
      const input = 'E-Mail'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiMail')).toHaveLength(1)
    })
    it('should return <TiHome />', () => {
      const input = 'Home'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiHome')).toHaveLength(1)
    })
    it('should return <TiDevicePhone />', () => {
      const input = 'Mobile'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiDevicePhone')).toHaveLength(1)
    })
    it('should return <TiHome />', () => {
      const input = 'Work'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiPhoneOutline')).toHaveLength(1)
    })
    it('should return null', () => {
      const input = ''
      const data = renderCommunicationType(input)
      expect(data).toBeNull()
    })
  })
  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        appointmentDetail: {
          appointmentDetail: appointmentDataStub,
          isModalVisible: true,
          loading: true
        }
      } as any
      const expected = {
        appointment: appointmentDataStub,
        visible: true,
        isLoading: true
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })

    it('should return {}', () => {
      const mockState = {
        appointmentDetail: {
          isModalVisible: true,
          loading: true
        }
      } as any
      const expected = {
        appointment: {},
        visible: true,
        isLoading: true
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = mapDispatchToProps(mockDispatch)
      fn.afterClose()
      expect(mockDispatch).toBeCalled()
    })
  })
})

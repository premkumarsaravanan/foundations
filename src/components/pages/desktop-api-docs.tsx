import * as React from 'react'

import { FlexContainerResponsive, Content, H3, H4, H5, Table, FlexContainerBasic } from '@reapit/elements'

const DesktopApiDocsPage: React.SFC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Desktop API </H3>
          <H4>Overview</H4>
          <p>
            Applications that are built on our Foundations Platform are able to communicate with Reapit's Agency Cloud
            CRM system. Using a well-defined API, you are able to trigger a wide variety of actions in our award-winning
            desktop application to augment your own applications and build a rich integration between systems.
          </p>
          <H4>URL Scheme</H4>
          <p>
            When a Marketplace application is launched and hosted within Agency Cloud, that application can interact
            with Agency Cloud by using our custom URI scheme. When a user triggers a link with an agencycloud: prefix,
            Agency Cloud will interpret that action and perform the corresponding action.
          </p>
          <H4>Format</H4>
          <p>
            Links are structured in a REST style to provide a well-defined and descriptive mechanism for interacting
            with the screens and functionality that Agency Cloud offers. The primary and secondary screens that exist in
            the Agency Cloud user interface broadly map to the REST notion of resources and sub-resources. Some actions
            also accept parameters which can be applied to the URI in the usual manner. Full documentation of the
            available interactions is listed below, grouped by primary screen.
          </p>
          <H3>Property</H3>
          <H4>Load Property</H4>
          <p>Opens the property edit screen for the property with specified id</p>
          <p>
            <code>{`agencycloud://properties/{id}`}</code>
          </p>
          <H4>Perform Matching</H4>
          <p>Performs a property to applicant match for the applicant with specified id</p>
          <p>
            <code>{`agencycloud://properties/{id}/match`}</code>
          </p>
          <H4>Load Journal</H4>
          <p>Opens the journal screen for the specified property</p>
          <p>
            <code>{`agencycloud://properties/{id}/journal`}</code>
          </p>
          <H4>Load Offers</H4>
          <p>Opens the offers screen for the specified property</p>
          <p>
            <code>{`agencycloud://properties/{id}/offers`}</code>
          </p>
          <H4>Property Search</H4>
          <p>
            Opens advanced search screen in property mode and runs a search with provided parameters. At least one
            parameter is required.
          </p>
          <p>
            <code>{`agencycloud://properties?address=MK43&mode=s`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'name',
                type: 'string',
                description: 'A full or partial name fragment to search for',
                required: 'No'
              },
              {
                parameter: 'address',
                type: 'string',
                description: 'An address fragment to search for (eg. a postcode)',
                required: 'No'
              },
              {
                parameter: 'communication',
                type: 'string',
                description: 'An email address or phone number to search for',
                required: 'No'
              },
              {
                parameter: 'mode',
                type: 'string',
                description: 'The marketing mode of the properties to search for',
                required: 'Yes'
              },
              {
                parameter: 'appId',
                type: 'string',
                description:
                  'The GUID of the app to return the code of the selected property to (if not present then search will not return to an app)',
                required: 'No'
              },
              {
                parameter: 'appParam',
                type: 'string',
                description:
                  'The key to use in the query string when returning the property primary key to an app (required if appId is set) ',
                required: 'No?'
              }
            ]}
          />
          <H3>Applicants</H3>
          <H4>Load Applicant</H4>
          <p>Opens the applicant edit screen for the applicant with specified id</p>
          <p>
            <code>{`agencycloud://applicants/{id}`}</code>
          </p>
          <H4>Perform Matching</H4>
          <p>Performs a applicant to applicant match for the applicant with specified id</p>
          <p>
            <code>{`agencycloud://applicants/{id}/match`}</code>
          </p>
          <H4>Load Journal</H4>
          <p>Opens the journal screen for the specified applicant</p>
          <p>
            <code>{`agencycloud://applicants/{id}/journal`}</code>
          </p>
          <H4>Applicant Search</H4>
          <p>
            Opens advanced search screen in applicant mode and runs a search with provided parameters. At least one
            parameter is required.
          </p>
          <p>
            <code>{`agencycloud://applicants?name=smith&mode=lettings`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'name',
                type: 'string',
                description: 'A full or partial name fragment to search for',
                required: 'No'
              },
              {
                parameter: 'address',
                type: 'string',
                description: 'An address fragment to search for (eg. a postcode)',
                required: 'No'
              },
              {
                parameter: 'communication',
                type: 'string',
                description: 'An email address or phone number to search for',
                required: 'No'
              },
              {
                parameter: 'mode',
                type: 'string',
                description: 'The marketing mode of the properties to search for',
                required: 'Yes'
              },
              {
                parameter: 'appId',
                type: 'string',
                description:
                  'The GUID of the app to return the code of the selected property to (if not present then search will not return to an app)',
                required: 'No'
              },
              {
                parameter: 'appParam',
                type: 'string',
                description:
                  'The key to use in the query string when returning the property primary key to an app (required if appId is set) ',
                required: 'No?'
              }
            ]}
          />
          <H3>Appointments</H3>
          <H4>Load Diary</H4>
          <p>
            Opens the diary screen to provide a calendar view of appointments for the given date range. The dates don’t
            need to be set, but if you set one, you need to set both. If you don’t set a date range then the current
            default dates for the negotiator will be used.
          </p>
          <p>
            <code>{`agencycloud://appointments?dateFrom=2019/12/25&dateTo=2019/12/26`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'dateFrom',
                type: 'date',
                description: 'Only display appointments scheduled after and including this date',
                required: 'No'
              },
              {
                parameter: 'dateTo',
                type: 'date',
                description: 'Only display appointments scheduled before this date',
                required: 'No'
              }
            ]}
          />
          <H3>Contacts</H3>
          <H4>Contact Search</H4>
          <p>
            Opens advanced search screen in contact mode and runs a search with provided parameters. At least one
            parameter is required.
          </p>
          <p>
            <code>{`agencycloud://contacts?name=smith`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'name',
                type: 'string',
                description: 'A full or partial name fragment to search for',
                required: 'No'
              },
              {
                parameter: 'address',
                type: 'string',
                description: 'An address fragment to search for (eg. a postcode)',
                required: 'No'
              },
              {
                parameter: 'communication',
                type: 'string',
                description: 'An email address or phone number to search for',
                required: 'No'
              },
              {
                parameter: 'appId',
                type: 'string',
                description:
                  'The GUID of the app to return the code of the selected contact to (if not present then search will not return to an app)',
                required: 'No'
              },
              {
                parameter: 'appParam',
                type: 'string',
                description:
                  'The key to use in the query string when returning the contact primary key to an app (required if appId is set) ',
                required: 'No?'
              }
            ]}
          />
          <H4>Load Contact</H4>
          <p>Opens the contact edit screen for the contact with specified id</p>
          <p>
            <code>{`agencycloud://contacts/{id}`}</code>
          </p>
          <H4>Load Journal</H4>
          <p>Opens the journal screen for the specified contact</p>
          <p>
            <code>{`agencycloud://contacts/{id}/journal`}</code>
          </p>
          <H3>Agency Cloud Interaction API</H3>
          <H4>Overview</H4>
          <p>
            Not only can Applications built on the Foundations Platform trigger events in the Agency Cloud CRM system,
            but installed apps can also be associated with common actions in Agency Cloud to replace the default
            behaviour.
          </p>
          <p>
            The most common way that this will manifest itself is by replacing a screen in Agency Cloud with an
            application. For example if you want to use an App to manage all of your AML and ID checking then you can
            associate the app with this action in Agency Cloud and every time you click to launch the ID check screen,
            the associated App will be presented instead.
          </p>
          <p>
            Another area which is possible to replace here is default functionality such as sending an SMS which
            currently is sometimes done now by hooking up to a 3rd party API, but instead purpose built app could
            provide a richer user experience to be able to edit the message before it is sent, and possibly choose the
            recipients of the message.
          </p>
          <p>
            All apps should be able to be launched from the Installed Apps screen and be ran standalone without the need
            to be linked to an action. They will just be hosted in the marketplace and launched in Agency Cloud – for
            example the Geo Diary application.
          </p>
          <H4>Categorisation</H4>
          <p>
            To be able to associate an application with an action in Agency Cloud the application will need to be given
            a category. This will be required so that Agency Cloud can be confident of the way the application will
            behave and that the application is agreeing to accept certain parameters when launched.
          </p>
          <p>
            For example – an AML or ID checking app will need to be able to accept a query parameter in the launch url
            of cntCode which tells the application which contact to show the ID checks for.
          </p>
          <p>Possible associations;</p>
          <ul>
            <li>ID Check</li>
            <li>Property Detail Generation (print wizard)</li>
            <li>Applicant Preview</li>
          </ul>
          <H3>Categories</H3>
          <H4>Id Check</H4>
          <p>
            The category of ID Check will be given to an application that can be used to replace the ID Check screen in
            Agency Cloud. The url that an application with this category would look like would be:
          </p>
          <p>
            <code>{`https://{AppLaunchUrl}?Username={loggedInUserEmail}&Desktop=true&CntCode={PrimaryKey}`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'username',
                type: 'string',
                description: 'The username of the user logged into Agency Cloud',
                required: 'Yes'
              },
              {
                parameter: 'desktop',
                type: 'boolean',
                description:
                  'This will always be passed as True to indicate app should run in desktop mode (if it has/needs one)',
                required: 'Yes'
              },
              {
                parameter: 'cntCode',
                type: 'string',
                description:
                  'The primary key of the contact to load the ID checks for (note that this won’t be present when the app loads from the marketplace, but the app needs to be able to accept this parameter when it is launched via the app association route).',
                required: 'Yes'
              }
            ]}
          />
          <H4>Property Detail Generation</H4>
          <p>
            The category of Property Detail Generation can be given to an application that can replace the standard
            details template generation and brochure ordering process. This application could allow selection of a
            template as defined in the application – selection of pictures to include, what paper size to print the
            brochures on etc The url that this application would use would be like:
          </p>
          <p>
            <code>{`https://{AppLaunchUrl}?Username={loggedInUserEmail}&Desktop=true&PrpCode={PrimaryKey}`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'username',
                type: 'string',
                description: 'The username of the user logged into Agency Cloud',
                required: 'Yes'
              },
              {
                parameter: 'desktop',
                type: 'boolean',
                description:
                  'This will always be passed as True to indicate app should run in desktop mode (if it has/needs one)',
                required: 'Yes'
              },
              {
                parameter: 'prpCode',
                type: 'string',
                description:
                  'The primary key of the property to load generate the brochures for (note that this won’t be present when the app loads from the marketplace, but the app needs to be able to accept this parameter when it is launched via the app association route).',
                required: 'Yes'
              }
            ]}
          />
          <H4>Applicant Preview</H4>
          <p>
            The category of Applicant Preview would enable an application to be used to display a list of properties to
            a user. The application would need to be able to take a comma separated list of property codes which to
            display. The url that this application would use would be like:
          </p>
          <p>
            <code>{`https://{AppLaunchUrl}?Username={loggedInUserEmail}&Desktop=true &PrpCodes={List of PrimaryKeys}`}</code>
          </p>
          <Table
            loading={false}
            columns={[
              {
                Header: 'Parameter',
                accessor: 'parameter'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'Description',
                accessor: 'description'
              },
              {
                Header: 'Required',
                accessor: 'required'
              }
            ]}
            data={[
              {
                parameter: 'username',
                type: 'string',
                description: 'The username of the user logged into Agency Cloud',
                required: 'Yes'
              },
              {
                parameter: 'desktop',
                type: 'boolean',
                description:
                  'This will always be passed as True to indicate app should run in desktop mode (if it has/needs one)',
                required: 'Yes'
              },
              {
                parameter: 'prpCodes',
                type: 'string',
                description:
                  'The primary key of the property to load generate the brochures for (note that this won’t be present when the app loads from the marketplace, but the app needs to be able to accept this parameter when it is launched via the app association route).',
                required: 'Yes'
              }
            ]}
          />
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default DesktopApiDocsPage

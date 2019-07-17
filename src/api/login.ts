import { Request, Response } from 'express';
import { LoginParams, LoginSession, getNewUser, getLoginSession } from '../utils/cognito'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import { handleError } from '../utils/error-handler'

export const cognitoLogin = async ({
  userName,
  password
}: LoginParams): Promise<LoginSession | undefined> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: session => {
        resolve(getLoginSession(session, userName))
      },
      onFailure: err => {
        reject(`LOGIN ERROR ${err}`)
      }
    })
  })
}

export const loginApi = async (req: Request, res: Response) => {

  const { body } = req.body || req.apiGateway.event

  if (!body) {
    return handleError(res, 400, 'Bad request, no body received')
  }

  const { userName, password } = body

  if (!userName || !password) {
    return handleError(res, 400, 'Bad request, both password and username are required')
  }

  try {

    const loginResponse = await cognitoLogin({userName, password})
    if (loginResponse) {
      res.json({
        isBase64Encoded: false,
        statusCode: 200,
        body: loginResponse
      })
      res.end()
    }
  } catch (err) {
    console.error('ERR is ', err)
    handleError(res, 400, 'Bad request, user failed to authenticate')
  }
}
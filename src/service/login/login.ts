import hyRequest from '../indix'
import { IAccount } from './types'
import { IDataType } from './types'

enum LoginAPI {
  AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

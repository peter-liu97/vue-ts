import hyRequest from '../indix'
import { IAccount } from './types'
import { IDataType } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + roleId + '/menu',
    showLoading: false
  })
}

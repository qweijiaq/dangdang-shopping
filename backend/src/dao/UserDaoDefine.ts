import { model } from '../defineModel'
class UserDaoDefine {
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo)
  }
}

export type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
}

export const { addUser } = UserDaoDefine

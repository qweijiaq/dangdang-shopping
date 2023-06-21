import { model } from '../defineModel'
class UserDaoDefine {
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo)
  }
  static findAllUsers() {
    return model.findAll()
  }
  static findByProps() {
    return model.findAll({
      raw: true,
      attributes: ['username', 'password'],
    })
  }
}

export type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
}

export const { addUser, findAllUsers, findByProps } = UserDaoDefine

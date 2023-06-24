import './BaseDaoOrm'
import UserinfoModel from '../model/UserInfo'
import { Op } from 'sequelize'

class UserDaoOrm {
  static userDaoOrm = new UserDaoOrm()

  findAllUsers() {
    return UserinfoModel.findAll()
  }

  findByLikes() {
    const searchKey = `%{key}%`
    return UserinfoModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    })
  }
}

export default UserDaoOrm.userDaoOrm

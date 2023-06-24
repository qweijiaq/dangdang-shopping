import { Op } from 'sequelize'
import { model } from '../defineModel'
// import model from '../../decorateModel/UserInfo'
import { Sequelize } from 'sequelize-typescript'
class UserDao {
  static userDao: UserDao = new UserDao()

  addUser(userinfo: Userinfo) {
    return model.create(userinfo)
  }
  findAllUsers() {
    return model.findAll()
  }
  findByProps() {
    return model.findAll({
      raw: true,
      attributes: ['username', 'password'],
    })
  }
  findByLike() {
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: 'wang%',
        },
      },
    })
  }
  findByLikeOfKey(key: string) {
    const searchKey = `%${key}%`
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    })
  }
  findByUsernameAndAddress() {
    return model.findAll({
      raw: true,
      where: {
        [Op.and]: [
          {
            username: {
              [Op.like]: '%i%',
            },
          },
          {
            address: {
              [Op.like]: '%北%',
            },
          },
        ],
      },
    })
  }
  countUserinfo() {
    return model.findAll({
      raw: true,
      group: 'address',
      attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), 'totalCount']],
      where: {
        valid: 1,
      },
    })
  }
  findUserWithPager(offset: number, size: number) {
    return model.findAll({
      raw: true,
      limit: size,
      offset: offset,
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

export default UserDao.userDao

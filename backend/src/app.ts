import Koa from 'koa'
import AllRouterLoader from './common/AllRouterLoader'
import dbconfig from './conf/dbconfig'

const app = new Koa()

AllRouterLoader.init(app)

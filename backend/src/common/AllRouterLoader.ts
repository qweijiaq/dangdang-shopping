import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import json from 'koa-json'
import body from 'koa-body'
import globalException from './GlobalException'
import logger from './LogUtil'

class AllRouterLoader {
  app!: Koa
  static allRouterLoaded: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    // 4. 监听方法
    this.listen()
  }

  // 1. 加载所有路由文件数组
  getFiles(dir: string) {
    const allFiles = fs.readdirSync(dir)
    return allFiles
  }
  // 2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = path.resolve(dir, file)
      allFullFilePaths.push(fullFilePath)
    }
    // console.log(allFullFilePaths)
    return allFullFilePaths
  }
  // 3. 加载所有一级路由到二级路由中
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.getRootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)

    return rootRouter
  }

  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/api')
    this.app.use(json())
    this.app.use(body())

    return rootRouter
  }

  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }

  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  listen() {
    this.app.listen(5001)
    logger.info('server running on port 5001')
  }
}

export default AllRouterLoader.allRouterLoaded

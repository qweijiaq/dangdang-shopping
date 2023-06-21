import log4js from 'log4js'

enum LevelInfo {
  'trace' = 'trace',
  'debug' = 'debug',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error',
  'fatal' = 'fatal',
}

class LogUtils {
  static logUtils: LogUtils = new LogUtils()
  logInstance!: log4js.Logger

  private constructor() {
    this.config()
  }
  config() {
    log4js.configure({
      appenders: {
        // 输出目的地「追加器输出」配置，共 categories 使用
        console: { type: 'console' },
        // 直接配置文件
        debug_file: { type: 'file', filename: 'mylog/debug.log' },
        // 按日期当文件名创建文件，执行该代码时生成一个 mylog 目录下的 info + 日期为文件名的文件
        info_file: {
          type: 'dateFile',
          filename: 'mylog/info',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true,
        },
        warn_file: {
          type: 'dateFile',
          filename: 'mylog/warn',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true,
        },
        error_file: {
          type: 'dateFile',
          filename: 'mylog/err',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true,
        },
      },
      categories: {
        default: {
          appenders: ['console', 'debug_file'],
          level: LevelInfo.debug,
        },
        info: {
          appenders: ['console', 'info_file'],
          level: LevelInfo.info,
        },
        warn: {
          appenders: ['console', 'warn_file'],
          level: LevelInfo.warn,
        },
        error: {
          appenders: ['console', 'error_file'],
          level: LevelInfo.error,
        },
      },
    })
  }
  getCategories(level: LevelInfo) {
    this.logInstance = log4js.getLogger(level)
  }

  debug(input: string) {
    this.getCategories(LevelInfo.debug)
    this.logInstance.debug(input)
  }
  info(input: string) {
    this.getCategories(LevelInfo.info)
    this.logInstance.info(input)
  }
  warn(input: string) {
    this.getCategories(LevelInfo.warn)
    this.logInstance.warn(input)
  }
  error(input: string) {
    this.getCategories(LevelInfo.error)
    this.logInstance.error(input)
  }
}

export default LogUtils.logUtils

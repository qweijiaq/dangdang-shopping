enum Code {
  SUCESS = 200,
  SERVER_ERROR = 500,
}

class ResResult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCESS
    return { data, msg, code }
  }
  static fail(data: any = undefined, msg: any = '') {
    const code: Code = Code.SERVER_ERROR
    return { data, msg, code }
  }
}

export let { success, fail } = ResResult

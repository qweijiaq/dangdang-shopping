class StringUtil {
  static isNotEmpty(str: string) {
    return str !== null && str.length > 0
  }
}

export let { isNotEmpty } = StringUtil

import storage from "good-storage";

export class LmgLoader {
  static imglist: Record<string, any> = {};

  // 加载所有图片到内存。
  static loadAllImg(): any {
    let imgList: any = {};
    const viewImgModules = import.meta.globEager(`../assets/img/**/*.png`);
    let absolutePath: string = ""; // 图片绝对路径
    let imgName: string = ""; // 图片名称

    for (let path in viewImgModules) {
      absolutePath = viewImgModules[path].default;
      if (absolutePath) {
        let imgName = path.substring(path.lastIndexOf("/") + 1);
        imgList[imgName] = absolutePath;
      }
    }
    return imgList;
  }

  // 存储所有图片到本地缓存
  static storageAllImg() {
    this.imglist = storage.get("imglist") || {};
    if (!LmgLoader.imglist || !LmgLoader.isNotEmptyImgList()) {
      LmgLoader.imglist = LmgLoader.loadAllImg();
      storage.set("imglist", LmgLoader.imglist);
    }
  }

  static isNotEmptyImgList() {
    return Object.getOwnPropertyNames(LmgLoader.imglist).length;
  }

  // 根据图片名获取图片。
  static getImg(imgName: string): string {
    LmgLoader.imglist = LmgLoader.isNotEmptyImgList()
      ? LmgLoader.imglist
      : storage.get("imglist");
    return LmgLoader.imglist[imgName];
  }
}

export default LmgLoader.getImg;

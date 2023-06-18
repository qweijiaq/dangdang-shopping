import { defineConfig } from "vite";
import { DotenvParseOutput, parse } from "dotenv";
import { readFileSync } from "fs";
import vue from "@vitejs/plugin-vue";

export default defineConfig((mode) => {
  //  拼接当前环境文件名。
  const envFileName: string = ".env";
  const curEnvFileName = `${envFileName}.${mode.mode}`;

  // fs.readFileSync：读取环境文件数据到缓存对象,
  // dotenv.parse：读取缓存对象到envConf对象[key-value]中。
  const envConf: DotenvParseOutput = parse(readFileSync(curEnvFileName));

  // 开发环境配置
  const curEnv: string = mode.mode;
  let server: Record<string, any> = {};
  if (curEnv === "development") {
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
      proxy: {
        [envConf.VITE_BASE_URL]: {
          target: envConf.VITE_PROXY_DOMAIN,
        },
      },
    };
  } else if (curEnv === "production") {
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
    };
  }
  return {
    plugins: [vue()],
    server,
  };
});

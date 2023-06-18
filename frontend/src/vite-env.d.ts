/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  VITE_username: string;
  VITE_age: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

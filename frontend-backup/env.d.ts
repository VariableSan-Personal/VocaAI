/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

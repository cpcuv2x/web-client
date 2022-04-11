/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_SERVICES_URL: string
  readonly VITE_WEB_SOCKET_URL: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

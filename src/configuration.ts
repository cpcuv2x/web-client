export const appConfig = {
  webServicesURL: import.meta.env.VITE_WEB_SERVICES_URL || "/",
  webSocketURL: import.meta.env.VITE_WEB_SOCKET_URL || "/",
  googleMapAPIKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
}

export default appConfig

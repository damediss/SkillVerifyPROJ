import { http, type ApiEnvelope } from './http'

export interface HealthData {
  status: string
  service: string
  time: string
}

export function fetchHealth() {
  return http.get<ApiEnvelope<HealthData>>('/health')
}

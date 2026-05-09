import { http, type ApiEnvelope } from './http'

/** 与 GET /api/v1/health 中 data.database 一致 */
export interface HealthDatabase {
  status: string
  metaRows?: number
}

export interface HealthData {
  status: string
  service: string
  time: string
  database?: HealthDatabase
}

export function fetchHealth() {
  return http.get<ApiEnvelope<HealthData>>('/health')
}

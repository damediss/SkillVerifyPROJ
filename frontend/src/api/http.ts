import axios, { type AxiosError } from 'axios'
import { message } from 'ant-design-vue'

/** 与《需求规格说明书》第 13 章约定一致：{ code, message, data } */
export interface ApiEnvelope<T> {
  code: number
  message: string
  data: T
}

export interface ApiErrorEnvelope {
  code: number
  message: string
  errors?: { field: string; message: string }[]
}

export const http = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
})

http.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ApiErrorEnvelope>) => {
    const body = err.response?.data
    const msg = body?.message || err.message || '请求失败'
    message.error(msg)
    return Promise.reject(err)
  },
)

export type ApiResponse<T> = {
  data: T
  message?: string
}

export type ApiError = {
  message: string
  code: string
  statusCode: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  password: string
  fullName: string
  fullNameCyrillic: string
  iin: string
  phone: string
}

export type CalculatorInput = {
  countryId: string
  weight: number
  length?: number
  width?: number
  height?: number
}

export type CalculatorResult = {
  actualWeight: number
  volumetricWeight: number | null
  chargeableWeight: number
  deliveryCost: number
  customsDuty: number
  total: number
  currency: string
}

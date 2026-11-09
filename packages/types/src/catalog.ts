export type Country = {
  id: string
  name: string
  nameRu: string
  nameKz: string
  code: string
  flagEmoji: string
  isActive: boolean
}

export type Category = {
  id: string
  nameRu: string
  nameKz: string
  nameEn: string
  parentId: string | null
  children?: Category[]
}

export type Tariff = {
  id: string
  countryId: string
  loyaltyLevelId: string | null
  pricePerKg: number
  currency: string
}

export type PickupPointType = 'SERVICE_CENTER' | 'LOCKER' | 'COURIER'

export type PickupPoint = {
  id: string
  name: string
  type: PickupPointType
  address: string
  city: string
  phone: string | null
  workingHours: string
  lat: number
  lng: number
  isActive: boolean
}

export type SpecialServiceCatalogItem = {
  id: string
  type: string
  nameRu: string
  nameKz: string
  nameEn: string
  descriptionRu: string
  price: number | null
  isFree: boolean
}

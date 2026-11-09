export type PackageStatus = 'ADDED' | 'AT_WAREHOUSE' | 'IN_TRANSIT' | 'IN_COUNTRY' | 'RECEIVED'

export type SpecialServiceType =
  | 'HOLD'
  | 'SECURE_PACKAGING'
  | 'REPACKAGING'
  | 'NO_REPACKAGING'
  | 'CONSOLIDATION'
  | 'DECONSOLIDATION'
  | 'PHOTO_OUTSIDE'
  | 'PHOTO_INSIDE'
  | 'CHECK_CONTENTS'
  | 'RETURN'

export type SpecialServiceStatus = 'PENDING' | 'DONE'

export type PackageSpecialService = {
  id: string
  type: SpecialServiceType
  status: SpecialServiceStatus
  price: number | null
}

export type StatusHistoryEntry = {
  status: PackageStatus
  changedAt: string
  changedBy: string
}

export type PackagePhoto = {
  id: string
  url: string
  type: 'OUTSIDE' | 'INSIDE'
  uploadedAt: string
}

export type PackageComment = {
  id: string
  text: string
  authorName: string
  authorRole: 'USER' | 'MANAGER'
  createdAt: string
}

export type Package = {
  id: string
  userId: string
  trackingNumber: string
  countryId: string
  description: string
  categoryId: string
  declaredValue: number
  currency: string
  quantity: number
  comment: string | null
  status: PackageStatus
  statusHistory: StatusHistoryEntry[]
  actualWeight: number | null
  dimensions: { length: number; width: number; height: number } | null
  pickupPointId: string | null
  specialServices: PackageSpecialService[]
  photos: PackagePhoto[]
  comments: PackageComment[]
  invoiceId: string | null
  createdAt: string
  updatedAt: string
}

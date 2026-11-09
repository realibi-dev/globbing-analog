export type LoyaltyLevel = {
  id: string
  name: string
  minPackages: number
  minAmount: number
  discount: number
}

export type Recipient = {
  id: string
  fullName: string
  iin: string
  phone: string
  isVerified: boolean
}

export type WarehouseAddress = {
  addressLine1: string
  addressLine2: string
}

export type NotificationSettings = {
  emailRegistrationConfirm: boolean
  emailPackageAtWarehouse: boolean
  emailPackageInTransit: boolean
  emailPackageInCountry: boolean
  emailInvoiceIssued: boolean
  emailManagerComment: boolean
  emailBuyForMeStatus: boolean
  pushPackageAtWarehouse: boolean
  pushPackageInTransit: boolean
  pushPackageInCountry: boolean
  pushInvoiceIssued: boolean
  pushManagerComment: boolean
  pushBuyForMeStatus: boolean
}

export type User = {
  id: string
  email: string
  fullName: string
  fullNameCyrillic: string
  iin: string
  phone: string
  isEmailVerified: boolean
  isBlocked: boolean
  warehouseAddress: WarehouseAddress
  loyaltyLevel: LoyaltyLevel
  notificationSettings: NotificationSettings
  recipients: Recipient[]
  createdAt: string
}

export type BuyForMeStatus = 'NEW' | 'IN_PROGRESS' | 'PURCHASED' | 'REJECTED'

export type BuyForMeComment = {
  id: string
  text: string
  authorName: string
  authorRole: 'USER' | 'MANAGER'
  createdAt: string
}

export type BuyForMeRequest = {
  id: string
  userId: string
  productUrl: string
  productName: string
  size: string | null
  color: string | null
  quantity: number
  productCost: number
  shippingCost: number | null
  currency: string
  comment: string | null
  status: BuyForMeStatus
  rejectionReason: string | null
  packageId: string | null
  comments: BuyForMeComment[]
  createdAt: string
  updatedAt: string
}

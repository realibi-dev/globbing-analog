export type InvoiceStatus = 'ISSUED' | 'PAID' | 'OVERDUE'

export type PaymentMethod = 'CASH' | 'BANK_TRANSFER'

export type Invoice = {
  id: string
  packageId: string
  userId: string
  deliveryCost: number
  servicesCost: number
  totalAmount: number
  currency: string
  status: InvoiceStatus
  comment: string | null
  paidAt: string | null
  paymentMethod: PaymentMethod | null
  paymentReference: string | null
  dueDate: string | null
  createdAt: string
}

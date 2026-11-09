import { Link } from 'react-router-dom'
import { Plus, ShoppingBag } from 'lucide-react'
import { Button, Badge } from '@globbing/ui'
import type { BuyForMeStatus } from '@globbing/types'

const STATUS_CONFIG: Record<BuyForMeStatus, { label: string; variant: 'secondary' | 'info' | 'success' | 'destructive' }> = {
  NEW: { label: 'Новая', variant: 'secondary' },
  IN_PROGRESS: { label: 'В работе', variant: 'info' },
  PURCHASED: { label: 'Выкуплено', variant: 'success' },
  REJECTED: { label: 'Отклонено', variant: 'destructive' },
}

const mockRequests = [
  {
    id: '1',
    productUrl: 'https://example.com/product',
    productName: 'Кроссовки Adidas Ultraboost',
    size: '42',
    color: 'Белый',
    quantity: 1,
    productCost: 200,
    currency: 'USD',
    status: 'IN_PROGRESS' as BuyForMeStatus,
    createdAt: '2025-06-01T09:00:00Z',
  },
  {
    id: '2',
    productUrl: 'https://example.com/product2',
    productName: 'Сумка Michael Kors',
    size: null,
    color: 'Чёрный',
    quantity: 1,
    productCost: 350,
    currency: 'USD',
    status: 'NEW' as BuyForMeStatus,
    createdAt: '2025-06-10T14:00:00Z',
  },
]

export default function BuyForMePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Купи вместо меня</h1>
          <p className="text-sm text-gray-500 mt-1">Менеджер выкупит товар за вас</p>
        </div>
        <Button asChild>
          <Link to="/buy-for-me/new">
            <Plus className="h-4 w-4" />
            Новая заявка
          </Link>
        </Button>
      </div>

      {mockRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Заявок нет</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">Создайте заявку и менеджер поможет с покупкой</p>
          <Button asChild>
            <Link to="/buy-for-me/new">Создать заявку</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {mockRequests.map((req) => {
            const cfg = STATUS_CONFIG[req.status]
            return (
              <div key={req.id} className="bg-white rounded-xl border p-4 flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-5 w-5 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-gray-900 truncate">{req.productName}</p>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>{req.productCost} {req.currency}</span>
                    {req.size && <span>Размер: {req.size}</span>}
                    {req.color && <span>Цвет: {req.color}</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(req.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

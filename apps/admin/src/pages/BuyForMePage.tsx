import { toast } from 'sonner'
import { Button, Badge } from '@globbing/ui'
import type { BuyForMeStatus } from '@globbing/types'

const STATUS_CONFIG: Record<BuyForMeStatus, { label: string; variant: 'secondary' | 'info' | 'success' | 'destructive' }> = {
  NEW: { label: 'Новая', variant: 'secondary' },
  IN_PROGRESS: { label: 'В работе', variant: 'info' },
  PURCHASED: { label: 'Выкуплено', variant: 'success' },
  REJECTED: { label: 'Отклонено', variant: 'destructive' },
}

const mockRequests = [
  { id: '1', client: 'Иванов Иван', productName: 'Nike Air Max 90', productUrl: 'https://example.com', size: '42', color: 'Белый', quantity: 1, productCost: 200, currency: 'USD', status: 'NEW' as BuyForMeStatus, createdAt: '2025-06-10' },
  { id: '2', client: 'Ахметова Айгуль', productName: 'Michael Kors Bag', productUrl: 'https://example.com', size: null, color: 'Чёрный', quantity: 1, productCost: 350, currency: 'USD', status: 'IN_PROGRESS' as BuyForMeStatus, createdAt: '2025-06-08' },
]

export default function BuyForMePage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Купи вместо меня</h1>

      <div className="space-y-4">
        {mockRequests.map((req) => {
          const cfg = STATUS_CONFIG[req.status]
          return (
            <div key={req.id} className="bg-white rounded-xl border p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{req.productName}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{req.client} · {new Date(req.createdAt).toLocaleDateString('ru-RU')}</p>
                </div>
                <Badge variant={cfg.variant}>{cfg.label}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><p className="text-gray-400">Стоимость</p><p className="font-medium">{req.productCost} {req.currency}</p></div>
                {req.size && <div><p className="text-gray-400">Размер</p><p className="font-medium">{req.size}</p></div>}
                {req.color && <div><p className="text-gray-400">Цвет</p><p className="font-medium">{req.color}</p></div>}
                <div><p className="text-gray-400">Кол-во</p><p className="font-medium">{req.quantity}</p></div>
              </div>

              <div className="flex gap-2 pt-1">
                {req.status === 'NEW' && (
                  <Button size="sm" onClick={() => toast.success('Статус: В работе')}>В работу</Button>
                )}
                {req.status === 'IN_PROGRESS' && (
                  <>
                    <Button size="sm" onClick={() => {
                      const track = prompt('Введите трек-номер:')
                      if (track) toast.success(`Выкуплено! Трек: ${track}`)
                    }}>Выкуплено (ввести трек)</Button>
                    <Button size="sm" variant="destructive" onClick={() => toast.error('Заявка отклонена')}>Отклонить</Button>
                  </>
                )}
                <Button size="sm" variant="outline" asChild>
                  <a href={req.productUrl} target="_blank" rel="noopener noreferrer">Открыть ссылку</a>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import { Input, Badge, Button } from '@globbing/ui'
import type { InvoiceStatus } from '@globbing/types'

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; variant: 'warning' | 'success' | 'destructive' }> = {
  ISSUED: { label: 'Выставлен', variant: 'warning' },
  PAID: { label: 'Оплачен', variant: 'success' },
  OVERDUE: { label: 'Просрочен', variant: 'destructive' },
}

const mockInvoices = [
  { id: 'inv-1', trackingNumber: 'DE987654321', client: 'Ахметова Айгуль', amount: 15000, status: 'ISSUED' as InvoiceStatus, createdAt: '2025-06-03', dueDate: '2025-06-10' },
  { id: 'inv-2', trackingNumber: 'US123456789', client: 'Иванов Иван', amount: 8500, status: 'PAID' as InvoiceStatus, createdAt: '2025-05-20', dueDate: '2025-05-27' },
  { id: 'inv-3', trackingNumber: 'CN777888999', client: 'Ким Александр', amount: 5200, status: 'OVERDUE' as InvoiceStatus, createdAt: '2025-05-01', dueDate: '2025-05-08' },
]

export default function InvoicesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<InvoiceStatus | 'ALL'>('ALL')

  const filtered = mockInvoices.filter((inv) => {
    const matchesStatus = filter === 'ALL' || inv.status === filter
    const q = search.toLowerCase()
    return matchesStatus && (inv.client.toLowerCase().includes(q) || inv.trackingNumber.toLowerCase().includes(q))
  })

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Счета</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Клиент или трек-номер..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(['ALL', 'ISSUED', 'PAID', 'OVERDUE'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === s ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s === 'ALL' ? 'Все' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Посылка</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Клиент</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Сумма</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Статус</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Срок</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((inv) => {
              const cfg = STATUS_CONFIG[inv.status]
              const isOverdue = inv.status === 'OVERDUE'
              return (
                <tr key={inv.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-brand-600">{inv.trackingNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{inv.client}</td>
                  <td className="px-4 py-3 font-semibold">{inv.amount.toLocaleString('ru-RU')} ₸</td>
                  <td className="px-4 py-3">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </td>
                  <td className={`px-4 py-3 text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {new Date(inv.dueDate).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {inv.status === 'ISSUED' && (
                      <Button size="sm" onClick={() => toast.success('Оплата подтверждена')}>
                        Подтвердить оплату
                      </Button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

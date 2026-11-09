import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { Input, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@globbing/ui'
import type { PackageStatus } from '@globbing/types'

const STATUS_LABELS: Record<PackageStatus, string> = {
  ADDED: 'Добавлено',
  AT_WAREHOUSE: 'На складе',
  IN_TRANSIT: 'В пути',
  IN_COUNTRY: 'В стране',
  RECEIVED: 'Получено',
}

const STATUS_COLORS: Record<PackageStatus, string> = {
  ADDED: 'bg-gray-100 text-gray-700',
  AT_WAREHOUSE: 'bg-blue-100 text-blue-700',
  IN_TRANSIT: 'bg-yellow-100 text-yellow-700',
  IN_COUNTRY: 'bg-brand-100 text-brand-700',
  RECEIVED: 'bg-green-100 text-green-700',
}

const mockPackages = [
  { id: '1', trackingNumber: 'US123456789', client: 'Иванов Иван', country: 'США', status: 'AT_WAREHOUSE' as PackageStatus, created: '2025-06-01', hasDebt: false },
  { id: '2', trackingNumber: 'DE987654321', client: 'Ахметова Айгуль', country: 'Германия', status: 'IN_TRANSIT' as PackageStatus, created: '2025-05-20', hasDebt: true },
  { id: '3', trackingNumber: 'CN456789123', client: 'Сейткали Алмас', country: 'Китай', status: 'ADDED' as PackageStatus, created: '2025-06-10', hasDebt: false },
  { id: '4', trackingNumber: 'TR111222333', client: 'Ким Александр', country: 'Турция', status: 'IN_COUNTRY' as PackageStatus, created: '2025-05-15', hasDebt: false },
  { id: '5', trackingNumber: 'GB999888777', client: 'Мусаева Жанар', country: 'Великобритания', status: 'RECEIVED' as PackageStatus, created: '2025-05-05', hasDebt: false },
]

export default function PackagesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PackageStatus | 'ALL'>('ALL')

  const filtered = mockPackages.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter
    const q = search.toLowerCase()
    const matchesSearch = p.trackingNumber.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Посылки</h1>
        <span className="text-sm text-gray-500">{filtered.length} из {mockPackages.length}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Трек-номер или клиент..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PackageStatus | 'ALL')}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Все статусы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Все статусы</SelectItem>
              {(Object.keys(STATUS_LABELS) as PackageStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Трек-номер</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Клиент</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Страна</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Статус</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Дата</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link to={`/packages/${pkg.id}`} className="font-mono text-brand-600 hover:underline">
                    {pkg.trackingNumber}
                  </Link>
                  {pkg.hasDebt && (
                    <Badge variant="destructive" className="ml-2 text-xs">Долг</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{pkg.client}</td>
                <td className="px-4 py-3 text-gray-500">{pkg.country}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[pkg.status]}`}>
                    {STATUS_LABELS[pkg.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(pkg.created).toLocaleDateString('ru-RU')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

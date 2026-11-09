import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Package } from 'lucide-react'
import { Button, Input } from '@globbing/ui'
import type { PackageStatus } from '@globbing/types'
import PackageStatusBadge from '@/components/PackageStatusBadge'
import { mockPackages } from '@/mocks/packages'

const STATUS_FILTERS: { label: string; value: PackageStatus | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Добавлено', value: 'ADDED' },
  { label: 'На складе', value: 'AT_WAREHOUSE' },
  { label: 'В пути', value: 'IN_TRANSIT' },
  { label: 'В стране', value: 'IN_COUNTRY' },
  { label: 'Получено', value: 'RECEIVED' },
]

export default function PackagesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PackageStatus | 'ALL'>('ALL')

  const filtered = mockPackages.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter
    const matchesSearch = p.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои посылки</h1>
          <p className="text-sm text-gray-500 mt-1">Управление и отслеживание ваших посылок</p>
        </div>
        <Button asChild>
          <Link to="/packages/new">
            <Plus className="h-4 w-4" />
            Добавить посылку
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск по трек-номеру..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === f.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Посылок нет</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Добавьте трек-номер вашей посылки
          </p>
          <Button asChild>
            <Link to="/packages/new">Добавить посылку</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Трек-номер</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Описание</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Страна</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Статус</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Дата</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => window.location.href = `/packages/${pkg.id}`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="font-mono text-brand-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {pkg.trackingNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{pkg.description}</td>
                    <td className="px-4 py-3 text-gray-500 uppercase text-xs">{pkg.countryId}</td>
                    <td className="px-4 py-3">
                      <PackageStatusBadge status={pkg.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(pkg.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

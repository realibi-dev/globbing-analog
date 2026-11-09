import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input, Badge } from '@globbing/ui'

const mockClients = [
  { id: '1', name: 'Иванов Иван', email: 'ivan@example.com', phone: '+7 777 000 00 01', packages: 12, debt: 0, isBlocked: false, createdAt: '2024-01-15' },
  { id: '2', name: 'Ахметова Айгуль', email: 'aigul@example.com', phone: '+7 777 000 00 02', packages: 5, debt: 15000, isBlocked: false, createdAt: '2024-03-20' },
  { id: '3', name: 'Сейткали Алмас', email: 'almas@example.com', phone: '+7 777 000 00 03', packages: 2, debt: 0, isBlocked: true, createdAt: '2024-06-01' },
]

export default function ClientsPage() {
  const [search, setSearch] = useState('')

  const filtered = mockClients.filter((c) => {
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
        <span className="text-sm text-gray-500">{filtered.length} клиентов</span>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Имя, email или телефон..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Клиент</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Телефон</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Посылок</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Задолженность</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link to={`/clients/${c.id}`} className="font-medium text-brand-600 hover:underline">
                    {c.name}
                  </Link>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                <td className="px-4 py-3 text-gray-700">{c.packages}</td>
                <td className="px-4 py-3">
                  {c.debt > 0 ? (
                    <span className="text-red-600 font-medium">{c.debt.toLocaleString('ru-RU')} ₸</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {c.isBlocked ? (
                    <Badge variant="destructive">Заблокирован</Badge>
                  ) : (
                    <Badge variant="success">Активен</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

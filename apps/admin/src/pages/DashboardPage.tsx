import { Package, Warehouse, Truck, MapPin, ShoppingBag, Receipt, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@globbing/ui'

const metrics = [
  { label: 'Новых посылок сегодня', value: '12', icon: Package, color: 'text-blue-600 bg-blue-50' },
  { label: 'На складе', value: '47', icon: Warehouse, color: 'text-orange-600 bg-orange-50' },
  { label: 'В пути', value: '89', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  { label: 'Готовы к выдаче', value: '23', icon: MapPin, color: 'text-green-600 bg-green-50' },
  { label: 'Заявки «Купи вместо меня»', value: '5', icon: ShoppingBag, color: 'text-pink-600 bg-pink-50' },
  { label: 'Неоплаченных счетов', value: '18', icon: Receipt, color: 'text-red-600 bg-red-50' },
]

const recentEvents = [
  { id: 1, text: 'Новая посылка US789456123 от Иванов Иван', time: '5 мин назад', type: 'package' },
  { id: 2, text: 'Новая заявка «Купи вместо меня» от Сейткали Алмас', time: '12 мин назад', type: 'buy' },
  { id: 3, text: 'Посылка DE123789456 — нет обновлений 14 дней', time: '1 ч назад', type: 'warning' },
  { id: 4, text: 'Новый комментарий к посылке CN456123789', time: '2 ч назад', type: 'comment' },
  { id: 5, text: 'Новая посылка GB321654987 от Ахметова Айгуль', time: '3 ч назад', type: 'package' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${m.color}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                  <p className="text-xs text-gray-500 leading-tight">{m.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Последние события (24 ч)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents.map((e) => (
              <div key={e.id} className="flex items-start gap-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                  e.type === 'warning' ? 'bg-yellow-400' :
                  e.type === 'buy' ? 'bg-pink-400' :
                  'bg-brand-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{e.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{e.time}</p>
                </div>
                {e.type === 'warning' && (
                  <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

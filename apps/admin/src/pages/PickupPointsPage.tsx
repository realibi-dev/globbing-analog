import { toast } from 'sonner'
import { Plus, Edit, ToggleLeft, ToggleRight } from 'lucide-react'
import { Button, Badge, Card, CardContent } from '@globbing/ui'

const mockPoints = [
  { id: '1', name: 'Алматы Центр', city: 'Алматы', address: 'ул. Абая 1', phone: '+7 727 000 00 01', hours: 'Пн-Пт 09:00–20:00', isActive: true },
  { id: '2', name: 'Алматы Бостандык', city: 'Алматы', address: 'пр. Достык 45', phone: '+7 727 000 00 02', hours: 'Пн-Пт 09:00–20:00', isActive: true },
  { id: '3', name: 'Астана', city: 'Астана', address: 'ул. Сейфуллина 10', phone: '+7 717 000 00 03', hours: 'Пн-Пт 10:00–19:00', isActive: false },
]

export default function PickupPointsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Пункты выдачи</h1>
        <Button onClick={() => toast.info('Форма добавления ПВЗ')}>
          <Plus className="h-4 w-4" />
          Добавить ПВЗ
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPoints.map((p) => (
          <Card key={p.id} className={p.isActive ? '' : 'opacity-60'}>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.city}</p>
                </div>
                <Badge variant={p.isActive ? 'success' : 'secondary'}>
                  {p.isActive ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{p.address}</p>
                <p>{p.phone}</p>
                <p>{p.hours}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.info('Редактирование ПВЗ')}>
                  <Edit className="h-4 w-4" />
                  Редактировать
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast.success(p.isActive ? 'ПВЗ деактивирован' : 'ПВЗ активирован')}>
                  {p.isActive ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { MapPin, Phone, Clock } from 'lucide-react'
import { Card, CardContent, Badge } from '@globbing/ui'

const mockPoints = [
  {
    id: '1',
    name: 'Пункт выдачи Алматы Центр',
    type: 'SERVICE_CENTER' as const,
    address: 'ул. Абая 1, Алматы',
    city: 'Алматы',
    phone: '+7 727 000 00 01',
    workingHours: 'Пн-Пт 09:00–20:00, Сб 10:00–18:00',
    isActive: true,
  },
  {
    id: '2',
    name: 'Пункт выдачи Алматы Бостандык',
    type: 'SERVICE_CENTER' as const,
    address: 'пр. Достык 45, Алматы',
    city: 'Алматы',
    phone: '+7 727 000 00 02',
    workingHours: 'Пн-Пт 09:00–20:00, Сб 10:00–18:00',
    isActive: true,
  },
  {
    id: '3',
    name: 'Пункт выдачи Астана',
    type: 'SERVICE_CENTER' as const,
    address: 'ул. Сейфуллина 10, Астана',
    city: 'Астана',
    phone: '+7 717 000 00 03',
    workingHours: 'Пн-Пт 10:00–19:00, Сб 10:00–17:00',
    isActive: true,
  },
]

export default function PickupPointsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Пункты выдачи</h1>
        <p className="text-sm text-gray-500 mt-1">Адреса и режим работы наших пунктов выдачи</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPoints.map((point) => (
          <Card key={point.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight">{point.name}</h3>
                <Badge variant="secondary">{point.city}</Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
                  <span>{point.address}</span>
                </div>
                {point.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                    <a href={`tel:${point.phone}`} className="hover:text-brand-600">
                      {point.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
                  <span>{point.workingHours}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

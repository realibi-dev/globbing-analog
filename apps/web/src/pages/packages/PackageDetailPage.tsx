import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package, Clock, MessageSquare, Image } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Separator } from '@globbing/ui'
import PackageStatusBadge from '@/components/PackageStatusBadge'
import { mockPackages } from '@/mocks/packages'

const STATUS_ORDER = ['ADDED', 'AT_WAREHOUSE', 'IN_TRANSIT', 'IN_COUNTRY', 'RECEIVED'] as const

export default function PackageDetailPage() {
  const { id } = useParams()
  const pkg = mockPackages.find((p) => p.id === id)

  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Package className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium">Посылка не найдена</h3>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/packages">Вернуться к списку</Link>
        </Button>
      </div>
    )
  }

  const currentStatusIndex = STATUS_ORDER.indexOf(pkg.status as typeof STATUS_ORDER[number])

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/packages">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-mono">{pkg.trackingNumber}</h1>
          <p className="text-sm text-gray-500">{pkg.description}</p>
        </div>
        <div className="ml-auto">
          <PackageStatusBadge status={pkg.status} />
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Статус доставки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-200" />
            <div
              className="absolute top-3 left-3 h-0.5 bg-brand-500 transition-all"
              style={{ width: `${(currentStatusIndex / (STATUS_ORDER.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {STATUS_ORDER.map((status, i) => {
                const labels: Record<string, string> = {
                  ADDED: 'Добавлено',
                  AT_WAREHOUSE: 'На складе',
                  IN_TRANSIT: 'В пути',
                  IN_COUNTRY: 'В стране',
                  RECEIVED: 'Получено',
                }
                const done = i <= currentStatusIndex
                return (
                  <div key={status} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center z-10 ${
                        done ? 'bg-brand-500 border-brand-500' : 'bg-white border-gray-300'
                      }`}
                    >
                      {done && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-xs text-center leading-tight max-w-[60px] ${done ? 'text-brand-600 font-medium' : 'text-gray-400'}`}>
                      {labels[status]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Информация о посылке</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: 'Страна отправки', value: pkg.countryId.toUpperCase() },
              { label: 'Стоимость товара', value: `${pkg.declaredValue} ${pkg.currency}` },
              { label: 'Количество', value: pkg.quantity },
              ...(pkg.actualWeight ? [{ label: 'Вес', value: `${pkg.actualWeight} кг` }] : []),
              ...(pkg.comment ? [{ label: 'Комментарий', value: pkg.comment }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              История статусов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...pkg.statusHistory].reverse().map((entry, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-brand-400 shrink-0" />
                  <div>
                    <PackageStatusBadge status={entry.status} />
                    <p className="text-gray-500 text-xs mt-0.5">
                      {new Date(entry.changedAt).toLocaleString('ru-RU')} · {entry.changedBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special services */}
      {pkg.specialServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Специальные услуги</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pkg.specialServices.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span>{s.type}</span>
                  <div className="flex items-center gap-3">
                    {s.price != null && <span className="text-gray-500">{s.price} ₸</span>}
                    <Badge variant={s.status === 'DONE' ? 'success' : 'secondary'}>
                      {s.status === 'DONE' ? 'Выполнено' : 'Ожидание'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {pkg.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Image className="h-4 w-4" />
              Фото
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pkg.photos.map((photo) => (
                <div key={photo.id} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img src={photo.url} alt={photo.type} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments */}
      {pkg.comments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Комментарии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pkg.comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium shrink-0">
                    {c.authorName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{c.authorName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {c.authorRole === 'MANAGER' ? 'Менеджер' : 'Клиент'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(c.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex gap-3 pt-1">
                <input
                  type="text"
                  placeholder="Написать комментарий..."
                  className="flex-1 text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <Button size="sm">Отправить</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

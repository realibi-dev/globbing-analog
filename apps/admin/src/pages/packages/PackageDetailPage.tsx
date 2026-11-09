import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@globbing/ui'
import type { PackageStatus } from '@globbing/types'

const STATUS_SEQUENCE: PackageStatus[] = ['ADDED', 'AT_WAREHOUSE', 'IN_TRANSIT', 'IN_COUNTRY', 'RECEIVED']
const STATUS_LABELS: Record<PackageStatus, string> = {
  ADDED: 'Добавлено',
  AT_WAREHOUSE: 'На складе',
  IN_TRANSIT: 'В пути',
  IN_COUNTRY: 'В стране',
  RECEIVED: 'Получено',
}

const mockPkg = {
  id: '1',
  trackingNumber: 'US123456789',
  client: { name: 'Иванов Иван', email: 'ivan@example.com', phone: '+7 777 000 00 00' },
  country: 'США',
  description: 'Кроссовки Nike Air Max',
  category: 'Обувь',
  declaredValue: 150,
  currency: 'USD',
  quantity: 1,
  actualWeight: 1.2,
  comment: 'Хрупкое',
  status: 'AT_WAREHOUSE' as PackageStatus,
  pickupPoint: 'Алматы Центр',
  statusHistory: [
    { status: 'ADDED' as PackageStatus, date: '2025-06-01 10:00', by: 'Клиент' },
    { status: 'AT_WAREHOUSE' as PackageStatus, date: '2025-06-05 14:30', by: 'Алия' },
  ],
  specialServices: [
    { type: 'PHOTO_OUTSIDE', label: 'Фото снаружи', done: true },
  ],
  invoice: null as null | { amount: number; status: string },
}

export default function PackageDetailPage() {
  const { id } = useParams()
  const pkg = mockPkg

  const currentIdx = STATUS_SEQUENCE.indexOf(pkg.status)
  const nextStatus = STATUS_SEQUENCE[currentIdx + 1] as PackageStatus | undefined

  function changeStatus(status: PackageStatus) {
    toast.success(`Статус изменён на «${STATUS_LABELS[status]}»`)
  }

  function issueInvoice() {
    toast.success('Счёт выставлен клиенту')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/packages"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold font-mono">{pkg.trackingNumber}</h1>
          <p className="text-sm text-gray-500">{pkg.description} · {pkg.client.name}</p>
        </div>
        <div className="ml-auto flex gap-2">
          {nextStatus && (
            <Button onClick={() => changeStatus(nextStatus)} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              {STATUS_LABELS[nextStatus]}
            </Button>
          )}
          {!pkg.invoice && (
            <Button variant="outline" onClick={issueInvoice}>Выставить счёт</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Package info */}
          <Card>
            <CardHeader><CardTitle className="text-base">Данные посылки</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                {[
                  ['Трек-номер', pkg.trackingNumber],
                  ['Страна', pkg.country],
                  ['Описание', pkg.description],
                  ['Категория', pkg.category],
                  ['Стоимость', `${pkg.declaredValue} ${pkg.currency}`],
                  ['Количество', pkg.quantity],
                  ['Вес (факт)', pkg.actualWeight ? `${pkg.actualWeight} кг` : '—'],
                  ['Пункт выдачи', pkg.pickupPoint],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <p className="text-gray-500">{label}</p>
                    <p className="font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              {pkg.comment && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md text-sm text-yellow-800">
                  <span className="font-medium">Комментарий клиента:</span> {pkg.comment}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special services */}
          <Card>
            <CardHeader><CardTitle className="text-base">Специальные услуги</CardTitle></CardHeader>
            <CardContent>
              {pkg.specialServices.length === 0 ? (
                <p className="text-sm text-gray-400">Нет заявок на услуги</p>
              ) : (
                <div className="space-y-2">
                  {pkg.specialServices.map((s) => (
                    <div key={s.type} className="flex items-center justify-between text-sm">
                      <span>{s.label}</span>
                      <Badge variant={s.done ? 'success' : 'warning'}>
                        {s.done ? 'Выполнено' : 'Ожидание'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weight / dimensions input */}
          <Card>
            <CardHeader><CardTitle className="text-base">Фактические параметры</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Вес (кг)', 'Длина (см)', 'Ширина (см)', 'Высота (см)'].map((label) => (
                  <div key={label} className="space-y-1">
                    <label className="text-xs text-gray-500">{label}</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                ))}
              </div>
              <Button size="sm" className="mt-3" onClick={() => toast.success('Параметры сохранены')}>
                Сохранить параметры
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Status history */}
          <Card>
            <CardHeader><CardTitle className="text-base">История статусов</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...pkg.statusHistory].reverse().map((h, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{STATUS_LABELS[h.status]}</p>
                    <p className="text-xs text-gray-400">{h.date} · {h.by}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client */}
          <Card>
            <CardHeader><CardTitle className="text-base">Клиент</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-1">
              <Link to={`/clients/1`} className="font-medium text-brand-600 hover:underline">{pkg.client.name}</Link>
              <p className="text-gray-500">{pkg.client.email}</p>
              <p className="text-gray-500">{pkg.client.phone}</p>
            </CardContent>
          </Card>

          {/* Invoice */}
          <Card>
            <CardHeader><CardTitle className="text-base">Счёт</CardTitle></CardHeader>
            <CardContent className="text-sm">
              {pkg.invoice ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Сумма</span>
                    <span className="font-bold">{pkg.invoice.amount} ₸</span>
                  </div>
                  <Badge variant="success">Оплачено</Badge>
                </div>
              ) : (
                <div className="text-center space-y-3 py-2">
                  <p className="text-gray-400">Счёт не выставлен</p>
                  <Button size="sm" className="w-full" onClick={issueInvoice}>Выставить счёт</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comment */}
          <Card>
            <CardHeader><CardTitle className="text-base">Комментарий клиенту</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <textarea
                rows={3}
                placeholder="Напишите сообщение клиенту..."
                className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <Button size="sm" onClick={() => toast.success('Комментарий отправлен')}>
                Отправить
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

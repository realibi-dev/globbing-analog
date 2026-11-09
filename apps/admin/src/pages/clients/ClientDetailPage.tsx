import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@globbing/ui'

const mockClient = {
  id: '1',
  name: 'Иванов Иван',
  email: 'ivan@example.com',
  phone: '+7 777 000 00 01',
  iin: '990101123456',
  warehouseAddress: { line1: '1234 Warehouse Blvd, LA, CA 90001, USA', line2: 'GLB-00042' },
  loyaltyLevel: 'Серебро',
  totalDebt: 0,
  isBlocked: false,
  notes: '',
  recipients: [
    { id: 'r1', name: 'Иванова Мария', iin: '990202234567', phone: '+7 777 111 22 33', verified: true },
  ],
}

export default function ClientDetailPage() {
  const client = mockClient

  function toggleBlock() {
    toast.success(client.isBlocked ? 'Клиент разблокирован' : 'Клиент заблокирован')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/clients"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold">{client.name}</h1>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
        <div className="ml-auto">
          <Button variant={client.isBlocked ? 'outline' : 'destructive'} size="sm" onClick={toggleBlock}>
            {client.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Личные данные</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            {[
              ['Email', client.email],
              ['Телефон', client.phone],
              ['ИИН', client.iin],
              ['Уровень лояльности', client.loyaltyLevel],
              ['Задолженность', client.totalDebt > 0 ? `${client.totalDebt} ₸` : 'Нет'],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Адрес склада</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="bg-gray-50 rounded-md p-3 font-mono text-xs break-all">
              {client.warehouseAddress.line1}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Код клиента (Address 2)</span>
              <span className="font-mono font-bold">{client.warehouseAddress.line2}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Получатели</CardTitle></CardHeader>
          <CardContent>
            {client.recipients.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="text-sm">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.phone} · ИИН: {r.iin}</p>
                </div>
                <div className="flex items-center gap-2">
                  {r.verified ? (
                    <Badge variant="success">Верифицирован</Badge>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => toast.success('Получатель верифицирован')}>
                      Верифицировать
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Внутренние заметки</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <textarea
              rows={4}
              defaultValue={client.notes}
              placeholder="Заметки видны только менеджерам..."
              className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <Button size="sm" onClick={() => toast.success('Заметка сохранена')}>Сохранить</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Последние посылки</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400">Нет посылок</p>
        </CardContent>
      </Card>
    </div>
  )
}

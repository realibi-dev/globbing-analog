import { Plus, User, CheckCircle, Clock } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@globbing/ui'
import type { Recipient } from '@globbing/types'

const mockRecipients: Recipient[] = [
  {
    id: '1',
    fullName: 'Иванова Мария Ивановна',
    iin: '990202234567',
    phone: '+7 777 111 22 33',
    isVerified: true,
  },
  {
    id: '2',
    fullName: 'Иванов Пётр Иванович',
    iin: '000303345678',
    phone: '+7 777 444 55 66',
    isVerified: false,
  },
]

export default function RecipientsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Получатели</h1>
        <Button>
          <Plus className="h-4 w-4" />
          Добавить получателя
        </Button>
      </div>

      <div className="space-y-3">
        {mockRecipients.map((r) => (
          <Card key={r.id}>
            <CardContent className="pt-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{r.fullName}</p>
                  {r.isVerified ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Верифицирован
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      На проверке
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-0.5 flex gap-3">
                  <span>ИИН: {r.iin}</span>
                  <span>{r.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockRecipients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <User className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p>Получателей нет. Добавьте человека, который может забирать ваши посылки.</p>
        </div>
      )}
    </div>
  )
}

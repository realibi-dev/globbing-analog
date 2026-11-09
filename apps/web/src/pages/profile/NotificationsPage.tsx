import { useState } from 'react'
import { toast } from 'sonner'
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@globbing/ui'

type NotifKey =
  | 'packageAtWarehouse'
  | 'packageInTransit'
  | 'packageInCountry'
  | 'invoiceIssued'
  | 'managerComment'
  | 'buyForMeStatus'

type Settings = Record<NotifKey, { email: boolean; push: boolean }>

const EVENTS: { key: NotifKey; label: string }[] = [
  { key: 'packageAtWarehouse', label: 'Посылка получена на складе' },
  { key: 'packageInTransit', label: 'Посылка отправлена (в пути)' },
  { key: 'packageInCountry', label: 'Посылка в Казахстане' },
  { key: 'invoiceIssued', label: 'Выставлен счёт за доставку' },
  { key: 'managerComment', label: 'Комментарий от менеджера' },
  { key: 'buyForMeStatus', label: 'Обновление заявки «Купи вместо меня»' },
]

export default function NotificationsPage() {
  const [settings, setSettings] = useState<Settings>({
    packageAtWarehouse: { email: true, push: true },
    packageInTransit: { email: true, push: true },
    packageInCountry: { email: true, push: true },
    invoiceIssued: { email: true, push: true },
    managerComment: { email: true, push: false },
    buyForMeStatus: { email: true, push: true },
  })

  function toggle(key: NotifKey, channel: 'email' | 'push') {
    setSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }))
  }

  async function save() {
    await new Promise((r) => setTimeout(r, 500))
    toast.success('Настройки уведомлений сохранены')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Уведомления</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Настройки уведомлений</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-[1fr_80px_80px] gap-4 pb-3 border-b">
              <span className="text-sm font-medium text-gray-500">Событие</span>
              <span className="text-sm font-medium text-gray-500 text-center">Email</span>
              <span className="text-sm font-medium text-gray-500 text-center">Push</span>
            </div>

            {/* Fixed row — can't disable */}
            <div className="grid grid-cols-[1fr_80px_80px] gap-4 py-3 items-center">
              <span className="text-sm text-gray-700">Подтверждение регистрации</span>
              <div className="flex justify-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="flex justify-center text-gray-300 text-xs">—</div>
            </div>
            <Separator />

            {EVENTS.map(({ key, label }, i) => (
              <div key={key}>
                <div className="grid grid-cols-[1fr_80px_80px] gap-4 py-3 items-center">
                  <span className="text-sm text-gray-700">{label}</span>
                  {(['email', 'push'] as const).map((channel) => (
                    <div key={channel} className="flex justify-center">
                      <button
                        onClick={() => toggle(key, channel)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          settings[key][channel] ? 'bg-brand-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[key][channel] ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                {i < EVENTS.length - 1 && <Separator />}
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button onClick={save}>Сохранить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

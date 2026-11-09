import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, Badge } from '@globbing/ui'
import { Link } from 'react-router-dom'
import { MapPin, Users, Bell } from 'lucide-react'

type FormData = {
  fullName: string
  phone: string
  email: string
}

export default function ProfilePage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      fullName: 'Иванов Иван',
      phone: '+7 777 000 00 00',
      email: 'ivan@example.com',
    },
  })

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 600))
    console.log(data)
    toast.success('Профиль обновлён')
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/profile/addresses" className="flex items-center gap-3 p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-sm">Мои адреса</p>
            <p className="text-xs text-gray-500">Адреса складов</p>
          </div>
        </Link>
        <Link to="/profile/recipients" className="flex items-center gap-3 p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-sm">Получатели</p>
            <p className="text-xs text-gray-500">Управление</p>
          </div>
        </Link>
        <Link to="/profile/notifications" className="flex items-center gap-3 p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Bell className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-sm">Уведомления</p>
            <p className="text-xs text-gray-500">Email / Push</p>
          </div>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Личные данные</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ФИО</Label>
                <Input {...register('fullName')} />
              </div>
              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input type="tel" {...register('phone')} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...register('email')} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>ИИН</Label>
                <Input value="990101123456" readOnly className="bg-gray-50 font-mono" />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="success">Email подтверждён</Badge>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Уровень лояльности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Стандарт</p>
              <p className="text-sm text-gray-500">Базовый тариф без скидки</p>
            </div>
            <Badge variant="info">0 посылок</Badge>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div className="bg-brand-500 h-2 rounded-full w-0" />
          </div>
          <p className="text-xs text-gray-500 mt-2">До уровня «Серебро» осталось 10 посылок</p>
        </CardContent>
      </Card>
    </div>
  )
}

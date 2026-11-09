import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import {
  Button, Input, Label, Card, CardContent, CardHeader, CardTitle,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@globbing/ui'

const schema = z.object({
  trackingNumber: z.string().min(5, 'Введите трек-номер'),
  countryId: z.string().min(1, 'Выберите страну'),
  description: z.string().min(3, 'Введите описание товара'),
  categoryId: z.string().min(1, 'Выберите категорию'),
  declaredValue: z.coerce.number().positive('Укажите стоимость'),
  currency: z.string().min(1, 'Выберите валюту'),
  quantity: z.coerce.number().int().positive('Укажите количество'),
  comment: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const COUNTRIES = [
  { id: 'us', name: 'США 🇺🇸' },
  { id: 'de', name: 'Германия 🇩🇪' },
  { id: 'cn', name: 'Китай 🇨🇳' },
  { id: 'gb', name: 'Великобритания 🇬🇧' },
  { id: 'tr', name: 'Турция 🇹🇷' },
]

const CATEGORIES = [
  { id: 'clothing', name: 'Одежда' },
  { id: 'shoes', name: 'Обувь' },
  { id: 'electronics', name: 'Электроника' },
  { id: 'accessories', name: 'Аксессуары' },
  { id: 'cosmetics', name: 'Косметика' },
  { id: 'books', name: 'Книги' },
  { id: 'toys', name: 'Игрушки' },
  { id: 'other', name: 'Другое' },
]

export default function NewPackagePage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1, currency: 'USD' },
  })

  async function onSubmit(data: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log('New package', data)
      toast.success('Посылка добавлена!')
      navigate('/packages')
    } catch {
      toast.error('Ошибка. Попробуйте снова.')
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/packages">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Добавить посылку</h1>
          <p className="text-sm text-gray-500">Задекларируйте посылку по трек-номеру</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Данные посылки</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="trackingNumber">Трек-номер *</Label>
                <Input id="trackingNumber" placeholder="US123456789" {...register('trackingNumber')} />
                {errors.trackingNumber && <p className="text-xs text-red-500">{errors.trackingNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Страна отправки *</Label>
                <Select onValueChange={(v) => setValue('countryId', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите страну" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.countryId && <p className="text-xs text-red-500">{errors.countryId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Категория товара *</Label>
                <Select onValueChange={(v) => setValue('categoryId', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="description">Описание товара *</Label>
                <Input id="description" placeholder="Кроссовки Nike Air Max 42 размер" {...register('description')} />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="declaredValue">Стоимость товара *</Label>
                <Input id="declaredValue" type="number" step="0.01" placeholder="0.00" {...register('declaredValue')} />
                {errors.declaredValue && <p className="text-xs text-red-500">{errors.declaredValue.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Валюта *</Label>
                <Select defaultValue="USD" onValueChange={(v) => setValue('currency', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['USD', 'EUR', 'GBP', 'CNY', 'TRY'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Количество *</Label>
                <Input id="quantity" type="number" min={1} {...register('quantity')} />
                {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Input id="comment" placeholder="Хрупкое, не переворачивать..." {...register('comment')} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Добавляем...' : 'Добавить посылку'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/packages">Отмена</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

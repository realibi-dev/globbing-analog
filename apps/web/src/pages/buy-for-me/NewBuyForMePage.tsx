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
  productUrl: z.string().url('Введите корректную ссылку'),
  productName: z.string().min(2, 'Введите название товара'),
  size: z.string().optional(),
  color: z.string().optional(),
  quantity: z.coerce.number().int().positive('Укажите количество'),
  productCost: z.coerce.number().positive('Укажите стоимость'),
  shippingCost: z.coerce.number().optional(),
  currency: z.string().min(1, 'Выберите валюту'),
  comment: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function NewBuyForMePage() {
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1, currency: 'USD' },
  })

  async function onSubmit(data: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log('New buy-for-me', data)
      toast.success('Заявка создана! Менеджер свяжется с вами.')
      navigate('/buy-for-me')
    } catch {
      toast.error('Ошибка. Попробуйте снова.')
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/buy-for-me"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Новая заявка</h1>
          <p className="text-sm text-gray-500">Менеджер выкупит товар за вас</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Данные товара</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="productUrl">Ссылка на товар *</Label>
                <Input id="productUrl" type="url" placeholder="https://..." {...register('productUrl')} />
                {errors.productUrl && <p className="text-xs text-red-500">{errors.productUrl.message}</p>}
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="productName">Название товара *</Label>
                <Input id="productName" placeholder="Nike Air Max 90" {...register('productName')} />
                {errors.productName && <p className="text-xs text-red-500">{errors.productName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Размер</Label>
                <Input id="size" placeholder="42" {...register('size')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Цвет</Label>
                <Input id="color" placeholder="Белый" {...register('color')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Количество *</Label>
                <Input id="quantity" type="number" min={1} {...register('quantity')} />
                {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Валюта *</Label>
                <Select defaultValue="USD" onValueChange={(v) => setValue('currency', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['USD', 'EUR', 'GBP'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productCost">Стоимость товара *</Label>
                <Input id="productCost" type="number" step="0.01" placeholder="0.00" {...register('productCost')} />
                {errors.productCost && <p className="text-xs text-red-500">{errors.productCost.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCost">Стоимость доставки из магазина</Label>
                <Input id="shippingCost" type="number" step="0.01" placeholder="0.00" {...register('shippingCost')} />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Input id="comment" placeholder="Пожелания по товару..." {...register('comment')} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/buy-for-me">Отмена</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

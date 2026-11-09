import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calculator } from 'lucide-react'
import {
  Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator,
} from '@globbing/ui'

const schema = z.object({
  countryId: z.string().min(1, 'Выберите страну'),
  weight: z.coerce.number().positive('Укажите вес'),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
})

type FormData = z.infer<typeof schema>

type CalcResult = {
  chargeableWeight: number
  deliveryCost: number
  customsDuty: number
  total: number
}

const RATES: Record<string, number> = {
  us: 2500,
  de: 2200,
  cn: 1800,
  gb: 2300,
  tr: 1500,
}

const COUNTRIES = [
  { id: 'us', name: 'США 🇺🇸' },
  { id: 'de', name: 'Германия 🇩🇪' },
  { id: 'cn', name: 'Китай 🇨🇳' },
  { id: 'gb', name: 'Великобритания 🇬🇧' },
  { id: 'tr', name: 'Турция 🇹🇷' },
]

export default function CalculatorPage() {
  const [result, setResult] = useState<CalcResult | null>(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const { weight, length, width, height, countryId } = data
    let volumetric = 0
    if (length && width && height) {
      volumetric = (length * width * height) / 5000
    }
    const perimeter = (length ?? 0) + (width ?? 0) + (height ?? 0)
    const isOversized = perimeter > 150
    const chargeableWeight = isOversized ? Math.max(weight, volumetric) : Math.ceil(weight * 10) / 10

    const rate = RATES[countryId] ?? 2000
    const deliveryCost = chargeableWeight * rate
    const customsDuty = data.weight * 15 * 5

    setResult({
      chargeableWeight,
      deliveryCost,
      customsDuty,
      total: deliveryCost + customsDuty,
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-brand-100 flex items-center justify-center">
            <Calculator className="h-8 w-8 text-brand-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Калькулятор доставки</h1>
        <p className="text-gray-500">Рассчитайте стоимость доставки из любой страны</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Параметры посылки</CardTitle>
          <CardDescription>Введите вес и габариты для расчёта</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <Label htmlFor="weight">Фактический вес (кг) *</Label>
              <Input id="weight" type="number" step="0.1" placeholder="1.5" {...register('weight')} />
              {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Габариты (см) — для крупногабаритных</Label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Input type="number" placeholder="Длина" {...register('length')} />
                </div>
                <div>
                  <Input type="number" placeholder="Ширина" {...register('width')} />
                </div>
                <div>
                  <Input type="number" placeholder="Высота" {...register('height')} />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">Рассчитать</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-brand-200 bg-brand-50">
          <CardHeader>
            <CardTitle className="text-brand-800">Результат расчёта</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Расчётный вес', value: `${result.chargeableWeight.toFixed(2)} кг` },
              { label: 'Стоимость доставки', value: `${result.deliveryCost.toLocaleString('ru-RU')} ₸` },
              { label: 'Таможенная пошлина (прим.)', value: `${result.customsDuty.toLocaleString('ru-RU')} ₸` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Итого (ориентировочно)</span>
              <span className="text-brand-700">{result.total.toLocaleString('ru-RU')} ₸</span>
            </div>
            <p className="text-xs text-gray-500 pt-2">
              * Расчёт является ориентировочным. Точная стоимость определяется менеджером после получения посылки на склад.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

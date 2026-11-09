import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@globbing/ui'

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  fullName: z.string().min(2, 'Введите имя'),
  fullNameCyrillic: z.string().min(2, 'Введите ФИО на кириллице'),
  iin: z.string().length(12, 'ИИН должен содержать 12 цифр').regex(/^\d+$/, 'Только цифры'),
  phone: z.string().min(10, 'Введите номер телефона'),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log('Register', data)
      toast.success('Регистрация успешна! Проверьте email для подтверждения.')
      navigate('/auth/verify-email')
    } catch {
      toast.error('Ошибка регистрации. Попробуйте снова.')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Регистрация</CardTitle>
        <CardDescription>Создайте аккаунт для начала работы</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="Минимум 8 символов" {...register('password')} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Имя (латиница)</Label>
              <Input id="fullName" placeholder="Ivan Ivanov" {...register('fullName')} />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullNameCyrillic">ФИО (кириллица)</Label>
              <Input id="fullNameCyrillic" placeholder="Иванов Иван Иванович" {...register('fullNameCyrillic')} />
              {errors.fullNameCyrillic && (
                <p className="text-xs text-red-500">{errors.fullNameCyrillic.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="iin">ИИН</Label>
              <Input id="iin" placeholder="000000000000" maxLength={12} {...register('iin')} />
              {errors.iin && <p className="text-xs text-red-500">{errors.iin.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" placeholder="+7 777 000 00 00" {...register('phone')} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрируем...' : 'Создать аккаунт'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/auth/login" className="text-brand-600 hover:underline font-medium">
            Войти
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

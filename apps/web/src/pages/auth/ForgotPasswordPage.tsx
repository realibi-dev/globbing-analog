import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@globbing/ui'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Неверный email'),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log('Reset password for', data.email)
      setSent(true)
    } catch {
      toast.error('Ошибка. Попробуйте снова.')
    }
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">Письмо отправлено</h2>
            <p className="text-sm text-gray-600">
              Мы отправили инструкции по сбросу пароля на ваш email.
              Проверьте папку «Спам», если письмо не пришло.
            </p>
            <Link to="/auth/login" className="text-brand-600 hover:underline text-sm font-medium">
              Вернуться к входу
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Забыли пароль?</CardTitle>
        <CardDescription>
          Введите email — мы отправим ссылку для сброса пароля
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Отправить инструкции'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link to="/auth/login" className="text-brand-600 hover:underline">
            Вернуться к входу
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

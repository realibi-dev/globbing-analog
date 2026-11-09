import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@globbing/ui'
import { useAdminAuthStore } from '@/store/auth.store'

type FormData = { email: string; password: string }

export default function LoginPage() {
  const navigate = useNavigate()
  const { setTokens, setManager } = useAdminAuthStore()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 600))
      console.log('Admin login', data)
      setTokens('admin-mock-token')
      setManager({ id: '1', name: 'Алия Сейткали', email: data.email, role: 'MANAGER' })
      navigate('/dashboard')
    } catch {
      toast.error('Неверные учётные данные')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Globbing</h1>
          <p className="text-gray-400 text-sm mt-1">Панель управления</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Вход</CardTitle>
            <CardDescription>Только для сотрудников</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="manager@globbing.kz" {...register('email', { required: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: true })} />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Входим...' : 'Войти'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

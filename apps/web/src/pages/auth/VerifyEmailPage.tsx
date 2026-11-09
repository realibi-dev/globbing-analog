import { Link } from 'react-router-dom'
import { MailOpen } from 'lucide-react'
import { Button, Card, CardContent } from '@globbing/ui'

export default function VerifyEmailPage() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4 py-6">
          <MailOpen className="h-16 w-16 text-brand-500" />
          <h2 className="text-xl font-semibold">Подтвердите email</h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Мы отправили письмо со ссылкой для подтверждения на ваш email. Перейдите по ссылке,
            чтобы активировать аккаунт.
          </p>
          <p className="text-xs text-gray-400">Проверьте папку «Спам», если письмо не пришло.</p>
          <Button variant="outline" asChild>
            <Link to="/auth/login">Уже подтвердил — войти</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

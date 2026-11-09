import { Outlet, Link } from 'react-router-dom'
import { Button } from '@globbing/ui'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-600">
          Globbing
        </Link>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link to="/auth/login">Войти</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Регистрация</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

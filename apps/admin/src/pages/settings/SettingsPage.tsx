import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { cn } from '@globbing/ui'
import { Globe, Tag, DollarSign, Award, Wrench, Users } from 'lucide-react'

const settingsNav = [
  { to: 'countries', label: 'Страны отправки', icon: Globe },
  { to: 'categories', label: 'Категории товаров', icon: Tag },
  { to: 'tariffs', label: 'Тарифы', icon: DollarSign },
  { to: 'loyalty', label: 'Лояльность', icon: Award },
  { to: 'services', label: 'Спецуслуги', icon: Wrench },
  { to: 'managers', label: 'Менеджеры', icon: Users },
]

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl border p-8 text-center">
      <p className="text-gray-400 text-sm">{title} — в разработке</p>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Настройки и справочники</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <nav className="lg:w-52 shrink-0">
          <div className="bg-white rounded-xl border overflow-hidden">
            {settingsNav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium border-b last:border-0 transition-colors',
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex-1">
          <Routes>
            <Route index element={<Navigate to="countries" replace />} />
            <Route path="countries" element={<PlaceholderSection title="Страны отправки" />} />
            <Route path="categories" element={<PlaceholderSection title="Категории товаров" />} />
            <Route path="tariffs" element={<PlaceholderSection title="Тарифы доставки" />} />
            <Route path="loyalty" element={<PlaceholderSection title="Уровни лояльности" />} />
            <Route path="services" element={<PlaceholderSection title="Специальные услуги" />} />
            <Route path="managers" element={<PlaceholderSection title="Управление менеджерами" />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

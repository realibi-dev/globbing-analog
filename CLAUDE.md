# Globbing Analog — CLAUDE.md

## Проект

Платформа-посредник для международной доставки товаров в Казахстан (аналог Globbing).
Клиенты получают персональные адреса зарубежных складов, заказывают товары, декларируют посылки. Менеджеры координируют процесс через Admin-панель.

**Три платформы:** веб (клиент), веб (admin), мобильное приложение (iOS/Android).

---

## Monorepo структура

```
globbing-analog/
├── apps/
│   ├── web/      # Клиентское веб-приложение  → http://localhost:3000
│   ├── admin/    # Админ-панель               → http://localhost:3001
│   ├── api/      # Backend (Fastify)           → http://localhost:3002
│   └── mobile/   # React Native + Expo (stub)
├── packages/
│   ├── ui/       # @globbing/ui    — shared shadcn/ui компоненты
│   ├── types/    # @globbing/types — TypeScript интерфейсы
│   └── config/   # @globbing/config — tsconfig, eslint, tailwind preset
├── turbo.json
└── pnpm-workspace.yaml
```

## Команды

```bash
pnpm install          # установить зависимости (из корня)
pnpm dev              # запустить все apps одновременно (Turborepo)
pnpm build            # сборка всех packages и apps
pnpm type-check       # проверка TypeScript
pnpm format           # форматирование Prettier

# Запустить отдельное приложение:
pnpm --filter @globbing/web dev
pnpm --filter @globbing/admin dev
pnpm --filter @globbing/api dev
```

---

## Стек

| Слой | Технологии |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Frontend (web + admin) | React 18 + Vite + TypeScript |
| Стили | Tailwind CSS v3 + CSS-переменные (shadcn/ui) |
| Компоненты | shadcn/ui (Radix UI) — пакет `@globbing/ui` |
| Роутинг | React Router v6 |
| Сервер-стейт | TanStack Query v5 |
| Клиент-стейт | Zustand (persist middleware) |
| Формы | React Hook Form + Zod |
| i18n | i18next (RU / KZ / EN) |
| Уведомления | Sonner (toasts) |
| Backend | Node.js + Fastify + TypeScript |
| Mobile | Expo + React Native |

---

## Архитектурные решения

### CSS-переменные и Tailwind
shadcn/ui использует CSS-переменные (`--background`, `--foreground`, `--border` и т.д.).
В `tailwind.config.ts` каждого app они замаплены через `hsl(var(--...))`.
**Важно:** не использовать `@apply border-border` внутри `@layer base` — Tailwind v3 не резолвит кастомные утилиты там. Используй прямой CSS: `border-color: hsl(var(--border))`.

### Shared пакеты
- `@globbing/ui` — компоненты копируются из shadcn/ui, не устанавливаются как зависимость. Экспортируются через `src/index.ts`.
- `@globbing/types` — все TypeScript-интерфейсы предметной области (Package, User, Invoice и т.д.). Нет JS кода — только типы.
- `@globbing/config` — `"type": "module"` обязателен (tailwind preset — ES-модуль).

### Auth
- JWT-токены, хранятся в `localStorage`
- Zustand store с `persist` middleware
- Axios interceptor автоматически прикрепляет токен и редиректит на `/auth/login` при 401
- Web и Admin — отдельные stores (разные ключи в localStorage)

### Mock-данные
Пока backend не реализован, каждое app имеет `src/mocks/` с mock-данными.
API-вызовы в страницах заменены на `await new Promise(r => setTimeout(r, 800))` + mock.

---

## packages/ui — компоненты

Текущие компоненты в `@globbing/ui`:
- `Button` — варианты: default, destructive, outline, secondary, ghost, link
- `Input`, `Label`
- `Badge` — варианты: default, secondary, destructive, outline, success, warning, info
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Dialog` (+ Portal, Overlay, Close, Header, Footer, Title, Description)
- `DropdownMenu` (полный набор)
- `Select` (полный набор)
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Separator`
- `Skeleton`
- `cn()` утилита (clsx + tailwind-merge)

---

## packages/types — домены

| Файл | Типы |
|---|---|
| `user.ts` | `User`, `Recipient`, `WarehouseAddress`, `LoyaltyLevel`, `NotificationSettings` |
| `package.ts` | `Package`, `PackageStatus`, `SpecialServiceType`, `PackageSpecialService`, `StatusHistoryEntry` |
| `invoice.ts` | `Invoice`, `InvoiceStatus`, `PaymentMethod` |
| `buy-for-me.ts` | `BuyForMeRequest`, `BuyForMeStatus` |
| `catalog.ts` | `Country`, `Category`, `Tariff`, `PickupPoint`, `SpecialServiceCatalogItem` |
| `api.ts` | `ApiResponse<T>`, `PaginatedResponse<T>`, `AuthTokens`, `CalculatorInput/Result` |

---

## apps/web — роуты

| Путь | Страница | Auth |
|---|---|---|
| `/auth/login` | Вход | Публичный |
| `/auth/register` | Регистрация | Публичный |
| `/auth/forgot-password` | Сброс пароля | Публичный |
| `/auth/verify-email` | Подтверждение email | Публичный |
| `/calculator` | Калькулятор доставки | Публичный |
| `/packages` | Список посылок | Protected |
| `/packages/new` | Декларировать посылку | Protected |
| `/packages/:id` | Карточка посылки | Protected |
| `/buy-for-me` | Мои заявки | Protected |
| `/buy-for-me/new` | Новая заявка | Protected |
| `/pickup-points` | Пункты выдачи | Protected |
| `/profile` | Профиль | Protected |
| `/profile/addresses` | Адреса складов | Protected |
| `/profile/recipients` | Получатели | Protected |
| `/profile/notifications` | Настройки уведомлений | Protected |

---

## apps/admin — роуты

| Путь | Страница |
|---|---|
| `/login` | Вход для менеджеров |
| `/dashboard` | Дашборд с метриками и лентой |
| `/packages` | Все посылки + быстрая фильтрация |
| `/packages/:id` | Карточка посылки (смена статуса, счёт, фото) |
| `/clients` | Список клиентов |
| `/clients/:id` | Карточка клиента + получатели |
| `/invoices` | Все счета |
| `/buy-for-me` | Заявки «Купи вместо меня» |
| `/pickup-points` | Управление ПВЗ |
| `/settings/*` | Справочники (страны, категории, тарифы, лояльность, услуги, менеджеры) |

---

## Реализованные фичи

- [x] Monorepo (Turborepo + pnpm)
- [x] Shared packages: `@globbing/ui`, `@globbing/types`, `@globbing/config`
- [x] **apps/web**: все страницы с вёрсткой, auth flow, layout, mock-данные
- [x] **apps/admin**: все страницы с вёрсткой, auth flow, layout, mock-данные
- [x] **apps/api**: stub (Fastify, `/health` endpoint)
- [x] **apps/mobile**: stub (Expo)
- [x] Tailwind + shadcn/ui CSS-переменные (оба app)
- [x] i18next (структура, ru/kz/en)
- [x] Zustand auth store + axios interceptor
- [x] React Hook Form + Zod на всех формах

## В очереди

- [ ] Backend: Fastify routes, Prisma + PostgreSQL
- [ ] API интеграция (заменить mock-данные на реальные запросы)
- [ ] Mobile app (React Native экраны)
- [ ] Онлайн-оплата (Kaspi Pay)
- [ ] Push-уведомления
- [ ] Настройки справочников в Admin
- [ ] Загрузка фото на склад

---

## Переменные окружения

```bash
# apps/web/.env.local
VITE_API_URL=http://localhost:3002

# apps/admin/.env.local
VITE_API_URL=http://localhost:3002

# apps/api/.env
PORT=3002
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

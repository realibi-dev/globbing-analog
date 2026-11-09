import { Badge } from '@globbing/ui'
import type { PackageStatus } from '@globbing/types'

const STATUS_CONFIG: Record<PackageStatus, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'secondary' }> = {
  ADDED: { label: 'Добавлено', variant: 'secondary' },
  AT_WAREHOUSE: { label: 'На складе', variant: 'info' },
  IN_TRANSIT: { label: 'В пути', variant: 'warning' },
  IN_COUNTRY: { label: 'В стране', variant: 'default' },
  RECEIVED: { label: 'Получено', variant: 'success' },
}

export default function PackageStatusBadge({ status }: { status: PackageStatus }) {
  const config = STATUS_CONFIG[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

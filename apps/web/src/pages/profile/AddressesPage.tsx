import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@globbing/ui'

const warehouseAddress = {
  addressLine1: '1234 Warehouse Blvd, Suite A, Los Angeles, CA 90001, USA',
  addressLine2: 'GLB-00042',
}

function CopyField({ label, value }: { label: string; value: string }) {
  function copy() {
    navigator.clipboard.writeText(value)
    toast.success(`${label} скопировано`)
  }

  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border rounded-md px-3 py-2 text-sm font-mono text-gray-800">
          {value}
        </div>
        <Button variant="outline" size="icon" onClick={copy}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function AddressesPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Мои адреса</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Адрес склада США</CardTitle>
          <CardDescription>
            Используйте этот адрес при оформлении заказов на американских сайтах.
            В поле «Apartment / Suite» вводите ваш уникальный код (Address 2).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CopyField label="Address Line 1" value={warehouseAddress.addressLine1} />
          <CopyField label="Address 2 (ваш код)" value={warehouseAddress.addressLine2} />

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 space-y-1">
            <p className="font-medium">Как использовать адрес?</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>При оформлении заказа на иностранном сайте укажите Address Line 1 как адрес доставки</li>
              <li>В поле «Apartment / Suite» или «Address 2» введите ваш код: <strong>{warehouseAddress.addressLine2}</strong></li>
              <li>После отправки товара задекларируйте посылку в разделе «Мои посылки»</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

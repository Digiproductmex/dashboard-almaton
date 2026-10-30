import { Card } from "@/components/Card"
import type { ReportOrder } from "@/data/reports/data"

const countFormatter = new Intl.NumberFormat("en-US")
const shareFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})

export function ReportsKpiCards({ orders }: { orders: ReportOrder[] }) {
  const countByStatus = (status: ReportOrder["status"]) =>
    orders.filter((order) => order.status === status).length

  const kpis = [
    { label: "Orders Shipped", count: countByStatus("shipped") },
    { label: "Total Returns", count: countByStatus("returned") },
  ]

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <dt className="truncate text-sm text-gray-500 dark:text-gray-500">
          Orders Received
        </dt>
        <dd className="mt-1 text-2xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">
          {countFormatter.format(orders.length)}
        </dd>
      </Card>
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="p-4">
          <dt className="flex items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500">
            <span className="truncate">{kpi.label}</span>
            {orders.length > 0 && (
              <span className="font-medium tabular-nums text-gray-700 dark:text-gray-300">
                {shareFormatter.format(kpi.count / orders.length)}
              </span>
            )}
          </dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">
            {countFormatter.format(kpi.count)}
          </dd>
        </Card>
      ))}
    </dl>
  )
}

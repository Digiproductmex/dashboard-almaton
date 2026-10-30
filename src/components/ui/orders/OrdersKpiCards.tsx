import { Card } from "@/components/Card"
import { statuses, type Ticket } from "@/data/support/schema"

const shareFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})

export function OrdersKpiCards({ tickets }: { tickets: Ticket[] }) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <dt className="truncate text-sm text-gray-500 dark:text-gray-500">
          Total Orders
        </dt>
        <dd className="mt-1 text-2xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">
          {tickets.length}
        </dd>
      </Card>
      {statuses.map((status) => {
        const count = tickets.filter(
          (ticket) => ticket.status === status.value,
        ).length

        return (
          <Card key={status.value} className="p-4">
            <dt className="flex items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500">
              <span className="truncate">{status.label} Orders</span>
              {tickets.length > 0 && (
                <span className="font-medium tabular-nums text-gray-700 dark:text-gray-300">
                  {shareFormatter.format(count / tickets.length)}
                </span>
              )}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">
              {count}
            </dd>
          </Card>
        )
      })}
    </dl>
  )
}

import { Card } from "@/components/Card"
import type { Ticket } from "@/data/support/schema"
import { cx } from "@/lib/utils"

type Kpi = {
  name: string
  color: string
  filter: (ticket: Ticket) => boolean
}

const kpis: Kpi[] = [
  { name: "Total Orders", color: "bg-indigo-500", filter: () => true },
  {
    name: "Completed Orders",
    color: "bg-emerald-500",
    filter: (ticket) => ticket.status === "resolved",
  },
  {
    name: "Pending Orders",
    color: "bg-yellow-500",
    filter: (ticket) => ticket.status === "in-progress",
  },
  {
    name: "Cancelled Orders",
    color: "bg-red-500",
    filter: (ticket) => ticket.status === "escalated",
  },
]

const shareFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})

export function OrdersKpiCards({ tickets }: { tickets: Ticket[] }) {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => {
        const count = tickets.filter(kpi.filter).length
        // the first card is the total, so its share would always be 100%
        const isTotal = index === 0

        return (
          <Card key={kpi.name}>
            <div className="flex space-x-3">
              <div className={cx(kpi.color, "w-1 shrink-0 rounded")} />
              <dt className="flex w-full items-center justify-between space-x-3 truncate text-sm text-gray-500 dark:text-gray-500">
                <span className="truncate">{kpi.name}</span>
                {!isTotal && tickets.length > 0 && (
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {shareFormatter.format(count / tickets.length)}
                  </span>
                )}
              </dt>
            </div>
            <dd className="mt-2 pl-4 text-3xl font-semibold text-gray-900 dark:text-gray-50">
              {count}
            </dd>
          </Card>
        )
      })}
    </dl>
  )
}

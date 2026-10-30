import { siteConfig } from "@/app/siteConfig"
import { Card } from "@/components/Card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { getLateOrders, type ReportOrder } from "@/data/reports/data"
import { cx } from "@/lib/utils"
import { RiTimerLine } from "@remixicon/react"
import Link from "next/link"

const VISIBLE_ORDERS = 5

export function LateOrdersCard({
  orders,
  className,
}: {
  orders: ReportOrder[]
  className?: string
}) {
  const lateOrders = getLateOrders(orders)

  return (
    <Card className={cx("flex min-h-0 flex-col p-4", className)}>
      <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
        <RiTimerLine
          className="size-5 shrink-0 text-red-500"
          aria-hidden="true"
        />
        Late Orders
      </h2>
      {lateOrders.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          No late orders in this period.
        </p>
      ) : (
        <>
          <div className="mt-2 min-h-0 flex-1 overflow-auto whitespace-nowrap">
            <Table className="border-b-0">
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="py-1.5">Number</TableHeaderCell>
                  <TableHeaderCell className="py-1.5">
                    Required shipping date
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lateOrders.slice(0, VISIBLE_ORDERS).map((order) => (
                  <TableRow key={order.number}>
                    <TableCell className="py-1.5 font-medium text-gray-900 dark:text-gray-50">
                      {order.number}
                    </TableCell>
                    <TableCell className="py-1.5 tabular-nums">
                      {order.requiredShipping}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-auto pt-2 text-center text-sm text-gray-500 dark:text-gray-500">
            {lateOrders.length} orders are late ·{" "}
            <Link
              href={siteConfig.baseLinks.orders}
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              View all
            </Link>
          </p>
        </>
      )}
    </Card>
  )
}

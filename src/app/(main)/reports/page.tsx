"use client"

import { DateRangePicker, type DateRange } from "@/components/DatePicker"
import { Divider } from "@/components/Divider"
import { LateOrdersCard } from "@/components/ui/reports/LateOrdersCard"
import { OrdersMapCard } from "@/components/ui/reports/OrdersMapCard"
import { ReportsKpiCards } from "@/components/ui/reports/ReportsKpiCards"
import { RevenueOrdersCard } from "@/components/ui/reports/RevenueOrdersCard"
import {
  filterReportOrders,
  reportEnd,
  reportOrders,
  reportStart,
} from "@/data/reports/data"
import React from "react"

export default function Reports() {
  const [dates, setDates] = React.useState<DateRange | undefined>({
    from: reportStart,
    to: reportEnd,
  })
  const orders = React.useMemo(
    () => filterReportOrders(reportOrders, dates?.from, dates?.to),
    [dates],
  )

  return (
    <main className="flex flex-col xl:-mb-6 xl:h-[calc(100dvh-2.75rem)] xl:min-h-[36rem]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Reports
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Orders, revenue and delivery across Mexico.
          </p>
        </div>
        <DateRangePicker
          aria-label="Report period"
          value={dates}
          onChange={setDates}
          className="w-full sm:w-fit"
          fromDate={reportStart}
          toDate={reportEnd}
          align="end"
        />
      </div>
      <Divider className="my-4" />
      <ReportsKpiCards orders={orders} />
      <div className="mt-4 grid grid-cols-1 gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-5 xl:grid-rows-2">
        <RevenueOrdersCard orders={orders} className="xl:col-span-2" />
        <LateOrdersCard
          orders={orders}
          className="xl:col-span-2 xl:row-start-2"
        />
        <OrdersMapCard
          orders={orders}
          className="xl:col-span-3 xl:col-start-3 xl:row-span-2 xl:row-start-1"
        />
      </div>
    </main>
  )
}

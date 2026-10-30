"use client"

import { Badge } from "@/components/Badge"
import { Card } from "@/components/Card"
import {
  getOrdersByLocation,
  type LocationView,
  type ReportOrder,
} from "@/data/reports/data"
import { cx, focusRing } from "@/lib/utils"
import dynamic from "next/dynamic"
import React from "react"

const ReportsMap = dynamic(
  () => import("./ReportsMap").then((module) => module.ReportsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-gray-100 dark:bg-gray-900" />
    ),
  },
)

const views: { value: LocationView; label: string }[] = [
  { value: "state", label: "State" },
  { value: "city", label: "City" },
]

export function OrdersMapCard({
  orders,
  className,
}: {
  orders: ReportOrder[]
  className?: string
}) {
  const [view, setView] = React.useState<LocationView>("state")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const locations = React.useMemo(
    () => getOrdersByLocation(orders, view),
    [orders, view],
  )

  const changeView = (nextView: LocationView) => {
    setView(nextView)
    setSelectedId(null)
  }
  const toggleLocation = (id: string) =>
    setSelectedId((current) => (current === id ? null : id))

  return (
    <Card className={cx("flex min-h-0 flex-col p-0", className)}>
      <div className="flex items-center gap-3 px-4 py-2.5">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">
          Orders by
        </h2>
        <div
          role="group"
          aria-label="Group orders by"
          className="inline-flex rounded-md bg-gray-100 p-0.5 dark:bg-gray-900"
        >
          {views.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={view === item.value}
              onClick={() => changeView(item.value)}
              className={cx(
                "rounded px-2.5 py-1 text-xs font-medium transition",
                view === item.value
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                focusRing,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col border-t border-gray-200 md:h-96 md:flex-row xl:h-auto xl:min-h-0 xl:flex-1 dark:border-gray-800">
        <ul
          role="list"
          className="max-h-60 shrink-0 space-y-0.5 overflow-y-auto p-2 md:max-h-none md:w-56"
        >
          {locations.map((location) => (
            <li key={location.id}>
              <button
                type="button"
                aria-pressed={selectedId === location.id}
                onClick={() => toggleLocation(location.id)}
                className={cx(
                  "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 hover:dark:bg-gray-900",
                  selectedId === location.id &&
                    "bg-gray-100 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-50",
                  focusRing,
                )}
              >
                <span className="w-11 shrink-0">
                  <Badge variant="success" className="tabular-nums">
                    {location.count}
                  </Badge>
                </span>
                <span className="truncate">{location.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="h-80 min-w-0 overflow-hidden rounded-b-lg border-t border-gray-200 md:h-auto md:flex-1 md:rounded-bl-none md:border-l md:border-t-0 dark:border-gray-800">
          <ReportsMap
            locations={locations}
            selectedId={selectedId}
            onSelect={toggleLocation}
          />
        </div>
      </div>
    </Card>
  )
}

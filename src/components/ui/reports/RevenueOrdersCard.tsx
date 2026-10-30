"use client"

import { Card } from "@/components/Card"
import { getDailyTotals, type ReportOrder } from "@/data/reports/data"
import { cx } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
})
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  notation: "compact",
})
const countFormatter = new Intl.NumberFormat("en-US")

const formatDay = (date: string) => format(parseISO(date), "MMM d")

const series = [
  {
    key: "revenue",
    name: "Revenue",
    axis: "revenue",
    formatValue: (value: number) => currencyFormatter.format(value),
    swatch: "bg-emerald-600",
    line: "stroke-emerald-600",
    dot: "fill-emerald-600 stroke-white dark:stroke-[#090E1A]",
  },
  {
    key: "orders",
    name: "Orders",
    axis: "orders",
    formatValue: (value: number) => countFormatter.format(value),
    swatch: "bg-amber-600",
    line: "stroke-amber-600",
    dot: "fill-amber-600 stroke-white dark:stroke-[#090E1A]",
  },
]

const axisClassName = "fill-gray-500 text-xs dark:fill-gray-500"
const axisLabelClassName =
  "fill-gray-700 text-xs font-medium dark:fill-gray-300"

function SeriesSwatch({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("h-[3px] w-3.5 shrink-0 rounded-full", className)}
    />
  )
}

function ChartTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean
  label?: string
  payload?: { dataKey?: unknown; value?: unknown }[]
}) {
  if (!active || !payload?.length || !label) return null

  return (
    <div className="rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="border-b border-inherit p-2 font-medium text-gray-900 dark:text-gray-50">
        {formatDay(label)}
      </p>
      <div className="space-y-1 p-2">
        {series.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-8"
          >
            <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <SeriesSwatch className={item.swatch} />
              {item.name}
            </span>
            <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
              {item.formatValue(
                Number(
                  payload.find((entry) => entry.dataKey === item.key)?.value,
                ),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RevenueOrdersCard({
  orders,
  className,
}: {
  orders: ReportOrder[]
  className?: string
}) {
  const data = getDailyTotals(orders)

  return (
    <Card className={cx("flex min-h-0 flex-col p-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">
          Revenue &amp; Orders
        </h2>
        <ul className="flex items-center gap-4">
          {series.map((item) => (
            <li
              key={item.key}
              className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300"
            >
              <SeriesSwatch className={item.swatch} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 h-64 w-full xl:h-auto xl:min-h-0 xl:flex-1">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: 12, right: 12, top: 8 }}>
            <CartesianGrid
              className="stroke-gray-200 stroke-1 dark:stroke-gray-800"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDay}
              className={axisClassName}
              tick={{ transform: "translate(0, 6)" }}
              tickLine={false}
              axisLine={false}
              fill=""
              stroke=""
              minTickGap={24}
              padding={{ left: 12, right: 12 }}
            />
            <YAxis
              yAxisId="revenue"
              width={68}
              className={axisClassName}
              tickFormatter={(value: number) =>
                compactCurrencyFormatter.format(value)
              }
              tickLine={false}
              axisLine={false}
              fill=""
              stroke=""
            >
              <Label
                value="Revenue"
                position="insideLeft"
                angle={-90}
                offset={-8}
                style={{ textAnchor: "middle" }}
                className={axisLabelClassName}
              />
            </YAxis>
            <YAxis
              yAxisId="orders"
              orientation="right"
              width={48}
              className={axisClassName}
              tickLine={false}
              axisLine={false}
              fill=""
              stroke=""
              allowDecimals={false}
            >
              <Label
                value="Orders"
                position="insideRight"
                angle={90}
                offset={-8}
                style={{ textAnchor: "middle" }}
                className={axisLabelClassName}
              />
            </YAxis>
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={({ active, label, payload }) => (
                <ChartTooltip
                  active={active}
                  label={label as string}
                  payload={payload}
                />
              )}
            />
            {series.map((item) => (
              <Line
                key={item.key}
                yAxisId={item.axis}
                dataKey={item.key}
                name={item.name}
                type="monotone"
                className={item.line}
                stroke=""
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 1,
                  className: item.dot,
                  fill: "",
                  stroke: "",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  className: item.dot,
                  fill: "",
                  stroke: "",
                }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

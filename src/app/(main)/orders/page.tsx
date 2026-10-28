"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { Divider } from "@/components/Divider"
import { LineChartSupport } from "@/components/LineChartSupport"
import { ProgressCircle } from "@/components/ProgressCircle"
import { TicketDrawer } from "@/components/ui/TicketDrawer"
import { DataTable } from "@/components/ui/data-table-support/DataTable"
import { columns } from "@/components/ui/data-table-support/columns"
import { tickets } from "@/data/support/tickets"
import { volume } from "@/data/support/volume"
import { RiAddLine } from "@remixicon/react"
import React from "react"

export default function SupportDashboard() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Support Dashboard
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Real-time monitoring of support metrics with AI-powered insights
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-base sm:text-sm"
        >
          Create Ticket
          <RiAddLine className="-mr-0.5 size-5 shrink-0" aria-hidden="true" />
        </Button>
        <TicketDrawer open={isOpen} onOpenChange={setIsOpen} />
      </div>
      <Divider />
    </main>
  )
}

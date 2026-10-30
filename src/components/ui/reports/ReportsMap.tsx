"use client"

import type { ReportLocation } from "@/data/reports/data"
import { cx, focusRing } from "@/lib/utils"
import { RiFullscreenExitLine, RiFullscreenLine } from "@remixicon/react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import React from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"

const MEXICO_BOUNDS: L.LatLngBoundsLiteral = [
  [14.5, -117.5],
  [32.7, -86.7],
]
const SELECTED_ZOOM = 7

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const createPin = ({ count }: ReportLocation) =>
  L.divIcon({
    className: "",
    iconSize: [0, 0],
    html: `<div class="flex w-max -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md bg-white px-1.5 py-1 text-xs font-semibold tabular-nums text-gray-900 shadow-md ring-1 ring-black/5 dark:bg-gray-900 dark:text-gray-50 dark:ring-white/10"><span class="size-2 rounded-full bg-emerald-600"></span>${count}</div>`,
  })

function FlyToSelection({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap()

  React.useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.flyTo([lat, lng], SELECTED_ZOOM)
    } else {
      map.flyToBounds(MEXICO_BOUNDS)
    }
  }, [map, lat, lng])

  return null
}

type ReportsMapProps = {
  locations: ReportLocation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ReportsMap({
  locations,
  selectedId,
  onSelect,
}: ReportsMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }

  const FullscreenIcon = isFullscreen ? RiFullscreenExitLine : RiFullscreenLine
  const selected = locations.find(({ id }) => id === selectedId)

  return (
    <div ref={containerRef} className="relative isolate h-full w-full">
      <MapContainer
        bounds={MEXICO_BOUNDS}
        minZoom={3}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        className="h-full w-full bg-gray-100 dark:bg-gray-900 dark:[&_.leaflet-tile-pane]:[filter:invert(1)_hue-rotate(180deg)_brightness(0.9)]"
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            zIndexOffset={(locations.length - index) * 1000}
            position={[location.lat, location.lng]}
            icon={createPin(location)}
            title={location.name}
            riseOnHover
            eventHandlers={{ click: () => onSelect(location.id) }}
          />
        ))}
        <FlyToSelection lat={selected?.lat} lng={selected?.lng} />
      </MapContainer>
      <button
        type="button"
        aria-label={isFullscreen ? "Exit fullscreen" : "View map fullscreen"}
        onClick={toggleFullscreen}
        className={cx(
          "absolute right-2 top-2 z-[1000] rounded-md bg-white p-1.5 text-gray-700 shadow-md ring-1 ring-black/5 transition hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:ring-white/10 dark:hover:text-gray-50",
          focusRing,
        )}
      >
        <FullscreenIcon className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

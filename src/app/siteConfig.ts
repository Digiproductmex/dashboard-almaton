export const siteConfig = {
  name: "Almaton Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/overview",
    orders: "/orders",
    inventory: "/inventory",
    shipments: "/shipments",
    network: "/network",
    reports: "/reports",
    details: "/details",
    integrations: "/integrations",
    settings: "/settings",
  },
  externalLink: {
    blocks: "https://blocks.tremor.so/templates#dashboard",
  },
}

export type siteConfig = typeof siteConfig

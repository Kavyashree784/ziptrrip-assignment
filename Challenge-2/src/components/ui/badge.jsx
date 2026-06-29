import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 shadow-sm",
  secondary: "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80",
  destructive: "border-transparent bg-red-100 text-red-900 hover:bg-red-100/80",
  outline: "text-zinc-950 border-zinc-200",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2", badgeVariants[variant], className)} {...props} />
  )
}

export { Badge }

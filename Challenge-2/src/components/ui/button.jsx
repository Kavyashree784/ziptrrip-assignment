import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = {
  default: "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 active:scale-[0.98] transition-all",
  destructive: "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 active:scale-[0.98] transition-all",
  outline: "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] transition-all",
  secondary: "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 active:scale-[0.98] transition-all",
  ghost: "hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] transition-all",
  link: "text-zinc-900 underline-offset-4 hover:underline",
}

const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }

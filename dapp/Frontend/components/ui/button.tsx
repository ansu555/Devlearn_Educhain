import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-yellow-500 text-black hover:bg-yellow-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-600 text-white hover:bg-gray-800",
        secondary: "bg-gray-700 text-white hover:bg-gray-600",
        ghost: "hover:bg-gray-700 text-white",
        link: "text-yellow-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 w-full", // Increased height
        sm: "h-10 rounded-md px-4",
        lg: "h-14 rounded-md px-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
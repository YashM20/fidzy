"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export function Container({
  children,
  className,
  size = "xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        size === "sm" && "max-w-screen-sm",
        size === "md" && "max-w-screen-md",
        size === "lg" && "max-w-screen-lg",
        size === "xl" && "max-w-screen-xl",
        size === "full" && "max-w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 
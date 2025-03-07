"use client"

import type React from "react"

type LayoutWithSidebarProps = {
  children: React.ReactNode
  sidebar?: React.ReactNode
  sidebarWidth?: string
  sidebarPosition?: "left" | "right"
}

export function LayoutWithSidebar({
  children,
  sidebar,
  sidebarWidth = "250px",
  sidebarPosition = "left",
}: LayoutWithSidebarProps) {
  return (
    <div
      className="flex w-full h-full"
      style={{
        flexDirection: sidebarPosition === "left" ? "row" : "row-reverse",
      }}
    >
      {sidebar && (
        <aside
          className="shrink-0 h-full bg-[#0f1124] border-[#2a2d4a] transition-all duration-300"
          style={{ width: sidebarWidth }}
        >
          {sidebar}
        </aside>
      )}
      <main className="flex-grow overflow-hidden">{children}</main>
    </div>
  )
}


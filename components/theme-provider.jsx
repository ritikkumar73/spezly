"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  // Next.js 16 / React 19: inline theme script must not be type=text/javascript
  // on the client during hydration (SSR still injects the executable script).
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : { type: "application/json" }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      scriptProps={scriptProps}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 
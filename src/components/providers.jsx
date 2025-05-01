"use client"

import { ThemeProvider as NextThemeProvider} from "next-themes";

export default function RootProvider({ children }) {
    return (
        <NextThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
            {children}
        </NextThemeProvider>
    )
}
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePreviousRoute() {
    const pathname = usePathname()

    useEffect(() => {
        const current = localStorage.getItem('currentRoute')

        if (current && current !== pathname) {
            localStorage.setItem("previousRoute", current)
        }

        localStorage.setItem('currentRoute', pathname)
    }, [pathname])
}

export function getPreviousRoute(): string | null {
    return localStorage.getItem("previousRoute")
}
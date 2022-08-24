export function getScreenWidth(screen: any): number {
    if (!screen.lg && !screen.md && screen.sm) return 300
    if (!screen.lg && !screen.md && !screen.sm) return 200
    return 500
}

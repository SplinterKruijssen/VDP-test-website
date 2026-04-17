/**
 * Example: how to drop KantoorenSection into a Next.js page.
 *
 * In a real Next.js app this file lives at:
 *   app/page.tsx  (App Router)
 *   — or —
 *   pages/index.tsx  (Pages Router)
 */
import { KantoorenSection } from "@/components/kantoren-section"

export default function HomePage() {
  return (
    <main>
      {/* … other homepage sections … */}
      <KantoorenSection />
      {/* … */}
    </main>
  )
}

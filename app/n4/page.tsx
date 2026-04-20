import N4PageShell from '@/components/n4/N4PageShell'
import { contentD } from '@/lib/content-d'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'תלמד לנהל כסף נכון תוך 3 שעות — גם אם אין לך מושג מאיפה להתחיל.',
}

export default function N4() {
  return <N4PageShell content={contentD} />
}

import N3PageShell from '@/components/n3/N3PageShell'
import { contentD } from '@/lib/content-d'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'תלמד לנהל כסף נכון תוך 3 שעות — גם אם אין לך מושג מאיפה להתחיל.',
}

export default function N3() {
  return <N3PageShell content={contentD} />
}

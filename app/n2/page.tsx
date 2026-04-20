import N2PageShell from '@/components/n2/N2PageShell'
import { contentD } from '@/lib/content-d'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'תלמד לנהל כסף נכון תוך 3 שעות — גם אם אין לך מושג מאיפה להתחיל.',
}

export default function N2() {
  return <N2PageShell content={contentD} />
}

import N6PageShell from '@/components/n6/N6PageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'תתחיל לשלוט בכסף שלך באמת — גם אם אין לך מושג מאיפה להתחיל.',
}

export default function N6() {
  return <N6PageShell content={contentN5} />
}

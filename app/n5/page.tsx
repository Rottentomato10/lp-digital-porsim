import N5PageShell from '@/components/n5/N5PageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'תתחיל לשלוט בכסף שלך באמת — גם אם אין לך מושג מאיפה להתחיל.',
}

export default function N5() {
  return <N5PageShell content={contentN5} />
}

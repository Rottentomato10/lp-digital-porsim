import N9PageShell from '@/components/n9/N9PageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'להבין כסף באמת — במקום להמשיך לנחש מאיפה להתחיל.',
}

export default function N9() {
  return <N9PageShell content={contentN5} />
}

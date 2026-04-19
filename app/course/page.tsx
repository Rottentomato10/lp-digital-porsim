import N9PageShell from '@/components/n9/N9PageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — להבין כסף באמת',
  description: 'להבין כסף באמת — במקום להמשיך לנחש מאיפה להתחיל.',
}

export default function Course() {
  return <N9PageShell content={contentN5} />
}

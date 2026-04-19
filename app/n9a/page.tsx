import N9aPageShell from '@/components/n9a/N9aPageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — להבין כסף באמת',
  description: 'להבין כסף באמת — במקום להמשיך לנחש מאיפה להתחיל.',
}

export default function N9a() {
  return <N9aPageShell content={contentN5} />
}

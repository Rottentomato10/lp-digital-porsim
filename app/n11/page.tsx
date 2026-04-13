import N11PageShell from '@/components/n11/N11PageShell'
import { contentN5 } from '@/lib/content-n5'

export const metadata = {
  title: 'פורשים כנף — הקורס שישנה את הדרך בה אתה חושב על כסף',
  description: 'להבין כסף באמת — במקום להמשיך לנחש מאיפה להתחיל.',
}

export default function N11() {
  return <N11PageShell content={contentN5} />
}

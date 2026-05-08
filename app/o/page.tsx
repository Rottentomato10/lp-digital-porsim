import N9PageShell from '@/components/n9/N9PageShell'
import { contentN5 } from '@/lib/content-n5'
import LightModeInit from './LightModeInit'

export const metadata = {
  title: 'פורשים כנף — להבין כסף באמת',
  description: 'להבין כסף באמת — במקום להמשיך לנחש מאיפה להתחיל.',
}

export default function LightPage() {
  return (
    <>
      <LightModeInit />
      <N9PageShell content={contentN5} />
    </>
  )
}

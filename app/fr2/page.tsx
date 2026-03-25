import DPageShell from '@/components/d/DPageShell'
import { contentFR2 } from '@/lib/content-fr2'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הכסף שתרוויח בשנים הקרובות תלוי במה שתעשה עם הכסף שיש לך עכשיו.',
}

export default function FR2() {
  return <DPageShell content={contentFR2} />
}

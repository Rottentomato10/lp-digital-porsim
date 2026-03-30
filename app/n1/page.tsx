import N1PageShell from '@/components/n1/N1PageShell'
import { contentD } from '@/lib/content-d'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הכסף שתרוויח מחר תלוי במה שתדע היום.',
}

export default function N1() {
  return <N1PageShell content={contentD} />
}

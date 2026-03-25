import DPageShell from '@/components/d/DPageShell'
import { contentD } from '@/lib/content-d'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הכסף שתרוויח מחר תלוי במה שתדע היום.',
}

export default function Home() {
  return <DPageShell content={contentD} />
}

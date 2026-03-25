import DPageShell from '@/components/d/DPageShell'
import { contentSL1 } from '@/lib/content-sl1'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הכסף שתרוויח אחרי הצבא תלוי במה שתדע כבר עכשיו.',
}

export default function SL1() {
  return <DPageShell content={contentSL1} />
}

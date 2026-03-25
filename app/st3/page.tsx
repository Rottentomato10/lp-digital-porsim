import DPageShell from '@/components/d/DPageShell'
import { contentST3 } from '@/lib/content-st3'

export const metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הכסף שתהיה לך בעתיד תלוי במה שתבין כבר עכשיו.',
}

export default function ST3() {
  return <DPageShell content={contentST3} />
}

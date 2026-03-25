import DPageShell from '@/components/d/DPageShell'
import { contentST4 } from '@/lib/content-st4'

export const metadata = {
  title: 'פורשים כנף — קורס פיננסים לסטודנטים',
  description: 'הכסף שאתה מרוויח עכשיו צריך לעבוד גם בשביל העתיד שלך.',
}

export default function ST4() {
  return <DPageShell content={contentST4} />
}

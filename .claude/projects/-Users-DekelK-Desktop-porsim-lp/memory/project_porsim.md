---
name: project_porsim
description: פרטי פרויקט פורשים כנף — מבנה דפים, routes, גרסאות, מצב נוכחי
type: project
---

## פורשים כנף — דף נחיתה דיגיטלי

**מוצר:** קורס פיננסים לצעירים (3 שעות, 57 שיעורים, ₪390)
**קהל יעד:** צעירים 16-30, חיילים, סטודנטים, שכירים בתחילת הדרך
**מייסדים:** דקל קאפח, אביתר דנגור
**טכנולוגיה:** Next.js 14, Tailwind CSS, Vercel
**ריפו:** github.com/Rottentomato10/lp-digital-porsim
**דומיין:** porsimkanaf.com

## מבנה Routes

| Route | תיאור | סוג |
|-------|--------|-----|
| `/` | דף ראשי כללי (הגרסה המקורית) | DPageShell |
| `/sl1` | חיילים | DPageShell + contentSL1 |
| `/fr2` | חיילים משוחררים | DPageShell + contentFR2 |
| `/st3` | תלמידי תיכון | DPageShell + contentST3 |
| `/un4` | סטודנטים | DPageShell + contentST4 |
| `/n1` | גרסת מכירה v1 — עמוק, סיפורי | N1PageShell |
| `/n2` | גרסת מכירה v2 — פאנצ'י, קצר | N2PageShell |
| `/n3` | גרסת מכירה v3 — hybrid (n1+n2) | N3PageShell |
| `/n4` | **גרסה ראשית נוכחית** — בוגר, אותנטי | N4PageShell |
| `/c` | גרסה ישנה (לא בשימוש) | - |

## מערכת Content

- `lib/content-d.ts` — תוכן ראשי (כל הגרסאות הקהל יורשות ממנו)
- `lib/content-context.tsx` — VariantProvider + useContent hook
- כל variant קהל (`sl1/fr2/st3/un4`) — קובץ content נפרד שעושה spread מ-contentD
- גרסאות n1-n4 — קומפוננטים עצמאיים עם טקסט hardcoded

## מבנה N4 (הגרסה הראשית)

1. **N4Hero** — לוגו, כותרת, סרטון autoplay, CTA
2. **N4SalesPitch** — "אתה לא טיפש..." הזדהות
3. **N4DeepProblem** — 5 נקודות כאב + mid-CTA
4. **N4Vision** — "תדמיין מצב אחר" (ממורכז)
5. **N4Mindshift** — "הבסיס" בכתום, "כל רגע"
6. **N4Solution** — 3 שלבים אופקיים (להבין→לגרום לכסף לעבוד→לשלוט) + outcomes + סילבוס
7. **N2Decision** — בשבילך / לא בשבילך
8. **N4MiniClose** — "השאלה היחידה..."
9. **N4Reviews** — featured hero + grid 8 ביקורות
10. **N4Pricing** — countdown, ROI line, בונוסים עם תועלת, אחריות מורחבת
11. **N2FAQ** — 12 שאלות מפוצל עם mid-CTA
12. **N4Team** — סטטיסטיקות + מייסדים (ביו placeholder)
13. **N4FinalCta** — "זה עניין של החלטה"

## אלמנטים משותפים

- **DStickyBar** — מחיר | CTA | ווטסאפ (ממורכז)
- **AccessibilityWidget** — כפתור סגול צמוד ימין בפוטר
- **SocialToast** — "א׳ הצטרף/ה" (אזור סילבוס בלבד, shuffled pool)
- **DFooter** — פרטיות, תנאים, נגישות
- **DCookieConsent** — הסכמת עוגיות

## מעקב

- **Google Analytics 4:** G-QFNH2ML23S
- **Microsoft Clarity:** w1gn6mbhva

## מה חסר לחיבור

- סרטון (`/public/video.mov`)
- מספר ווטסאפ (ב-DStickyBar.tsx)
- לינק תשלום (CHECKOUT_URL ב-content-d.ts)
- ביו מייסדים (N4Team.tsx)
- תמונות מייסדים (N4Team.tsx → person.image)

## Tags חשובים

- `n4-stable-v1` (commit 3ec3ba5) — גרסה יציבה של n4

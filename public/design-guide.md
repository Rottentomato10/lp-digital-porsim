# פורשים כנף — מסמך עיצוב UI/UX
## digital.porsimkanaf.com

---

## 1. סקירה כללית

**מוצר:** קורס דיגיטלי לחינוך פיננסי לצעירים
**מחיר:** ₪390 (מחיר מקורי ₪490, הנחת השקה)
**קהל יעד:** צעירים 17-25
**שפה:** עברית (RTL)
**גופן:** Heebo (Google Fonts) — כל המשקלים 300-900

---

## 2. פלטת צבעים

### צבעים ראשיים
| שם | קוד | שימוש |
|---|---|---|
| **רקע ראשי** | `#080808` | דף נחיתה |
| **רקע משני** | `#060A13` | דף הצלחה, כישלון, 404 |
| **רקע checkout** | gradient `#080B16` → `#0D1117` | דף תשלום |
| **זהב (accent)** | `#F5A624` | CTA, כותרות, מחיר, הדגשות |
| **זהב בהיר** | `#FFCD6B` | gradient עם הזהב |

### צבעים משניים
| שם | קוד | שימוש |
|---|---|---|
| **ירוק הצלחה** | `#10B981` | מספרים חיוביים, ✔, אחרי תשלום, guarantee |
| **ירוק כהה** | `#34D399` | מספרים בהירו (stats) |
| **סגול** | `#A78BFA` | מודול 3 בסילבוס |
| **טורקיז** | `#5EEAD4` | מודול 2 בסילבוס |
| **אדום** | `#EF4444` | שגיאות, מושבת |
| **WhatsApp ירוק** | `#25D366` | כפתורי WhatsApp |

### טקסט
| אטימות | שימוש |
|---|---|
| `white` (100%) | כותרות ראשיות, שמות |
| `white/70` | טקסט גוף ראשי |
| `white/60` | טקסט גוף |
| `white/50` | תיאורים, labels |
| `white/45` | טקסט עזר, hints |
| `white/40` | טקסט משני |
| `white/30` | מידע שולי |

---

## 3. זרימת המשתמש (Flow)

```
דף נחיתה (/)
    ↓ לחיצה על CTA
דף צ'קאאוט (/checkout)
    ↓ מילוי פרטים + קוד קופון (אופציונלי)
    ↓ לחיצה "המשך לתשלום"
חלונית קארדקום (iframe/popup)
    ↓ תשלום מוצלח          ↓ תשלום נכשל
דף הצלחה (/checkout/success)    דף כישלון (/checkout/failed)
```

---

## 4. דף נחיתה — `/`

### מבנה (מלמעלה למטה)
1. **Sticky Bar** — מופיע אחרי 85% גלילה, מחיר + CTA + WhatsApp
2. **Hero** — לוגו, stats badge, כותרת, תת-כותרת, וידאו, CTA
3. **Sales Pitch** — טקסט מכירתי, הבעיה לא אצלך
4. **Deep Problem** — 5 כרטיסיות בעיות עם אייקונים, expandable
5. **Vision** — "תדמיין מצב אחר" בקארד מוזהב
6. **Mindshift** — "הון הוא תוצאה של ניהול" עם אנימציית מעבר
7. **Solution** — 3 שלבים, outcomes, סילבוס אקורדיון
8. **Decision** — "זה בשבילך אם" / "זה לא בשבילך אם"
9. **Mini Close** — "הידע כבר כאן"
10. **Reviews** — featured review + grid 8 ביקורות עם avatars
11. **Pricing** — מחיר, value stack, guarantee, CTA
12. **FAQ** — 12 שאלות בשתי קבוצות עם mid-CTA
13. **Team** — לוגו, stats, פסקאות, 2 מייסדים עם תמונות
14. **Final CTA** — "תתחיל לנהל. תגיד לי שמוכן."
15. **Footer** — מדיניות פרטיות, תנאי שימוש, נגישות (modals)

### Hero
- **רקע:** `#080808`
- **Stats badge:** pill עם border `white/10`, רקע `white/[0.03]`
  - מספרים בירוק: `15,000+` תלמידים · `300+` כיתות · `5+` שנות פעילות
- **Eyebrow:** `white/45`, tracking-wide, uppercase
- **כותרת:** `font-black`, `clamp(2.2rem, 5.5vw, 4.2rem)`
  - שורה 1: לבן
  - שורה 2: gradient זהב (`#F5A624` → `#FFCD6B`)
- **תת-כותרת:** `white/60`, `text-lg/xl/2xl`
- **וידאו:** rounded-2xl, border `white/10`, glassmorphism shadow
  - Mute overlay: שחור 55% + blur, אייקון + טקסט
  - Volume badge: זהב `#F5A624`
- **CTA:** `bg-[#F5A624]`, שחור, `font-black`, `rounded-full`, `cta-shine` animation

### כרטיסיות בעיות (Deep Problem)
- כל כרטיס: `bg-[#111111]`, border `white/8`, hover border `#F5A624/25`
- אייקון Lucide בעיגול זהב `#F5A624/10`
- כותרת: לבן bold
- גוף: `white/55`, `leading-[1.8]`
- Punchline: לבן medium
- Expandable: לחיצה חושפת פרטים נוספים

### Pricing
- כרטיס: `bg-[#0D0B00]`, border `#F5A624/30`, shadow זהב
- Gold top line: gradient
- Launch banner: `#F5A624/10` רקע
- מחיר: gradient זהב, `clamp(3.5rem, 10vw, 5rem)`
- Guarantee: border `#F5A624/25`, רקע `#F5A624/5`, אייקון ShieldCheck

### Reviews
- Featured: border `#F5A624/20`, רקע `#120E00`, radial gradient
- Grid: `bg-[#111111]`, border `white/7`
- Stars: `#F5A624`
- Avatars: עיגול צבעוני עם אות ראשונה, צבעים מתחלפים
- מידע: שם · עיר · שנה

---

## 5. דף צ'קאאוט — `/checkout`

### Layout
- **דסקטופ:** 2 עמודות (3:2), grid `md:grid-cols-5`
  - שמאל (col-span-3): טופס + CTA + מידע
  - ימין (col-span-2): סיכום הזמנה + guarantee
- **מובייל:** עמודה אחת, סיכום למעלה

### Header
- Badge: "גישה מיידית עם אישור התשלום" — זהב, pill
- WhatsApp badge: ירוק, pill, ליד ה-badge
- כותרת: "השלמת רכישה" — `text-3xl/4xl font-black`

### טופס פרטים
- כרטיס: `bg-white/[0.03]`, border `white/8`, rounded-2xl
- Labels: `white/50`, `text-sm`
- Inputs: `bg-white/[0.05]`, border `white/10`, rounded-xl
  - Focus: border `#F5A624/50`, ring `#F5A624/20`
  - Placeholder: `white/20`
- אייקונים: Lucide (User, Mail, Phone, Tag) — `white/20`
- Hints: `white/45`, `text-xs`

### שדות
1. שם מלא * — hint: "שנדע איך לפנות אליך"
2. אימייל * — hint: "לכתובת הזו יישלח הלינק לקורס + חשבונית"
3. טלפון *
4. קוד קופון — שדה + כפתור "החל"
   - מופעל: ירוק `#10B981`, שם קוד + חיסכון + X למחיקה
   - שגיאה: אדום `text-red-400`

### CTA
- "המשך לתשלום — ₪XXX"
- `bg-[#F5A624]`, שחור, `font-black text-xl`, `rounded-2xl`
- `cta-shine` animation
- מחיר דינמי (מתעדכן עם קופון)

### Security badges
- SSL, 256-bit, PCI DSS — `white/40`, `text-[11px]`

### סיכום הזמנה (sidebar)
- כרטיס: `bg-white/[0.03]`, border `white/8`, sticky top-8
- לוגו + שם מוצר + פרטים
- "מה כלול": 5 פריטים עם ✔ ירוק
- מחיר: שווי כולל (line-through) → הנחה (ירוק) → סה"כ (זהב גדול)
- קופון: שורה נוספת בזהב כשמופעל

### Guarantee
- מתחת לסיכום, `flex-1` למתיחה
- Border `#F5A624/10`, רקע `#F5A624/[0.03]`
- אייקון ShieldCheck זהב
- "אחריות מלאה — 7 ימים"

### מה קורה אחרי התשלום
- Border `#10B981/15`, gradient ירוק עדין
- 3 נקודות: מייל, גישה, אפליקציה

### Footer
- DFooter component — modals: מדיניות פרטיות, תנאי שימוש, נגישות
- AccessibilityWidget — כפתור נגישות שמאל למטה

---

## 6. חלונית תשלום (קארדקום)

### עיצוב מותאם (CSS/HTML גרסה 5)
- **רקע:** `#0D1117`
- **3 טאבים:** כרטיס אשראי / Apple Pay / Google Pay
  - Grid 3 עמודות, border `white/8`, active: border `#F5A624`
- **שדות:** rounded-10px, border `white/10`, רקע `white/4%`
- **כפתור שלם:** `#F5A624`, שחור, pill, רוחב מלא
- **Footer:** "התשלום מתבצע באמצעות חברת קארדקום"
- **Security:** SSL, 256-bit, PCI DSS

---

## 7. דף הצלחה — `/checkout/success`

### מבנה
1. לוגו (opacity 60%)
2. עיגול ירוק עם ✓
3. **"תודה רבה!"** — `text-3xl font-black`
4. **"התשלום הצליח"** — ירוק `#10B981`
5. **מספר הזמנה** — זהב, `font-mono font-black text-3xl/4xl`
   - כרטיס: border `#F5A624/20`, רקע `white/[0.04]`
   - כפתור העתקה
   - "שמור מספר זה לכל פנייה עתידית"
6. הסבר מה עכשיו (מייל + לינק)
7. **שיתוף רכישה:**
   - "🎉 אתה חלק מנבחרת המנכ״לים!"
   - כפתור "שתף את הרכישה" — זהב
   - Native share (מובייל) או WhatsApp/X/Facebook/Copy
   - טקסט: "הצטרפתי לנבחרת המנכ״לים של פורשים כנף 🚀"
8. כפתור WhatsApp תמיכה

### Tracking
- Facebook Pixel: `Purchase` event
- GA4: `purchase` event עם transaction_id

---

## 8. דף כישלון — `/checkout/failed`

### מבנה
1. לוגו
2. עיגול אדום עם ✗
3. **"התשלום לא הושלם"** — `text-3xl font-black`
4. "משהו לא עבד. לא נגבה ממך כסף."
5. כפתור "נסה שוב" — זהב, מפנה ל-`/checkout`
6. לינק WhatsApp

---

## 9. דף 404

### מבנה
1. לוגו (opacity 60%)
2. **"שגיאה 404"** — `text-6xl font-black`
3. **"או בתוספת מע״מ — שגיאה 476."** — `text-2xl/3xl white/40`
4. "אופס, כנראה שיש כאן איזשהי שגיאה."
5. כפתור זהב → `porsimkanaf.com/start`
6. לינק חזרה לדף הראשי
7. כפתור WhatsApp

---

## 10. קומפוננטים חוזרים

### CTA Button
```
bg-[#F5A624] text-black font-black rounded-full
hover:scale-105 hover:brightness-110 active:scale-95
cta-shine animation (sweep highlight כל 5 שניות)
```

### WhatsApp Button
```
border border-[#25D366]/20 bg-[#25D366]/[0.06]
hover:bg-[#25D366]/[0.12]
אייקון SVG ירוק + טקסט ירוק bold
```

### כרטיס (Card)
```
rounded-2xl border border-white/8 bg-white/[0.03]
או bg-[#111111] border border-white/7
```

### Input Field
```
rounded-xl bg-white/[0.05] border border-white/10
focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20
text-white placeholder:text-white/20
```

### Section Divider
```
h-px bg-gradient-to-r from-transparent via-[#F5A624]/30 to-transparent
```

---

## 11. אנימציות

| אנימציה | איפה | פרטים |
|---|---|---|
| `cta-shine` | כפתורי CTA | sweep highlight כל 5 שניות |
| `ctaPulse` | כפתורי CTA | glow pulse כל 3 שניות |
| `grain` | overlay על כל הדף | רעש דק, opacity 2.8% |
| `fade-in` | כל section | opacity 0→1, y 20→0 on scroll |
| `scale-in` | וידאו | scale 0.98→1 |

---

## 12. Responsive

### Breakpoints
- **Mobile first** — כל ברירת מחדל מותאמת למובייל
- `md:` (768px+) — שני עמודות, grid layouts
- `xs:` — custom breakpoint לגדלים קטנים

### התאמות מובייל
- Hero: עמודה אחת
- Checkout: סיכום מעל טופס
- Pricing: כרטיס ברוחב מלא
- FAQ: שאלות ברוחב מלא
- Stats badge: גלילה אופקית אם צריך

---

## 13. נגישות

- תוסף נגישות (AccessibilityWidget) — שמאל למטה
- תמיכה בהגדלת טקסט, ניגודיות, גווני אפור, הפוך צבעים
- הדגשת קישורים, כותרות
- עצירת אנימציות
- סמן גדול/בהיר
- קורא מסך

---

## 14. Tracking & Pixels

| כלי | ID | אירועים |
|---|---|---|
| Facebook Pixel | `1075380986890693` | PageView, InitiateCheckout, Purchase |
| Google Analytics | `G-3JL82KJZXN` | begin_checkout, purchase |
| Microsoft Clarity | `w1gn6mbhva` | Heatmaps, recordings |

---

## 15. קבצים חשובים

| קובץ | מה זה |
|---|---|
| `app/globals.css` | CSS גלובלי, אנימציות, typography |
| `lib/content-d.ts` | תוכן (מחירים, טקסטים) |
| `components/n9/` | קומפוננטים של דף נחיתה |
| `components/checkout/` | דף צ'קאאוט |
| `public/logo.png` | לוגו (1684×1684 PNG) |
| `public/video.mov` | וידאו Hero |

# Dashboard Design Guide — פורשים כנף
## מסמך עיצוב למעצב UI/UX

---

## 1. סקירה כללית

**סוג:** דשבורד ניהול פנימי (Admin Panel)
**גישה:** סיסמה בלבד, noindex
**שפה:** עברית (RTL)
**גופן:** Heebo (Google Fonts) — משקלים 400-900
**Framework:** Next.js + Tailwind CSS
**אייקונים:** Lucide React

---

## 2. פלטת צבעים

### רקע
| אלמנט | צבע |
|---|---|
| רקע ראשי | `#0D1117` |
| Top bar | `#080B16` |
| כרטיסים | `rgba(255,255,255,0.03)` — כמעט שקוף |
| טבלאות hover | `rgba(255,255,255,0.02)` |
| Borders | `rgba(255,255,255,0.06)` — עדין מאוד |

### צבעי accent
| שם | קוד | שימוש |
|---|---|---|
| זהב | `#F5A624` | כפתורים ראשיים, tabs פעילים, כותרות, מחיר |
| ירוק | `#10B981` | רכישות, הצלחה, הנחה, סטטוס פעיל |
| כחול | `#3B82F6` | כניסות |
| סגול | `#8B5CF6` | צ'קאאוטים |
| כתום | `#F59E0B` | עמלות |
| אדום | `#EF4444` | שגיאות, מחיקה, מושבת |

### טקסט
| אטימות | שימוש |
|---|---|
| `white` | כותרות, מספרים חשובים |
| `white/80` | שם באתר, top bar |
| `white/50` | labels של שדות |
| `white/45` | טקסט עזר |
| `white/40` | כותרות משנה בטבלאות |
| `white/35` | labels קטנים בכרטיסי סטטיסטיקות |
| `white/30` | מידע שולי, אימייל, טלפון |
| `white/20` | אייקונים, מספרים בטבלה |
| `white/15` | שעות, טקסט רקע |

---

## 3. מבנה הדף

### Top Bar
- **גובה:** ~52px
- **רקע:** `#080B16`
- **Border bottom:** `white/5`
- **תוכן:** כותרת שמאל ("פורשים כנף — דשבורד") + כפתור יציאה ימין
- **Max-width:** 6xl (1152px)

### טאבים (Navigation)
- **מיקום:** מתחת ל-top bar, border bottom `white/5`
- **4 טאבים:** אפיליאייטים | הזמנות | לידים | סטטיסטיקות
- **טאב פעיל:** border-bottom 2px `#F5A624`, טקסט `#F5A624`
- **טאב לא פעיל:** border transparent, טקסט `white/30`, hover `white/50`
- **אייקון:** 15px ליד הטקסט
- **Padding:** `px-5 py-3`
- **Font:** `text-sm font-semibold`

### תוכן ראשי
- **Max-width:** 6xl (1152px)
- **Padding:** `px-4 py-8`

---

## 4. דף Login

### Layout
- מסך מלא, ממורכז אנכית ואופקית
- Max-width: `sm` (384px)

### אלמנטים
1. **כותרת:** "פורשים כנף — דשבורד" — `text-2xl font-black`, ממורכז, `mb-8`
2. **כרטיס:** `bg-white/[0.03]`, border `white/8`, `rounded-2xl`, `p-6`
3. **Label:** "סיסמה" — `white/50 text-sm`
4. **Input:** `rounded-xl`, `bg-white/5`, border `white/10`, focus `#F5A624/50`
5. **שגיאה:** `text-red-400 text-sm`
6. **כפתור:** `bg-[#F5A624]`, שחור, `font-bold`, `rounded-xl`, רוחב מלא

---

## 5. טאב אפיליאייטים

### כרטיסי סטטיסטיקות (Overview)
- **Grid:** 6 עמודות בדסקטופ, 2 במובייל
- **כל כרטיס:**
  - `rounded-xl bg-white/[0.03] border border-white/6 p-3`
  - אייקון Lucide (13px) בצבע ייחודי + label `white/35 text-[10px]`
  - מספר: `text-white font-black text-xl`
- **הכרטיסים:**
  - אפיליאייטים (זהב) | כניסות (כחול) | צ'קאאוטים (סגול) | רכישות (ירוק) | הכנסות (ירוק) | עמלות (כתום)

### כפתור "אפיליאייט חדש"
- `bg-[#F5A624] text-black font-bold text-sm px-4 py-2 rounded-lg`
- אייקון Plus (16px)

### טופס יצירה/עריכה
- **כרטיס:** `rounded-xl bg-white/[0.03] border border-[#F5A624]/20 p-5`
- **כותרת:** + badge מספר אפיליאייט (זהב `font-mono` או אפור "ייווצר אוטומטית")
- **חלוקת סקשנים:**
  - כותרת סקשן: `text-white/30 text-xs font-bold uppercase tracking-wider mb-3`
  - פרטים בסיסיים (4 עמודות): שם, אימייל, טלפון, סטטוס
  - קודים (2 עמודות): קוד הפניה, קוד קופון
  - הנחה ועמלה (2 עמודות): כל אחד במסגרת צבעונית
  - פרטי בנק (3 עמודות): שם בנק, סניף, חשבון
  - הערות (רוחב מלא)

### מסגרת הנחה
- `rounded-xl border-2 border-[#10B981]/25 bg-[#10B981]/[0.04] p-4`
- כותרת: "💰 הנחה ללקוח" — `text-[#10B981] text-sm font-bold`
- שני שדות: אחוזים (%) + סכום (₪) — מסונכרנים
- Labels: "אחוזים" ו-"סכום (מתוך ₪390)"
- סימנים % ו-₪ בצבע ירוק, `text-lg font-black`, מחוץ לשדה

### מסגרת עמלה
- `rounded-xl border-2 border-[#F5A624]/25 bg-[#F5A624]/[0.04] p-4`
- כותרת: "🤝 עמלה לאפיליאייט" — `text-[#F5A624] text-sm font-bold`
- אותו מבנה כמו הנחה, בזהב

### כפתור סטטוס
- Toggle — לחיצה מחליפה
- פעיל: `bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]` — "✓ פעיל"
- מושבת: `bg-red-500/10 border-red-500/25 text-red-400` — "✗ מושבת"

### כרטיס אפיליאייט (ברשימה)
- **פעיל:** `bg-white/[0.03] border-white/6`
- **מושבת:** `bg-red-500/[0.02] border-red-500/10`
- **Layout:** flex, info בימין + stats בשמאל
- **Info:**
  - שורה 1: `#XXXX` (mono, אפור) + שם (bold) + badge סטטוס
  - שורה 2: אימייל · טלפון (`white/30 text-xs`)
  - שורה 3: כפתורי העתקה (לינק + קופון) + אחוזי הנחה/עמלה
  - שורה 4: עריכה + מחיקה (עם אישור)
- **Stats:** 5 מספרים — כניסות, צ'קאאוט, רכישות (ירוק), הכנסות (זהב), עמלה (כתום)

### כפתורי העתקה
- `bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-1.5`
- אייקון Copy (12px) — הופך ל-Check ירוק אחרי העתקה
- "לינק: ?via=code" / "קופון: CODE"

### מחיקה
- לחיצה ראשונה: אייקון Trash2 (12px) `white/30 hover:text-red-400`
- אישור: "למחוק?" + "כן" (אדום bold) + "לא" (`white/30`)

---

## 6. טאב הזמנות

### Header
- כותרת "הזמנות" + כפתור "↓ CSV" + שדה חיפוש

### כפתור CSV
- `text-white/30 text-xs border border-white/10 px-3 py-1 rounded-lg`
- Hover: `text-white/50 border-white/20`

### שדה חיפוש
- `max-w-sm`, `rounded-lg bg-white/5 border border-white/10`
- Placeholder: "חיפוש לפי מס׳ הזמנה, שם, אימייל או טלפון..."

### טבלה
- **Container:** `rounded-xl border border-white/6 overflow-hidden`
- **Header:** `bg-white/[0.03] text-white/40 text-xs`
- **Rows:** `border-t border-white/5`, hover `bg-white/[0.02]`
- **עמודות:** מס׳ הזמנה (זהב mono), שם (לבן bold), אימייל, טלפון, סכום (ירוק bold), קופון, סטטוס (badge), תאריך

### Badges סטטוס
| סטטוס | צבע |
|---|---|
| ממתין לתשלום | `bg-yellow-500/15 text-yellow-400` |
| שולם | `bg-[#10B981]/15 text-[#10B981]` |
| נשלח מייל | `bg-blue-500/15 text-blue-400` |
| נכנס לקורס | `bg-purple-500/15 text-purple-400` |
| הוחזר | `bg-red-500/15 text-red-400` |

### מצב ריק
- אייקון ShoppingCart (48px, opacity 30%)
- "אין הזמנות עדיין" — `white/20 text-lg`

---

## 7. טאב לידים

- זהה להזמנות אבל:
  - כותרת: "לידים (נרשמו ולא שילמו)"
  - עמודות: מס׳, שם, אימייל, טלפון, קופון, תאריך + מחיקה
  - אין עמודת סכום וסטטוס
  - יש כפתור מחיקה (Trash2 + אישור)

---

## 8. טאב סטטיסטיקות

### כרטיסי סיכום
- Grid 5 עמודות בדסקטופ, 2 במובייל
- כל כרטיס: ממורכז, `rounded-xl bg-white/[0.03] border border-white/6 p-3`
- מספר גדול בצבע ייחודי + label `white/30 text-[10px]`

### טבלה
- **Container:** `rounded-xl border border-white/6 overflow-hidden`
- **Header:** `bg-white/[0.03] text-white/40 text-xs`
- **שורת סה"כ:** מיד אחרי ה-header
  - `bg-[#F5A624]/[0.06]`, border-bottom `border-[#F5A624]/20`
  - "סה״כ" בזהב `font-black`
  - מספרים ב-`font-black`
- **עמודות ניתנות למיון:** לחיצה על header → מיון ascending/descending
  - אייקון ChevronUp/Down כשפעיל, ArrowUpDown כשלא
- **עמודות:**
  - #, שם (+ מספר אפיליאייט + קופון), סטטוס, כניסות, צ'קאווט, רכישות, המרה %, הכנסות, הנחה %, עמלה %, עמלה ₪, % עמלה/הכנסה, יעילות

### עמודת יעילות
- **Progress bar:** `w-14 h-2.5 rounded-full bg-white/5`
  - Fill: ירוק (≥70) / זהב (≥40) / אדום (<40)
- **ציון:** `font-black text-sm` בצבע תואם, פורמט `0.XX`
- **Tooltip (hover):**
  - `absolute z-20 top-full mt-2` (תמיד למטה)
  - `bg-[#1a1f2e] border border-white/10 rounded-lg shadow-xl p-3`
  - כותרת: "פירוט ציון יעילות: XX/100 (0.XX)"
  - 5 ציוני משנה: קהל, הכנסות, המרה, עלות, רווח/כניסה — כל אחד XX/100

### נוסחת יעילות
```
5 ציוני משנה (כל אחד 0-100, 50 = ממוצע הקבוצה):
1. קהל = (כניסות שלו / ממוצע כניסות) × 50
2. הכנסות = (הכנסות שלו / ממוצע הכנסות) × 50
3. המרה = (% המרה שלו / ממוצע % המרה) × 50
4. עלות = (ממוצע עמלה / עמלה שלו) × 50 [הפוך — נמוך = טוב]
5. רווח/כניסה = (רווח נקי לכניסה / ממוצע) × 50

ציון סופי = ממוצע 5 הציונים → 0-100 → מנורמל ל-0.00-1.00
```

---

## 9. שדות טופס (כללי)

### Input
```css
width: 100%;
padding: 8px 12px;
border-radius: 8px;
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.10);
color: white;
font-size: 14px;
/* Focus: */
border-color: rgba(245,166,36,0.50);
```

### Label
```css
color: rgba(255,255,255,0.40);
font-size: 12px;
margin-bottom: 4px;
```

### Number inputs
- `appearance: textfield` — ללא חיצי spinner
- `-webkit-inner/outer-spin-button: appearance: none`

---

## 10. Responsive

- **דסקטופ:** Grid layouts, טבלאות מלאות, sidebar stats
- **מובייל:** Grid 1-2 עמודות, טבלאות עם overflow-x-auto
- **Breakpoint:** `md:` (768px)

---

## 11. אינטראקציות

| אלמנט | אינטראקציה |
|---|---|
| כפתור CTA | hover: brightness 110%, scale 1.01 |
| שורת טבלה | hover: `bg-white/[0.02]` |
| כפתור העתקה | click: אייקון Copy → Check (2 שניות) |
| טאב | click: border-bottom זהב, טקסט זהב |
| Badge סטטוס | click: toggle פעיל ↔ מושבת |
| מחיקה | click 1: "כן/לא" | click 2: מוחק |
| Header טבלה | click: מיון ascending ↔ descending |
| Tooltip יעילות | hover: פירוט נפתח למטה |

---

## 12. אבטחה

- Login: סיסמה בצד שרת בלבד (env variable)
- Cookie: httpOnly, 30 ימים
- דף: `noindex, nofollow`
- כל API route בודק auth cookie

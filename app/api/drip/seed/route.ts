import { NextRequest, NextResponse } from 'next/server'
import { saveCampaign } from '@/lib/drip'
import type { DripCampaign } from '@/lib/drip'

const CTA = `<div style="text-align:center;margin:24px 0 8px;">
  <a href="https://digital.porsimkanaf.com/checkout" style="display:inline-block;background:#F5A624;color:#000;font-weight:900;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;">אני רוצה להתחיל</a>
</div>
<p style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin-top:8px;">תשלום חד-פעמי · גישה לכל החיים</p>`

const EMAILS = [
  {
    id: 'email_1',
    subject: 'היי {{name}}, נעים להכיר — אנחנו פורשים כנף',
    delayDays: 1,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">היי {{name}}, שמחים שהגעת אלינו</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אנחנו דקל ואביתר מ״פורשים כנף״. ב-5 השנים האחרונות לימדנו יותר מ-15,000 צעירים וצעירות איך כסף באמת עובד — בבתי ספר, ביחידות צבאיות, ובקורס הדיגיטלי שלנו.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">ראינו מקרוב את הפער: אנשים מבריקים שיוצאים לעולם בלי הכלים הכי בסיסיים בניהול כספים. אף אחד לא לימד אותם לקרוא תלוש שכר, לעמוד מול הבנק, או לבנות עתיד כלכלי.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">בשבועות הקרובים נשלח לך תכנים קצרים שיתנו לך טעימה ממה שאנחנו מלמדים. דברים שאפשר ליישם מיד.</p>
<p style="color:rgba(255,255,255,0.5);font-size:15px;line-height:1.7;margin:0 0 14px;">ואם תרגיש שאתה רוצה את התמונה המלאה — הקורס שלנו מחכה לך:</p>
${CTA}`,
  },
  {
    id: 'email_2',
    subject: '{{name}}, למה בכלל משלמים לך? (זה לא מה שאתה חושב)',
    delayDays: 3,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">למה הבוס שלך משלם לך?</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">רוב האנשים חושבים שמשלמים להם על הזמן שלהם. "עבדתי 8 שעות — מגיע לי כסף."</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אבל האמת? <strong style="color:#fff;">משלמים לך על הערך שאתה מייצר, לא על הזמן שאתה מבזבז.</strong></p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">דוגמה פשוטה: ברמן שמוכר שתייה ב-150₪ בשעה ומקבל 50₪ — הבוס מרוויח עליו 100₪. ולכן משתלם לו להעסיק אותו.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אבל ברמן שמוכר ב-400₪ בשעה? הוא יכול <strong style="color:#F5A624;">לדרוש שכר גבוה יותר</strong> — כי הערך שהוא מייצר גדול יותר.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">השורה התחתונה: <strong style="color:#fff;">ככל שתגדיל ערך ותדע לדרוש — כך יגדל השכר שלך.</strong></p>
<p style="color:rgba(255,255,255,0.45);font-size:14px;margin:0 0 14px;">זה אחד מ-58 שיעורים בקורס. בפנים מחכים גם חמשת הכוחות שקובעים שכר, טיפים למשא ומתן, ועוד הרבה.</p>
${CTA}`,
  },
  {
    id: 'email_3',
    subject: 'מה באמת הולך לך בתלוש שכר?',
    delayDays: 7,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">הברוטו שלך לא שלך</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">קיבלת אי פעם תלוש שכר ותהית לאן נעלם כל הכסף? ברוטו 8,000₪ אבל בחשבון הגיעו 6,200₪?</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">בין הברוטו לנטו יש <strong style="color:#fff;">תחנות</strong> שלוקחות כל אחת את החלק שלה: מס הכנסה, ביטוח לאומי, ביטוח בריאות, הפרשות לפנסיה.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הבעיה? רוב האנשים לא יודעים מה כל סעיף אומר. הם מסתכלים על השורה התחתונה ומקווים לטוב.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#F5A624;">טיפ:</strong> תפתח את התלוש האחרון שלך ותבדוק — האם יש הפרשה לפנסיה? כמה? זה הכסף שבונה לך עתיד בלי שתרגיש.</p>
<p style="color:rgba(255,255,255,0.45);font-size:14px;margin:0 0 14px;">בקורס יש שיעור שלם שמפרק תלוש שכר אמיתי סעיף סעיף — ומסביר בדיוק מה קורה עם כל שקל.</p>
${CTA}`,
  },
  {
    id: 'email_4',
    subject: 'איך הבנק מרוויח ממך (ואתה לא יודע)',
    delayDays: 14,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">הבנק הוא סוחר, לא כספת</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">רוב האנשים חושבים שהבנק שומר להם את הכסף. כאילו זה כספת מפוארת עם לוגו.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">האמת? <strong style="color:#fff;">הבנק לוקח את הכסף שלך, משקיע אותו, מרוויח עליו — ומחזיר לך פירורים.</strong></p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">בנוסף, יש לו שני כלים שעובדים נגדך בשקט: <strong style="color:#F5A624;">מסגרת אשראי</strong> (הלוואה שאתה לא מרגיש) ו<strong style="color:#F5A624;">עמלות</strong> שנאכלות מהחשבון חודש אחרי חודש.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הדבר הראשון שמנכ"ל פיננסי עושה? מפסיק להיות לקוח פסיבי של הבנק ומתחיל לנהל את הכסף שלו בעצמו.</p>
${CTA}`,
  },
  {
    id: 'email_5',
    subject: 'הגנב השקט שאוכל לך את הכסף',
    delayDays: 21,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">מכירים את האינפלציה?</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">נניח ששמת 10,000₪ מתחת לבלטה. עבר שנה. הכסף עדיין שם — 10,000₪ בדיוק.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אבל הפיצה ששילמת עליה 50₪ עכשיו עולה 55₪. הדלק עלה. השכירות עלתה.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">הכסף שלך לא זז — אבל הוא שווה פחות.</strong> זה האינפלציה. הגנב השקט.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">ב-3% אינפלציה בשנה, תוך 10 שנים הכסף שלך מאבד <strong style="color:#F5A624;">כמעט שליש</strong> מהערך שלו. בלי שמישהו נגע בו.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הפתרון? ללמוד איך לגרום לכסף לעבוד בשבילך — במקום לשכב ולהתכווץ.</p>
${CTA}`,
  },
  {
    id: 'email_6',
    subject: 'ריבית דריבית — הקסם שאף אחד לא מלמד',
    delayDays: 28,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">הכוח הכי חזק בכלכלה</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אלברט איינשטיין קרא לזה "הפלא השמיני של העולם". אנחנו קוראים לזה <strong style="color:#F5A624;">ריבית דריבית</strong>.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הרעיון פשוט: כשאתה מרוויח ריבית — הריבית עצמה מתחילה להרוויח ריבית. זה כמו כדור שלג שמתגלגל ורק גדל.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">דוגמה: אם תשקיע 500₪ בחודש מגיל 22 עם תשואה ממוצעת של 7%, בגיל 40 יהיה לך <strong style="color:#fff;">כמעט 250,000₪</strong>. השקעת 108,000₪ — השאר זה ריבית על ריבית.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">המפתח? <strong style="color:#F5A624;">להתחיל מוקדם.</strong> גם סכום קטן. הזמן עושה את העבודה.</p>
${CTA}`,
  },
  {
    id: 'email_7',
    subject: 'מניות, מדדים, קרנות — בהסבר של בן אדם',
    delayDays: 35,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">שוק ההון הוא לא קזינו</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הרבה אנשים שומעים "שוק ההון" וחושבים על סוחרים בחליפות שצורחים מול מסכים. אבל האמת הרבה יותר פשוטה.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">מניה</strong> = חלק קטן מחברה. קנית מניה של אפל? יש לך חתיכה קטנטנה מאפל.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">מדד</strong> = סל של הרבה מניות ביחד. במקום לבחור חברה אחת — אתה קונה את כולן. פיזור = פחות סיכון.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">קרן סל (ETF)</strong> = הדרך הכי פשוטה להשקיע במדד. קונים אותה כמו מניה, אבל בפנים יש עשרות או מאות חברות.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">ההבדל בין משקיע למהמר? <strong style="color:#F5A624;">משקיע לומד לפני שהוא שם כסף.</strong></p>
${CTA}`,
  },
  {
    id: 'email_8',
    subject: 'הנוסחה שתשנה לך את החיים (רצינו)',
    delayDays: 42,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">נוסחת הזהב לניהול כסף</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">יש נוסחה אחת פשוטה שאם תיישם — היא תשנה לך את המצב הכלכלי תוך חודשים:</p>
<p style="text-align:center;color:#F5A624;font-size:24px;font-weight:900;margin:20px 0;letter-spacing:1px;">הכנסה – חיסכון = הוצאות</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">שים לב — לא "הכנסה פחות הוצאות שווה חיסכון". <strong style="color:#fff;">החיסכון בא ראשון.</strong></p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">ברגע שהמשכורת נכנסת — 10%-20% עוברים אוטומטית לחיסכון/השקעה. מה שנשאר — זה מה שיש לך להוציא.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">רוב האנשים עושים הפוך: מוציאים קודם ו"מקווים" שישאר משהו. זה אף פעם לא עובד.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#F5A624;">תתחיל מ-10% החודש.</strong> גם אם זה 300₪. תודה לעצמך בעוד שנה.</p>
${CTA}`,
  },
  {
    id: 'email_9',
    subject: 'הכסף ששוכב על הרצפה ומחכה לך',
    delayDays: 49,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">יש לך כסף שאתה לא יודע עליו</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">ידעת שכל שנה אלפי ישראלים מפספסים <strong style="color:#F5A624;">החזרי מס</strong> שמגיעים להם? פשוט כי הם לא יודעים לבקש.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">נקודות זיכוי, החזרים על קופות גמל, הטבות לחיילים משוחררים, סטודנטים, תושבי פריפריה — יש המון כסף שפשוט שוכב ומחכה שתבוא לקחת.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">טיפ מיידי:</strong> נכנסים לאתר רשות המסים, מגישים טופס 135, ובודקים אם מגיע לכם החזר על 6 שנים אחורה. הרבה פעמים מדובר באלפי שקלים.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">בקורס יש שיעור שלם על "מפת האוצר" — כל ההטבות, הפטורים והכסף שאתה משאיר על השולחן.</p>
${CTA}`,
  },
  {
    id: 'email_10',
    subject: 'המוח שלך עובד נגדך (בכל מה שקשור לכסף)',
    delayDays: 56,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">הבאגים של המוח</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">המוח שלך לא מתוכנת לניהול כסף. הוא מתוכנת להישרדות. ויש לו באגים שעולים לך ביוקר:</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">אפקט ההמשכיות:</strong> "אני עתידי כבר יסתדר" — אז אתה דוחה חיסכון להיום. העתידי שלך חושב בדיוק אותו דבר. וככה עוברות שנים.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">אפקט הקזינו:</strong> הפסדת? המוח אומר "שים עוד, תחזיר את ההפסד". זה בדיוק מה שהקזינו רוצה שתעשה.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הצעד הראשון לשליטה פיננסית? <strong style="color:#F5A624;">להכיר את הבאגים שלך.</strong> ברגע שאתה מזהה אותם — אתה מפסיק ליפול בהם.</p>
${CTA}`,
  },
  {
    id: 'email_11',
    subject: 'משכנתא — מה שחייבים לדעת לפני שחותמים',
    delayDays: 63,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">נדל"ן זה לא רק "לקנות דירה"</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">כולם אומרים "תקנה דירה, זו ההשקעה הכי טובה". אבל אף אחד לא מסביר מה זה באמת אומר.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#fff;">משכנתא = מינוף.</strong> אתה שם 500,000₪ מהכיס, הבנק שם 1,500,000₪, וביחד קונים דירה ב-2,000,000₪. אם הדירה עולה 10% — הרווחת 200,000₪ על השקעה של 500,000₪. תשואה של 40%.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אבל <strong style="color:#F5A624;">מינוף עובד גם הפוך.</strong> אם הדירה יורדת 10% — הפסדת 40% מהכסף שלך.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">לפני שקונים דירה צריך להבין: מסלולי משכנתא, ריבית קבועה מול משתנה, תקופת ההחזר, ומה קורה אם הריבית עולה.</p>
<p style="color:rgba(255,255,255,0.45);font-size:14px;margin:0 0 14px;">בקורס יש פרק שלם על נדל"ן — עם אזהרות מהזדמנויות שנראות טוב מדי.</p>
${CTA}`,
  },
  {
    id: 'email_12',
    subject: '{{name}}, הגיע הזמן להפסיק לנחש',
    delayDays: 70,
    active: true,
    body: `<h2 style="color:#F5A624;font-size:22px;margin:0 0 16px;">12 שבועות. 12 אימיילים. עכשיו הכדור אצלך.</h2>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">{{name}}, בשבועות האחרונים שלחנו לך טעימות מעולם הכסף — שכר, מיסים, בנקים, השקעות, פסיכולוגיה, נדל"ן.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">אבל טעימות זה לא ארוחה. וכסף זה לא משהו שאפשר להבין "בערך".</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">הקורס שלנו הוא 58 שיעורים, 3 שעות, מא׳ עד ת׳. בסופו תבין כסף יותר טוב מ-97% מהאנשים סביבך. וזה לא הבטחה — זה מה ש-15,000 תלמידים כבר חוו.</p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;"><strong style="color:#F5A624;">₪390. תשלום חד-פעמי. גישה לכל החיים. אחריות מלאה 7 ימים.</strong></p>
<p style="color:rgba(255,255,255,0.65);font-size:16px;line-height:1.8;margin:0 0 14px;">מפסיקים לנחש. מתחילים לשלוט.</p>
${CTA}`,
  },
]

// Seed endpoint — run once to populate campaign
export async function GET(req: NextRequest) {
  const dashCookie = req.cookies.get('dash_auth')?.value
  if (dashCookie !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const campaign: DripCampaign = {
    id: 'main',
    name: 'סדרת אימיילים — לידים שלא רכשו',
    emails: EMAILS,
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await saveCampaign(campaign)

  return NextResponse.json({ ok: true, emailCount: EMAILS.length })
}

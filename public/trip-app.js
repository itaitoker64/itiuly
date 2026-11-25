/* =========================================================
   CONSTANTS
========================================================= */
const CATEGORIES = [
  {id:'cafe', label:'בתי קפה', icon:'☕'},
  {id:'food', label:'מסעדות', icon:'🍜'},
  {id:'yoga', label:'יוגה / פילאטיס / וולנס', icon:'🧘🏼\u200d♀️'},
  {id:'surf', label:'גלישה וספורט', icon:'🏄\u200d♀️'},
  {id:'nature', label:'טבע', icon:'🌿'},
  {id:'beach', label:'חופים', icon:'🏖️'},
  {id:'view', label:'תצפיות', icon:'🌅'},
  {id:'spa', label:'ספא ומסאז\u05f3', icon:'💆🏼\u200d♀️'},
  {id:'shopping', label:'שווקים וקניות', icon:'🛍️'},
  {id:'nightlife', label:'חיי לילה', icon:'🎉'},
  {id:'attraction', label:'אטרקציות', icon:'🏛️'},
  {id:'stay', label:'לינה מעניינת', icon:'🏡'},
  {id:'other', label:'אחר', icon:'📌'}
];
function catInfo(id){ return CATEGORIES.find(c=>c.id===id) || CATEGORIES[CATEGORIES.length-1]; }

const STATUS_OPTIONS = [
  {id:'want', label:'רוצה להגיע', icon:'❤️'},
  {id:'must', label:'חובה', icon:'⭐'},
  {id:'been', label:'הייתי', icon:'✓'},
  {id:'skip', label:'לוותר', icon:'✕'}
];
function statusInfo(id){ return STATUS_OPTIONS.find(s=>s.id===id) || STATUS_OPTIONS[0]; }
const PRIORITY_OPTIONS = ['גבוהה','בינונית','נמוכה'];

const EXPENSE_CATEGORIES = [
  {id:'accommodation',label:'לינה'},{id:'food',label:'אוכל'},{id:'transport',label:'תחבורה'},
  {id:'flights',label:'טיסות'},{id:'activities',label:'אטרקציות'},{id:'shopping',label:'קניות'},
  {id:'visasInsurance',label:'ביטוח/ויזות'},{id:'other',label:'שונות'}
];
function expCatLabel(id){ const f=EXPENSE_CATEGORIES.find(c=>c.id===id); return f?f.label:'שונות'; }

const COLOR_CHOICES = ['#C97B5A','#6F8F6A','#6E88A0','#C9A24C','#8C6FA0','#4E8B8B','#B97A85','#8A8F5C'];

/* =========================================================
   SEED DATA
========================================================= */
function uid(p){ return (p||'id')+'_'+Math.random().toString(36).slice(2,9); }

function defaultBudget(){ return {accommodation:0,food:0,transport:0,flights:0,activities:0,shopping:0,visasInsurance:0,other:0}; }

/** רשימת הציוד של איתי — שבועיים בלבד, עם אימוני מואיי תאי בקו יאו נוי */
function itaiPacking(){
  const list = [
    ["👕 בגדים", ["5 חולצות קלילות","2 מכנסיים קצרים","מכנס ארוך דק","2 סטים לאימון — מכנס ורשת","7 תחתונים","4 זוגות גרביים","בגד ים","חולצה ארוכה דקה לערב ולמקדשים","כובע","שק כביסה"]],
    ["🥊 מואיי תאי", ["מגן שיניים — לקנות בארץ","כפפות 12–14 oz (או לשכור במחנה)","תחבושות ידיים — 2 זוגות","מגן מפשעה","קרם לשפשופים","סנדלים לחדר האימון"]],
    ["👟 נעליים", ["נעלי ספורט","סנדלים נוחים","כפכפים"]],
    ["🩹 עזרה ראשונה", ["פלסטרים ופלסטרים לשלפוחיות","חומר חיטוי","משכך כאבים","תרופה לשלשול","ORS מלחים","אנטיהיסטמין","דוחה יתושים","קרם לעקיצות","משחה לשרירים"]],
    ["🧴 רחצה", ["שקית רחצה","מברשת ומשחת שיניים","דאודורנט","שמפו וסבון קטנים","קרם הגנה SPF 50","סכין גילוח","מגבת מיקרופייבר"]],
    ["📱 אלקטרוניקה", ["טלפון","מטען וכבל נוסף","Power Bank","מתאם חשמל אוניברסלי","אוזניות","AirTag לתיק"]],
    ["🪪 מסמכים וכסף", ["דרכון — תוקף 6+ חודשים","צילום דרכון + עותק בענן","TDAC — להגיש 72 שעות לפני","כרטיס אשראי + כרטיס גיבוי בנפרד","מזומן חירום","ביטוח נסיעות שמכסה ספורט מגע","רישיון בינלאומי 1949 — אם רוכבים על קטנוע"]],
    ["🧳 ציוד", ["Packing Cubes","מנעול קטן","Dry Bag לסירות","תיק יום","בקבוק מים","שקיות Ziplock"]]
  ];
  const out = [];
  list.forEach(([category, items])=>items.forEach(item=>{
    out.push({id:uid('p'), owner:"itai", category, item, status:"need", quantity:"", notes:""});
  }));
  return out;
}

/*
 * רשימת הקניות האמיתית.
 *
 * רשימת הציוד נולדה כשכל פריט מסומן "לקנות", מה שהפך אותה לחסרת שימוש —
 * היא אמרה לקנות דרכון, טלפון וגרביים. כאן כתוב מה באמת צריך לקנות, איפה
 * כדאי לקנות אותו ובכמה; כל מה שלא מופיע כאן הוא משהו שכבר יש בבית וצריך
 * רק לארוז.
 *
 * buyIn:'il' — המחיר בשקלים · buyIn:'th' — המחיר בבאט.
 * optional — נחמד שיהיה, לא נספר בסכום.
 *
 * ההיגיון בחלוקה: בארץ קונים מה שחייב התאמה אישית (מגן שיניים), מה שלא
 * מוכרים שם (טמפונים, קרם הגנה שאינו מלבין), ומה שצריך להיות ביד ברגע
 * הנחיתה. בתאילנד קונים את כל ציוד המואיי תאי — משם הוא מגיע מלכתחילה,
 * והוא עולה שם שליש — ואת כל הנוזלים, כדי לא לסחוב אותם.
 */
const SHOPPING = {
  itai: {
    /* בארץ */
    "מגן שיניים — לקנות בארץ": {buyIn:'il', cost:90,
      notes:"מסוג שמרתיחים ונושכים, מחנות ספורט או בית מרקחת. לא לקנות שם — התאמה והיגיינה"},
    "ביטוח נסיעות שמכסה ספורט מגע": {buyIn:'il', cost:280,
      notes:"מואיי תאי הוא ספורט מגע — פוליסה רגילה מחריגה אותו. לוודא שכתוב במפורש, וגם רכיבה על קטנוע"},
    "רישיון בינלאומי 1949 — אם רוכבים על קטנוע": {buyIn:'il', cost:75,
      notes:"ממס״י או מזהב, אמנת 1949 דווקא. בלי זה גם הביטוח לא תקף אם קורה משהו על הקטנוע"},
    "קרם הגנה SPF 50": {buyIn:'il', cost:60,
      notes:"לקנות כאן — כמעט כל קרמי ההגנה בתאילנד הם מסוג whitening"},
    "מתאם חשמל אוניברסלי": {buyIn:'il', cost:30,
      notes:"התקע הישראלי לא נכנס לשקע התאילנדי. שם השקעים מקבלים שני פינים שטוחים או עגולים"},
    "פלסטרים ופלסטרים לשלפוחיות": {buyIn:'il', cost:35, notes:"שלפוחיות מגיעות מהסנדלים ומהחבלים על הרגליים"},
    "חומר חיטוי": {buyIn:'il', cost:20, notes:"שפשופים מהשק ומהרינג נפתחים מהר בלחות"},
    "משכך כאבים": {buyIn:'il', cost:25},
    "תרופה לשלשול": {buyIn:'il', cost:35, notes:"שיהיה ביד ביום הראשון, לא למצוא בית מרקחת ב-03:00"},
    "ORS מלחים": {buyIn:'il', cost:25, notes:"אחרי אימון בחום ואחרי קלקול קיבה — זה מה שמחזיר לתפקוד"},
    "אנטיהיסטמין": {buyIn:'il', cost:30},
    "AirTag לתיק": {buyIn:'il', cost:130, optional:true, notes:"5 מעברים בין יעדים ושתי סירות — שווה לדעת איפה התיק"},
    "Packing Cubes": {buyIn:'il', cost:90, optional:true},

    /* בתאילנד */
    "תחבושות ידיים — 2 זוגות": {buyIn:'th', cost:300,
      notes:"Fairtex או Twins, 4.5 מטר · ฿150 לזוג ב-MBK · בארץ פי שלושה"},
    "כפפות 12–14 oz (או לשכור במחנה)": {buyIn:'th', cost:1500, optional:true,
      notes:"המחנה משאיל, אז זה לא חובה. אם כן — Fairtex/Twins בבנגקוק, ฿1,200–1,800, כחצי מהמחיר בארץ"},
    "מגן מפשעה": {buyIn:'th', cost:500, notes:"קונים יחד עם הכפפות, אותה חנות"},
    "2 סטים לאימון — מכנס ורשת": {buyIn:'th', cost:800,
      notes:"מכנסי מואיי תאי ฿300–450 לזוג · משם הם מגיעים בכלל, וזה חצי מהמחיר בארץ"},
    "משחה לשרירים": {buyIn:'th', cost:80,
      notes:"Namman Muay — שמן המואיי תאי התאילנדי. כל בית מרקחת, ฿60–100"},
    "קרם לשפשופים": {buyIn:'th', cost:60, notes:"וזלין פשוט מ-7-Eleven"},
    "דוחה יתושים": {buyIn:'th', cost:80, notes:"Sketolene או Soffell — חזק וזול יותר מכל מה שיש בארץ"},
    "קרם לעקיצות": {buyIn:'th', cost:60},
    "Dry Bag לסירות": {buyIn:'th', cost:250,
      notes:"כל דוכן ליד רציף · לספידבוט לקו יאו נוי, לסימילן ולקאו סוק"},
    "כפכפים": {buyIn:'th', cost:150, notes:"฿100–200 בכל שוק — ואפשר לזרוק בסוף"},
    "סנדלים לחדר האימון": {buyIn:'th', cost:150, notes:"מתאמנים יחפים; אלה בשביל הדרך לרינג ובחזרה"},
    "שק כביסה": {buyIn:'th', cost:60},
    "בקבוק מים": {buyIn:'th', cost:60}
  },

  talia: {
    /* בארץ */
    "תרופות למיגרנה": {buyIn:'il', cost:80,
      notes:"כמות לכל התקופה ולא רק לשבועיים — את ממשיכה לפאי ולסרי לנקה עד ינואר"},
    "מרשם / מכתב רפואי באנגלית לתרופות מרשם, במידת הצורך": {buyIn:'il', cost:0,
      notes:"מהרופא, בלי עלות — ומונע בעיה גם בבידוק וגם בבית מרקחת שם"},
    "תרופה לבחילות / מחלת נסיעה": {buyIn:'il', cost:40,
      notes:"במסלול יש ספידבוט לקו יאו נוי, סירה לריילאי ויום שלם בסימילן"},
    "מוצרי מחזור": {buyIn:'il', cost:80,
      notes:"טמפונים כמעט לא נמכרים בתאילנד — שם זה כמעט רק פדים. להביא לכל התקופה"},
    "קרם הגנה SPF 50 לפנים ולגוף": {buyIn:'il', cost:80,
      notes:"לקנות כאן — כמעט כל קרמי ההגנה בתאילנד הם מסוג whitening"},
    "ביטוח נסיעות + פרטי הפוליסה": {buyIn:'il', cost:600,
      notes:"טיול ארוך, לא שבועיים. לוודא כיסוי ליוגה, לקטנוע ולספורט מים, ולהאריך מפאי"},
    "רישיון נהיגה בינלאומי": {buyIn:'il', cost:75, notes:"אמנת 1949"},
    "תיק יום Osprey Daylite Plus 20L – זה שבחרנו": {buyIn:'il', cost:250},
    "3–4 Packing Cubes": {buyIn:'il', cost:90},
    "כיסוי גשם למוצ'ילה": {buyIn:'il', cost:60},
    "כרית צוואר קומפקטית / מתנפחת": {buyIn:'il', cost:70},
    "אטמי אוזניים – 2–3 זוגות": {buyIn:'il', cost:40},
    "מסכת עיניים טובה": {buyIn:'il', cost:40},
    "אוזניות Noise Cancelling": {buyIn:'il', cost:250, optional:true},
    "פנס ראש קטן": {buyIn:'il', cost:60},
    "מגבת מיקרופייבר": {buyIn:'il', cost:50},
    "כמה תמונות פספורט": {buyIn:'il', cost:30,
      notes:"להארכת שהייה ולוויזות בהמשך — קורס היוגה בפאי עלול לבקש"},
    "פלסטרים": {buyIn:'il', cost:25},
    "פלסטרים לשלפוחיות": {buyIn:'il', cost:30},
    "חומר חיטוי קטן": {buyIn:'il', cost:20},
    "משכך כאבים": {buyIn:'il', cost:25},
    "תרופה לשלשול": {buyIn:'il', cost:35},
    "ORS / מלחים להחזרת נוזלים": {buyIn:'il', cost:25},
    "אנטיהיסטמין": {buyIn:'il', cost:30},
    "שקיות הקאה קטנות": {buyIn:'il', cost:15},

    /* בתאילנד */
    "סרונג": {buyIn:'th', cost:150,
      notes:"בכל שוק · משמש כמגבת, כשמיכה במטוס וככיסוי כתפיים במקדש"},
    "כפכפים": {buyIn:'th', cost:150},
    "שמפו קטן": {buyIn:'th', cost:80, notes:"לא לסחוב נוזלים — 7-Eleven בכל פינה"},
    "מרכך קטן": {buyIn:'th', cost:80},
    "סבון": {buyIn:'th', cost:40},
    "דוחה יתושים": {buyIn:'th', cost:80, notes:"Sketolene או Soffell"},
    "קרם להרגעת עקיצות": {buyIn:'th', cost:60},
    "מגבונים קטנים": {buyIn:'th', cost:40},
    "גליל נייר טואלט קטן / טישו": {buyIn:'th', cost:30},
    "Dry Bag קטן": {buyIn:'th', cost:250},
    "חבל כביסה קטן + אטבים": {buyIn:'th', cost:60},
    "שקית בד מתקפלת": {buyIn:'th', cost:50},
    "בקבוק מים רב־פעמי": {buyIn:'th', cost:80},
    "4–5 סטים של בגדי ספורט / יוגה": {buyIn:'th', cost:1000, optional:true,
      notes:"בגדי יוגה זולים שם. להביא 2 מהארץ ולהשלים בצ׳יאנג מאי או בפאי"},
    "ספר לקריאה": {buyIn:'th', cost:0, optional:true,
      notes:"החלפות ספרים בפאי ובצ׳יאנג מאי — אין סיבה לסחוב"}
  }
};

/*
 * פריטים שאינם קנייה ואינם משהו שכבר יש בבית — הם משימות. נשארים
 * מסומנים כפתוחים ברשימת הציוד, אבל לא נכנסים לרשימת הקניות.
 */
const PACKING_TASKS = new Set([
  "דרכון — תוקף 6+ חודשים","צילום דרכון + עותק בענן","TDAC — להגיש 72 שעות לפני",
  "כרטיס אשראי + כרטיס גיבוי בנפרד","מזומן חירום",
  "צילום דרכון","עותק דיגיטלי של הדרכון בענן","כרטיס אשראי נוסף – לשמור בנפרד",
  "מסמכים רפואיים רלוונטיים","תרופות קבועות + ספייר"
]);

/**
 * מחיל את רשימת הקניות על רשימת הציוד: מה לקנות, איפה ובכמה, וכל השאר
 * מסומן כמשהו שכבר יש. `respectEdits` משאיר בלי נגיעה פריטים שנערכו ידנית.
 */
function applyShopping(list, respectEdits){
  list.forEach(p=>{
    const info = (SHOPPING[p.owner] || {})[p.item];
    if(info){
      p.buyIn = info.buyIn;
      p.cost = info.cost;
      p.optional = !!info.optional;
      if(info.quantity && !p.quantity) p.quantity = info.quantity;
      if(info.notes && !p.notes) p.notes = info.notes;
      return;   // סטטוס לא נוגעים בו — "יש כבר" כאן פירושו שכבר נקנה
    }
    p.buyIn = '';
    p.cost = 0;
    p.optional = false;
    // כל מה שאינו קנייה ואינו משימה — כבר יש בבית, רק לארוז
    const stillDefault = !respectEdits || (p.status === 'need' && !p.notes && !p.quantity);
    if(stillDefault && !PACKING_TASKS.has(p.item)) p.status = 'have';
  });
  return list;
}


// Confirmed by email, including the correction from ฿14,580 to ฿12,150.
function kynPackageExpense(){
  return {id:'x_kyn_package_2026', bookingKey:'kyn-2026-11', date:'2026-11-26',
    title:'KYN Phoenix · Sea House Room, ארוחות ואימונים לשניים · 3 לילות',
    category:'accommodation', amount:12150, currency:'THB', paidBy:'itai',
    split:'ratio', status:'due', note:"฿12,150 לכל השהייה — המחנה אישר וגם תיקן: ฿14,580 היה תעריף הדירה הפנורמית. מקדמה 50% (฿6,075) ב-Wise, היתרה ฿6,075 במזומן בהגעה; אין כרטיסי אשראי ואין העברות במקום. ביום ראשון אין אימונים ואין הגשת אוכל. הסכום כולו מסווג כלינה כחבילה; אין להוסיף את הארוחות והאימונים הכלולים שוב. איתי מסומן כמשלם מתוכנן לפי ברירת המחדל וניתן לשנות."};
}

// Only replace fields that still match the previous seed. User edits and done flags survive.
const KYN_PREVIOUS_FIELDS = {
  "s_4_8": {
    "act": "הסעה מהרציף למחנה",
    "notes": "לסכם עם המחנה מראש"
  },
  "s_4_9": {
    "status": "להזמין",
    "notes": "מקדמה 50% שאינה מוחזרת"
  },
  "s_4_10": {
    "baht": 350,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_4_11": {
    "notes": "חמש שעות עד האימון — תנצלו אותן"
  },
  "s_4_12": {
    "baht": 850,
    "status": "להזמין",
    "notes": "את החזק עושים מחר בבוקר"
  },
  "s_4_13": {
    "baht": 350,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_4_14": {
    "act": "לינה — Panoramic Sunset View Apartment",
    "baht": 3800,
    "status": "להזמין",
    "notes": "לשאול על חבילה שכוללת חדר, ארוחות ואימונים — ואם ฿3,800 הוא לחדר או לאדם"
  },
  "s_5_0": {
    "baht": 150,
    "status": "משלמים במקום",
    "notes": "לא לאכול כבד לפני אימון"
  },
  "s_5_1": {
    "time": "07:30",
    "baht": 850,
    "status": "משלמים במקום",
    "notes": "฿400–500 לאימון · חבילות רב-יומיות זולות יותר"
  },
  "s_5_2": {
    "time": "09:45",
    "dur": "0:45",
    "baht": 300,
    "status": "משלמים במקום",
    "notes": "שני אימונים ביום = 1,400–1,800 קלוריות מעל הרגיל. לא לרוץ בגירעון"
  },
  "s_5_3": {
    "status": "משלמים במקום",
    "notes": "בדרך כלל כלול"
  },
  "s_5_4": {
    "notes": ""
  },
  "s_5_6": {
    "time": "16:00",
    "baht": 850,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_5_7": {
    "time": "18:30",
    "baht": 400,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_5_8": {
    "act": "לינה — Panoramic Sunset View Apartment",
    "baht": 3800,
    "status": "להזמין",
    "notes": ""
  },
  "s_6_0": {
    "baht": 150,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_6_1": {
    "time": "07:30",
    "baht": 850,
    "status": "משלמים במקום",
    "notes": "אחה״צ חופשי — יוצאים למפרץ"
  },
  "s_6_2": {
    "time": "09:45",
    "dur": "0:45",
    "baht": 300,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_6_3": {
    "notes": ""
  },
  "s_6_7": {
    "notes": ""
  },
  "s_6_9": {
    "act": "לינה — Panoramic Sunset View Apartment",
    "baht": 3800,
    "status": "להזמין",
    "notes": ""
  },
  "s_7_0": {
    "baht": 150,
    "status": "משלמים במקום",
    "notes": ""
  },
  "s_7_1": {
    "time": "07:30",
    "baht": 850,
    "status": "משלמים במקום",
    "notes": "אם הרגליים מרשות"
  },
  "s_7_2": {
    "time": "09:45",
    "dur": "0:45",
    "notes": ""
  },
  "s_7_3": {
    "act": "הסעה לרציף",
    "notes": ""
  }
};
function migrateKynBooking(){
  const seed = window.SHARED_SEED;
  if(!seed || !STATE.shared) return;
  const clone = value=>JSON.parse(JSON.stringify(value));
  const seedRows = new Map(seed.days.flatMap(d=>d.rows).map(r=>[r.id,r]));
  STATE.shared.days.forEach(day=>day.rows.forEach(row=>{
    const before = KYN_PREVIOUS_FIELDS[row.id], next = seedRows.get(row.id);
    if(!before || !next) return;
    Object.keys(before).forEach(key=>{
      if((row[key] ?? null) === before[key]) row[key] = next[key];
      else if(key==='notes' && !String(row.notes||'').includes(next.notes))
        row.notes = [row.notes,next.notes].filter(Boolean).join(' · ');
    });
  }));
  for(const key of ['bookings','info']){
    if(!STATE.shared[key]) STATE.shared[key]=[];
    const item = key==='bookings' ? seed.bookings.find(b=>b.id==='kyn-2026-11') : seed.info.find(i=>i.topic==='KYN · פרטי המחנה');
    if(item && !STATE.shared[key].some(x=>key==='bookings' ? x.id===item.id || /KYN/i.test(x.what||'') : x.topic===item.topic)) STATE.shared[key].push(clone(item));
  }
  const oldHotel = {"dest":"קו יאו נוי","dates":"26–29/11","nights":3,"hotel":"Panoramic Sunset View · KYN Phoenix","what":"המחנה עצמו. מי שלא מתאכסן אצלם מקבל שיעורים פרטיים בלבד — זה ההבדל המהותי.","perNight":3800,"choice":"הבחירה","freeCancel":"אין — מקדמה 50%","link":"בוקינג","linkLink":"https://www.phuket-krabi-muaythai.com/prices-accomodation/"};
  const newHotel = seed.hotels.find(h=>h.hotel===oldHotel.hotel);
  const hotel = (STATE.shared.hotels||[]).find(h=>h.hotel===oldHotel.hotel);
  if(hotel && newHotel) Object.keys(newHotel).forEach(key=>{ if(hotel[key]===oldHotel[key]) hotel[key]=newHotel[key]; });
  const dest = STATE.countries.flatMap(c=>c.destinations).find(d=>d.name==='קו יאו נוי — מחנה מואיי תאי');
  if(dest && !String(dest.notes||'').includes("אושר מול המחנה")) dest.notes = [dest.notes,"אושר מול המחנה · Sea House Room לשניים · ฿12,150 לכל השהייה, כולל חדר, ארוחות ואימוני קבוצה. ביום ראשון אין אימונים ואין הגשת אוכל. מקדמה 50% (฿6,075) ב-Wise, היתרה במזומן בהגעה. המחיר תוקן מ-฿14,580 שהיה תעריף הדירה הפנורמית. המחנה אישר אימוני קבוצה ב-08:00 וב-17:00; ביום ההגעה אימון טכניקה ב-16:00. להביא תחבושות ידיים ומגני שיניים; כפפות זמינות להשאלה."].filter(Boolean).join(' · ');
  if(!STATE.money.expenses.some(x=>x.bookingKey==='kyn-2026-11' || /KYN|Phoenix|Panoramic Sunset/i.test(x.title||''))) STATE.money.expenses.push(kynPackageExpense());
  STATE.schema=6;
}

/*
 * המשימות של המסלול: צ׳יאנג מאי בהתחלה, לילה רביעי באאו נאנג, שני לילות בקאו
 * סוק, שלושה בקאו לאק ושניים בבנגקוק בסוף — ביחד עד 10/12.
 */
const KALIMA_NOTE = "6–9/12 · Deluxe Pool Access · אישור 7195273990380466772 · שולם $621.21 · לא מוחזר · בלי ארוחת בוקר (฿600 לאדם במלון) · 5/12 בהזמנה ישירה נפרדת · ההזמנה הקודמת (5770154448, 2–8/12) בוטלה בחינם";
const KALIMA_EXTRA_NOTE = "אושר מול המלון במייל, 5/11 · ฿8,800 כולל ארוחת בוקר · לא מוחזר · נשאר: לשלם בלינק של KBank ששלחו, ולשלוח אסמכתא ל-rsvn.khaolak@kalimaresort.com · ביקשנו אותו חדר לכל 5–9/12, בכפוף לזמינות";
const KALIMA_EXTRA_EXPENSE = () => ({id:uid('x'), date:"2026-11-05", title:"קלימה · לילה נוסף 5/12", category:"accommodation",
  amount:8800, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"הזמנה ישירה מול המלון (Lyla) · Deluxe Pool Access, כולל ארוחת בוקר · שולם בלינק של KBank · לא מוחזר"});
const ISB_NOTE = "25/11, 10:30 · isbalum@isb.ac.th, לפחות יומיים מראש, תעודה מזהה בשער";

/*
 * 12/11: ההזמנות של היום. ASAI בצ׳יינטאון במקום מונטראג׳, VietJet (MSR6JW)
 * לפוקט וחזרה במקום TG203, COSI במקום צ׳רמנטרה, River Lodge ל-3/12 ולילה על
 * האגם ב-4/12, ו-Eleven ל-9–12/12 — טליה נשארת שם אחרי שאיתי טס.
 */
const LAKE_LINK = "https://www.siamtourandrealty.com/trip/cheow-lan-2-days-floating-bungalow-from-khao-sok/";
const ELEVEN_NOTE_32 = "אישור 5601126099 · 9–12/12, Deluxe King, לשניים · טליה נשארת עד 12/12 (11/12 עם מלח) · בוקינג מחייבת אוטומטית · ביטול חינם עד 5/12 · פיקדון ฿1,000 במזומן · ההזמנה הקודמת (5243050600) בוטלה";
const EXPENSES_32 = () => [
  {id:uid('x'), date:"2026-11-12", title:"Thai Vietjet MSR6JW · בנגקוק ↔ פוקט", category:"flights",
   amount:12515.52, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"VZ300 26/11 09:40 · VZ303 9/12 14:00 · Deluxe לשניים, 20 ק״ג לכל אחד · שולם בכאל"},
  {id:uid('x'), date:"2026-11-23", title:"ASAI Bangkok Chinatown · 3 לילות", category:"accommodation",
   amount:10398.09, currency:"THB", paidBy:"itai", split:"ratio", status:"due", note:"אישור 5547616403 · Roomy King City · בוקינג מחייבת אוטומטית · ביטול חינם עד 21/11"},
  {id:uid('x'), date:"2026-11-29", title:"COSI Krabi Ao Nang Beach · 4 לילות", category:"accommodation",
   amount:22669.04, currency:"THB", paidBy:"itai", split:"ratio", status:"due", note:"אישור 5907714174 · זיכוי יומי לאוכל ושתייה · בוקינג מחייבת אוטומטית · ביטול חינם עד 21/11, אחר כך 50%"},
  {id:uid('x'), date:"2026-12-04", title:"Khao Sok River Lodge · 4/12", category:"accommodation",
   amount:2000, currency:"THB", paidBy:"itai", split:"ratio", status:"due", note:"אישור 5114181390 · כולל ארוחת בוקר · בוקינג מחייב ב-28/11 · ביטול חינם עד 30/11"},
  {id:uid('x'), date:"2026-12-09", title:"מונית Booking · קלימה → HKT", category:"transport",
   amount:153.27, currency:"ILS", paidBy:"itai", split:"ratio", status:"paid", note:"אישור 997065466 · 9/12, 10:45"}
];
/* משימות: מה שהוזמן היום נסגר, מה שהשתנה מקבל שם חדש, ומה שירד מהמסלול יוצא */
const TASKS_32_REMOVED = ['להאריך את צ׳רמנטרה בלילה — 2/12', 'להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 5/12'];
const TASKS_32 = [
  {from:'לסגור את צ׳רמנטרה לפני הדדליין', status:'done', notes:'צ׳רמנטרה בוטלה — באאו נאנג ישנים ב-COSI'},
  {from:'לבטל את הזמנת בוקינג של Montraj (5123136373)', status:'done', notes:'בוטלה בחינם 12/11, וגם ההזמנה הישירה 3051425'},
  {from:'להזמין את טיסת TG203 לפוקט', to:'להזמין טיסות VietJet בנגקוק ↔ פוקט', status:'done', notes:'MSR6JW · VZ300 26/11 09:40 → 11:15 · VZ303 9/12 14:00 → 15:30 · Deluxe לשניים · ฿12,515.52'},
  {from:'להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם', status:'done', notes:'VZ303, 14:00 → 15:30 לסוברנבומי · MSR6JW'},
  {from:'להזמין לינה בקאו סוק, 3–5/12', to:'להזמין לינה בקאו סוק, 3/12', status:'done', notes:'Khao Sok River Lodge · אישור 5114181390 · ฿2,000 כולל ארוחת בוקר', link:'https://secure.booking.com/myreservations.html?bn=5114181390'},
  {from:'לעדכן את Eleven Bangkok לשני אנשים', status:'done', notes:'הזמנה חדשה 5601126099 ל-9–12/12, לשניים · הישנה בוטלה'},
  {from:'לתקן מול קלימה: נשארים עד 9/12', status:'done', notes:'12/11: קלימה אישרה 5–9/12, ושלחנו את פרטי הטיסה ל-9/12'},
  {from:'להחליט על מונית מקלימה לשדה ב-9/12 — 1,800 ฿ לרכב', to:'מונית מקלימה לשדה ב-9/12 — להזמין במקום', deadline:'2026-12-08',
   notes:'VZ303 ב-14:00 · לצאת ב-10:45 · גראב או דרך הקבלה, יום לפני · קלימה מציעה ฿1,800 לוואן, מראש ולא מוחזר'},
  {from:'להזמין סיור אגם צ׳או לאן, 4/12', to:'להזמין לילה על אגם צ׳או לאן — Panvaree The Greenery, 4–5/12', deadline:'2026-11-20', priority:'גבוהה', link:LAKE_LINK,
   notes:'Siam Tour, ฿6,800 לאדם, לא מוחזר · נשלחה בקשה 12/11 ל-contact@siamtourandrealty.com: זמינות, הורדה בקלימה ב-5/12, מזוודות ברכב · וואטסאפ +66 82 579 6015'},
  {from:'להזמין סימילן ל-6/12', notes:'12/11: ביקשנו הצעה מדואנג׳אן (duangjan@asiantrails.org), דרך קלימה · להשוות: Similan One Day Tour from Khao Lak בבוקינג, כ-฿3,548 לאדם · 7/12 יום הגיבוי'},
  {from:'לבטל את Sarana Bungalows — חינם עד 28/11', status:'done', notes:'בוטל'},
  {from:'לתאם ביקור בוגרים ב-ISB', notes:'25/11, 10:30 · בקשה 10/9 ותזכורת 12/11 ל-isbalum@isb.ac.th — מחכים לאישור · שניכם, דרכונים בשער'},
  {from:'לעדכן בנק על נסיעה ממושכת', notes:'להודיע לחברת האשראי (כאל) על הנסיעה, ולבדוק את עמלת המט״ח — תשלומים בבאט'},
  {from:'למשוך ฿6,075 מזומן ליתרה במחנה', notes:'בכספומט בבנגקוק, 23–25/11, במשיכה אחת — ฿220 עמלה לכל משיכה. אין כרטיסים ואין העברות במחנה'},
  {from:'לרכוש ביטוח נסיעות ארוך טווח', status:'done'},
  {from:'לוודא שהביטוח מכסה ספורט מגע', status:'done'},
  {from:'רישיון בינלאומי 1949 עם קטגוריית אופנוע (A)', status:'done'},
  {from:'ביטוח: רכיבה לאיתי, נסיעה כנוסעת לטליה', status:'done'},
  {from:'לינה בבנגקוק ללילה של 10/12', status:'done', notes:'Eleven עד 12/12 (5601126099) — 10/12 לבד, 11/12 עם מלח'},
  {from:'טיסה בנגקוק → צ׳יאנג מאי, 11/12 בערב — עם מלח', to:'טיסה בנגקוק → צ׳יאנג מאי, 12/12 — עם מלח', notes:'ב-Eleven עד 12/12 · מ-DMK או BKK, כשעה ורבע'}
];
const NEW_TASKS_32 = () => [
  {id:uid('m'), owner:"itai", status:"todo", category:"הזמנות", countryId:"thailand", order:13.52, priority:"בינונית", deadline:"2026-12-05",
   title:"להוסיף את טליה כאורחת ב-Eleven (5601126099)", notes:"בבוקינג → Edit guest details · היא שם בלעדיך ב-10–11/12", link:"https://secure.booking.com/myreservations.html?bn=5601126099"},
  {id:uid('m'), owner:"both", status:"todo", category:"הזמנות", countryId:"thailand", order:13.31, priority:"בינונית", deadline:"2026-11-29",
   title:"לשלם ל-River Lodge בהעברה בנקאית", notes:"המלון אמור לשלוח פרטים · אם לא הגיע עד 25/11 — לכתוב בצ׳אט של בוקינג · ביטול חינם עד 29/11", link:"https://secure.booking.com/myreservations.html?bn=5114181390"},
  {id:uid('m'), owner:"both", status:"todo", category:"הזמנות", countryId:"thailand", order:13.12, priority:"בינונית", deadline:"2026-11-25",
   title:"מונית ל-BKK ב-26/11, 06:45 — לבקש בקבלה של ASAI", notes:"VZ300 ב-09:40 · או גראב בבוקר", link:""},
  {id:uid('m'), owner:"itai", status:"todo", category:"הזמנות", countryId:"thailand", order:13.53, priority:"בינונית", deadline:"2026-12-09",
   title:"מונית לסוברנבומי ב-10/12, 07:45 — בקבלה של Eleven", notes:"IZ592 ב-11:15 · להזמין יום לפני, משלמים לנהג", link:""},
  {id:uid('m'), owner:"both", status:"todo", category:"הזמנות", countryId:"thailand", order:13.11, priority:"גבוהה", deadline:"2026-11-18",
   title:"לאשר שולחן לארוחת לוי קראתונג בסאלה ראטנקוסין, 24/11",
   notes:"12/11: נשלח מייל ל-info@salahospitality.com (עותק stay@salarattanakosin.com) — שולחן לשניים 17:30–18:00 ליד הנהר · בימים רגילים שולחן לשעתיים בלבד · אם אין תשובה: +66 2 622 1388 או TableCheck",
   link:"https://www.tablecheck.com/en/salarattanokosin-eateryandbar/reserve"},
  {id:uid('m'), owner:"both", status:"todo", category:"הזמנות", countryId:"thailand", order:13.25, priority:"בינונית", deadline:"2026-11-25",
   title:"להזמין קורס טיפוס למתחילים בריילאי, 30/11",
   notes:"Real Rocks — חצי יום בבוקר, קבוצות קטנות, ציון 9.6–9.8, כ-฿1,550 לאדם · חלופה: King Climbers · הקיאקים (1/12), הוואן לקאו סוק (3/12) ופי פי (2/12) — דרך הקבלה של COSI, במקום",
   link:"https://www.expedia.com.my/things-to-do/krabi-half-day-rock-climbing-at-railay-beach.a4528313.activity-details"},
  {id:uid('m'), owner:"both", status:"todo", category:"לפני הטיסה", countryId:null, order:5.5, priority:"בינונית", deadline:"2026-11-21",
   title:"Grab ו-Bolt בשני הטלפונים, עם כרטיס אשראי", notes:"כל המוניות בטיול מוזמנות במקום · SIM קונים בשדה, בדוכן של AIS או True", link:""}
];
const TASKS_33 = [
  {from:'להוסיף את טליה כאורחת ב-Eleven (5601126099)', status:'done', notes:'12/11: טליה ונועה מלח נוספו בבוקינג'},
  {from:'מונית מקלימה לשדה ב-9/12 — להזמין במקום', to:'מונית מקלימה לשדה ב-9/12', status:'done', notes:'מונית של Booking · אישור 997065466 · ₪153.27 · 10:45'},
  {from:'להזמין לילה על אגם צ׳או לאן — Panvaree The Greenery, 4–5/12', to:'להזמין לילה על אגם צ׳או לאן, 4–5/12',
   notes:'12/11: Greenery מלא אצל Siam Tour · שאלנו את Siam Tour על Laguna Seaview, Panvaree, Issara ו-Phuphawaree, ואת Greenery ישירות · אם אין: Thai National Parks (טופס באתר), או טיול יום ולילה שני ב-River Lodge'},
  {from:'להזמין סימילן ל-6/12', notes:'Asian Trails (Patty, הדלפק בקלימה) · ביקשנו Late Departure, איסוף 07:30–07:45 · מחכים למחיר ולתנאי ביטול · Early Bird: ฿4,100 לאדם'}
];
const EXPENSE_36 = () => ({id:uid('x'), date:"2026-12-03", title:"Siam Tour · Laguna Seaview · 3/12", category:"activities",
  amount:15000, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"voucher 8044 · הזמנה 5946 · מקדמה ฿7,500 ב-15/11 · יתרה ฿7,500 ב-24/11 · לא מוחזר"});
const SPEND_2411 = () => [
  {id:uid('x'), date:"2026-11-25", title:"בנגקוק 23–25/11 · מזומן", category:"food", amount:4900, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"הוצאות יומיות במזומן: אוכל, טוקטוקים ושווקים"}
];
const SPEND_2511 = () => [
  {id:uid('x'), date:"2026-11-23", title:"פאד תאי בצ׳יינטאון", category:"food", amount:400, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-23", title:"נתב״ג", category:"food", amount:125, currency:"ILS", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"Katsu Midori", category:"food", amount:649, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"7-11", category:"food", amount:205, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"צ׳טוצ׳אק", category:"food", amount:80, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"ארוחת לוי קרתונג · Sala Rattanakosin", category:"food", amount:3013.12, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"Bright Side Brunch Bar", category:"food", amount:1006.5, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"Scoozi Pizza · Central", category:"food", amount:1105, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"כרטיסים · Rajadamnern", category:"activities", amount:2000, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"מקדונלד׳ס פראטונם", category:"food", amount:177, currency:"THB", paidBy:"itai", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-23", title:"Krispy Kreme", category:"food", amount:308, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-23", title:"eSIM · Roamless ($17.95)", category:"other", amount:66, currency:"ILS", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"Sourdough Stars", category:"food", amount:555, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"I'm Chinatown", category:"food", amount:345, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-24", title:"Red Drum", category:"food", amount:250, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"Central Chaengwattana", category:"food", amount:170, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"7-11 · Sathit Pim", category:"food", amount:232, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"Rajadamnern · Global Sport Ventures", category:"activities", amount:440, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"},
  {id:uid('x'), date:"2026-11-25", title:"Shibuya · פראטונם", category:"food", amount:254, currency:"THB", paidBy:"talia", split:"ratio", status:"paid", note:"באשראי"}
];
const NEW_TASKS_36 = () => [
  {id:uid('m'), owner:"itai", status:"todo", category:"הזמנות", countryId:"thailand", order:13.32, priority:"גבוהה", deadline:"2026-11-26",
   title:"לשלם ל-Siam Tour את היתרה, ฿7,500", notes:"הזמנה 5946 · voucher 8044 · בכרטיס דרך הקישור של לוקאס או ב-Wise · לשלוח צילום מסך בוואטסאפ", link:""},
  {id:uid('m'), owner:"itai", status:"todo", category:"הזמנות", countryId:"thailand", order:13.33, priority:"בינונית", deadline:"2026-11-26",
   title:"לוודא עם Siam Tour: לילה אחד, והורדה ב-River Lodge ב-4/12", notes:"15/11: נשלחה שאלה בוואטסאפ ל-Lukas ‎+66 82 579 6015 · מחכים לתשובה · אחרת מונית מהרציף, כ-฿1,200", link:""}
];
const TASKS_36 = [
  {from:'להזמין לילה על אגם צ׳או לאן, 4–5/12', to:'להזמין לילה על אגם צ׳או לאן, 3/12', status:'done', notes:'15/11: Siam Tour · The Laguna Chiew Larn, Seaview · voucher 8044 · ฿15,000 · מקדמה ฿7,500 שולמה'},
  {from:'לשלם ל-River Lodge בהעברה בנקאית', to:'River Lodge — בוקינג מחייב את הכרטיס ב-28/11', notes:'הלילה עבר ל-4–5/12 · ฿2,000 · לפי בוקינג התשלום יורד לבד ב-28/11 · ביטול חינם עד 30/11'},
  {from:'Grab ו-Bolt בשני הטלפונים, עם כרטיס אשראי', status:'done', notes:'15/11: בוצע'},
  {from:'לעדכן בנק על נסיעה ממושכת', status:'done', notes:'15/11: כאל עודכנו'},
  {from:'להזמין סימילן ל-7/12', status:'done', notes:'15/11: אישרנו ל-Patty · ฿8,000 לשניים כולל דמי פארק · מזומן בדלפק בקלימה · ביטול חינם עד 24 שעות לפני'}
];
function applyTasks36(list){
  TASKS_36.forEach(spec=>{
    if(spec.to && list.some(x=>x.title===spec.to)) list = list.filter(x=>x.title!==spec.from);
    const t = list.find(x=>x.title===spec.from) || (spec.to && list.find(x=>x.title===spec.to));
    if(!t) return;
    if(spec.to) t.title = spec.to;
    t.notes = spec.notes;
    if(spec.status==='done') t.status = 'done';
  });
  NEW_TASKS_36().forEach(t=>{ if(!list.some(x=>x.title===t.title)) list.push(t); });
  return list;
}
const KHAOLAK_NOTE_35 = '6/12 יום מנוחה אחרי קאו סוק — חוף, זיפליין וספא. סימילן ב-7/12, ו-8/12 יום חופשי וגיבוי לסימילן: פארק קאו לאק–לאם רו ואנדרטת הצונאמי.';
const TASKS_35 = [
  {from:'להזמין סימילן ל-6/12', to:'להזמין סימילן ל-7/12', notes:'12/11: ביקשנו מ-Asian Trails (Patty) להעביר ל-7/12, Late Departure · מחכים לאישור, למחיר ולתנאי ביטול · 8/12 יום הגיבוי'}
];
function applyTasks35(list){
  TASKS_35.forEach(spec=>{
    const same = list.filter(x=>x.title===spec.from || x.title===spec.to);
    if(!same.length) return;
    const t = same.find(x=>x.status==='done' && x.title===spec.from) || same.find(x=>x.status==='done') || same[0];
    list = list.filter(x=>x===t || !same.includes(x));
    t.title = spec.to;
    if(t.status!=='done') t.notes = spec.notes;
  });
  return list;
}
const TASKS_34 = [
  {from:'לאשר שולחן לארוחת לוי קראתונג בסאלה ראטנקוסין, 24/11', status:'done', notes:'12/11: הוזמן ב-TableCheck · 19:30 · 1 Fl Terrace, מול ואט ארון'}
];
function applyTasks34(list){
  TASKS_34.forEach(spec=>{
    const t = list.find(x=>x.title===spec.from);
    if(!t) return;
    t.notes = spec.notes;
    t.status = spec.status;
  });
  return list;
}
function applyTasks33(list){
  TASKS_33.forEach(spec=>{
    const t = list.find(x=>x.title===spec.from) || (spec.to && list.find(x=>x.title===spec.to));
    if(!t) return;
    if(spec.to) t.title = spec.to;
    if(spec.notes!==undefined) t.notes = spec.notes;
    if(spec.status==='done') t.status = 'done';
  });
  return list;
}
function applyTasks32(list){
  list = list.filter(t=>!(TASKS_32_REMOVED.includes(t.title) && t.status!=='done'));
  TASKS_32.forEach(spec=>{
    const t = list.find(x=>x.title===spec.from) || (spec.to && list.find(x=>x.title===spec.to));
    if(!t) return;
    if(spec.to) t.title = spec.to;
    ['notes','deadline','link','priority'].forEach(k=>{ if(spec[k]!==undefined) t[k] = spec[k]; });
    if(spec.status==='done') t.status = 'done';
  });
  NEW_TASKS_32().forEach(t=>{ if(!list.some(x=>x.title===t.title)) list.push(t); });
  return list;
}
/* ההוצאה על מונטראג׳ כפי שהייתה עד גרסה 31 — מסמכים ישנים עוברים דרכה בדרך; בגרסה 32 היא יוצאת */
const MONTRAJ_EXPENSE_31 = {date:"2026-11-23", title:"Montraj Coach Sukhumvit · 3 לילות בבנגקוק", category:"accommodation",
  amount:8169.87, currency:"THB", paidBy:"itai", split:"ratio", status:"due",
  note:"אישור 3051425 · הזמנה ישירה באתר המלון עם קוד Member · Historic Cabin Family · משלמים בצ׳ק-אין · ביטול חינם עד 21/11 · פיקדון ฿1,000 מזומן, מוחזר בצ׳ק-אאוט · החליפה את הזמנת בוקינג 5123136373 ב-₪1,128"};
/* ההוצאה על Eleven כפי שהייתה לפני גרסה 25 — מסמכים ישנים עוברים דרכה בדרך */
const ELEVEN_EXPENSE_16 = {date:"2026-12-09", title:"Eleven Bangkok Sukhumvit 11 · לילה אחרון", category:"accommodation",
  amount:3010.10, currency:"THB", paidBy:"itai", split:"ratio", status:"due", note:"אישור 5243050600 · לשניים — לעדכן בבוקינג (הוזמן לאדם אחד) · בוקינג מחייבת אוטומטית · ביטול חינם עד 5/12 · פיקדון ฿1,000 במזומן"};
const WEST_TASKS = [
  {owner:"both", title:"להאריך את צ׳רמנטרה בלילה — 2/12", deadline:"2026-11-10", priority:"גבוהה", order:13.2,
   notes:"אישור 5553772333 · לבקש את אותה וילה, כדי לא לארוז באמצע · כ-₪613 · אם בוקינג לא מאפשרת — הזמנה נפרדת ללילה ומייל למלון לחבר",
   link:"https://secure.booking.com/myreservations.html"},
  {owner:"both", title:"להזמין לינה בקאו סוק, 3–5/12", deadline:"2026-11-10", priority:"גבוהה", order:13.3,
   notes:"הבחירה: Khao Sok Palmview, כ-₪462 לשני לילות · חלופה: River Lodge, על הנהר",
   link:"https://www.booking.com/hotel/th/khao-sok-palmview-resort.html?checkin=2026-12-03&checkout=2026-12-05&group_adults=2"},
  {owner:"both", title:"להזמין לילה נוסף בקלימה — 5/12", deadline:"2026-11-10", priority:"גבוהה", order:13.4, status:"done",
   notes:KALIMA_EXTRA_NOTE,
   link:"https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html?checkin=2026-12-05&checkout=2026-12-06&group_adults=2"},
  {owner:"both", title:"לתקן מול קלימה: נשארים עד 9/12", deadline:"2026-11-12", priority:"בינונית", order:13.45,
   notes:"במייל מ-5/11 כתבנו שנעזוב ב-8/12 וביקשנו לשחרר את הלילה של 8–9/12. נשארים עד 9/12 — לכתוב ל-Lyla שזה מבוטל, ושהחדר נשאר 5–9/12", link:"mailto:rsvn.khaolak@kalimaresort.com"},
  {owner:"both", title:"להחליט על מונית מקלימה לשדה ב-9/12 — 1,800 ฿ לרכב", deadline:"2026-11-30", priority:"בינונית", order:13.51,
   notes:"רכב פרטי של קלימה לשדה בפוקט: ฿1,800 לכיוון, עד 4 נוסעים, 100% מראש ולא מוחזר · לתאם לפי שעת הטיסה לבנגקוק", link:"mailto:rsvn.khaolak@kalimaresort.com"},
  {owner:"both", title:"לעדכן את Eleven Bangkok לשני אנשים", deadline:"2026-11-15", priority:"בינונית", order:13.5,
   notes:"אישור 5243050600 · ההזמנה לאדם אחד · החדר עם מיטת קינג, אבל המחיר עלול להשתנות", link:"https://secure.booking.com/myreservations.html"},
  {owner:"both", title:"להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם", deadline:"2026-11-15", priority:"גבוהה", order:13.6,
   notes:"עדיף אחרי 14:00 — מקלימה לשדה כשעה וחצי · DMK או BKK — הטיסה הביתה רק ב-10/12, 11:15 מסוברנבומי", link:""},
  {owner:"both", title:"טיול יום לפי פי מאאו נאנג, 2/12 — אם בא לכם", deadline:"2026-11-28", priority:"נמוכה", order:13.7,
   notes:"ספידבוט עם איסוף מצ׳רמנטרה וצהריים, כ-฿1,800–2,500 לאדם + אגרת פארק ฿400 · אפשר גם להחליט שם, יום קודם", link:""},
  {owner:"both", title:"להזמין ואן מאאו נאנג לקאו סוק, 3/12", deadline:"2026-11-28", priority:"בינונית", order:13.8,
   notes:"ואן משותף עם איסוף, כ-฿350–450 לאדם, כשעתיים וחצי–שלוש · יציאה סביב 10:00", link:"https://12go.com/en/travel/ao-nang/khao-sok"},
  {owner:"both", title:"להזמין סיור אגם צ׳או לאן, 4/12", deadline:"2026-11-30", priority:"בינונית", order:13.9,
   notes:"4/12 מקאו סוק, חוזרים לכפר · דרך המלון או סוכנות בכפר", link:""},
  {owner:"both", title:"להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 5/12", deadline:"2026-11-30", priority:"נמוכה", order:13.91,
   notes:"הליכה מודרכת או קאנו על נהר סוק ב-07:00, ואן לקלימה ב-13:00 · דרך המלון", link:""},
  {owner:"both", title:"להזמין סימילן ל-6/12", deadline:"2026-11-30", priority:"בינונית", order:13.95,
   notes:"฿3,900 לאדם כולל אגרת פארק · איסוף מקלימה · 7/12 יום הגיבוי", link:"https://www.khaolaklanddiscovery.com/khao-lak-tours/similan-islands-tour/"},
  {owner:"itai", title:"לבטל את Sarana Bungalows — חינם עד 28/11", deadline:"2026-11-28", priority:"בינונית", order:13.97,
   notes:"אישור 6196805940 · קופנגן כבר לא במסלול · לא שולם מראש", link:"https://secure.booking.com/myreservations.html?bn=6196805940"}
];
/* משימות של סידורים קודמים שכבר לא במסלול */
const OLD_PLAN_TASKS = ['להזמין Lomprayah מאאו נאנג לקופנגן', 'כרטיסים ל-Halfmoon, 2–3/12', 'להזמין מעבורת וואן מקופנגן לקאו סוק',
  'להזמין טיסה מפוקט לצ׳יאנג מאי ב-8/12', 'להזמין טיסה מפוקט לבנגקוק ב-9/12', 'להזמין ואן משותף מאאו נאנג לקאו לק',
  'להזמין לינה בפטונג, 8/12'];
/* משימות שהוחלפו בגרסה מעודכנת שלהן — כאן אין מה לבטל */
/* מה שכבר בוצע ויצא מהרשימה של מסמך חדש; במסמך שמור הוא מסומן כבוצע */
const DONE_TASKS = ['לבטל את Our Jungle House — חינם עד 8/11', 'לשנות את קלימה ל-6–9/12 בבוקינג', 'להחליט מה עושים אחרי 10/12'];
const SUPERSEDED_TASKS = ['Our Jungle House — ביטול חינם רק עד 8/11', 'לשנות את קלימה ל-5–8/12 בבוקינג',
  'להזמין סיור אגם צ׳או לאן עם הסעה לקאו לאק', 'להזמין סימילן, 6/12'];

/*
 * המסלול של טליה אחרי 10/12: מחכה למלח בבנגקוק, הצפון של תאילנד עד שהפטור
 * נגמר, סרי לנקה בשלושה שבועות (גלישה בוולגמה ואז פנימה בכיוון אחד), הודו
 * כטיוטה, וקופנגן באמצע פברואר.
 */
const TALIA_THAILAND = [
  {name:"בנגקוק — מחכה למלח", wiki:"Bangkok", hue:"#C97B5A", lat:13.7440, lng:100.5560, arrival:"2026-12-10", departure:"2026-12-12", nights:2,
   accommodation:"Eleven Bangkok Sukhumvit 11 — עד 12/12 (אישור 5601126099)", transport:"",
   notes:"איתי טס בבוקר. מלח נוחתת ב-11/12 ב-13:00 בסוברנבומי ומצטרפת ל-Eleven, וב-12/12 טסות יחד לצפון.", budget:500, order:9},
  {name:"צ'יאנג מאי", wiki:"Chiang Mai", hue:"#8C6FA0", lat:18.7883, lng:98.9853, arrival:"2026-12-12", departure:"2026-12-15", nights:3,
   accommodation:"", transport:"טיסה מבנגקוק, כשעה ורבע",
   notes:"העיר העתיקה, דוי סוטפ, סדנת בישול ומקלט פילים אתי. בשבת 12/12 שוק וואלאי, ובראשון 13/12 Sunday Walking Street. דצמבר: יבש ונעים, קר בלילה.",
   budget:1200, order:10},
  {name:"פאי", wiki:"Pai, Thailand", hue:"#4E8B8B", lat:19.3583, lng:98.4383, arrival:"2026-12-15", departure:"2026-12-18", nights:3,
   accommodation:"", transport:"ואן מצ'יאנג מאי, כשלוש שעות מפותלות",
   notes:"קניון, מעיינות חמים, מפלים, קטנוע, יוגה ושקיעות. בלילה כ-10 מעלות — פליז.",
   scooter:{ok:true, perDay:180, bikes:1, days:3, soloRider:"talia", headline:"בפאי זה כמעט חובה",
     note:"฿150–200 ליום. הקניון, המעיינות החמים והכפרים מסביב הם מרחק קטנוע — צריך רישיון A על השם שלך."},
   budget:900, order:11},
  {name:"צ'יאנג ראי", wiki:"Chiang Rai", hue:"#B97A85", lat:19.9105, lng:99.8406, arrival:"2026-12-18", departure:"2026-12-20", nights:2,
   accommodation:"", transport:"אוטובוס דרך צ'יאנג מאי",
   notes:"המקדש הלבן, המקדש הכחול, הבית השחור ומשולש הזהב. אם בא פחות נסיעות: לוותר, ולהוסיף לילה בפאי ולילה בצ'יאנג דאו.",
   budget:700, order:12},
  {name:"בנגקוק — לפני סרי לנקה", wiki:"Bangkok", hue:"#C97B5A", lat:13.7440, lng:100.5560, arrival:"2026-12-20", departure:"2026-12-21", nights:1,
   accommodation:"", transport:"טיסה מצ'יאנג ראי",
   notes:"21/12 טיסה ישירה לקולומבו, כשלוש שעות וחצי. הפטור התאילנדי (30 יום מ-23/11) נגמר ב-22/12.", budget:400, order:13},
  {name:"קופנגן — פברואר", wiki:"Ko Pha-ngan", hue:"#3E8E9B", lat:9.7120, lng:100.0330, arrival:"2027-02-14", departure:"", nights:null,
   accommodation:"", transport:"טיסה לבנגקוק או לסמוי, ומעבורת",
   notes:"באמצע פברואר. מסיבת הירח המלא צפויה בסביבות 20/2 — לבדוק את התאריך. סריטאנו: יוגה וקהילה.", budget:null, order:14}
];
const TALIA_SRILANKA = [
  {name:"נגומבו", wiki:"Negombo", hue:"#6F8F6A", lat:7.2090, lng:79.8350, arrival:"2026-12-21", departure:"2026-12-22", nights:1,
   accommodation:"", transport:"טיסה מבנגקוק", notes:"לילה ליד השדה אחרי הנחיתה. ETA אונליין לפני הטיסה.", budget:300, order:1},
  {name:"ולגמה", wiki:"Weligama", hue:"#1C6B74", lat:5.9740, lng:80.4290, arrival:"2026-12-22", departure:"2027-01-01", nights:10,
   accommodation:"להזמין מוקדם — חגים", transport:"נהג, כשלוש שעות בכביש המהיר",
   notes:"הבסיס: מפרץ חול רחב עם גלים רכים למתחילים, חג המולד וסילבסטר. לגור בין כביש A2 לחוף, באמצע המפרץ. טיולי יום: גאלה, מיריסה (לווייתנים), אהנגמה, היריקטיה. מתניידים ברגל וב-PickMe.",
   budget:4000, order:2},
  {name:"טיסמהרמה · יאלה", wiki:"Yala National Park", hue:"#D3911A", lat:6.2840, lng:81.2870, arrival:"2027-01-01", departure:"2027-01-02", nights:1,
   accommodation:"", transport:"נהג, כשעתיים וחצי. אפשר לעצור באודאוואלאווה",
   notes:"ספארי ב-4:30 בבוקר: נמרים, פילים, תנינים. ג׳יפ כ-10,000–15,000 ₨ ועוד כ-$30–40 כניסה לאדם.", budget:700, order:3},
  {name:"אלה", wiki:"Ella, Sri Lanka", hue:"#477A44", lat:6.8667, lng:81.0466, arrival:"2027-01-02", departure:"2027-01-05", nights:3,
   accommodation:"", transport:"נהג, כשעתיים וחצי",
   notes:"כפר הררי בין מטעי תה, 15–25 מעלות. Little Adam's Peak, Ella Rock, גשר תשע הקשתות, וביקור במטע תה.", budget:900, order:4},
  {name:"קנדי", wiki:"Kandy", hue:"#B2512C", lat:7.2906, lng:80.6337, arrival:"2027-01-05", departure:"2027-01-07", nights:2,
   accommodation:"", transport:"רכבת מאלה, 6–7 שעות — להזמין כחודש מראש",
   notes:"מקדש השן, הגן הבוטני ומופע ריקודים בערב. עירונית ועמוסה יותר.", budget:600, order:5},
  {name:"סיגיריה · דמבולה", wiki:"Sigiriya", hue:"#8A5A2B", lat:7.9570, lng:80.7600, arrival:"2027-01-07", departure:"2027-01-10", nights:3,
   accommodation:"", transport:"נהג, כשעתיים וחצי",
   notes:"זריחה על פידורנגלה מול סיגיריה, מערות דמבולה, ספארי פילים בקאודולה או ב-Hurulu. סיגיריה כ-$35 לאדם.", budget:900, order:6},
  {name:"נגומבו — לילה לפני הטיסה", wiki:"Negombo", hue:"#6F8F6A", lat:7.2090, lng:79.8350, arrival:"2027-01-10", departure:"2027-01-11", nights:1,
   accommodation:"", transport:"נהג, 3.5–4 שעות", notes:"11/1 טיסה החוצה.", budget:300, order:7}
];
function TALIA_INDIA(){
  return {id:"india", owner:"talia", name:"הודו — טיוטה", flag:"🇮🇳", color:"#D9822B", order:2.5, currency:"INR",
    notes:"עוד לא הוחלט. מתאים לשתיכן: חוף, ג׳ונגל, ספארי ותרבות, ויוגה בבקרים. החלופה: קמבודיה, ואז לחבר אותה לווייטנאם.",
    destinations:[
      {id:uid('d'), owner:"talia", name:"וארקלה", wiki:"Varkala", hue:"#D9822B", lat:8.7379, lng:76.7163, arrival:"2027-01-11", departure:"2027-01-17", nights:6,
       accommodation:"", transport:"טיסה מקולומבו לטריבנדרם, כשעה", notes:"צוקים מעל הים, יוגה ואיורוודה לטליה, שיעורי גלישה למלח.", budget:1500, status:"optional", companions:["טליה ומלח"], order:1},
      {id:uid('d'), owner:"talia", name:"קוצ'י", wiki:"Kochi", hue:"#D9822B", lat:9.9658, lng:76.2421, arrival:"2027-01-17", departure:"2027-01-20", nights:3,
       accommodation:"", transport:"רכבת או נהג", notes:"קטקאלי, רשתות הדיג הסיניות, שוק התבלינים והרובע היהודי.", budget:800, status:"optional", companions:["טליה ומלח"], order:2},
      {id:uid('d'), owner:"talia", name:"אלפי", wiki:"Alappuzha", hue:"#D9822B", lat:9.4981, lng:76.3388, arrival:"2027-01-20", departure:"2027-01-21", nights:1,
       accommodation:"סירת בית", transport:"נהג, כשעה וחצי", notes:"לילה בסירת בית על הבק-ווטרס.", budget:600, status:"optional", companions:["טליה ומלח"], order:3},
      {id:uid('d'), owner:"talia", name:"תקדי", wiki:"Thekkady", hue:"#D9822B", lat:9.6031, lng:77.1615, arrival:"2027-01-21", departure:"2027-01-24", nights:3,
       accommodation:"", transport:"נהג, כ-4 שעות", notes:"שמורת פריאר, מטעי תה ותבלינים.", budget:700, status:"optional", companions:["טליה ומלח"], order:4},
      {id:uid('d'), owner:"talia", name:"מייסור · קביני", wiki:"Mysore", hue:"#D9822B", lat:12.2958, lng:76.6394, arrival:"2027-01-24", departure:"2027-01-29", nights:5,
       accommodation:"", transport:"יום נסיעה מקרלה", notes:"הארמון והשוק, וספארי טיגריסים בקביני. משם טיסה מבנגלור לבנגקוק.", budget:1500, status:"optional", companions:["טליה ומלח"], order:5}
    ],
    prepChecklist:[{id:uid('t'), title:"ויזה אלקטרונית להודו", status:"todo", deadline:"2026-12-31", notes:"רק אם הולכות על הודו", link:"", priority:"בינונית", order:1}],
    transport:[], accommodations:[], budget:defaultBudget()};
}
/* לטליה אין כרטיס חזור: הכרטיס לקולומבו הוא ההוכחה שהיא יוצאת בתוך 30 הימים */
const ONWARD_NOTE = "טליה: הפטור הוא 30 יום מהכניסה ב-23/11, כלומר יציאה עד 22/12. ארקיע ובביקורת הגבולות יבקשו לראות כרטיס יציאה מתאילנד בתוך החלון — אין לה כרטיס חזור, אז הכרטיס בנגקוק → קולומבו ב-21/12 צריך להיות מוזמן לפני הטיסה ב-22/11. עדיף כרטיס שאפשר לשנות. לאיתי: IZ592 ב-10/12.";
const TALIA_TASKS = [
  {title:"לינה בבנגקוק ללילה של 10/12", deadline:"2026-11-30", priority:"בינונית", order:20, status:"done",
   notes:"Eleven עד 12/12 (5601126099) — 10/12 לבד, 11/12 עם מלח", link:"https://secure.booking.com/myreservations.html?bn=5601126099"},
  {title:"טיסה בנגקוק → צ׳יאנג מאי, 12/12 — עם מלח", deadline:"2026-11-30", priority:"בינונית", order:21, notes:"ב-Eleven עד 12/12 · מ-DMK או BKK, כשעה ורבע", link:""},
  {title:"טיסה צ׳יאנג ראי → בנגקוק, 20/12", deadline:"2026-11-30", priority:"בינונית", order:22, notes:"", link:""},
  {title:"לינה בוולגמה 22/12–1/1 — חגים, להזמין מוקדם", deadline:"2026-11-15", priority:"גבוהה", order:23,
   notes:"בין כביש A2 לחוף, באמצע המפרץ · beachfront או עד 100 מ׳ · לבדוק בביקורות אם יש רעש מהכביש", link:"https://www.booking.com/searchresults.html?ss=Weligama&checkin=2026-12-22&checkout=2027-01-01&group_adults=2"},
  {title:"כרטיסי רכבת אלה → קנדי, 5/1", deadline:"2026-12-06", priority:"גבוהה", order:24, notes:"נפתחים כ-30 יום מראש ונגמרים מהר", link:""},
  {title:"להחליט על אחרי סרי לנקה: הודו או קמבודיה", deadline:"2026-12-15", priority:"בינונית", order:25, notes:"באפליקציה כרגע: הודו, 11–29/1, כטיוטה", link:""}
];

function seedData(){
  const bangkokId = uid('d'), koyaoId = uid('d'), aonangId = uid('d'), khaolakId = uid('d');
  const khaosokId = uid('d'), bangkokLastId = uid('d');
  const paiId = uid('d'), weligamaId = uid('d');
  const hanoiId = uid('d'), manilaId = uid('d');

  return {
    schema:37,
    tripName:"My Big Trip 🌏",
    startDate:"2026-11-22",
    endDate:null,
    budgetTotal:50000,
    currency:"ILS",

    /* מה שמשותף לשניים, ומה שממשיך אחרי שאיתי טס הביתה */
    trip:{
      splitDate:"2026-12-10",
      together:{title:"תאילנד · מבנגקוק לאנדמן", subtitle:"22 בנובמבר – 10 בדצמבר 2026 · 17 לילות", nights:17},
      itai:{title:"שבועיים וחצי", subtitle:"22/11 – 10/12 · ואז הביתה מבנגקוק", homeDate:"2026-12-10",
            homeFlight:"ארקיע IZ592 · בנגקוק → תל אביב · 10/12, 11:15"},
      talia:{title:"הטיול הגדול", subtitle:"מ-22/11/2026 והלאה · תאילנד, סרי לנקה, הודו, פיליפינים, וייטנאם",
             onwardFlight:"עם מלח לצפון · בנגקוק → צ׳יאנג מאי, 12/12", onwardDate:"2026-12-10"}
    },

    /* חלוקת הוצאות בסגנון Splitwise */
    money:{
      added2411:true,
      added2511:true,
      cash2511:true,
      prepay2211:true,
      rate:0.08981,                 // ฿1 בשקלים
      rateChecked:"2026-09-10",      // מתי נבדק — משמש לאזהרה כשהוא מתיישן
      defaultSplit:{itai:0.6667, talia:0.3333},
      budgets:{itai:12000, talia:8000},
      expenses:[
        kynPackageExpense(),
        {id:uid('x'), date:"2026-09-10", title:"ארקיע IZ591 · תל אביב → בנגקוק", category:"flights",
         amount:3777, currency:"ILS", paidBy:"itai", split:"ratio", status:"paid", note:"לשניים · אישור IL-603978"},
        {id:uid('x'), date:"2026-09-10", title:"ארקיע IZ592 · בנגקוק → תל אביב", category:"flights",
         amount:1891, currency:"ILS", paidBy:"itai", split:"full-itai", status:"paid", note:"הטיסה הביתה של איתי, 10/12 · אישור IL-604062 · הוחלפה מ-IZ598 (פוקט, 8/12)"},
        {id:uid('x'), date:"2026-10-28", title:"שינוי טיסה · IZ598 → IZ592", category:"flights",
         amount:777, currency:"ILS", paidBy:"itai", split:"full-itai", status:"paid", note:"210$ ל-lastminute · בערך, לפי 3.7 ₪ לדולר — לעדכן לפי החיוב בכרטיס"},
        {id:uid('x'), date:"2026-09-10", title:"Kalima Resort · 3 לילות בקאו לאק", category:"accommodation",
         amount:1931.44, currency:"ILS", paidBy:"itai", split:"ratio", status:"paid", note:KALIMA_NOTE},
        KALIMA_EXTRA_EXPENSE(),
        {id:uid('x'), date:"2026-12-09", title:"Eleven Bangkok Sukhumvit 11 · 9–12/12", category:"accommodation",
         amount:8411.85, currency:"THB", paidBy:"itai", split:"ratio", status:"due", note:ELEVEN_NOTE_32},
        ...EXPENSES_32(), EXPENSE_36(), ...SPEND_2411(), ...SPEND_2511()
      ],
      settlements:[{id:'s-talia-prepay', from:'talia', to:'itai', amount:4766, date:'2026-11-22', note:'לפני הטיול, על מה שהוזמן מראש'}]
    },

    countries:[
      {id:"thailand", owner:"both", name:"תאילנד", flag:"🇹🇭", color:"var(--thailand)", order:1, currency:"THB", notes:"",
        destinations:[
          {id:bangkokId, owner:"both", name:"בנגקוק", wiki:"Bangkok", hue:"#C97B5A",
           lat:13.7563, lng:100.5018, arrival:"2026-11-23", departure:"2026-11-26", nights:3,
           accommodation:"ASAI Bangkok Chinatown", transport:"ארקיע IZ591 מתל אביב, ומונית חינם של בוקינג",
           notes:"לוי קראתונג בליל הירח המלא, הארמון המלכותי, ISB, ומואיי תאי ברג׳אדמנרן",
           scooter:{ok:false, headline:"לא בבנגקוק",
             note:"תנועה, מתחלפי נתיבים ואוטובוסים — מקום גרוע ללמוד בו. ה-BTS והסירה על הנהר מהירים יותר, וגראב עולה ฿120–300 לנסיעה."},
           budget:2500, status:"booked", companions:["ביחד"], order:1},
          {id:koyaoId, owner:"both", name:"קו יאו נוי — מחנה מואיי תאי", wiki:"Ko Yao Noi", hue:"#6F8F6A",
           lat:8.1099, lng:98.5892, arrival:"2026-11-26", departure:"2026-11-29", nights:3,
           accommodation:"Sea House Room · KYN Phoenix", transport:"Thai Vietjet VZ300 לפוקט ואז ספידבוט",
           notes:"אושר מול המחנה · Sea House Room לשניים · ฿12,150 לכל השהייה, כולל חדר, ארוחות ואימוני קבוצה. ביום ראשון אין אימונים ואין הגשת אוכל. מקדמה 50% (฿6,075) ב-Wise, היתרה במזומן בהגעה. המחיר תוקן מ-฿14,580 שהיה תעריף הדירה הפנורמית. המחנה אישר אימוני קבוצה ב-08:00 וב-17:00; ביום ההגעה אימון טכניקה ב-16:00. להביא תחבושות ידיים ומגני שיניים; כפפות זמינות להשאלה.",
           scooter:{ok:true, perDay:250, bikes:1, days:2, rider:"itai", pillion:"talia", headline:"המקום הכי טוב באי לקטנוע",
             note:"כביש אחד לאורך החוף המזרחי, כמעט בלי תנועה. שדות אורז, המסגד, התצפית, והחופים שאין אליהם סונגתאו."},
           budget:2200, status:"planned", companions:["ביחד"], order:2},
          {id:aonangId, owner:"both", name:"אאו נאנג וריילאי", wiki:"Ao Nang", hue:"#6E88A0",
           lat:8.0320, lng:98.8210, arrival:"2026-11-29", departure:"2026-12-03", nights:4,
           accommodation:"COSI Krabi Ao Nang Beach", transport:"ספידבוט מקו יאו נוי",
           notes:"קורס טיפוס בריילאי, חוף פרה נאנג, קיאקים במנגרובים של אאו תלאנה — וב-2/12 פי פי ומאיה ביי בטיול יום, בלי לארוז",
           scooter:{ok:true, perDay:250, bikes:1, days:2, rider:"itai", pillion:"talia", headline:"כן — חוץ מיום ריילאי",
             note:"฿250–300 ליום, תלוי במשכיר. לריילאי אין כביש, רק סירה, אז ביום הטיפוס הקטנועים חונים. שווה לאאו תלאנה, לקראבי ולחופים שמצפון."},
           budget:2600, status:"booked", companions:["ביחד"], order:3},
          {id:khaosokId, owner:"both", name:"קאו סוק", wiki:"Khao Sok National Park", hue:"#4F7A4A",
           lat:8.9130, lng:98.5300, arrival:"2026-12-03", departure:"2026-12-05", nights:2,
           accommodation:"The Laguna Chiew Larn (Seaview) על האגם, ואז Khao Sok River Lodge", transport:"Siam Tour מאאו נאנג",
           notes:"3/12 ישר מאאו נאנג לאגם — לילה ב-Laguna Seaview עם סירה פרטית, דרך Siam Tour. 4/12 בוקר על האגם וערב בכפר, ב-River Lodge על הנהר. 5/12 בוקר בג׳ונגל, ומשם לקלימה.",
           scooter:{ok:false, headline:"לא צריך", note:"הכל בהליכה מהכפר, ולאגם נוסעים עם הסיור."},
           budget:1500, status:"planned", companions:["ביחד"], order:5},
          {id:khaolakId, owner:"both", name:"קאו לאק", wiki:"Khao Lak", hue:"#C9A24C",
           lat:8.6392, lng:98.2450, arrival:"2026-12-05", departure:"2026-12-09", nights:4,
           accommodation:"Kalima Resort and Villas", transport:"ואן מקאו סוק",
           notes:"6/12 יום מנוחה אחרי קאו סוק — חוף, זיפליין וספא. סימילן ב-7/12, ו-8/12 יום חופשי וגיבוי לסימילן: פארק קאו לאק–לאם רו ואנדרטת הצונאמי. ב-9/12 לשדה בפוקט וטיסה לבנגקוק. הלילה של 5/12 בהזמנה ישירה נפרדת.",
           scooter:{ok:false, headline:"לא הפעם", note:"ארבעה ימים, ואחד מהם בים. מוניות מהריזורט."},
           budget:2500, status:"booked", companions:["ביחד"], order:6},
          {id:bangkokLastId, owner:"both", name:"בנגקוק — לילה אחרון", wiki:"Bangkok", hue:"#C97B5A",
           lat:13.7440, lng:100.5560, arrival:"2026-12-09", departure:"2026-12-10", nights:1,
           accommodation:"Eleven Bangkok Sukhumvit 11", transport:"Thai Vietjet VZ303 לסוברנבומי, ומונית חינם של בוקינג",
           notes:"לילה אחרון ביחד על סוי 11. בבוקר איתי טס (IZ592, 11:15 מסוברנבומי), וטליה נשארת ב-Eleven עד 12/12.",
           budget:800, status:"booked", companions:["ביחד"], order:8},
          ...TALIA_THAILAND.map(d=>({id:d.name==='פאי'?paiId:uid('d'), owner:"talia", status:"planned", companions:["טליה ומלח"], ...d}))
        ],
        prepChecklist:[
          {id:uid('t'), title:"ויזה לתאילנד", status:"todo", deadline:"2026-11-01", notes:"לבדוק אם צריך ויזה מראש או ויזה בכניסה (Visa Exemption)", link:"", priority:"גבוהה", order:1},
          {id:uid('t'), title:"הוכחת יציאה / onward ticket", status:"todo", deadline:"2026-11-20", notes:ONWARD_NOTE, link:"", priority:"גבוהה", order:2},
          {id:uid('t'), title:"ביטוח נסיעות", status:"todo", deadline:"2026-11-10", notes:"לוודא כיסוי לקורס יוגה ולשהייה ארוכה", link:"", priority:"גבוהה", order:3},
          {id:uid('t'), title:"SIM / eSIM תאילנד", status:"todo", deadline:"", notes:"", link:"", priority:"נמוכה", order:4},
          {id:uid('t'), title:"מטבע ועמלות ATM", status:"todo", deadline:"", notes:"", link:"", priority:"נמוכה", order:5}
        ],
        transport:[
          {id:uid('f'), kind:"טיסה", from:"תל אביב", to:"בנגקוק", date:"2026-11-23", time:"", carrier:"", flightNumber:"", price:"", luggage:"", bookingRef:"", link:"", status:"מחפשת"}
        ],
        accommodations:[], budget:defaultBudget()
      },
      {id:"srilanka", owner:"talia", name:"סרי לנקה", flag:"🇱🇰", color:"var(--srilanka)", order:2, currency:"LKR", notes:"",
        destinations:[
          ...TALIA_SRILANKA.map(d=>({id:d.name==='ולגמה'?weligamaId:uid('d'), owner:"talia", status:"planned", companions:["טליה ומלח"], ...d}))
        ],
        prepChecklist:[
          {id:uid('t'), title:"ETA / ויזה אלקטרונית לסרי לנקה", status:"todo", deadline:"2026-12-20", notes:"", link:"", priority:"גבוהה", order:1},
          {id:uid('t'), title:"ביטוח נסיעות — עדכון תאריכים", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:2}
        ],
        transport:[], accommodations:[], budget:defaultBudget()
      },
      TALIA_INDIA(),
      {id:"vietnam", owner:"talia", name:"וייטנאם", flag:"🇻🇳", color:"var(--vietnam)", order:3, currency:"VND", notes:"המסלול עדיין גמיש",
        destinations:[
          {id:hanoiId, owner:"talia", name:"האנוי (רעיון ראשוני)", lat:21.0278, lng:105.8342, arrival:"", departure:"", nights:null, accommodation:"", transport:"", notes:"המסלול עדיין גמיש — לא סופי", budget:null, status:"optional", companions:[], order:1}
        ],
        prepChecklist:[{id:uid('t'), title:"לבדוק דרישת ויזה לווייטנאם", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:1}],
        transport:[], accommodations:[], budget:defaultBudget()
      },
      {id:"philippines", owner:"talia", name:"פיליפינים", flag:"🇵🇭", color:"var(--philippines)", order:4, currency:"PHP", notes:"המסלול עדיין גמיש",
        destinations:[
          {id:manilaId, owner:"talia", name:"מנילה / פלאוואן (רעיון ראשוני)", lat:14.5995, lng:120.9842, arrival:"", departure:"", nights:null, accommodation:"", transport:"", notes:"המסלול עדיין גמיש — לא סופי", budget:null, status:"optional", companions:[], order:1}
        ],
        prepChecklist:[{id:uid('t'), title:"לבדוק דרישת ויזה לפיליפינים", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:1}],
        transport:[], accommodations:[], budget:defaultBudget()
      }
    ],
    masterChecklist: applyTasks36(applyTasks35(applyTasks34(applyTasks33(applyTasks32([
      {id:uid('m'), category:"דרכון", title:"לבדוק תוקף דרכון (6+ חודשים)", status:"todo", deadline:"2026-10-15", notes:"", priority:"גבוהה", link:"", countryId:null, order:1},
      {id:uid('m'), category:"ביטוח נסיעות", title:"לרכוש ביטוח נסיעות ארוך טווח", status:"todo", deadline:"2026-11-05", notes:"לוודא כיסוי לענפי ספורט/גלישה ויוגה", priority:"גבוהה", link:"", countryId:null, order:2},
      {id:uid('m'), category:"כרטיסי אשראי", title:"לעדכן בנק על נסיעה ממושכת", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:3},
      {id:uid('m'), category:"טלפון/eSIM", title:"להשוות ספקי eSIM אזוריים", status:"todo", deadline:"", notes:"", priority:"נמוכה", link:"", countryId:null, order:4},
      {id:uid('m'), category:"מסמכים וגיבויים", title:"לסרוק ולגבות את כל המסמכים החשובים", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:5},
      {id:uid('m'), category:"בישראל לפני הטיול", title:"לסגור עניינים פתוחים (דואר, מנויים, ביטוח לאומי)", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:6},
      {id:uid('m'), category:"תרופות", title:"להצטייד בערכת תרופות בסיסית", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:7},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"לסגור את צ׳רמנטרה לפני הדדליין", status:"todo", deadline:"2026-11-14", notes:"אחרי 14/11 הכרטיס מחויב במלוא הסכום", priority:"גבוהה", link:"", countryId:"thailand", order:8},
      {id:uid('m'), owner:"itai", category:"הזמנות", title:"לבטל את הזמנת בוקינג של Montraj (5123136373)", status:"todo", deadline:"2026-11-20", notes:"ההזמנה הישירה (3051425, ฿8,169.87) כבר מאושרת. לבטל עכשיו — אחרת נשארות שתי הזמנות, ואי-הגעה לאחת מהן עלולה לעלות לילה. ביטול חינם עד 20/11", priority:"גבוהה", link:"https://secure.booking.com/myreservations.html", countryId:"thailand", order:14},
      ...WEST_TASKS.map(t=>({id:uid('m'), status:"todo", category:"הזמנות", countryId:"thailand", ...t})),
      {id:uid('m'), owner:"both", category:"הזמנות", title:"להזמין את טיסת TG203 לפוקט", status:"todo", deadline:"2026-11-01", notes:"08:00 → 09:25 · ฿5,390 לשניים, 23 ק״ג לכל אחד. הוזזה מ-06:50 כדי לישון עוד שעה ועדיין לתפוס את סירת 11:00", priority:"גבוהה", link:"https://www.thaiairways.com/", countryId:"thailand", order:9},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"לאשר טלפונית את פרטי החשבון של המחנה", status:"done", deadline:"2026-10-05", notes:"לפני שמעבירים ฿6,075 — פרטי בנק במייל הם הדבר הכי מזויף בהזמנות. החשבון על שם פרטי ובכתובת בחון קאן, לא באי", priority:"גבוהה", link:"", countryId:"thailand", order:10},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"להעביר מקדמה ฿6,075 ב-Wise למחנה", status:"done", deadline:"2026-10-10", notes:"זה מה שסוגר את ההזמנה. ฿12,150 סה״כ, היתרה במזומן בהגעה", priority:"גבוהה", link:"", countryId:"thailand", order:11},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"למשוך ฿6,075 מזומן ליתרה במחנה", status:"todo", deadline:"2026-11-25", notes:"אין כרטיסים ואין העברות במקום. כספומט גובה ฿220 לכל משיכה — למשוך בבת אחת", priority:"בינונית", link:"", countryId:"thailand", order:12},
      {id:uid('m'), owner:"both", category:"כניסה לתאילנד", title:"להגיש TDAC — 72 שעות לפני הנחיתה", status:"todo", deadline:"2026-11-19", notes:"חובה, חינם, אונליין. כל אתר שגובה כסף הוא לא הרשמי", priority:"גבוהה", link:"", countryId:"thailand", order:11},

      {id:uid('m'), owner:"itai", category:"מואיי תאי", title:"לקנות מגן שיניים בארץ", status:"todo", deadline:"2026-11-15", notes:"", priority:"בינונית", link:"", countryId:null, order:12},
      {id:uid('m'), owner:"itai", category:"מואיי תאי", title:"לוודא שהביטוח מכסה ספורט מגע", status:"todo", deadline:"2026-11-10", notes:"מואיי תאי לא תמיד כלול בפוליסה רגילה", priority:"גבוהה", link:"", countryId:null, order:13},
      {id:uid('m'), owner:"itai", category:"קטנוע", title:"רישיון בינלאומי 1949 עם קטגוריית אופנוע (A)", status:"todo", deadline:"2026-11-10", notes:"אתה הרוכב, אז זה עליך. בלי קטגוריה A הביטוח לא משלם גם על שריטה. מוציאים בארץ לפני הטיסה — אי אפשר להסתדר עם זה בתאילנד.", priority:"גבוהה", link:"", countryId:null, order:14},
      {id:uid('m'), owner:"both", category:"קטנוע", title:"ביטוח: רכיבה לאיתי, נסיעה כנוסעת לטליה", status:"todo", deadline:"2026-11-10", notes:"לבדוק גם עד איזה נפח מנוע — הרבה פוליסות עוצרות ב-125cc", priority:"גבוהה", link:"", countryId:null, order:15},
      {id:uid('m'), owner:"itai", category:"ISB", title:"לתאם ביקור בוגרים ב-ISB", status:"todo", deadline:"2026-11-20", notes:ISB_NOTE, priority:"בינונית", link:"", countryId:"thailand", order:15},

      {id:uid('m'), owner:"talia", category:"קורס יוגה", title:"לשלם את היתרה על הקורס בפאי", status:"todo", deadline:"2026-11-01", notes:"", priority:"גבוהה", link:"", countryId:"thailand", order:16},
      {id:uid('m'), owner:"talia", category:"ויזה", title:"הארכת שהייה — הפטור קוצר ל-30 יום", status:"done", deadline:"2026-12-15", notes:"לא צריך: הטיסה לסרי לנקה ב-21/12, לפני שהפטור נגמר ב-22/12. אם התוכנית משתנה — הארכה של 30 יום ฿1,900", priority:"גבוהה", link:"", countryId:"thailand", order:17},
      {id:uid('m'), owner:"talia", category:"טיסות המשך", title:"טיסה מתאילנד לסרי לנקה", status:"todo", deadline:"2026-11-20", notes:ONWARD_NOTE, priority:"גבוהה", link:"", countryId:null, order:18},
      {id:uid('m'), owner:"talia", category:"טיסות המשך", title:"כרטיס יציאה מתאילנד לפני הכניסה בפברואר", status:"todo", deadline:"2027-02-01", notes:"בכניסה לקופנגן באמצע פברואר הפטור מתחיל מחדש (30 יום), ושוב צריך להראות כרטיס יציאה — למשל לפיליפינים", priority:"בינונית", link:"", countryId:null, order:19},
      ...TALIA_TASKS.map(t=>({id:uid('m'), owner:"talia", status:"todo", category:"המסלול של טליה", countryId:null, ...t}))
    ]))))),
    packingBreakdown:"Osprey Renn 65L לכל הציוד → Osprey Daylite Plus 20L למטוס, נסיעות וטיולי יום → קרוסבודי קטן לטלפון, כסף ודרכון ביום־יום.",
    packingCarryOn:["דרכון","ארנק","טלפון","Power Bank","תרופות למיגרנה","תרופה לבחילות","משקפי שמש","אטמי אוזניים","מסכת עיניים","אוזניות","מגבונים קטנים","טישו","AirTag מחובר למוצ'ילה הגדולה","חולצה + תחתונים להחלפה"],
    packingList: applyShopping([
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"4–5 חולצות / גופיות קלילות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"2–3 מכנסיים קצרים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"מכנס ארוך דק ונוח", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"4–5 סטים של בגדי ספורט / יוגה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"טייץ ארוך נוסף", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"שמלה / אאוטפיט אחד יפה לערב", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"חולצה ארוכה דקה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"פליז / סווטשירט דק", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"מעיל גשם / פונצ'ו מתקפל", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"7–8 תחתונים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"2 חזיות רגילות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"3–4 חזיות ספורט", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"4–5 זוגות גרביים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"פיג'מה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"2 בגדי ים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"סרונג", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"כובע", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👕 בגדים", item:"שק כביסה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👟 נעליים", item:"נעלי ספורט / הליכה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👟 נעליים", item:"סנדלים נוחים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"👟 נעליים", item:"כפכפים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"😴 שינה", item:"אטמי אוזניים – 2–3 זוגות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"😴 שינה", item:"מסכת עיניים טובה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"😴 שינה", item:"אוזניות Noise Cancelling", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"😴 שינה", item:"כרית צוואר קומפקטית / מתנפחת", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"😴 שינה", item:"ציפית כרית דקה – אופציונלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"תרופה לבחילות / מחלת נסיעה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"שקיות הקאה קטנות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"סוכריות / מסטיק ג'ינג'ר", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"בקבוק מים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"מגבונים קטנים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🤢 בחילות ונסיעות", item:"טישו", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"תרופות למיגרנה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"משכך כאבים שמתאים לך", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"משקפי שמש", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"חטיף קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"קומפרס קר רב־פעמי – אופציונלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧠 מיגרנות", item:"מרשם / מכתב רפואי באנגלית לתרופות מרשם, במידת הצורך", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"פלסטרים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"פלסטרים לשלפוחיות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"חומר חיטוי קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"משכך כאבים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"תרופה לשלשול", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"ORS / מלחים להחזרת נוזלים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"אנטיהיסטמין", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"דוחה יתושים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"קרם להרגעת עקיצות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🩹 עזרה ראשונה", item:"תרופות קבועות + ספייר", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"שקית רחצה שלא נרטבת", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מברשת שיניים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"משחת שיניים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"דאודורנט", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"שמפו קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מרכך קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"סבון", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מברשת שיער", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"קרם פנים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"קרם הגנה SPF 50 לפנים ולגוף", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מוצרי הטיפוח הקבועים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"סכין גילוח", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"פינצטה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מוצרי מחזור", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"מגבת מיקרופייבר", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧴 רחצה וטיפוח", item:"גליל נייר טואלט קטן / טישו", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"טלפון", status:"have", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"מטען", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"כבל טעינה נוסף", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"Power Bank", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"מתאם חשמל אוניברסלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"אוזניות", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📱 אלקטרוניקה", item:"AirTag למוצ'ילה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"דרכון", status:"have", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"צילום דרכון", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"עותק דיגיטלי של הדרכון בענן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"רישיון נהיגה", status:"have", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"רישיון נהיגה בינלאומי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"כרטיס אשראי עיקרי", status:"have", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"כרטיס אשראי נוסף – לשמור בנפרד", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"מזומן חירום", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"ביטוח נסיעות + פרטי הפוליסה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"מסמכים רפואיים רלוונטיים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"כמה תמונות פספורט", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🪪 מסמכים וכסף", item:"נרתיק מסמכים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"3–4 Packing Cubes", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"כיסוי גשם למוצ'ילה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"מנעול קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"תיק יום Osprey Daylite Plus 20L – זה שבחרנו", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"תיק צד קטן / קרוסבודי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"Dry Bag קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"כמה שקיות Ziplock", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"חבל כביסה קטן + אטבים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"פנס ראש קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"בקבוק מים רב־פעמי", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"שקית בד מתקפלת", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"עט", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"מחברת קטנה", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"🧳 ציוד לטיול", item:"קלפים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📚 דברים אישיים", item:"תהילים", status:"need", quantity:"", notes:""},
      {id:uid('p'), owner:"talia", category:"📚 דברים אישיים", item:"ספר לקריאה", status:"need", quantity:"", notes:""},

      /* הרשימה של איתי — שבועיים, תיק אחד, ומחנה מואיי תאי באמצע */
      ...itaiPacking()
    ]),
    savedPlaces:[
      {id:uid('sp'), countryId:"thailand", destinationId:paiId, name:"Coffee in Love", category:"cafe", mapsLink:"", note:"נשמע כמו מקום שקט לעבוד ממנו", status:"want", priority:"בינונית", lat:19.3611, lng:98.4394},
      {id:uid('sp'), countryId:"thailand", destinationId:paiId, name:"Yoga Garden Pai", category:"yoga", mapsLink:"", note:"", status:"must", priority:"גבוהה", lat:null, lng:null},
      {id:uid('sp'), countryId:"srilanka", destinationId:weligamaId, name:"Coconut Tree Hill", category:"view", mapsLink:"", note:"מיריסה, 15 דקות מוולגמה — נקודת צילום מפורסמת", status:"want", priority:"בינונית", lat:5.9270, lng:80.4457}
    ],
    documents:[
      {id:uid('doc'), name:"דרכון — צילום", category:"דרכון", sensitive:true, notes:""},
      {id:uid('doc'), name:"פוליסת ביטוח נסיעות", category:"ביטוח", sensitive:true, notes:""},
      {id:uid('doc'), name:"אישור הרשמה לקורס יוגה", category:"קורס יוגה", sensitive:false, notes:""}
    ],
    expenses:[],
    shared: window.SHARED_SEED ? JSON.parse(JSON.stringify(window.SHARED_SEED)) : null
  };
}

/* =========================================================
   STATE / PERSISTENCE
========================================================= */
let STATE = null;
let activeTab = "home";
let activeCountry = "thailand";
let moneySection = "balance";
let moneyCategory = "";
let moneyPayment = "";
let expandedDest = {};
let expandedRow = {};
let todayIndex = null;
let activeCountrySection = "prep";
let saveTimer = null;
let leafletMap = null;
let mapMarkers = [];
let mapPolyline = null;
let mapAddMode = false;
let mapFilter = "both";
let expandedCats = {};
let moreSection = "master";
let expandedDays = {};
let savedFilter = {country:'', dest:'', category:'', status:''};
let expenseFilter = {country:'', dest:'', category:'', month:'', pay:'', currency:''};
let storageAvailable = true;
let undoSnapshot = null;
let undoTimer = null;
/* רשימת הקניות: איזה מקום מוצג, ואילו קבוצות "כבר נקנו" פתוחות */
let shopFilter = 'all';
let shopBoughtOpen = {il:false, th:false};

/* =========================================================
   מי אני — כל מסך באפליקציה נגזר מזה
========================================================= */
const PEOPLE = {
  itai:  {id:'itai',  name:'איתי',  emoji:'🧭', theme:'itai'},
  talia: {id:'talia', name:'טליה', emoji:'🌏', theme:'talia'}
};
function meId(){ return (window.TRIP_USER && window.TRIP_USER.username) || 'itai'; }
function me(){ return PEOPLE[meId()] || PEOPLE.itai; }
function other(){ return meId()==='itai' ? PEOPLE.talia : PEOPLE.itai; }
function personName(id){ return (PEOPLE[id] && PEOPLE[id].name) || id; }

/** כל פריט נושא owner: 'both' (הקטע המשותף) או שם של אחד מהשניים */
function mine(item){
  const owner = item && item.owner;
  if(!owner || owner==='both') return true;
  return owner === meId();
}
function ownerBadge(owner){
  if(!owner || owner==='both') return `<span class="own-tag both">ביחד</span>`;
  return `<span class="own-tag ${owner}">${PEOPLE[owner].emoji} ${PEOPLE[owner].name} לבד</span>`;
}

/** התאריך שבו טליה ממשיכה לבד — הגבול בין הקטע המשותף להמשך שלה */
function splitDate(){ return (STATE.trip && STATE.trip.splitDate) || '2026-12-08'; }
/** היום שבו איתי טס הביתה — אחרי שטליה כבר ממשיכה לבד */
function homeDate(){ return (STATE.trip && STATE.trip.itai && STATE.trip.itai.homeDate) || splitDate(); }

function applyTheme(){
  document.documentElement.dataset.user = me().theme;
}

function ensureDefaults(){
  if(!STATE.savedPlaces) STATE.savedPlaces = [];
  if(!STATE.expenses) STATE.expenses = [];

  /* מסמך שנשמר לפני שהאפליקציה התפצלה לשני משתמשים — משלימים את החסר */
  const fresh = seedData();

  /* ברירות מחדל חייבות להיות במקום לפני שהמיגרציות נשענות עליהן */
  if(!STATE.trip) STATE.trip = fresh.trip;
  if(!STATE.money) STATE.money = fresh.money;
  if(!STATE.money.expenses) STATE.money.expenses = [];
  if(!STATE.money.settlements) STATE.money.settlements = [];
  if(!STATE.money.budgets) STATE.money.budgets = fresh.money.budgets;
  if(!STATE.money.defaultSplit) STATE.money.defaultSplit = fresh.money.defaultSplit;
  if(!STATE.money.rate) STATE.money.rate = fresh.money.rate;

  /*
   * טליה טסה לקורס בפאי ב-8/12 ולא ב-6/12. מסמכים שנשמרו לפני ההחלטה הזאת
   * מחזיקים את התאריכים הישנים, ולכן מתקנים אותם פעם אחת.
   */
  if(!STATE.schema || STATE.schema < 2){
    const shift = {
      "צ'יאנג מאי":       {arrival:"2026-12-08", departure:"2026-12-09", nights:1},
      "פאי — קורס מורים ליוגה":{arrival:"2026-12-09", departure:"2027-01-08", nights:30},
      "קולומבו":          {arrival:"2027-01-08", departure:"2027-01-09", nights:1},
      "מיריסה":           {arrival:"2027-01-09", departure:"2027-01-15", nights:6},
      "אלה":              {arrival:"2027-01-15", departure:"2027-01-19", nights:4},
      "ארוגם ביי":        {arrival:"2027-01-19", departure:"2027-01-25", nights:6}
    };
    STATE.countries.forEach(c=>c.destinations.forEach(d=>{
      const fix = shift[d.name];
      if(fix) Object.assign(d, fix);
    }));
    if(STATE.trip && STATE.trip.talia && !STATE.trip.talia.onwardFlight){
      STATE.trip.talia.onwardFlight = fresh.trip.talia.onwardFlight;
      STATE.trip.talia.onwardDate = fresh.trip.talia.onwardDate;
    }
    STATE.schema = 2;
  }

  /*
   * מסמכים שנשמרו לפני הפיצול לשני משתמשים מחזיקים עדיין את המסלול הראשון
   * של טליה — בלי בעלות, בלי תמונות, ועם התחנות שהגיליון המשותף החליף.
   * מיישרים אותם מול התוכנית הנוכחית בלי לאבד מה שהוסיפו בעצמם.
   */
  if(STATE.schema < 3){
    fresh.countries.forEach(seedCountry=>{
      let country = findCountry(seedCountry.id);
      if(!country){ STATE.countries.push(JSON.parse(JSON.stringify(seedCountry))); return; }
      if(!country.owner) country.owner = seedCountry.owner;

      seedCountry.destinations.forEach(seedDest=>{
        const existing = country.destinations.find(d=>d.name===seedDest.name);
        if(!existing){
          country.destinations.push(JSON.parse(JSON.stringify(seedDest)));
          return;
        }
        // השדות שנוספו בעיצוב החדש, והתאריכים המתוקנים
        ['owner','wiki','hue','arrival','departure','nights','status','order'].forEach(key=>{
          if(seedDest[key]!==undefined) existing[key] = seedDest[key];
        });
        ['notes','accommodation','transport','budget'].forEach(key=>{
          if(!existing[key] && seedDest[key]) existing[key] = seedDest[key];
        });
      });

      // תחנה זמנית מהתוכנית הראשונה שהגיליון המשותף החליף — מוסרת רק אם לא נגעו בה
      country.destinations = country.destinations.filter(d=>{
        const replaced = d.name === 'האיים הדרומיים (קו סמוי/פיפי)';
        const untouched = !d.accommodation && !d.owner;
        return !(replaced && untouched);
      });
    });

    STATE.schema = 3;
  }

  /* שכבת הקטנועים — נוספה אחרי שהתוכנית כבר נשמרה */
  if(STATE.schema < 4){
    const seedShared = window.SHARED_SEED;
    if(seedShared && STATE.shared && STATE.shared.days){
      seedShared.days.forEach(seedDay=>{
        const day = STATE.shared.days.find(d=>d.id===seedDay.id);
        if(!day) return;
        seedDay.rows.forEach(seedRow=>{
          if(!day.rows.some(r=>r.id===seedRow.id)) day.rows.push(JSON.parse(JSON.stringify(seedRow)));
        });
      });
      if(!STATE.shared.scooterInfo) STATE.shared.scooterInfo = seedShared.scooterInfo;
    }
    // טקסטים מהתוכנית הראשונה שכבר לא נכונים אחרי שהמסלול המשותף נקבע
    const staleNotes = [
      'התחלה משותפת עם בן הזוג',
      'חופים וצלילה עם בן הזוג',
      'תחנת מעבר בדרך לפאי, סיום החלק הזוגי'
    ];
    fresh.countries.forEach(seedCountry=>{
      const country = findCountry(seedCountry.id);
      if(!country) return;
      seedCountry.destinations.forEach(seedDest=>{
        const dest = country.destinations.find(d=>d.name===seedDest.name);
        if(!dest) return;
        if(seedDest.scooter && !dest.scooter) dest.scooter = seedDest.scooter;
        if(seedDest.notes && staleNotes.includes((dest.notes||'').trim())) dest.notes = seedDest.notes;
        if(seedDest.accommodation && !dest.accommodation) dest.accommodation = seedDest.accommodation;
        if(seedDest.transport && staleNotes.includes((dest.transport||'').trim())) dest.transport = seedDest.transport;
      });
    });
    STATE.schema = 4;
  }

  /*
   * אופנוע אחד במקום שניים — איתי רוכב וטליה מאחור — והמלון בבנגקוק
   * שנשמט מפנקס ההוצאות.
   */
  if(STATE.schema < 5){
    const seedShared = window.SHARED_SEED;
    if(seedShared && STATE.shared && STATE.shared.days){
      seedShared.days.forEach(seedDay=>{
        const day = STATE.shared.days.find(d=>d.id===seedDay.id);
        if(!day) return;
        if(seedDay.summary) day.summary = seedDay.summary;
        seedDay.rows.forEach((seedRow, seedIndex)=>{
          const row = day.rows.find(r=>r.id===seedRow.id);
          if(!row){
            // נכנסת במקום שלה ביום, לא בסוף
            day.rows.splice(Math.min(seedIndex, day.rows.length), 0, JSON.parse(JSON.stringify(seedRow)));
            return;
          }
          if(seedRow.wiki && !row.wiki) row.wiki = seedRow.wiki;
          // שורות שהאפליקציה מנהלת — נשארות מסונכרנות עם התוכנית
          if(seedRow.managed){
            ['act','time','dur','baht','status','notes','link','wiki'].forEach(k=>{
              if(seedRow[k]!==undefined) row[k] = seedRow[k];
            });
            row.managed = true;
          }
        });
        // סדר השורות נקבע על ידי התוכנית; שורות שהוסיפו ידנית נשארות בסוף
        const seedOrder = new Map(seedDay.rows.map((r,i)=>[r.id, i]));
        day.rows.sort((a,b)=>{
          const ai = seedOrder.has(a.id) ? seedOrder.get(a.id) : 1e6;
          const bi = seedOrder.has(b.id) ? seedOrder.get(b.id) : 1e6;
          return ai - bi;
        });
      });
      if(seedShared.scooterInfo) STATE.shared.scooterInfo = seedShared.scooterInfo;
    }
    fresh.countries.forEach(seedCountry=>{
      const country = findCountry(seedCountry.id);
      if(!country) return;
      seedCountry.destinations.forEach(seedDest=>{
        const dest = country.destinations.find(d=>d.name===seedDest.name);
        if(dest && seedDest.scooter) dest.scooter = JSON.parse(JSON.stringify(seedDest.scooter));
      });
    });
    // הרישיון שייך לרוכב בלבד
    STATE.masterChecklist.forEach(t=>{
      if(t.category==='קטנוע' && /רישיון בינלאומי/.test(t.title)) t.owner = 'itai';
    });
    // כל הוצאה קיימת נחשבת כמשולמת, והמלון החסר נוסף
    (STATE.money.expenses||[]).forEach(x=>{ if(!x.status) x.status = 'paid'; });
    fresh.money.expenses.forEach(seedExpense=>{
      if(!STATE.money.expenses.some(x=>x.title===seedExpense.title)){
        STATE.money.expenses.push(JSON.parse(JSON.stringify(seedExpense)));
      }
    });
    STATE.schema = 5;
  }

  /* חבילת המחנה בקו יאו נוי, אחרי שהמחיר והתנאים סוכמו מול KYN Phoenix */
  /* הזמנת המחנה — רצה לפני תיקון המחיר שאחריה */
  if(STATE.schema < 6) migrateKynBooking();

  /*
   * תיקון המחיר של המחנה מ-฿14,580 ל-฿12,150, ויום ראשון שבו אין אימונים
   * ואין אוכל. רץ אחרי מיגרציית ה-KYN, שמביאה את השורות וההזמנה.
   */
  if(STATE.schema < 7){
    const seedShared = window.SHARED_SEED;
    if(seedShared && STATE.shared && seedShared.campPayment){
      STATE.shared.campPayment = JSON.parse(JSON.stringify(seedShared.campPayment));
    }
    const kyn = (STATE.money.expenses||[]).find(x=>x.bookingKey==='kyn-2026-11');
    const freshKyn = fresh.money.expenses.find(x=>x.bookingKey==='kyn-2026-11');
    if(kyn && freshKyn && kyn.status!=='paid' && kyn.amount===14580){
      kyn.amount = freshKyn.amount;
      kyn.title  = freshKyn.title;
      kyn.note   = freshKyn.note;
    }
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>t.title!=='לסגור את המחנה בקו יאו נוי');
    STATE.schema = 7;
  }

  /*
   * טליה עוד לא הוציאה שקל על הטיול. טיסת החזור של איתי נרשמה בטעות על שמה,
   * וזה הפך את הפנקס על פניו — היא נראתה כמי ששילמה ₪1,891 ואיתי כמי שחייב לה.
   * הכרטיס נשאר כולו על חשבונו (full-itai), רק המשלם מתוקן.
   */
  if(STATE.schema < 8){
    (STATE.money.expenses||[]).forEach(x=>{
      const isHomeFlight = /IZ598/.test(x.title||'') || /IL-604062/.test(x.note||'');
      if(isHomeFlight && x.paidBy==='talia') x.paidBy = 'itai';
    });
    STATE.schema = 8;
  }

  /*
   * יום 4 נבנה מחדש סביב טיסה מאוחרת יותר: TG203 ב-08:00 במקום VZ314 ב-06:50.
   * השכמה ב-05:30 במקום 04:30, וסירת 11:00 מבאנג רונג — כך שגם צ׳ק-אין,
   * צהריים, מנוחה ואימון הטכניקה ב-16:00 נשארים במקום.
   */
  if(STATE.schema < 9){
    const seedShared = window.SHARED_SEED;
    const seedDay = seedShared && seedShared.days.find(d=>d.date==='2026-11-26');
    const day = STATE.shared && (STATE.shared.days||[]).find(d=>d.date==='2026-11-26');
    if(seedDay && day){
      seedDay.rows.forEach(seedRow=>{
        if(!seedRow.managed) return;
        // השורה מזוהה לפי המזהה שלה; הכותרת עצמה השתנתה עם שם הטיסה
        const row = day.rows.find(r=>r.id===seedRow.id);
        if(!row) return;
        ['act','time','dur','baht','status','notes','link'].forEach(k=>{
          if(seedRow[k]!==undefined) row[k] = seedRow[k];
        });
        if(seedRow.priceEstimate) row.priceEstimate = JSON.parse(JSON.stringify(seedRow.priceEstimate));
        row.managed = true;
      });
    }
    if(seedShared && STATE.shared) STATE.shared.flights = JSON.parse(JSON.stringify(seedShared.flights));
    const task = STATE.masterChecklist.find(t=>/VZ314/.test(t.title||''));
    const freshTask = fresh.masterChecklist.find(t=>/TG203/.test(t.title||''));
    if(task && freshTask && task.status!=='done'){
      task.title = freshTask.title;
      task.notes = freshTask.notes;
      task.link  = freshTask.link;
    }
    const koyao = STATE.countries.flatMap(c=>c.destinations).find(d=>d.name==='קו יאו נוי — מחנה מואיי תאי');
    if(koyao && /Vietjet/.test(koyao.transport||'')) koyao.transport = "Thai Airways TG203 לפוקט ואז ספידבוט";
    STATE.schema = 9;
  }

  /*
   * רשימת הציוד נשמרה כשכל פריט מסומן "לקנות" — כלומר היא אמרה לקנות דרכון,
   * טלפון וגרביים, ורשימת הקניות לא הייתה שווה כלום. עכשיו רק מה שבאמת קונים
   * מסומן כך, עם מקום ומחיר; השאר מסומן כמשהו שכבר יש. פריטים שנערכו ידנית
   * (סטטוס שנבחר, הערה או כמות שנכתבו) נשארים כפי שהם.
   */
  if(STATE.schema < 10){
    applyShopping(STATE.packingList, true);
    STATE.schema = 10;
  }

  /*
   * ימי קאו לק מסודרים מחדש. סימילן עבר מ-7/12 ל-3/12: אם הים מבטל את השייט,
   * יש עכשיו שני ימי גיבוי (4/12 ו-7/12) במקום אף אחד לפני הטיסה. קאו סוק —
   * טיול יום, בלי לינה — עבר ל-5/12, כדי ששני הימים הארוכים לא יהיו צמודים.
   *
   * מזיזים את תוכן הימים כיחידה — השורות עוברות עם הסימונים, ההערות והשיחות
   * שלהן. מזהים לפי השורות עצמן ולא לפי התאריך, כך שמסמך שכבר הוזז לא יוזז שוב.
   */
  if(STATE.schema < 11){
    const days = (STATE.shared && STATE.shared.days) || [];
    const at = date => days.find(d=>d.date===date);
    const holds = (day, prefix) => !!day && day.rows.some(r=>String(r.id||'').startsWith(prefix));
    const swap = (a, b)=>{ ['dest','rows','summary'].forEach(k=>{ const t=a[k]; a[k]=b[k]; b[k]=t; }); };
    if(holds(at('2026-12-07'),'s_15_') && holds(at('2026-12-03'),'s_11_')) swap(at('2026-12-03'), at('2026-12-07'));
    if(holds(at('2026-12-04'),'s_12_') && holds(at('2026-12-05'),'s_13_')) swap(at('2026-12-04'), at('2026-12-05'));

    // כותרות הימים והשורות שהתוכנית מנהלת — לבנגקוק (לוי קראתונג), למעבר ולימי קאו לק
    const seedShared = window.SHARED_SEED;
    ['2026-11-24','2026-12-02','2026-12-03','2026-12-04','2026-12-05','2026-12-07'].forEach(date=>{
      const seedDay = seedShared && seedShared.days.find(d=>d.date===date);
      const day = at(date);
      if(!seedDay || !day) return;
      day.dest = seedDay.dest;
      day.summary = seedDay.summary;
      seedDay.rows.forEach(seedRow=>{
        if(!seedRow.managed) return;
        const row = day.rows.find(r=>r.id===seedRow.id);
        if(!row) return;
        ['act','time','dur','baht','status','notes','link'].forEach(k=>{
          if(seedRow[k]!==undefined) row[k] = seedRow[k];
        });
        if(seedRow.priceEstimate) row.priceEstimate = JSON.parse(JSON.stringify(seedRow.priceEstimate));
        row.managed = true;
      });
    });

    // הלילה על האגם הוא הגרסה שלא נבחרה
    const seedBungalow = seedShared && (seedShared.hotels||[]).find(h=>h.hotel==='בונגלו צף על אגם צ׳או לאן');
    const bungalow = STATE.shared && (STATE.shared.hotels||[]).find(h=>h.hotel==='בונגלו צף על אגם צ׳או לאן');
    if(seedBungalow && bungalow) Object.assign(bungalow, JSON.parse(JSON.stringify(seedBungalow)));
    STATE.schema = 11;
  }

  /*
   * מאאו נאנג לקאו לק בוואן משותף במקום רכב פרטי: ฿900 לשניים במקום ฿3,300.
   * הוואן אוסף בין 11:30 ל-14:30, אז היום נבנה סביבו — בוקר בווילה עם הבריכה,
   * צ׳ק-אאוט ב-11:00, והגעה לקלימה אחר הצהריים. שורות שנוספו ידנית נשארות,
   * אחרי שורות התוכנית.
   */
  if(STATE.schema < 12){
    const seedDay = window.SHARED_SEED && window.SHARED_SEED.days.find(d=>d.date==='2026-12-02');
    const day = STATE.shared && (STATE.shared.days||[]).find(d=>d.date==='2026-12-02');
    if(seedDay && day){
      seedDay.rows.forEach((seedRow, i)=>{
        if(!day.rows.some(r=>r.id===seedRow.id)) day.rows.splice(Math.min(i, day.rows.length), 0, JSON.parse(JSON.stringify(seedRow)));
      });
      seedDay.rows.forEach(seedRow=>{
        if(!seedRow.managed) return;
        const row = day.rows.find(r=>r.id===seedRow.id);
        ['act','time','dur','loc','baht','status','notes','link'].forEach(k=>{
          if(seedRow[k]!==undefined) row[k] = seedRow[k];
        });
        if(seedRow.priceEstimate) row.priceEstimate = JSON.parse(JSON.stringify(seedRow.priceEstimate));
        row.managed = true;
      });
      const order = new Map(seedDay.rows.map((r,i)=>[r.id, i]));
      day.rows.sort((a,b)=>(order.has(a.id)?order.get(a.id):1e6) - (order.has(b.id)?order.get(b.id):1e6));
    }
    const task = STATE.masterChecklist.find(t=>t.title==='להזמין רכב מאאו נאנג לקאו לק');
    const freshTask = fresh.masterChecklist.find(t=>t.title==='להזמין ואן משותף מאאו נאנג לקאו לק');
    // משימה שכבר סומנה כבוצעה פירושה שהוזמן רכב — לא משנים אותה מתחת לידיים
    if(task && freshTask && task.status!=='done') Object.assign(task, {title:freshTask.title, notes:freshTask.notes, link:freshTask.link});
    STATE.schema = 12;
  }

  /*
   * המלון בבנגקוק הוזמן ישירות באתר עם קוד Member: Historic Cabin Family,
   * ฿8,169.87 לשלושה לילות (אישור 3051425), במקום ₪1,128 בבוקינג. מעדכנים את
   * ההוצאה בפנקס — ממנה התחזית לוקחת את המחיר — ואת ההזמנה, המלון ושורות הלינה.
   */
  if(STATE.schema < 13){
    const seedShared = window.SHARED_SEED;
    const days = (STATE.shared && STATE.shared.days) || [];
    ['2026-11-23','2026-11-24','2026-11-25'].forEach(date=>{
      const seedDay = seedShared && seedShared.days.find(d=>d.date===date);
      const day = days.find(d=>d.date===date);
      if(!seedDay || !day) return;
      seedDay.rows.forEach(seedRow=>{
        if(!seedRow.managed || !/Montraj|מונטראג/.test(seedRow.act)) return;
        const row = day.rows.find(r=>r.id===seedRow.id);
        if(!row) return;
        ['act','time','baht','status','notes','link'].forEach(k=>{ if(seedRow[k]!==undefined) row[k] = seedRow[k]; });
        if(seedRow.priceEstimate) row.priceEstimate = JSON.parse(JSON.stringify(seedRow.priceEstimate));
        row.managed = true;
      });
    });
    const replaceBy = (list, seedList, key)=>{
      const seedItem = (seedList||[]).find(x=>x[key]==='Montraj Coach Sukhumvit');
      const item = (list||[]).find(x=>x[key]==='Montraj Coach Sukhumvit');
      if(seedItem && item) Object.assign(item, JSON.parse(JSON.stringify(seedItem)));
    };
    if(seedShared && STATE.shared){
      replaceBy(STATE.shared.bookings, seedShared.bookings, 'what');
      replaceBy(STATE.shared.hotels, seedShared.hotels, 'hotel');
    }
    // רק אם ההוצאה עדיין הזמנת בוקינג המקורית — סכום שתוקן ידנית נשאר
    const expense = (STATE.money.expenses||[]).find(x=>/Montraj Coach/.test(x.title||''));
    const freshExpense = MONTRAJ_EXPENSE_31;
    if(expense && freshExpense && expense.amount===1128 && expense.currency==='ILS'){
      Object.assign(expense, {amount:freshExpense.amount, currency:freshExpense.currency, note:freshExpense.note});
    }
    STATE.schema = 13;
  }

  /* יותר חיי לילה: חאו סן, שני לילות באאו נאנג ושניים בקאו לק — רק בערבים שאחריהם אין השכמה מוקדמת */
  if(STATE.schema < 14){
    const seedShared = window.SHARED_SEED;
    ['2026-11-23','2026-11-29','2026-12-01','2026-12-06','2026-12-07'].forEach(date=>{
      const seedDay = seedShared && seedShared.days.find(d=>d.date===date);
      const day = STATE.shared && (STATE.shared.days||[]).find(d=>d.date===date);
      if(!seedDay || !day) return;
      seedDay.rows.forEach((seedRow, i)=>{
        if(/_night$/.test(seedRow.id) && !day.rows.some(r=>r.id===seedRow.id)){
          const prev = seedDay.rows[i-1];
          const at = prev ? day.rows.findIndex(r=>r.id===prev.id) : -1;
          day.rows.splice(at>=0 ? at+1 : day.rows.length, 0, JSON.parse(JSON.stringify(seedRow)));
        }
      });
      // הגראב חזרה זז אחרי הלילה בחאו סן
      seedDay.rows.filter(r=>r.managed && /גראב חזרה למלון/.test(r.act)).forEach(seedRow=>{
        const idx = day.rows.findIndex(r=>r.id===seedRow.id);
        if(idx<0) return;
        const [row] = day.rows.splice(idx,1);
        Object.assign(row, {time:seedRow.time, notes:seedRow.notes, managed:true});
        const night = day.rows.findIndex(r=>r.id==='s_1_night');
        day.rows.splice(night>=0 ? night+1 : idx, 0, row);
      });
    });
    STATE.schema = 14;
  }

  /*
   * איתי חוזר ב-10/12 מבנגקוק (IZ592) במקום ב-8/12 מפוקט, וטליה נשארת איתו
   * עד הטיסה. מ-2/12: פי פי, לילה בקאו סוק, קאו לאק עם סימילן, פטונג, ולילה
   * אחרון ביחד בבנגקוק. מביאים לכאן גם מסמך מלפני כל השינוי (14) וגם מסמך
   * מסידור קופנגן (15). הימים מ-2/12 נבנים מחדש מהתוכנית — שורות שנוספו
   * ידנית נשארות בתאריך שלהן — ואיתם היעדים, ההזמנות, הפנקס והמשימות.
   */
  if(STATE.schema < 16){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    if(seedShared && STATE.shared && STATE.shared.days){
      const custom = {};
      STATE.shared.days.forEach(d=>{
        if(d.date < '2026-12-02' || d.owner==='talia') return;
        custom[d.date] = (custom[d.date]||[]).concat(d.rows.filter(r=>!/^s_/.test(String(r.id||''))));
      });
      const plan = seedShared.days.filter(d=>d.date >= '2026-12-02').map(d=>{
        const day = copy(d);
        day.rows.push(...(custom[d.date]||[]));
        return day;
      });
      STATE.shared.days = STATE.shared.days.filter(d=>d.date < '2026-12-02' || d.owner==='talia')
        .concat(plan).sort((a,b)=>a.date.localeCompare(b.date));
      const meta = STATE.shared;
      ['title','subtitle','endDate','nights','bases'].forEach(k=>{ if(seedShared[k]!==undefined) meta[k] = copy(seedShared[k]); });
      if(meta.cuts) meta.cuts = meta.cuts.filter(c=>c.what!=='לוותר על קאו סוק');
      const upsert = (list, seedList, key, renames)=>{
        if(!list || !seedList) return list;
        seedList.forEach((item, i)=>{
          const found = list.find(x=>x[key]===item[key] || (renames[item[key]] && x[key]===renames[item[key]]));
          if(found) Object.assign(found, copy(item));
          else{
            const prev = seedList[i-1];
            const at = prev ? list.findIndex(x=>x[key]===prev[key]) : -1;
            list.splice(at>=0 ? at+1 : list.length, 0, copy(item));
          }
        });
        return list;
      };
      upsert(meta.bookings, seedShared.bookings, 'what', {'ארקיע IZ592':'ארקיע IZ598'});
      upsert(meta.hotels, seedShared.hotels, 'hotel', {});
      if(meta.flights){
        meta.flights = meta.flights.filter(f=>!/צ׳יאנג מאי · טליה/.test(f.what));
        const home = meta.flights.find(f=>/IZ598/.test(f.what));
        const seedHome = seedShared.flights.find(f=>/IZ592/.test(f.what));
        if(home && seedHome) Object.assign(home, copy(seedHome));
        upsert(meta.flights, seedShared.flights, 'what', {'פוקט → בנגקוק · שניכם':'פוקט → בנגקוק · איתי'});
      }
    }

    // הלילה הגדול באאו נאנג זז ל-30/11: ב-2/12 יוצאים לפי פי, אחרי ארוחת בוקר
    const days16 = (STATE.shared && STATE.shared.days) || [];
    const dec1 = days16.find(d=>d.date==='2026-12-01'), nov30 = days16.find(d=>d.date==='2026-11-30');
    const seedNight = seedShared && seedShared.days.flatMap(d=>d.rows).find(r=>r.id==='s_9_night');
    const at = dec1 ? dec1.rows.findIndex(r=>r.id==='s_9_night') : -1;
    if(nov30 && seedNight && !nov30.rows.some(r=>r.id==='s_9_night')){
      const night = at>=0 ? dec1.rows.splice(at, 1)[0] : copy(seedNight);
      Object.assign(night, {time:seedNight.time, notes:seedNight.notes});
      const dinner = nov30.rows.findIndex(r=>r.id==='s_8_7');
      nov30.rows.splice(dinner>=0 ? dinner+1 : nov30.rows.length, 0, night);
    }

    // היעדים מ-2/12 — ומה שכבר לא במסלול יוצא
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      thai.destinations = thai.destinations.filter(d=>!['קופנגן','קאו לאק — עוד לילה','פטונג'].includes(d.name));
      const oldNames = {'קאו לאק':['קאו לק']};
      ['קו פי פי','קאו סוק','קאו לאק','בנגקוק — לילה אחרון',"צ'יאנג מאי"].forEach(name=>{
        const freshDest = freshThai.destinations.find(d=>d.name===name)
          || (name==='בנגקוק — לילה אחרון' && freshThai.destinations.find(d=>d.name==='בנגקוק — סוף הטיול'));
        if(!freshDest) return;   // פי פי ירד מהמסלול בגרסה 23
        const names = [name, freshDest.name, ...(oldNames[name]||[])];
        const found = thai.destinations.find(d=>names.includes(d.name));
        if(found){ const {id, ...rest} = freshDest; Object.assign(found, copy(rest)); }
        else thai.destinations.push(copy(freshDest));
      });
      // הקורס בפאי מתחיל אחרי שטליה מגיעה צפונה; שהייה שתוקנה ידנית נשארת
      const pai = thai.destinations.find(d=>d.name==='פאי — קורס מורים ליוגה');
      const freshPai = freshThai.destinations.find(d=>d.name==='פאי — קורס מורים ליוגה');
      if(pai && freshPai && pai.arrival==='2026-12-09') Object.assign(pai, {arrival:freshPai.arrival, nights:freshPai.nights, notes:freshPai.notes});
      thai.destinations.sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999') || (a.order||0)-(b.order||0));
    }

    STATE.trip.splitDate = fresh.trip.splitDate;
    STATE.trip.itai = Object.assign({}, STATE.trip.itai, copy(fresh.trip.itai));
    STATE.trip.together = Object.assign({}, STATE.trip.together, copy(fresh.trip.together));
    if(STATE.trip.talia && (!STATE.trip.talia.onwardDate || STATE.trip.talia.onwardDate==='2026-12-08')){
      Object.assign(STATE.trip.talia, {onwardFlight:fresh.trip.talia.onwardFlight, onwardDate:fresh.trip.talia.onwardDate});
    }

    // הפנקס: הטיסה הביתה ושינויה, קלימה ל-5–8/12, בנגקוק לשניים; קופנגן וקאו סוק של 5/12 יוצאים
    const expenses = STATE.money.expenses;
    const freshOf = re => fresh.money.expenses.find(x=>re.test(x.title));
    const home = expenses.find(x=>/^ארקיע IZ598/.test(x.title||''));
    if(home) Object.assign(home, {title:freshOf(/^ארקיע IZ592/).title, note:freshOf(/^ארקיע IZ592/).note});
    const kalima = expenses.find(x=>/Kalima/.test(x.title||''));
    const freshKalima = freshOf(/Kalima/);
    if(kalima && kalima.currency==='ILS' && [4029, 2103, 2661].includes(kalima.amount)){
      Object.assign(kalima, {title:freshKalima.title, amount:freshKalima.amount, note:freshKalima.note});
    }
    if(!expenses.some(x=>/^שינוי טיסה/.test(x.title||''))) expenses.push(copy(freshOf(/^שינוי טיסה/)));
    const eleven = expenses.find(x=>/Eleven Bangkok/.test(x.title||''));
    const freshEleven = freshOf(/Eleven Bangkok/) || ELEVEN_EXPENSE_16;   // ירד מהמסלול בגרסה 25
    if(eleven) Object.assign(eleven, {split:freshEleven.split, note:freshEleven.note});
    else expenses.push(Object.assign({id:uid('x')}, copy(freshEleven)));
    STATE.money.expenses = expenses.filter(x=>!/^Sarana Bungalows|^Our Jungle House/.test(x.title||''));

    // המשימות: מה שכבר לא במסלול יוצא; מה שכבר הוזמן הופך לתזכורת לבטל
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!SUPERSEDED_TASKS.includes(t.title));
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(OLD_PLAN_TASKS.includes(t.title) && t.status!=='done'));
    STATE.masterChecklist.forEach(t=>{
      if(!OLD_PLAN_TASKS.includes(t.title)) return;
      if(t.title==='להזמין טיסה מפוקט לבנגקוק ב-9/12'){
        Object.assign(t, {title:'להוסיף את טליה לטיסה לבנגקוק ב-9/12', status:'todo', owner:'both', notes:'הטיסה של איתי כבר הוזמנה — טליה טסה איתו'});
      } else {
        Object.assign(t, {title:'לבטל: '+t.title.replace(/^להזמין /,''), status:'todo', notes:'הוזמן לפני שהמסלול השתנה'});
      }
    });
    if(STATE.shared) delete STATE.shared.planB;
    STATE.schema = 16;
  }

  /*
   * בלי פטונג, ועם לילה שני בקאו סוק: קאו סוק 4–6/12 (האגם ביום המלא),
   * קלימה 6–9/12, ומשם ב-9/12 לשדה בפוקט ולבנגקוק. הימים מ-4/12 נבנים מחדש,
   * שורות שנוספו ידנית נשארות בתאריך שלהן. במסמך שכבר עבר את גרסה 16 כאן
   * הכל קורה; במסמך ישן יותר גרסה 16 כבר הביאה אותו לאותו מקום.
   */
  if(STATE.schema < 17){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    if(seedShared && STATE.shared && STATE.shared.days){
      const custom = {};
      STATE.shared.days.forEach(d=>{
        if(d.date < '2026-12-04' || d.owner==='talia') return;
        custom[d.date] = (custom[d.date]||[]).concat(d.rows.filter(r=>!/^s_/.test(String(r.id||''))));
      });
      const plan = seedShared.days.filter(d=>d.date >= '2026-12-04').map(d=>{
        const day = copy(d);
        day.rows.push(...(custom[d.date]||[]));
        return day;
      });
      STATE.shared.days = STATE.shared.days.filter(d=>d.date < '2026-12-04' || d.owner==='talia')
        .concat(plan).sort((a,b)=>a.date.localeCompare(b.date));
      const meta = STATE.shared;
      if(seedShared.bases) meta.bases = copy(seedShared.bases);
      if(meta.hotels){
        meta.hotels = meta.hotels.filter(h=>h.dest!=='פטונג');
        meta.hotels.forEach(h=>{ const fresh17 = seedShared.hotels.find(x=>x.hotel===h.hotel); if(fresh17) Object.assign(h, copy(fresh17)); });
      }
      (meta.bookings||[]).forEach(b=>{ const fresh17 = seedShared.bookings.find(x=>x.what===b.what); if(fresh17) Object.assign(b, copy(fresh17)); });
    }
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      thai.destinations = thai.destinations.filter(d=>d.name!=='פטונג');
      ['קאו סוק','קאו לאק','בנגקוק — לילה אחרון'].forEach(name=>{
        const found = thai.destinations.find(d=>d.name===name);
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(!freshDest) return;   // השם השתנה בגרסה 25
        const {id, ...rest} = freshDest;
        if(found) Object.assign(found, copy(rest));
      });
    }
    const kalima = STATE.money.expenses.find(x=>/Kalima/.test(x.title||''));
    const freshKalima = fresh.money.expenses.find(x=>/Kalima/.test(x.title));
    if(kalima && kalima.currency==='ILS' && [4029, 2103, 2661].includes(kalima.amount)){
      Object.assign(kalima, {title:freshKalima.title, amount:freshKalima.amount, note:freshKalima.note});
    }
    // לילה אחד שכבר הוזמן בקאו סוק צריך עכשיו עוד אחד; פטונג שכבר הוזמנה — לבטל
    const ks = STATE.masterChecklist.find(t=>t.title==='להזמין לינה בקאו סוק, 4/12');
    if(ks && ks.status==='done') Object.assign(ks, {title:'להוסיף לילה בקאו סוק — 5/12', status:'todo', notes:'הלילה של 4/12 כבר הוזמן'});
    else STATE.masterChecklist = STATE.masterChecklist.filter(t=>t!==ks);
    // מה שכבר הוזמן לפי התאריכים של גרסה 16 נשאר מסומן, או הופך לתזכורת להזיז
    const lake = STATE.masterChecklist.find(t=>t.title==='להזמין סיור אגם צ׳או לאן עם הסעה לקאו לאק' && t.status==='done');
    if(lake) Object.assign(lake, {title:'להזמין סיור אגם צ׳או לאן, 5/12', notes:'הוזמן · ההסעה לקאו לאק עברה ל-6/12 — לבטל אותה מול המפעיל'});
    const similan = STATE.masterChecklist.find(t=>t.title==='להזמין סימילן, 6/12' && t.status==='done');
    if(similan) Object.assign(similan, {title:'להזיז את סימילן ל-7/12', status:'todo', notes:'הוזמן ל-6/12 — אז עוד בקאו סוק'});
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!SUPERSEDED_TASKS.includes(t.title));
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(t.title==='להזמין לינה בפטונג, 8/12' && t.status!=='done'));
    const patong = STATE.masterChecklist.find(t=>t.title==='להזמין לינה בפטונג, 8/12');
    if(patong) Object.assign(patong, {title:'לבטל: לינה בפטונג, 8/12', status:'todo', notes:'הוזמן לפני שפטונג ירדה מהמסלול'});
    STATE.schema = 17;
  }

  /*
   * בהזמנה של קלימה (5770154448) הביטול החינמי נגמר ב-1/11, לא ב-10/11, ובוקינג
   * מחייבת את מלוא ฿43,875 כבר ב-30/10. המשימה, ההזמנה, המלון והפנקס אמרו אחרת.
   */
  if(STATE.schema < 18){
    const freshTask = fresh.masterChecklist.find(t=>t.title==='לשנות את קלימה ל-6–9/12 בבוקינג');
    const task = freshTask && STATE.masterChecklist.find(t=>t.title===freshTask.title);
    if(task && freshTask) Object.assign(task, {deadline:freshTask.deadline, notes:freshTask.notes, priority:freshTask.priority, order:freshTask.order});
    const seedShared = window.SHARED_SEED;
    const meta = STATE.shared || {};
    const seedBooking = seedShared && seedShared.bookings.find(b=>b.what==='Kalima Resort and Villas');
    const booking = (meta.bookings||[]).find(b=>b.what==='Kalima Resort and Villas');
    if(booking && seedBooking) Object.assign(booking, JSON.parse(JSON.stringify(seedBooking)));
    const seedHotel = seedShared && seedShared.hotels.find(h=>h.hotel==='Kalima Resort and Villas Khao Lak');
    const hotel = (meta.hotels||[]).find(h=>h.hotel==='Kalima Resort and Villas Khao Lak');
    if(hotel && seedHotel) Object.assign(hotel, JSON.parse(JSON.stringify(seedHotel)));
    const expense = STATE.money.expenses.find(x=>/Kalima/.test(x.title||''));
    const freshExpense = fresh.money.expenses.find(x=>/Kalima/.test(x.title));
    if(expense && expense.amount===freshExpense.amount) expense.note = freshExpense.note;
    STATE.schema = 18;
  }

  /*
   * 30/10: קלימה הוזמנה מחדש ל-6–9/12 (7195273990380466772, $621.21, לא מוחזר,
   * בלי ארוחת בוקר), ההזמנה הישנה בוטלה בחינם, ו-Our Jungle House בוטל והוחזר.
   */
  if(STATE.schema < 19){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    STATE.masterChecklist.forEach(t=>{ if(DONE_TASKS.includes(t.title)) t.status = 'done'; });
    const meta = STATE.shared || {};
    if(seedShared){
      [['bookings','what',['Kalima Resort and Villas','Our Jungle House']], ['hotels','hotel',['Kalima Resort and Villas Khao Lak','Our Jungle House']]].forEach(([list, key, names])=>{
        names.forEach(name=>{
          const item = (meta[list]||[]).find(x=>x[key]===name);
          const fresh19 = seedShared[list].find(x=>x[key]===name);
          if(item && fresh19) Object.assign(item, copy(fresh19));
        });
      });
      const seedRows = seedShared.days.flatMap(d=>d.rows);
      (meta.days||[]).forEach(d=>d.rows.forEach(r=>{
        const fresh19 = seedRows.find(x=>x.id===r.id);
        if(!fresh19) return;
        if(r.act==='לינה — Kalima Resort and Villas' || ['s_g7_0','s_g8_0','s_g9_0'].includes(r.id)){
          ['act','baht','loc','notes'].forEach(k=>{ r[k] = fresh19[k]; });
          r.priceEstimate = copy(fresh19.priceEstimate);
        }
      }));
    }
    const kalima = STATE.money.expenses.find(x=>/Kalima/.test(x.title||''));
    const freshKalima = fresh.money.expenses.find(x=>/Kalima/.test(x.title));
    if(kalima && kalima.currency==='ILS' && [4029, 2103, 2661, 2072].includes(kalima.amount)){
      Object.assign(kalima, {title:freshKalima.title, amount:freshKalima.amount, status:'paid', note:freshKalima.note});
    }
    STATE.schema = 19;
  }

  /*
   * המסלול של טליה אחרי 10/12: הצפון עם מלח, סרי לנקה בשלושה שבועות, הודו
   * כטיוטה וקופנגן בפברואר — במקום צ'יאנג מאי בדרך לקורס בפאי, וסרי לנקה
   * של ינואר עם ארוגם ביי שלא בעונה.
   */
  if(STATE.schema < 20){
    const copy = x => JSON.parse(JSON.stringify(x));
    const country = id => (STATE.countries||[]).find(c=>c.id===id);
    const freshCountry = id => fresh.countries.find(c=>c.id===id);
    const swap = (id, oldNames, fromId) => {
      const c = country(id), f = freshCountry(fromId || id);
      if(!c || !f) return;
      c.destinations = c.destinations.filter(d=>!(d.owner==='talia' && oldNames.includes(d.name)));
      f.destinations.filter(d=>d.owner==='talia').forEach(d=>{
        if(!c.destinations.some(x=>x.name===d.name)) c.destinations.push(copy(d));
      });
      c.destinations.sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999') || (a.order||0)-(b.order||0));
    };
    swap('thailand', ["צ'יאנג מאי", 'פאי — קורס מורים ליוגה']);
    swap('srilanka', ['קולומבו', 'מיריסה', 'אלה', 'ארוגם ביי']);
    if(!country('india')){
      const at = STATE.countries.findIndex(c=>c.id==='srilanka');
      STATE.countries.splice(at>=0 ? at+1 : STATE.countries.length, 0, copy(freshCountry('india')));
    }
    if(STATE.trip.talia) Object.assign(STATE.trip.talia, {subtitle:fresh.trip.talia.subtitle, onwardFlight:fresh.trip.talia.onwardFlight});
    const byTitle = t => STATE.masterChecklist.find(x=>x.title===t);
    const flight = byTitle('טיסה מתאילנד לסרי לנקה');
    const freshFlight = fresh.masterChecklist.find(x=>x.title==='טיסה מתאילנד לסרי לנקה');
    if(flight && flight.status!=='done') Object.assign(flight, {deadline:freshFlight.deadline, notes:freshFlight.notes, priority:freshFlight.priority});
    const visa = byTitle('הארכת שהייה — הפטור קוצר ל-30 יום');
    const freshVisa = fresh.masterChecklist.find(x=>x.title==='הארכת שהייה — הפטור קוצר ל-30 יום');
    if(visa) Object.assign(visa, {status:'done', notes:freshVisa.notes});
    STATE.masterChecklist.forEach(t=>{ if(DONE_TASKS.includes(t.title)) t.status = 'done'; });
    STATE.schema = 20;
  }

  /*
   * לטליה פטור של 30 יום ואין לה כרטיס חזור, אז הטיסה לקולומבו היא כרטיס
   * היציאה שיבקשו בצ׳ק-אין ב-22/11 ובכניסה — היא צריכה להיות מוזמנת לפני כן.
   */
  if(STATE.schema < 21){
    const freshFlight = fresh.masterChecklist.find(t=>t.title==='טיסה מתאילנד לסרי לנקה');
    const flight = STATE.masterChecklist.find(t=>t.title===freshFlight.title);
    if(flight && flight.status!=='done') Object.assign(flight, {deadline:freshFlight.deadline, notes:freshFlight.notes, priority:freshFlight.priority});
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const proof = thai && (thai.prepChecklist||[]).find(t=>t.title==='הוכחת יציאה / onward ticket');
    if(proof && proof.status!=='done') Object.assign(proof, {deadline:'2026-11-20', notes:ONWARD_NOTE, priority:'גבוהה'});
    STATE.schema = 21;
  }

  /*
   * 24/11 נבנה מחדש לפי הבקשה: שיט בתעלות שנגמר בוואט ארון, מעבורת לוואט פו,
   * טוק־טוק לארמון, הנדנדה הענקית והר הזהב לפני ארוחת לוי קראתונג. ב-25/11,
   * אחרי ISB, סנטרל צ׳אנגוואטנה. סימונים ושיחות על שורות קיימות נשמרים, ושורות
   * שנוספו ידנית נשארות בסוף היום.
   */
  if(STATE.schema < 22){
    const seedShared = window.SHARED_SEED;
    const days22 = (STATE.shared && STATE.shared.days) || [];
    ['2026-11-24','2026-11-25'].forEach(date=>{
      const seedDay = seedShared && seedShared.days.find(d=>d.date===date);
      const day = days22.find(d=>d.date===date);
      if(!seedDay || !day) return;
      const old = new Map(day.rows.map(r=>[r.id, r]));
      // שורות שהתוכנית כבר לא שמה ביום הזה נשארות עד גרסה 25, שמעבירה את הסימון שלהן ליום החדש
      const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')) || !seedDay.rows.some(x=>x.id===r.id));
      day.rows = seedDay.rows.map(seedRow=>{
        const row = JSON.parse(JSON.stringify(seedRow));
        const before = old.get(seedRow.id);
        if(before){
          if(before.done) row.done = true;
          if(before.talk) row.talk = before.talk;
          if(!seedRow.managed && before.notes) row.notes = before.notes;
        }
        return row;
      }).concat(custom);
      day.summary = seedDay.summary;
    });
    STATE.schema = 22;
  }

  /*
   * פחות מעברים: פי פי יורד כבסיס ונשאר כטיול יום מאאו נאנג. אאו נאנג 29/11–3/12
   * (לילה נוסף בצ׳רמנטרה), קאו סוק 3–5/12 — שני הלילות נשמרים — וקאו לאק 5–9/12
   * (לילה נוסף בקלימה, בהזמנה נפרדת). הימים 2–6/12 נבנים מחדש; סימונים ושיחות
   * עוברים עם השורה גם אם היא זזה יום, ושורות שנוספו ידנית נשארות בתאריך שלהן.
   */
  if(STATE.schema < 23){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const dates23 = ['2026-12-02','2026-12-03','2026-12-04','2026-12-05','2026-12-06'];
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const old = new Map();
      shared.flatMap(d=>d.rows).forEach(r=>{ const seen = old.get(r.id); if(!seen || (!seen.done && !seen.talk)) old.set(r.id, r); });
      dates23.forEach(date=>{
        const seedDay = seedShared.days.find(d=>d.date===date);
        const day = shared.find(d=>d.date===date);
        if(!seedDay) return;
        const custom = day ? day.rows.filter(r=>!/^s_/.test(String(r.id||''))) : [];
        const rows = seedDay.rows.map(seedRow=>{
          const row = copy(seedRow);
          const before = old.get(seedRow.id);
          if(before){
            if(before.done) row.done = true;
            if(before.talk) row.talk = before.talk;
          }
          return row;
        }).concat(custom);
        if(day) Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows});
        else meta.days.push(Object.assign(copy(seedDay), {rows}));
      });
      meta.days.sort((a,b)=>a.date.localeCompare(b.date));
      if(seedShared.bases) meta.bases = copy(seedShared.bases);
      if(meta.hotels){
        meta.hotels = meta.hotels.filter(h=>h.dest!=='קו פי פי');
        seedShared.hotels.forEach((h, i)=>{
          if(!/Chermantra Aonang|Palmview|River Lodge|Kalima/.test(h.hotel)) return;
          const found = meta.hotels.find(x=>x.hotel===h.hotel);
          if(found){ Object.assign(found, copy(h)); return; }
          const next = seedShared.hotels[i+1];
          const at = next ? meta.hotels.findIndex(x=>x.hotel===next.hotel) : -1;
          meta.hotels.splice(at>=0 ? at : meta.hotels.length, 0, copy(h));
        });
      }
      (meta.bookings||[]).forEach(b=>{
        if(!/^Chermantra|^Kalima/.test(b.what||'')) return;
        const fresh23 = seedShared.bookings.find(x=>x.what===b.what);
        if(fresh23) b.details = fresh23.details;
      });
      const booked = (meta.info||[]).find(i=>i.detail==='מוזמן: שתי טיסות ארקיע, מונטראג׳, צ׳רמנטרה, קלימה. כל השאר פתוח.');
      const freshBooked = (seedShared.info||[]).find(i=>/^מוזמן/.test(i.detail));
      if(booked && freshBooked) booked.detail = freshBooked.detail;
    }
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      thai.destinations = thai.destinations.filter(d=>d.name!=='קו פי פי');
      ['אאו נאנג וריילאי','קאו סוק','קאו לאק'].forEach(name=>{
        const found = thai.destinations.find(d=>d.name===name);
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(!found || !freshDest) return;
        const {id, order, ...rest} = freshDest;
        Object.assign(found, copy(rest));
      });
    }
    // מה שלא הוזמן יוצא (הגרסה החדשה מתווספת למטה); מה שכבר הוזמן הופך לתזכורת
    const moved = {
      'להזמין לינה בפי פי, 2–4/12':'לבטל: לינה בפי פי, 2–4/12',
      'להזמין מעבורת מאאו נאנג לפי פי, 2/12':'לבטל: מעבורת מאאו נאנג לפי פי, 2/12',
      'להזמין מעבורת וואן מפי פי לקאו סוק, 4/12':'לבטל: מעבורת וואן מפי פי לקאו סוק, 4/12',
      'להזמין לינה בקאו סוק, 4–6/12':'להזיז את הלינה בקאו סוק ל-3–6/12',
      'להזמין סיור אגם צ׳או לאן, 5/12':'להזיז את סיור האגם ל-4/12',
      'להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 6/12':'להזיז את סיור הג׳ונגל והוואן ל-5/12'
    };
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(moved[t.title] && t.status!=='done'));
    STATE.masterChecklist.forEach(t=>{
      if(moved[t.title]) Object.assign(t, {title:moved[t.title], status:'todo', notes:'הוזמן לפני שהמסלול השתנה'});
    });
    STATE.schema = 23;
  }

  /*
   * לילה שלישי בקאו סוק במקום הרביעי בקאו לאק: קאו סוק 3–6/12 (מערת נאם טאלו
   * וספארי לילה ב-5/12), וקאו לאק 6–9/12 — בדיוק ההזמנה הקיימת בקלימה, בלי
   * הזמנה נפרדת. 5/12 ו-6/12 נבנים מחדש כמו בגרסה 23.
   */
  if(STATE.schema < 24){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const old = new Map();
      shared.flatMap(d=>d.rows).forEach(r=>{ const seen = old.get(r.id); if(!seen || (!seen.done && !seen.talk)) old.set(r.id, r); });
      ['2026-12-03','2026-12-04','2026-12-05','2026-12-06'].forEach(date=>{
        const seedDay = seedShared.days.find(d=>d.date===date);
        const day = shared.find(d=>d.date===date);
        if(!seedDay || !day) return;
        const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')));
        const rows = seedDay.rows.map(seedRow=>{
          const row = copy(seedRow);
          const before = old.get(seedRow.id);
          if(before){
            if(before.done) row.done = true;
            if(before.talk) row.talk = before.talk;
          }
          return row;
        }).concat(custom);
        Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows});
      });
      if(seedShared.bases) meta.bases = copy(seedShared.bases);
      if(meta.hotels){
        meta.hotels = meta.hotels.filter(h=>h.hotel!=='Kalima Resort and Villas · לילה נוסף');
        meta.hotels.forEach(h=>{
          if(!/Palmview|River Lodge/.test(h.hotel)) return;
          const fresh24 = seedShared.hotels.find(x=>x.hotel===h.hotel);
          if(fresh24) Object.assign(h, copy(fresh24));
        });
      }
      const kb = (meta.bookings||[]).find(b=>b.what==='Kalima Resort and Villas');
      if(kb) kb.details = String(kb.details||'').replace(' · הלילה של 5/12 — בהזמנה נפרדת','');
      const freshBooked = (seedShared.info||[]).find(i=>/^מוזמן/.test(i.detail));
      const booked = (meta.info||[]).find(i=>/כולל הלילה הנוסף בכל אחד מהשניים\.$/.test(i.detail||''));
      if(booked && freshBooked) booked.detail = freshBooked.detail;
    }
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      ['קאו סוק','קאו לאק'].forEach(name=>{
        const found = thai.destinations.find(d=>d.name===name);
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(!found || !freshDest) return;
        const {id, order, ...rest} = freshDest;
        Object.assign(found, copy(rest));
      });
    }
    const moved = {
      'להזמין לילה נוסף בקלימה — 5/12':'לבטל: לילה נוסף בקלימה, 5/12',
      'להזמין לינה בקאו סוק, 3–5/12':'להאריך את הלינה בקאו סוק בלילה — 5/12',
      'להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 5/12':'להזיז את סיור הג׳ונגל והוואן ל-6/12'
    };
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(moved[t.title] && t.status!=='done'));
    STATE.masterChecklist.forEach(t=>{
      if(moved[t.title]) Object.assign(t, {title:moved[t.title], status:'todo', notes:'הוזמן לפני שהמסלול השתנה'});
      // מה שהוזמן ל-6/12 לפני גרסה 23 — מתאים שוב
      if(t.title==='להזיז את סיור הג׳ונגל והוואן ל-5/12') Object.assign(t, {title:'להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 6/12', status:'done', notes:''});
    });
    STATE.schema = 24;
  }

  /*
   * מתחילים בצפון: מסוברנבומי ישר לצ׳יאנג מאי (23–26/11, לוי קראתונג ב-24/11),
   * משם לפוקט ולמחנה — באותם תאריכים. קאו סוק 3–5/12, קאו לאק 5–8/12 (לילה נוסף
   * בקלימה, והלילה של 8/12 בהזמנה לא מנוצל), ושני לילות בבנגקוק בסוף במונטראג׳.
   * ובכל הימים — האימונים לפי תאריך. ימים שהשתנו נבנים מחדש; סימונים ושיחות
   * עוברים עם השורה, שורות ידניות נשארות בתאריך שלהן.
   */
  if(STATE.schema < 25){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const old = new Map();
      shared.flatMap(d=>d.rows).forEach(r=>{ const seen = old.get(r.id); if(!seen || (!seen.done && !seen.talk)) old.set(r.id, r); });
      const carry = seedRow=>{
        const row = copy(seedRow);
        const before = old.get(seedRow.id);
        if(before){
          if(before.done) row.done = true;
          if(before.talk) row.talk = before.talk;
          if(!seedRow.managed && before.notes) row.notes = before.notes;
        }
        return row;
      };
      const rebuilt = ['2026-11-23','2026-11-24','2026-11-25','2026-11-26','2026-12-05','2026-12-06','2026-12-07','2026-12-08','2026-12-09','2026-12-10'];
      rebuilt.forEach(date=>{
        const seedDay = seedShared.days.find(d=>d.date===date);
        const day = shared.find(d=>d.date===date);
        if(!seedDay || !day) return;
        const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')));
        Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows:seedDay.rows.map(carry).concat(custom)});
      });
      // אימונים בשאר הימים
      const ord = t => t ? String(t).padStart(5,'0') : '99:99';
      seedShared.days.forEach(seedDay=>{
        const day = shared.find(d=>d.date===seedDay.date);
        if(!day) return;
        seedDay.rows.filter(r=>/^s_w_/.test(r.id) && !day.rows.some(x=>x.id===r.id)).forEach(r=>{
          const at = day.rows.findIndex(x=>!x.time || ord(x.time) > ord(r.time));
          day.rows.splice(at>=0 ? at : day.rows.length, 0, carry(r));
        });
      });
      ['title','bases'].forEach(k=>{ meta[k] = copy(seedShared[k]); });
      if(meta.flights){
        meta.flights = meta.flights.filter(f=>!/TG203|^פוקט → בנגקוק/.test(f.what||''));
        seedShared.flights.forEach((f, i)=>{
          if(meta.flights.some(x=>x.what===f.what)) return;
          const prev = seedShared.flights[i-1];
          const at = prev ? meta.flights.findIndex(x=>x.what===prev.what) : -1;
          meta.flights.splice(at>=0 ? at+1 : meta.flights.length, 0, copy(f));
        });
      }
      if(meta.hotels){
        meta.hotels = meta.hotels.filter(h=>!/Sala Rattanakosin|Eleven Bangkok/.test(h.hotel||''));
        seedShared.hotels.forEach((h, i)=>{
          if(!/Montraj|Maison|Palmview|River Lodge|Kalima|Centara Riverside/.test(h.hotel)) return;
          const found = meta.hotels.find(x=>x.hotel===h.hotel);
          if(found){ Object.assign(found, copy(h)); return; }
          const next = seedShared.hotels[i+1];
          const at = next ? meta.hotels.findIndex(x=>x.hotel===next.hotel) : -1;
          meta.hotels.splice(at>=0 ? at : meta.hotels.length, 0, copy(h));
        });
      }
      (meta.bookings||[]).forEach(b=>{
        if(!/^Montraj|^Eleven|^Kalima/.test(b.what||'')) return;
        const fresh25 = seedShared.bookings.find(x=>x.what===b.what);
        if(fresh25) Object.assign(b, {when:fresh25.when, details:fresh25.details, freeCancel:fresh25.freeCancel});
      });
      if(meta.cuts) meta.cuts = meta.cuts.filter(c=>!/סאלה/.test(c.what||''));
      const freshBooked = seedShared.info.find(i=>/^מוזמן/.test(i.detail));
      const booked = (meta.info||[]).find(i=>/^מוזמן: שתי טיסות ארקיע/.test(i.detail||''));
      if(booked) booked.detail = freshBooked.detail;
      const training = seedShared.info.find(i=>i.topic==='אימונים');
      if(meta.info && !meta.info.some(i=>i.topic==='אימונים')) meta.info.push(copy(training));
    }
    if(STATE.trip && STATE.trip.together) STATE.trip.together.title = fresh.trip.together.title;
    // היעדים
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      const assign = (found, name)=>{
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(!found || !freshDest) return;
        const {id, order, ...rest} = freshDest;
        Object.assign(found, copy(rest));
      };
      assign(thai.destinations.find(d=>d.owner==='both' && d.name==='בנגקוק'), 'צ׳יאנג מאי — לוי קראתונג');
      assign(thai.destinations.find(d=>d.owner==='both' && d.name==='בנגקוק — לילה אחרון'), 'בנגקוק — סוף הטיול');
      ['קאו סוק','קאו לאק'].forEach(name=>assign(thai.destinations.find(d=>d.name===name), name));
      const kyn = thai.destinations.find(d=>/^קו יאו נוי/.test(d.name||''));
      if(kyn && /TG203/.test(kyn.transport||'')) kyn.transport = freshThai.destinations.find(d=>/^קו יאו נוי/.test(d.name)).transport;
      const wait = thai.destinations.find(d=>d.name==='בנגקוק — מחכה למלח');
      if(wait && wait.accommodation==='להאריך את Eleven בלילה, או מלון אחר') wait.accommodation = 'להאריך את מונטראג׳ בלילה, או מלון אחר';
      thai.destinations.sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999') || (a.order||0)-(b.order||0));
    }
    // הפנקס
    const expenses = STATE.money.expenses;
    const montraj = expenses.find(x=>/Montraj Coach/.test(x.title||''));
    const freshMontraj = MONTRAJ_EXPENSE_31;
    if(montraj && montraj.amount===8169.87) Object.assign(montraj, {title:freshMontraj.title, date:freshMontraj.date, amount:freshMontraj.amount, note:freshMontraj.note});
    STATE.money.expenses = expenses.filter(x=>!(/^Eleven Bangkok/.test(x.title||'') && x.status!=='paid'));
    const kalima = STATE.money.expenses.find(x=>/Kalima/.test(x.title||''));
    if(kalima && kalima.amount===1931.44) kalima.note = KALIMA_NOTE;
    // המשימות
    const moved = {
      'להזמין את טיסת TG203 לפוקט':'לבטל: TG203 לפוקט, 26/11',
      'לעדכן את Eleven Bangkok לשני אנשים':null,
      'להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם':'להזיז את הטיסה מפוקט ל-8/12',
      'להזמין לינה בקאו סוק, 3–6/12':'לקצר את קאו סוק ל-3–5/12',
      'להזמין מערת נאם טאלו, 5/12':'לבטל: מערת נאם טאלו, 5/12',
      'להזמין סיור בוקר בג׳ונגל וואן לקאו לאק, 6/12':'להזיז את סיור הג׳ונגל והוואן ל-5/12',
      'להזמין סימילן, 7/12':'להזיז את סימילן ל-6/12'
    };
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(t.title in moved && (t.status!=='done' || moved[t.title]===null)));
    STATE.masterChecklist.forEach(t=>{
      if(moved[t.title]) Object.assign(t, {title:moved[t.title], status:'todo', notes:'הוזמן לפני שהמסלול השתנה'});
      // מה שהוזמן לפי גרסה 23 מתאים שוב
      if(t.title==='לבטל: לילה נוסף בקלימה, 5/12') Object.assign(t, {title:'להזמין לילה נוסף בקלימה — 5/12', status:'done', notes:''});
      if(t.title==='להאריך את הלינה בקאו סוק בלילה — 5/12') Object.assign(t, {title:'להזמין לינה בקאו סוק, 3–5/12', status:'done', notes:''});
      if(t.title==='להזיז את הלינה בקאו סוק ל-3–6/12') t.title = 'להזיז את הלינה בקאו סוק ל-3–5/12';
      // סימילן שהוזמן ל-6/12 בגרסה 16 — שוב בתאריך הנכון
      if(t.title==='להזיז את סימילן ל-7/12' && t.status!=='done') Object.assign(t, {title:'להזמין סימילן ל-6/12', status:'done', notes:''});
      if(t.title==='לתאם ביקור בוגרים ב-ISB' && t.status!=='done') t.notes = ISB_NOTE;
      if(t.title==='לינה בבנגקוק ללילה של 10/12' && /Eleven/.test(t.notes||'')) t.notes = TALIA_TASKS.find(x=>x.title===t.title).notes;
    });
    STATE.schema = 25;
  }

  /*
   * זריחה ושקיעה לכל יום (לפי המקום), והיום מותאם אליהן: הריצה הארוכה ב-4/12
   * אחרי האגם ולא לפני הזריחה, חזרה מריילאי אחרי השקיעה, שקיעה על החוף בקאו
   * לאק, והר הזהב בשקיעה ב-9/12. ובקו יאו נוי — הסירה האחרונה ב-17:00.
   * רק שדות של שורות שהתוכנית מנהלת משתנים; שורה זזה למקום שלה לפי השעה.
   */
  if(STATE.schema < 26){
    const seedShared = window.SHARED_SEED;
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const ord = t => t ? String(t).padStart(5,'0') : '99:99';
      const place = (day, row)=>{
        day.rows = day.rows.filter(r=>r!==row);
        const at = day.rows.findIndex(x=>!x.time || ord(x.time) > ord(row.time));
        day.rows.splice(at>=0 ? at : day.rows.length, 0, row);
      };
      const changes = {s_w_1124:['notes'], s_w_1127:['time','notes'], s_4_7:['notes'], s_8_6:['time','notes'], s_w_1130:['time','dur'],
        s_w_1204:['time','dur','notes'], s_g5_2:['time'], s_g6_4:['act','notes'], s_2_saket:['time','dur','notes'], s_3_8:['time','dur','notes']};
      meta.days.filter(d=>d.owner!=='talia').forEach(day=>{
        const seedDay = seedShared.days.find(d=>d.date===day.date);
        if(!seedDay) return;
        if(seedDay.sun) day.sun = {...seedDay.sun};
        seedDay.rows.forEach(seedRow=>{
          const keys = changes[seedRow.id];
          const row = day.rows.find(r=>r.id===seedRow.id);
          if(keys && row){
            keys.forEach(k=>{ row[k] = seedRow[k]; });
            if(keys.includes('time')) place(day, row);
          }
          if(seedRow.id==='s_h7_sun' && !day.rows.some(r=>r.id==='s_h7_sun')) place(day, JSON.parse(JSON.stringify(seedRow)));
        });
      });
    }
    STATE.schema = 26;
  }

  /*
   * 5/11: קלימה אישרה במייל את הלילה של 5/12 בהזמנה ישירה — ฿8,800 כולל ארוחת
   * בוקר, לא מוחזר, מחכה לתשלום בלינק — וארוחת הבוקר בשאר הימים ฿600 לאדם.
   * והמקדמה למחנה כבר התקבלה (27/9), אז שתי משימות התשלום סגורות.
   */
  if(STATE.schema < 27){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const seedRows = seedShared.days.flatMap(d=>d.rows);
      const fields = {s_g6_stay:['baht','notes','priceEstimate'], s_g6_3:['notes'], s_g7_0:['baht','notes','priceEstimate'], s_g8_0:['baht','notes','priceEstimate'], s_g9_0:['baht','notes','priceEstimate']};
      meta.days.filter(d=>d.owner!=='talia').forEach(d=>d.rows.forEach(r=>{
        const keys = fields[r.id]; const fresh27 = keys && seedRows.find(x=>x.id===r.id);
        if(fresh27) keys.forEach(k=>{ r[k] = copy(fresh27[k]); });
      }));
      const hotel = (meta.hotels||[]).find(h=>h.hotel==='Kalima Resort and Villas · לילה נוסף');
      const freshHotel = seedShared.hotels.find(h=>h.hotel==='Kalima Resort and Villas · לילה נוסף');
      if(hotel && freshHotel) Object.assign(hotel, copy(freshHotel));
    }
    const extra = STATE.masterChecklist.find(t=>t.title==='להזמין לילה נוסף בקלימה — 5/12');
    if(extra && extra.status!=='done') extra.notes = KALIMA_EXTRA_NOTE;
    STATE.masterChecklist.forEach(t=>{
      if(t.title==='לאשר טלפונית את פרטי החשבון של המחנה' || t.title==='להעביר מקדמה ฿6,075 ב-Wise למחנה') t.status = 'done';
    });
    STATE.schema = 27;
  }

  /* 5/11: הלילה של 5/12 בקלימה שולם — לפנקס, ומסומן כמוזמן */
  if(STATE.schema < 28){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const seedRows = seedShared.days.flatMap(d=>d.rows);
      meta.days.filter(d=>d.owner!=='talia').forEach(d=>d.rows.forEach(r=>{
        if(r.id!=='s_g6_stay' && r.id!=='s_g6_3') return;
        const fresh28 = seedRows.find(x=>x.id===r.id);
        ['status','notes','priceEstimate','baht'].forEach(k=>{ if(fresh28[k]!==undefined) r[k] = copy(fresh28[k]); });
      }));
      const hotel = (meta.hotels||[]).find(h=>h.hotel==='Kalima Resort and Villas · לילה נוסף');
      const freshHotel = seedShared.hotels.find(h=>h.hotel==='Kalima Resort and Villas · לילה נוסף');
      if(hotel && freshHotel) Object.assign(hotel, copy(freshHotel));
      if(meta.bookings && !meta.bookings.some(b=>b.what==='Kalima · לילה נוסף')){
        const at = meta.bookings.findIndex(b=>b.what==='Kalima Resort and Villas');
        meta.bookings.splice(at>=0 ? at : meta.bookings.length, 0, copy(seedShared.bookings.find(b=>b.what==='Kalima · לילה נוסף')));
      }
    }
    if(!STATE.money.expenses.some(x=>/^קלימה · לילה נוסף/.test(x.title||''))) STATE.money.expenses.push(KALIMA_EXTRA_EXPENSE());
    const extra = STATE.masterChecklist.find(t=>t.title==='להזמין לילה נוסף בקלימה — 5/12');
    if(extra) Object.assign(extra, {status:'done', notes:'שולם 5/11 · ฿8,800 כולל ארוחת בוקר'});
    STATE.schema = 28;
  }

  /* 6/11: KYN ענו — Sea House מלא ב-30/11–3/12, והצעה יחידה היא דירת שני חדרים בלי מחיר; קלימה עוד לא ענתה על הלילה של 8/12 */
  if(STATE.schema < 29){
    const fresh29 = (title)=>fresh.masterChecklist.find(t=>t.title===title);
    ['להחליט על KYN: להישאר ב-26–29/11, או דירת שני חדרים ל-30/11–3/12','לקבל תשובה מקלימה על הלילה של 8/12 ועל מונית לשדה'].forEach(title=>{
      if(!STATE.masterChecklist.some(t=>t.title===title)){
        const f = fresh29(title);
        if(f) STATE.masterChecklist.push(JSON.parse(JSON.stringify(f)));
      }
    });
    STATE.schema = 29;
  }

  /* 6/11: קלימה ענתה — הלילה של 8/12 לא מוחזר, ומונית פרטית 1,800 ฿ לכיוון */
  if(STATE.schema < 30){
    const t = STATE.masterChecklist.find(x=>x.title==='לקבל תשובה מקלימה על הלילה של 8/12 ועל מונית לשדה');
    const f = fresh.masterChecklist.find(x=>x.title==='להחליט על מונית מקלימה לשדה ב-8/12 — 1,800 ฿ לרכב');
    if(t && f) Object.assign(t, {title:f.title, notes:f.notes, status:'todo', deadline:f.deadline, priority:f.priority});
    else if(!STATE.masterChecklist.some(x=>x.title===(f&&f.title)) && f) STATE.masterChecklist.push(JSON.parse(JSON.stringify(f)));
    STATE.schema = 30;
  }

  /*
   * 9/11: בלי צפון — חוזרים לתוכנית המקורית. בנגקוק 23–26/11 (מונטראג׳), המחנה
   * 26–29/11 כמו שהוזמן (TG203 לפוקט), אאו נאנג 29/11–3/12, קאו סוק 3–5/12,
   * קלימה 5–9/12 — ארבעה לילות, כולם מוזמנים — ולילה אחרון ב-Eleven ב-9/12.
   * הימים שהשתנו נבנים מחדש; סימונים ושיחות עוברים עם השורה, שורות ידניות
   * נשארות. מה שכבר הוזמן לצפון הופך לתזכורת לבטל.
   */
  if(STATE.schema < 31){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const old = new Map();
      shared.flatMap(d=>d.rows).forEach(r=>{ const seen = old.get(r.id); if(!seen || (!seen.done && !seen.talk)) old.set(r.id, r); });
      const carry = seedRow=>{
        const row = copy(seedRow);
        const before = old.get(seedRow.id);
        if(before){
          if(before.done) row.done = true;
          if(before.talk) row.talk = before.talk;
          if(!seedRow.managed && before.notes) row.notes = before.notes;
        }
        return row;
      };
      ['2026-11-23','2026-11-24','2026-11-25','2026-11-26','2026-12-05','2026-12-06','2026-12-07','2026-12-08','2026-12-09'].forEach(date=>{
        const seedDay = seedShared.days.find(d=>d.date===date);
        const day = shared.find(d=>d.date===date);
        if(!seedDay || !day) return;
        const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')));
        Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows:seedDay.rows.map(carry).concat(custom)});
        if(seedDay.sun) day.sun = {...seedDay.sun};
      });
      ['title','bases','cuts'].forEach(k=>{ if(seedShared[k]) meta[k] = copy(seedShared[k]); });
      if(meta.flights){
        meta.flights = meta.flights.filter(f=>!/צ׳יאנג מאי|דון מואנג/.test(f.what||''));
        seedShared.flights.forEach((f, i)=>{
          if(meta.flights.some(x=>x.what===f.what)) return;
          const prev = seedShared.flights[i-1];
          const at = prev ? meta.flights.findIndex(x=>x.what===prev.what) : -1;
          meta.flights.splice(at>=0 ? at+1 : meta.flights.length, 0, copy(f));
        });
      }
      if(meta.hotels){
        meta.hotels = meta.hotels.filter(h=>!/Centara Riverside/.test(h.hotel||''));
        seedShared.hotels.forEach((h, i)=>{
          if(!/Montraj|Maison|Sala Rattanakosin|Eleven|Kalima/.test(h.hotel)) return;
          const found = meta.hotels.find(x=>x.hotel===h.hotel);
          if(found){ Object.assign(found, copy(h)); return; }
          const next = seedShared.hotels[i+1];
          const at = next ? meta.hotels.findIndex(x=>x.hotel===next.hotel) : -1;
          meta.hotels.splice(at>=0 ? at : meta.hotels.length, 0, copy(h));
        });
      }
      (meta.bookings||[]).forEach(b=>{
        if(!/^Montraj|^Eleven|^Kalima/.test(b.what||'')) return;
        const fresh31 = seedShared.bookings.find(x=>x.what===b.what);
        if(fresh31) Object.assign(b, copy(fresh31));
      });
      const booked = (meta.info||[]).find(i=>/^מוזמן: שתי טיסות ארקיע/.test(i.detail||''));
      if(booked) booked.detail = seedShared.info.find(i=>/^מוזמן/.test(i.detail)).detail;
    }
    if(STATE.trip && STATE.trip.together) STATE.trip.together.title = fresh.trip.together.title;
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      const assign = (found, name)=>{
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(!found || !freshDest) return;
        const {id, order, ...rest} = freshDest;
        Object.assign(found, copy(rest));
      };
      assign(thai.destinations.find(d=>d.owner==='both' && d.name==='צ׳יאנג מאי — לוי קראתונג'), 'בנגקוק');
      assign(thai.destinations.find(d=>d.owner==='both' && d.name==='בנגקוק — סוף הטיול'), 'בנגקוק — לילה אחרון');
      assign(thai.destinations.find(d=>d.name==='קאו לאק'), 'קאו לאק');
      const kyn = thai.destinations.find(d=>/^קו יאו נוי/.test(d.name||''));
      if(kyn && /צ׳יאנג מאי/.test(kyn.transport||'')) kyn.transport = freshThai.destinations.find(d=>/^קו יאו נוי/.test(d.name)).transport;
      const wait = thai.destinations.find(d=>d.name==='בנגקוק — מחכה למלח');
      if(wait && /מונטראג׳/.test(wait.accommodation||'')) wait.accommodation = 'להאריך את Eleven בלילה, או מלון אחר';
      thai.destinations.sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999') || (a.order||0)-(b.order||0));
    }
    const expenses = STATE.money.expenses;
    const montraj = expenses.find(x=>/Montraj Coach/.test(x.title||''));
    const freshMontraj = MONTRAJ_EXPENSE_31;
    if(montraj && montraj.amount===5446.58) Object.assign(montraj, {title:freshMontraj.title, date:freshMontraj.date, amount:freshMontraj.amount, note:freshMontraj.note});
    if(!expenses.some(x=>/^Eleven Bangkok/.test(x.title||''))) expenses.push(copy(fresh.money.expenses.find(x=>/^Eleven Bangkok/.test(x.title))));
    const kalima = expenses.find(x=>/Kalima/.test(x.title||''));
    if(kalima && kalima.amount===1931.44) kalima.note = KALIMA_NOTE;
    // המשימות: מה שהוזמן לצפון — לבטל; מה שבוטל מהמקורי — חוזר
    const moved = {
      'להזמין מלון בצ׳יאנג מאי, 23–26/11':'לבטל: מלון בצ׳יאנג מאי, 23–26/11',
      'להזמין טיסה סובארנבומי → צ׳יאנג מאי, 23/11':'לבטל: טיסה לצ׳יאנג מאי, 23/11',
      'להזמין טיסה צ׳יאנג מאי → פוקט, 26/11 בבוקר':'לבטל: טיסה מצ׳יאנג מאי לפוקט, 26/11',
      'להזמין מקלט פילים, 25/11':'לבטל: מקלט פילים, 25/11',
      'להזיז את מונטראג׳ ל-8–10/12':'להחזיר את מונטראג׳ ל-23–26/11',
      'לבטל את Eleven Bangkok — חינם עד 5/12':'Eleven בוטל — להזמין לינה ל-9/12',
      'להזמין טיסה מפוקט לבנגקוק ב-8/12 — לשניכם':'להזיז את הטיסה מפוקט ל-9/12',
      'להחליט על מונית מקלימה לשדה ב-8/12 — 1,800 ฿ לרכב':'להזיז את המונית מקלימה ל-9/12'
    };
    STATE.masterChecklist = STATE.masterChecklist.filter(t=>!(moved[t.title] && t.status!=='done'));
    STATE.masterChecklist.forEach(t=>{
      if(moved[t.title]) Object.assign(t, {title:moved[t.title], status:'todo', notes:'הוזמן או סומן בזמן תוכנית הצפון'});
      if(t.title==='להחליט על KYN: להישאר ב-26–29/11, או דירת שני חדרים ל-30/11–3/12') Object.assign(t, {status:'done', notes:'נשארים 26–29/11, כמו שהוזמן'});
      if(t.title==='לבטל: TG203 לפוקט, 26/11') Object.assign(t, {title:'להזמין את טיסת TG203 לפוקט', status:'done', notes:''});
      if(t.title==='להזיז את הטיסה מפוקט ל-8/12') Object.assign(t, {title:'להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם', status:'done', notes:''});
      if(t.title==='לתאם ביקור בוגרים ב-ISB' && t.status!=='done') t.notes = ISB_NOTE;
      if(t.title==='לינה בבנגקוק ללילה של 10/12' && /מונטראג׳/.test(t.notes||'')) t.notes = TALIA_TASKS.find(x=>x.title===t.title).notes;
    });
    STATE.schema = 31;
  }

  /*
   * 12/11: מה שהוזמן היום. בנגקוק ב-ASAI במקום מונטראג׳ (שבוטל), VietJet MSR6JW
   * לפוקט ב-26/11 וחזרה ב-9/12 ב-14:00, COSI במקום צ׳רמנטרה, River Lodge ל-3/12
   * ולילה על האגם ב-Panvaree ב-4/12, ו-Eleven ל-9–12/12 עם מוניות חינם מהשדה.
   * ימים שהשתנו נבנים מחדש; סימונים ושיחות עוברים עם השורה, ושורות ידניות נשארות.
   */
  if(STATE.schema < 32){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const old = new Map();
      shared.flatMap(d=>d.rows).forEach(r=>{ const seen = old.get(r.id); if(!seen || (!seen.done && !seen.talk)) old.set(r.id, r); });
      const carry = seedRow=>{
        const row = copy(seedRow);
        const before = old.get(seedRow.id);
        if(before){
          if(before.done) row.done = true;
          if(before.talk) row.talk = before.talk;
          if(!seedRow.managed && before.notes) row.notes = before.notes;
        }
        return row;
      };
      ['2026-11-23','2026-11-24','2026-11-25','2026-11-26','2026-11-29','2026-11-30','2026-12-01','2026-12-02',
       '2026-12-03','2026-12-04','2026-12-05','2026-12-09','2026-12-10'].forEach(date=>{
        const seedDay = seedShared.days.find(d=>d.date===date);
        const day = shared.find(d=>d.date===date);
        if(!seedDay || !day) return;
        const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')));
        Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows:seedDay.rows.map(carry).concat(custom)});
        if(seedDay.sun) day.sun = {...seedDay.sun};
      });
      ['title','bases','cuts','deadline'].forEach(k=>{ if(seedShared[k]) meta[k] = copy(seedShared[k]); });
      if(meta.flights){
        meta.flights = meta.flights.filter(f=>!/TG203|^פוקט → בנגקוק/.test(f.what||''));
        seedShared.flights.forEach((f, i)=>{
          if(meta.flights.some(x=>x.what===f.what)) return;
          const prev = seedShared.flights[i-1];
          const at = prev ? meta.flights.findIndex(x=>x.what===prev.what) : -1;
          meta.flights.splice(at>=0 ? at+1 : meta.flights.length, 0, copy(f));
        });
      }
      // ההזמנות והמלונות: מה שבזרע מתעדכן או נוסף במקומו; מה שנוסף ידנית נשאר
      const upsert = (list, seedList, key)=>{
        seedList.forEach((item, i)=>{
          const found = list.find(x=>x[key]===item[key]);
          if(found){ Object.assign(found, copy(item)); return; }
          const prev = seedList[i-1];
          const at = prev ? list.findIndex(x=>x[key]===prev[key]) : -1;
          list.splice(at>=0 ? at+1 : list.length, 0, copy(item));
        });
      };
      if(meta.bookings) upsert(meta.bookings, seedShared.bookings, 'what');
      if(meta.hotels) upsert(meta.hotels, seedShared.hotels, 'hotel');
      const booked = (meta.info||[]).find(i=>/^מוזמן:/.test(i.detail||''));
      if(booked) booked.detail = seedShared.info.find(i=>/^מוזמן/.test(i.detail)).detail;
    }
    if(STATE.trip && STATE.trip.talia) STATE.trip.talia.onwardFlight = fresh.trip.talia.onwardFlight;
    // היעדים
    const thai = (STATE.countries||[]).find(c=>c.id==='thailand');
    const freshThai = fresh.countries.find(c=>c.id==='thailand');
    if(thai && freshThai){
      const fields = ['accommodation','transport','notes','arrival','departure','nights'];
      ['בנגקוק','קו יאו נוי — מחנה מואיי תאי','אאו נאנג וריילאי','קאו סוק','בנגקוק — לילה אחרון','בנגקוק — מחכה למלח','צ\'יאנג מאי'].forEach(name=>{
        const found = thai.destinations.find(d=>d.name===name);
        const freshDest = freshThai.destinations.find(d=>d.name===name);
        if(found && freshDest) fields.forEach(k=>{ found[k] = copy(freshDest[k]); });
      });
    }
    // הפנקס: מה שבוטל יוצא, מה שהוזמן נכנס, ו-Eleven לשלושה לילות
    const expenses = STATE.money.expenses;
    STATE.money.expenses = expenses.filter(x=>!(/Montraj Coach/.test(x.title||'') && x.status!=='paid')
      && !(/^Chermantra Aonang/.test(x.title||'') && x.amount===1839 && x.currency==='ILS'));
    const eleven = STATE.money.expenses.find(x=>/^Eleven Bangkok/.test(x.title||''));
    const freshEleven = fresh.money.expenses.find(x=>/^Eleven Bangkok/.test(x.title||''));
    if(eleven && eleven.amount===3010.10) Object.assign(eleven, {title:freshEleven.title, amount:freshEleven.amount, note:freshEleven.note});
    else if(!eleven) STATE.money.expenses.push(copy(freshEleven));
    EXPENSES_32().forEach(x=>{ if(!STATE.money.expenses.some(e=>e.title===x.title)) STATE.money.expenses.push(x); });
    STATE.masterChecklist = applyTasks32(STATE.masterChecklist);
    STATE.schema = 32;
  }

  /*
   * 12/11, אחר הצהריים: המונית מקלימה לשדה הוזמנה בבוקינג (₪153.27), Greenery
   * מלא ב-4/12 — שאלנו על חלופות — סימילן עם Asian Trails, וטליה ונועה נוספו ב-Eleven.
   */
  if(STATE.schema < 33){
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const seedRows = seedShared.days.flatMap(d=>d.rows);
      meta.days.filter(d=>d.owner!=='talia').forEach(d=>d.rows.forEach(r=>{
        if(!['s_g9_1','s_g5_1','s_g5_stay','s_g7_1'].includes(r.id)) return;
        const fresh33 = seedRows.find(x=>x.id===r.id);
        ['act','status','baht','notes','link','priceEstimate'].forEach(k=>{ if(fresh33[k]!==undefined) r[k] = copy(fresh33[k]); });
      }));
      if(meta.hotels){
        const h = meta.hotels.find(x=>x.hotel==='Panvaree The Greenery');
        const fh = seedShared.hotels.find(x=>x.hotel==='Panvaree The Greenery');
        if(h && fh) Object.assign(h, copy(fh));
      }
      if(meta.bookings){
        meta.bookings = meta.bookings.filter(b=>!/^Panvaree The Greenery/.test(b.what||''));
        seedShared.bookings.forEach((b, i)=>{
          const found = meta.bookings.find(x=>x.what===b.what);
          if(found){ Object.assign(found, copy(b)); return; }
          const prev = seedShared.bookings[i-1];
          const at = prev ? meta.bookings.findIndex(x=>x.what===prev.what) : -1;
          meta.bookings.splice(at>=0 ? at+1 : meta.bookings.length, 0, copy(b));
        });
      }
    }
    EXPENSES_32().filter(x=>/^מונית Booking/.test(x.title)).forEach(x=>{ if(!STATE.money.expenses.some(e=>e.title===x.title)) STATE.money.expenses.push(x); });
    STATE.masterChecklist = applyTasks33(STATE.masterChecklist);
    STATE.schema = 33;
  }

  if(STATE.schema < 34){
    // 24/11: the Sala table is booked for 19:30 on the terrace; the krathong goes in the river before dinner
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    const ids34 = ['s_2_swing','s_2_saket','s_2_6','s_2_8','s_2_7','s_2_9'];
    if(seedShared && meta && meta.days){
      const seedDay = seedShared.days.find(d=>d.date==='2026-11-24');
      const d = meta.days.find(x=>x.owner!=='talia' && x.date==='2026-11-24');
      if(seedDay && d){
        d.rows.forEach(r=>{
          if(!ids34.includes(r.id)) return;
          const f = seedDay.rows.find(x=>x.id===r.id);
          ['time','dur','act','loc','status','baht','notes','link'].forEach(k=>{ if(f[k]!==undefined) r[k] = copy(f[k]); });
        });
        const timed = d.rows.filter(r=>ids34.includes(r.id)).sort((a,b)=>a.time<b.time?-1:1);
        let k = 0;
        d.rows = d.rows.map(r=>ids34.includes(r.id) ? timed[k++] : r);
      }
      if(meta.cuts) meta.cuts = meta.cuts.filter(c=>!/סאלה/.test(c.what||''));
      if(meta.bookings){
        const b = seedShared.bookings.find(x=>/^סאלה ראטנקוסין/.test(x.what));
        if(b && !meta.bookings.some(x=>x.what===b.what)){
          const at = meta.bookings.findIndex(x=>/^ASAI/.test(x.what||''));
          meta.bookings.splice(at>=0 ? at+1 : meta.bookings.length, 0, copy(b));
        }
      }
    }
    STATE.masterChecklist = applyTasks34(STATE.masterChecklist);
    STATE.schema = 34;
  }

  if(STATE.schema < 35){
    // סימילן עובר ל-7/12: 6/12 יום מנוחה אחרי קאו סוק, 8/12 יום הגיבוי
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const dates = ['2026-12-06','2026-12-07'];
      const days = dates.map(date=>shared.find(d=>d.date===date));
      if(days.every(Boolean)){
        const old = new Map(days.flatMap(d=>d.rows).map(r=>[r.id, r]));
        dates.forEach((date, i)=>{
          const seedDay = seedShared.days.find(d=>d.date===date);
          const custom = days[i].rows.filter(r=>!/^s_/.test(String(r.id||'')));
          const rows = seedDay.rows.map(sr=>{
            const row = copy(sr), before = old.get(sr.id);
            if(before){ if(before.done) row.done = true; if(before.talk) row.talk = before.talk; }
            return row;
          });
          Object.assign(days[i], {summary:seedDay.summary, rows:rows.concat(custom)});
        });
      }
      const d8 = shared.find(d=>d.date==='2026-12-08');
      const s8 = seedShared.days.find(d=>d.date==='2026-12-08');
      if(d8 && s8) d8.summary = s8.summary;
      if(meta.bases) meta.bases.forEach(b=>{ if(/סימילן, יום גיבוי/.test(b.what||'')) b.what = 'קלימה · יום מנוחה, סימילן ויום חופשי (גיבוי)'; });
    }
    (STATE.countries||[]).forEach(t=>(t.destinations||[]).forEach(d=>{
      if(d.name==='קאו לאק' && /^סימילן ב-6\/12/.test(d.notes||'')) d.notes = d.notes.replace(/^סימילן ב-6\/12[^:]*: פארק קאו לאק–לאם רו ואנדרטת הצונאמי\./, KHAOLAK_NOTE_35);
    }));
    STATE.masterChecklist = applyTasks35(STATE.masterChecklist);
    STATE.schema = 35;
  }

  if(STATE.schema < 36){
    // 15/11: הלילה על האגם הוזמן ל-3/12 (Laguna Seaview), River Lodge עבר ל-4/12, סימילן אושר
    const seedShared = window.SHARED_SEED;
    const copy = x => JSON.parse(JSON.stringify(x));
    const meta = STATE.shared;
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      const dates = ['2026-12-03','2026-12-04','2026-12-05'];
      const days = dates.map(date=>shared.find(d=>d.date===date));
      if(days.every(Boolean)){
        const old = new Map(days.flatMap(d=>d.rows).map(r=>[r.id, r]));
        dates.forEach((date, i)=>{
          const seedDay = seedShared.days.find(d=>d.date===date);
          const custom = days[i].rows.filter(r=>!/^s_/.test(String(r.id||'')));
          const rows = seedDay.rows.map(sr=>{
            const row = copy(sr), before = old.get(sr.id);
            if(before){ if(before.done) row.done = true; if(before.talk) row.talk = before.talk; }
            return row;
          });
          Object.assign(days[i], {dest:seedDay.dest, summary:seedDay.summary, rows:rows.concat(custom)});
        });
      }
      // האיסוף לאגם ב-08:00 — בלי ברים בלילה שלפני
      const dec2 = shared.find(d=>d.date==='2026-12-02');
      if(dec2) dec2.rows = dec2.rows.filter(r=>r.id!=='s_h2_night');
      const seedRows = seedShared.days.flatMap(d=>d.rows);
      shared.forEach(d=>d.rows.forEach(r=>{
        if(r.id!=='s_g7_1') return;
        const f = seedRows.find(x=>x.id===r.id);
        ['status','baht','notes'].forEach(k=>{ r[k] = copy(f[k]); });
      }));
      if(meta.bookings){
        ['Khao Sok River Lodge','לילה על האגם · Siam Tour'].forEach(what=>{
          const b = seedShared.bookings.find(x=>x.what===what), found = meta.bookings.find(x=>x.what===what);
          if(b && found) Object.assign(found, copy(b));
        });
        const rl = meta.bookings.findIndex(x=>x.what==='Khao Sok River Lodge'), lk = meta.bookings.findIndex(x=>x.what==='לילה על האגם · Siam Tour');
        if(rl>=0 && lk>rl){ const [b] = meta.bookings.splice(lk,1); meta.bookings.splice(rl,0,b); }
      }
      if(meta.hotels){
        const hr = meta.hotels.find(h=>h.hotel==='Khao Sok River Lodge');
        const shr = seedShared.hotels.find(h=>h.hotel==='Khao Sok River Lodge');
        if(hr && shr) Object.assign(hr, copy(shr));
        const laguna = seedShared.hotels.find(h=>/^The Laguna Chiew Larn/.test(h.hotel));
        if(laguna && !meta.hotels.some(h=>h.hotel===laguna.hotel)){
          const at = meta.hotels.findIndex(h=>h.hotel==='Panvaree The Greenery');
          meta.hotels.splice(at>=0 ? at : meta.hotels.length, 0, copy(laguna));
        }
      }
    }
    (STATE.countries||[]).forEach(c=>(c.destinations||[]).forEach(d=>{
      if(d.name==='קאו סוק' && /Panvaree The Greenery/.test(d.accommodation||'')) Object.assign(d, {accommodation:'The Laguna Chiew Larn (Seaview) על האגם, ואז Khao Sok River Lodge', transport:'Siam Tour מאאו נאנג', notes:"3/12 ישר מאאו נאנג לאגם — לילה ב-Laguna Seaview עם סירה פרטית, דרך Siam Tour. 4/12 בוקר על האגם וערב בכפר, ב-River Lodge על הנהר. 5/12 בוקר בג׳ונגל, ומשם לקלימה."});
    }));
    const rlx = STATE.money.expenses.find(e=>e.title==='Khao Sok River Lodge · 3/12');
    if(rlx) Object.assign(rlx, {title:'Khao Sok River Lodge · 4/12', date:'2026-12-04', note:'אישור 5114181390 · כולל ארוחת בוקר · בוקינג מחייב ב-28/11 · ביטול חינם עד 30/11'});
    const lx = EXPENSE_36();
    if(!STATE.money.expenses.some(e=>e.title===lx.title)) STATE.money.expenses.push(lx);
    STATE.masterChecklist = applyTasks36(STATE.masterChecklist);
    STATE.schema = 36;
  }

  if(STATE.schema < 37){
    // 16/11: עברנו יום-יום — ימים קלים יותר בבנגקוק, בלי טיפוס ופי פי, רופטופ ב-9/12
    const seedShared = window.SHARED_SEED;
    const meta = STATE.shared;
    const copy = x => JSON.parse(JSON.stringify(x));
    if(seedShared && meta && meta.days){
      const shared = meta.days.filter(d=>d.owner!=='talia');
      ['2026-11-23','2026-11-24','2026-11-25','2026-11-30','2026-12-01','2026-12-02','2026-12-05','2026-12-09','2026-12-10'].forEach(date=>{
        const day = shared.find(d=>d.date===date);
        const seedDay = seedShared.days.find(d=>d.date===date && d.owner!=='talia');
        if(!day || !seedDay) return;
        const old = new Map(day.rows.map(r=>[r.id, r]));
        const custom = day.rows.filter(r=>!/^s_/.test(String(r.id||'')));
        const rows = seedDay.rows.map(sr=>{
          const row = copy(sr), before = old.get(sr.id);
          if(before){ if(before.done) row.done = true; if(before.talk) row.talk = before.talk; }
          return row;
        });
        Object.assign(day, {dest:seedDay.dest, summary:seedDay.summary, rows:rows.concat(custom)});
      });
      const sala = (meta.bookings||[]).find(b=>/סאלה/.test(b.what||''));
      const seedSala = seedShared.bookings.find(b=>/סאלה/.test(b.what||''));
      if(sala && seedSala) sala.details = seedSala.details;
    }
    STATE.schema = 37;
  }

  /* בשטח: קבצים שצורפו להזמנות, ופרטי הביטוח לחירום */
  if(STATE.shared && !STATE.shared.bookingFiles) STATE.shared.bookingFiles = {};
  if(STATE.shared && !STATE.shared.emergency) STATE.shared.emergency = {insurer:'', policy:'', phone:'', notes:''};
  // הביטוח מופיע עם האישורים, והפוליסה נמצאת בקבצים
  if(STATE.shared && STATE.shared.bookings && !STATE.shared.bookings.some(b=>b.fileTag==='PassportCard')){
    STATE.shared.bookings.push({what:'ביטוח נסיעות · PassportCard', when:'כל הטיול', details:'פוליסה לשניים · הקובץ "אישור פוליסה" נפתח עם מספר תעודת הזהות של איתי', ref:'בקובץ הפוליסה', payment:'שולם', freeCancel:'—', fileTag:'PassportCard'});
  }
  // 24/11: המוניות והגראבים שהוזמנו — נכנסים לאישורים ולשורות של הימים
  if(STATE.shared && STATE.shared.bookings && window.SHARED_SEED){
    const seedB = window.SHARED_SEED.bookings;
    ['596039126','161864633','A-A4B3K42WXAUFAV','A-A4BW7IPW22UFAV','274424418'].forEach(ref=>{
      if(STATE.shared.bookings.some(b=>b.ref===ref)) return;
      const sb = seedB.find(b=>b.ref===ref); if(!sb) return;
      const at = STATE.shared.bookings.findIndex(b=>b.ref==='997065466');
      STATE.shared.bookings.splice(at>=0 ? at+1 : STATE.shared.bookings.length, 0, JSON.parse(JSON.stringify(sb)));
    });
    const fix = {s_4_1:'274424418', s_4_5:'A-A4BW7IPW22UFAV', s_g6_taxi:'A-A4B3K42WXAUFAV', s_f10_0:'596039126'};
    (STATE.shared.days||[]).filter(d=>d.owner!=='talia').forEach(day=>{
      const seedDay = window.SHARED_SEED.days.find(d=>d.date===day.date && d.owner!=='talia');
      (day.rows||[]).forEach(r=>{
        const ref = fix[r.id];
        if(!ref || String(r.notes||'').includes(ref) || !seedDay) return;
        const sr = seedDay.rows.find(x=>x.id===r.id); if(!sr) return;
        ['time','status','baht','notes'].forEach(k=>{ r[k] = sr[k]; });
      });
    });
  }
  // 24/11: היתרה ל-Siam Tour שולמה, ולוקאס אישר הורדה ב-River Lodge
  if(STATE.shared && window.SHARED_SEED){
    const b = (STATE.shared.bookings||[]).find(x=>x.ref==='5946');
    const sb = window.SHARED_SEED.bookings.find(x=>x.ref==='5946');
    if(b && sb && !/שולם במלואו/.test(b.payment||'')) b.payment = sb.payment;
    (STATE.shared.days||[]).filter(d=>d.owner!=='talia').forEach(day=>{
      const seedDay = window.SHARED_SEED.days.find(d=>d.date===day.date && d.owner!=='talia');
      (day.rows||[]).forEach(r=>{
        if(r.id==='s_g6_2' && r.status!=='מוזמן'){ const sr = seedDay && seedDay.rows.find(x=>x.id==='s_g6_2'); if(sr){ r.status = sr.status; r.notes = sr.notes; } }
        if(/voucher 8044/.test(r.notes||'') && /יתרה ฿7,500 עד 26\/11/.test(r.notes||'')) r.notes = r.notes.replace('שולמה מקדמה ฿7,500 ב-15/11 · יתרה ฿7,500 עד 26/11, בכרטיס או ב-Wise','שולם במלואו — מקדמה ב-15/11, יתרה ב-24/11');
      });
    });
    ((STATE.money&&STATE.money.expenses)||[]).forEach(x=>{
      if(/voucher 8044/.test(x.note||'') && x.status!=='paid'){ x.status = 'paid'; x.note = 'voucher 8044 · הזמנה 5946 · מקדמה ฿7,500 ב-15/11 · יתרה ฿7,500 ב-24/11 · לא מוחזר'; }
    });
    (STATE.masterChecklist||[]).forEach(t=>{
      if(t.title==='לשלם ל-Siam Tour את היתרה, ฿7,500' && t.status!=='done'){ t.status = 'done'; t.notes = '24/11: שולם · '+(t.notes||''); }
      if(t.title==='לוודא עם Siam Tour: לילה אחד, והורדה ב-River Lodge ב-4/12' && t.status!=='done'){ t.status = 'done'; t.notes = '17/11: לוקאס אישר במייל · '+(t.notes||''); }
    });
  }
  // 24/11: הוצאות יומיות ראשונות בבנגקוק
  if(STATE.money && STATE.money.expenses && !STATE.money.added2411){
    SPEND_2411().forEach(x=>{ if(!STATE.money.expenses.some(e=>e.title===x.title)) STATE.money.expenses.push(x); });
    STATE.money.added2411 = true;
  }
  // 24/11 בערב: ISB אישרו ל-12:00, ו-KYN ענו על הרציף ועל הספידבוט — פעם אחת
  if(STATE.shared && window.SHARED_SEED && !STATE.shared.applied2411isb){
    const ids = ["s_3_3", "s_3_4", "s_3_5", "s_3_6", "s_3_7", "s_3_9", "s_3_dream", "s_4_8", "s_7_3", "s_7_4"];
    (STATE.shared.days||[]).filter(d=>d.owner!=='talia').forEach(day=>{
      const seedDay = window.SHARED_SEED.days.find(d=>d.date===day.date && d.owner!=='talia');
      if(!seedDay) return;
      (day.rows||[]).forEach(r=>{
        if(!ids.includes(r.id)) return;
        const sr = seedDay.rows.find(x=>x.id===r.id); if(!sr) return;
        ['act','time','dur','status','baht','notes'].forEach(k=>{ r[k] = sr[k]; });
      });
    });
    (STATE.masterChecklist||[]).forEach(t=>{
      if(t.title==='לתאם ביקור בוגרים ב-ISB' && t.status!=='done'){ t.status = 'done'; t.notes = '24/11: אושר ל-25/11 ב-12:00 · Harold Albert ‎+66 81 902 2503 · דרכונים בשער'; }
    });
    STATE.shared.applied2411isb = true;
  }
  // 25/11: הוצאות האשראי של שניהם, אחת אחת — במקום סכום הכרטיס הכללי של 24/11
  if(STATE.money && STATE.money.expenses && !STATE.money.added2511){
    STATE.money.expenses = STATE.money.expenses.filter(e=>!(e.title==='בנגקוק 23–24/11 · אשראי' && e.amount===1000));
    SPEND_2511().forEach(x=>{ if(!STATE.money.expenses.some(e=>e.title===x.title && e.date===x.date && e.amount===x.amount)) STATE.money.expenses.push(x); });
    STATE.money.added2511 = true;
  }
  // 25/11: המזומן עד עכשיו הוא ฿4,900, לא ฿2,000
  if(STATE.money && STATE.money.expenses && !STATE.money.cash2511){
    const c = STATE.money.expenses.find(e=>e.title==='בנגקוק 23–24/11 · מזומן' && e.amount===2000);
    if(c) Object.assign(c, {title:'בנגקוק 23–25/11 · מזומן', amount:4900, date:'2026-11-25'});
    STATE.money.cash2511 = true;
  }
  // 25/11 בערב: Grab מפוקט לרציף הוחלף ב-Bolt, וכרטיסי Rajadamnern נקנו
  if(STATE.shared && window.SHARED_SEED && !STATE.shared.applied2511bolt){
    const b = (STATE.shared.bookings||[]).find(x=>x.ref==='A-A4BW7IPW22UFAV');
    const sb = window.SHARED_SEED.bookings.find(x=>x.ref==='Bolt' && /Bang Rong/.test(x.what));
    if(b && sb) Object.assign(b, JSON.parse(JSON.stringify(sb)));
    (STATE.shared.days||[]).filter(d=>d.owner!=='talia').forEach(day=>{
      const seedDay = window.SHARED_SEED.days.find(d=>d.date===day.date && d.owner!=='talia'); if(!seedDay) return;
      (day.rows||[]).forEach(r=>{
        if(r.id!=='s_4_5' && r.id!=='s_3_9') return;
        const sr = seedDay.rows.find(x=>x.id===r.id); if(!sr) return;
        ['act','status','baht','notes'].forEach(k=>{ r[k] = sr[k]; });
      });
    });
    STATE.shared.applied2511bolt = true;
  }
  // טליה העבירה לאיתי ₪4,766 לפני הטיול על ההזמנות מראש
  if(STATE.money && !STATE.money.prepay2211){
    STATE.money.settlements = STATE.money.settlements || [];
    if(!STATE.money.settlements.some(x=>x.id==='s-talia-prepay'))
      STATE.money.settlements.push({id:'s-talia-prepay', from:'talia', to:'itai', amount:4766, date:'2026-11-22', note:'לפני הטיול, על מה שהוזמן מראש'});
    STATE.money.prepay2211 = true;
  }
  // המפה של טליה ומל בגוגל מפות — המקומות נטענים ממנה בכל פתיחה
  if(STATE.shared && !(STATE.shared.mapLists||[]).some(m=>m.id==='wHPaAtsYL2pmB4xARWodPA')){
    (STATE.shared.mapLists = STATE.shared.mapLists||[]).push({id:'wHPaAtsYL2pmB4xARWodPA', title:'טליה ומל כובשות את המזרח 👯🌺✈️', note:'הרשימה של טליה ומל בגוגל מפות · כל מקום שנשמר שם מופיע כאן'});
  }
  if(STATE.shared && STATE.shared.emergency && !STATE.shared.emergency.insurer) STATE.shared.emergency.insurer = 'PassportCard';
  if(STATE.shared && STATE.shared.bookings){
    const kyn = STATE.shared.bookings.find(b=>b.id==='kyn-2026-11');
    if(kyn && !kyn.fileTag) kyn.fileTag = 'KYN';
    if(!STATE.shared.bookings.some(b=>b.fileTag==='Asian Trails')){
      const at = STATE.shared.bookings.findIndex(b=>b.what==='Kalima Resort and Villas');
      STATE.shared.bookings.splice(at>=0 ? at+1 : STATE.shared.bookings.length, 0, {what:'סימילן · Asian Trails', when:'7/12', details:'Late Departure · איסוף מקלימה 07:30–07:45 · חזרה ~17:00 · כולל הסעות, ציוד, ארוחות ודמי פארק', ref:'Patty · בדלפק בקלימה', payment:'฿8,000 במזומן בדלפק', freeCancel:'עד 24 שעות לפני', fileTag:'Asian Trails'});
    }
  }

  /* משימות חדשות מתווספות בכל גרסה, לפי כותרת */
  fresh.masterChecklist.forEach(seedTask=>{
    if(!STATE.masterChecklist.some(t=>t.title===seedTask.title)){
      STATE.masterChecklist.push(JSON.parse(JSON.stringify(seedTask)));
    }
  });
  // רשימת ציוד ישנה הייתה כולה של טליה
  if(!STATE.packingList.some(p=>p.owner==='itai')){
    STATE.packingList.forEach(p=>{ if(!p.owner) p.owner = 'talia'; });
    STATE.packingList.push(...itaiPacking());
  }
  if(!STATE.packingBreakdown) STATE.packingBreakdown = "Osprey Renn 65L לכל הציוד → Osprey Daylite Plus 20L למטוס, נסיעות וטיולי יום → קרוסבודי קטן לטלפון, כסף ודרכון ביום־יום.";
  if(!STATE.packingCarryOn) STATE.packingCarryOn = ["דרכון","ארנק","טלפון","Power Bank","תרופות למיגרנה","תרופה לבחילות","משקפי שמש","אטמי אוזניים","מסכת עיניים","אוזניות","מגבונים קטנים","טישו","AirTag מחובר למוצ'ילה הגדולה","חולצה + תחתונים להחלפה"];
  STATE.countries.forEach((c,ci)=>{
    if(c.notes===undefined) c.notes='';
    if(c.currency===undefined) c.currency='';
    if(!c.budget) c.budget = defaultBudget();
    c.destinations.forEach((d,i)=>{ if(d.order===undefined) d.order=i+1; });
    c.prepChecklist.forEach((t,i)=>{ if(t.order===undefined) t.order=i+1; if(t.priority===undefined) t.priority=''; if(t.link===undefined) t.link=''; });
  });
  STATE.masterChecklist.forEach((t,i)=>{ if(t.order===undefined) t.order=i+1; if(t.priority===undefined) t.priority=''; if(t.link===undefined) t.link=''; if(t.countryId===undefined) t.countryId=null; });
  STATE.packingList.forEach(p=>{ if(p.quantity===undefined) p.quantity=''; if(p.notes===undefined) p.notes=''; });
  // הפרק המשותף נוסף אחרי שהמסמך כבר נשמר פעם ראשונה — משלימים אותו למסמכים ישנים
  if(!STATE.shared && window.SHARED_SEED){
    STATE.shared = JSON.parse(JSON.stringify(window.SHARED_SEED));
  }
  ensureSharedPriceEstimates();
}

/* ---------------------------------------------------------
   שמירה בשרת (Neon) — שני המשתמשים עובדים על אותו מסמך
--------------------------------------------------------- */
let serverVersion = 0;      // הגרסה האחרונה שראינו מהשרת
let lastUpdatedBy = null;   // מי שמר אותה
let savePending = false;    // יש שינוי מקומי שעדיין לא נשמר
let saveInFlight = false;
let syncStatus = 'loading'; // loading | saved | saving | offline | conflict
let syncTimer = null;

function setSyncStatus(status){
  syncStatus = status;
  const el = document.getElementById('sync-pill');
  if(!el) return;
  const map = {
    loading: ['טוען…', 'loading'],
    saving:  ['שומר…', 'saving'],
    saved:   [lastUpdatedBy ? ('מסונכרן · ' + lastUpdatedBy.displayName) : 'מסונכרן', 'saved'],
    offline: [hasPendingOffline() ? 'אין חיבור — נשמר במכשיר' : 'אין חיבור', 'offline'],
    conflict:['עודכן במכשיר אחר', 'conflict']
  };
  const [label, cls] = map[status] || map.saved;
  el.textContent = label;
  el.className = 'sync-pill ' + cls;
}

function adoptServerState(payload){
  serverVersion = Number(payload.version) || 0;
  lastUpdatedBy = payload.updatedBy || null;
  if(payload.data){
    STATE = payload.data;
    ensureDefaults();
  }
}

/* ---------------------------------------------------------
   עותק מקומי — כדי שהאפליקציה תיפתח גם בלי קליטה
--------------------------------------------------------- */
const CACHE_KEY = 'trip-state-cache-v1';

function cacheState(){
  try{
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: STATE, version: serverVersion, by: lastUpdatedBy, at: Date.now()
    }));
  }catch(e){ /* אין מקום או שהאחסון חסום — ממשיכים בלי */ }
}
function readCachedState(){
  try{
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
/** האם יש שינוי מקומי שממתין לקליטה */
function hasPendingOffline(){
  const cached = readCachedState();
  return !!(cached && cached.pending);
}
function markOfflinePending(pending){
  try{
    const cached = readCachedState() || {};
    cached.data = STATE; cached.version = serverVersion; cached.pending = pending; cached.at = Date.now();
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  }catch(e){}
}

async function loadState(){
  setSyncStatus('loading');

  // קודם מהעותק המקומי, כדי שהמסך יהיה שם מיד גם בלי רשת
  const cached = readCachedState();
  if(cached && cached.data){
    STATE = cached.data;
    serverVersion = Number(cached.version) || 0;
    lastUpdatedBy = cached.by || null;
    ensureDefaults();
    render();
  }

  try{
    const res = await fetch('/api/state', {cache:'no-store'});
    if(res.status === 401){ window.location.href = '/login'; return; }
    if(!res.ok) throw new Error('load failed');
    const payload = await res.json();
    if(payload.data){
      // שינוי מקומי שנעשה בלי רשת גובר על מה שהיה בשרת לפניו
      if(cached && cached.pending && Number(payload.version) === Number(cached.version)){
        setSyncStatus('saving');
        await flushSave();
      }else{
        adoptServerState(payload);
        cacheState();
        setSyncStatus('saved');
      }
    }else{
      // מסד נתונים ריק — זורעים את התוכנית ההתחלתית ושומרים אותה לשרת
      STATE = seedData();
      ensureDefaults();
      serverVersion = 0;
      render();
      await flushSave();
    }
  }catch(e){
    storageAvailable = false;
    if(!STATE){ STATE = seedData(); ensureDefaults(); }
    setSyncStatus('offline');
  }
  render();
  startSyncLoop();
  registerServiceWorker();
  setupInstallButton();
  startPresence();
}

/** שולח את המסמך לשרת. מחזיר true אם נשמר. */
async function flushSave(){
  if(saveInFlight) return false;
  saveInFlight = true;
  savePending = false;
  setSyncStatus('saving');
  try{
    const res = await fetch('/api/state', {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({data: STATE, baseVersion: serverVersion})
    });
    if(res.status === 401){ window.location.href = '/login'; return false; }
    const payload = await res.json();
    if(res.status === 409){
      // השני שמר קודם — לוקחים את הגרסה שלו כדי לא לדרוס אותה
      adoptServerState(payload);
      storageAvailable = true;
      setSyncStatus('conflict');
      render();
      toast((payload.updatedBy ? payload.updatedBy.displayName : 'השני') + ' עדכן/ה בינתיים — טענו את הגרסה המעודכנת');
      return false;
    }
    if(!res.ok) throw new Error(payload.error || 'save failed');

    // השרת מיזג את שני הצדדים — לוקחים את התוצאה
    if(payload.merged && payload.data){
      STATE = payload.data;
      ensureDefaults();
      render();
      const clash = (payload.conflicts||[]).length;
      toast(clash
        ? 'אוחד עם השינויים של ' + (other().name) + ' · ' + clash + ' שדות נשמרו לפי הגרסה שלהם'
        : 'אוחד עם השינויים של ' + other().name);
    }
    serverVersion = Number(payload.version) || serverVersion;
    lastUpdatedBy = payload.me || lastUpdatedBy;
    storageAvailable = true;
    setSyncStatus('saved');
    cacheState();
    markOfflinePending(false);
    return true;
  }catch(e){
    storageAvailable = false;
    savePending = true;
    setSyncStatus('offline');
    markOfflinePending(true);   // נשמר מקומית, יעלה כשתחזור קליטה
    return false;
  }finally{
    saveInFlight = false;
    if(savePending) persist();
  }
}

function persist(){
  savePending = true;
  setSyncStatus('saving');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{ flushSave(); }, 600);
}

/** בדיקה תקופתית — אם הצד השני שמר, מרעננים את המסך */
/** אמצע הקלדה — עדכון מהשרת ימחק את מה שכותבים, אז מחכים */
function isTyping(){
  const el = document.activeElement;
  return !!el && (el.tagName==='INPUT' || el.tagName==='TEXTAREA' || el.isContentEditable);
}

async function syncNow(){
  if(savePending || saveInFlight || modalOpen() || isTyping()) return;
  try{
    const res = await fetch('/api/state?meta=1', {cache:'no-store'});
    if(!res.ok) return;
    const meta = await res.json();
    if(Number(meta.version) > serverVersion){
      const full = await (await fetch('/api/state', {cache:'no-store'})).json();
      adoptServerState(full);
      storageAvailable = true;
      setSyncStatus('saved');
      render();
      toast((full.updatedBy ? full.updatedBy.displayName : 'הצד השני') + ' עדכן/ה את התוכנית');
    }
  }catch(e){ /* אופליין זמני — ננסה שוב בסבב הבא */ }
}

function startSyncLoop(){
  if(syncTimer) return;
  let lastSync = 0;
  syncTimer = setInterval(()=>{
    if(document.hidden) return;
    if(Date.now() - lastSync < syncInterval()) return;
    lastSync = Date.now();
    syncNow();
  }, 1500);
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) return;
    if(savePending) flushSave(); else syncNow();
  });
  window.addEventListener('beforeunload', ()=>{
    if(savePending && navigator.sendBeacon){
      navigator.sendBeacon('/api/state/beacon', new Blob(
        [JSON.stringify({data: STATE, baseVersion: serverVersion})],
        {type:'application/json'}
      ));
    }
  });
}

/* =========================================================
   שכבת המגע — מה שהופך את זה מדף לאפליקציה
========================================================= */

/** רטט קצר. בלי זה סימון מרגיש כמו לחיצה על טקסט. */
function buzz(pattern){
  try{ if(navigator.vibrate) navigator.vibrate(pattern || 12); }catch(e){}
}

/** מי עוד נמצא באפליקציה ברגע זה */
let othersHere = [];
let presenceTimer = null;

async function beatPresence(){
  if(document.hidden) return;
  try{
    const res = await fetch('/api/presence', {method:'POST'});
    if(!res.ok) return;
    const payload = await res.json();
    const was = othersHere.length;
    othersHere = payload.others || [];
    if(othersHere.length !== was) renderPresence();
  }catch(e){ /* אין רשת — הנוכחות פשוט לא מתעדכנת */ }
}

function renderPresence(){
  const el = document.getElementById('presence-pill');
  if(!el) return;
  if(!othersHere.length){ el.classList.add('hidden'); el.innerHTML=''; return; }
  const who = othersHere[0];
  el.classList.remove('hidden');
  el.innerHTML = `<span class="live-dot"></span>${who.emoji} ${who.displayName} כאן עכשיו`;
}

/** כששניכם בפנים, שווה לבדוק עדכונים מהר יותר */
function syncInterval(){ return othersHere.length ? 3000 : 8000; }

function startPresence(){
  if(presenceTimer) return;
  beatPresence();
  presenceTimer = setInterval(beatPresence, 20000);
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) beatPresence(); });
}

/** משיכה למטה בראש הרשימה — רענון, כמו בכל אפליקציה */
function initPullToRefresh(){
  const content = document.getElementById('content');
  if(!content || content.dataset.pullReady) return;
  content.dataset.pullReady = '1';

  let startY = 0, pulling = false, distance = 0;
  const bar = document.getElementById('pull-hint');

  content.addEventListener('touchstart', (e)=>{
    if(window.scrollY > 4 || modalOpen()) return;
    startY = e.touches[0].clientY; pulling = true; distance = 0;
  }, {passive:true});

  content.addEventListener('touchmove', (e)=>{
    if(!pulling) return;
    distance = e.touches[0].clientY - startY;
    if(distance <= 0){ pulling = false; if(bar) bar.style.height='0px'; return; }
    if(bar){
      bar.style.height = Math.min(64, distance*0.5) + 'px';
      bar.textContent = distance > 90 ? 'שחררו לרענון' : 'משכו לרענון';
    }
  }, {passive:true});

  const finish = async ()=>{
    if(!pulling) return;
    pulling = false;
    if(bar) bar.style.height = '0px';
    if(distance > 90){
      buzz(18);
      setSyncStatus('loading');
      await syncNow();
      await beatPresence();
      setSyncStatus(storageAvailable ? 'saved' : 'offline');
    }
    distance = 0;
  };
  content.addEventListener('touchend', finish);
  content.addEventListener('touchcancel', finish);
}

/* התקנה למסך הבית: באנדרואיד ובכרום — כפתור שפותח את חלון ההתקנה; באייפון — הסבר קצר */
let installPrompt = null;
function isStandalone(){
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
function setupInstallButton(){
  const btn = document.getElementById('install-pill');
  if(!btn || isStandalone()) return;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  window.addEventListener('beforeinstallprompt', e=>{
    e.preventDefault();
    installPrompt = e;
    btn.classList.remove('hidden');
  });
  window.addEventListener('appinstalled', ()=>{ installPrompt = null; btn.classList.add('hidden'); toast('האפליקציה הותקנה 🎉'); });
  if(ios) btn.classList.remove('hidden');
  btn.addEventListener('click', async ()=>{
    if(installPrompt){
      installPrompt.prompt();
      const choice = await installPrompt.userChoice.catch(()=>null);
      if(choice && choice.outcome==='accepted') btn.classList.add('hidden');
      installPrompt = null;
      return;
    }
    if(ios) toast('בספארי: כפתור השיתוף ⬆️ ← "הוספה למסך הבית"');
  });
}

function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return;
  // כשגרסה חדשה של האפליקציה נכנסת לתוקף — טוענים מחדש פעם אחת, כדי לא להישאר על הישנה
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', ()=>{
    if(!hadController || reloaded || isTyping()) return;
    reloaded = true;
    window.location.reload();
  });
  navigator.serviceWorker.register('/sw.js').then(reg=>reg.update()).catch(()=>{ /* לא קריטי */ });
  window.addEventListener('online', ()=>{
    if(savePending || hasPendingOffline()) flushSave();
    else syncNow();
  });
  window.addEventListener('offline', ()=> setSyncStatus('offline'));
}

/** סימון שורה — עם רטט ואנימציה, כדי שהמגע יחזיר משהו */
function toggleRowDone(dayId, rowId, el){
  const day = sh().days.find(d=>d.id===dayId);
  const row = day && day.rows.find(r=>r.id===rowId);
  if(!row) return;
  row.done = !row.done;
  buzz(row.done ? [10,30,14] : 10);
  if(el){
    el.classList.toggle('done', row.done);
    el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
  }
  persist();
  cacheState();
  clearTimeout(toggleRowDone.redraw);
  toggleRowDone.redraw = setTimeout(render, 320);   // נותנים לאנימציה לרוץ
}

function modalOpen(){
  const b = document.getElementById('modal-backdrop');
  return !!b && b.classList.contains('open');
}

let toastTimer = null;
function toast(msg){
  const el = document.getElementById('sync-toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.add('hidden'), 4000);
}

async function logout(){
  try{ await fetch('/api/auth/logout', {method:'POST'}); }catch(e){}
  window.location.href = '/login';
}

/* =========================================================
   UNDO / CONFIRM
========================================================= */
/** `what` הוא מה שקרה — ברירת המחדל מחיקה, אבל כל פעולה הפיכה יכולה להשתמש בזה */
function snapshotUndo(label, what){
  undoSnapshot = JSON.parse(JSON.stringify(STATE));
  clearTimeout(undoTimer);
  const el = document.getElementById('undo-toast');
  el.querySelector('.ut-label').textContent = (label?('"'+label+'" '):'')+(what||'נמחק');
  el.classList.remove('hidden');
  undoTimer = setTimeout(()=>{ el.classList.add('hidden'); undoSnapshot=null; }, 7000);
}
function performUndo(){
  if(!undoSnapshot) return;
  STATE = undoSnapshot; undoSnapshot=null;
  document.getElementById('undo-toast').classList.add('hidden');
  clearTimeout(undoTimer);
  persist(); render();
}
document.getElementById('undo-btn').addEventListener('click', performUndo);

function confirmThenDelete(label, mutatorFn){
  openModal(`
    <h3 style="margin-bottom:10px;">מחיקה</h3>
    <div class="small" style="margin-bottom:16px;">${label? 'למחוק את "'+label+'"?' : 'למחוק את הפריט?'}<br>ניתן יהיה לבטל (Undo) מיד אחרי.</div>
    <div class="modal-actions">
      <button class="btn full danger" id="cf-yes">כן, למחוק</button>
      <button class="btn secondary" id="cf-no">ביטול</button>
    </div>
  `, ()=>{
    document.getElementById('cf-no').onclick = closeModal;
    document.getElementById('cf-yes').onclick = ()=>{
      snapshotUndo(label);
      mutatorFn();
      persist(); closeModal(); render();
    };
  });
}
function reorder(list, id, dir){
  const sorted = [...list].sort((a,b)=>(a.order||0)-(b.order||0));
  const idx = sorted.findIndex(x=>x.id===id);
  const j = idx+dir;
  if(idx<0||j<0||j>=sorted.length) return false;
  const tmp = sorted[idx].order ?? idx;
  sorted[idx].order = sorted[j].order ?? j;
  sorted[j].order = tmp;
  return true;
}

/* =========================================================
   HELPERS
========================================================= */
function fmtDate(d){ if(!d) return "—"; const dt=new Date(d+"T00:00:00"); if(isNaN(dt)) return d; return dt.toLocaleDateString('he-IL',{day:'numeric',month:'short',year:'numeric'}); }
function fmtDateShort(d){ if(!d) return "—"; const dt=new Date(d+"T00:00:00"); if(isNaN(dt)) return d; return dt.toLocaleDateString('he-IL',{day:'numeric',month:'short'}); }
/**
 * התאריך של הטיול — לפי שעון בנגקוק ולא לפי UTC.
 * toISOString מחזיר UTC, ולכן עד 07:00 בתאילנד הוא עוד מראה את אתמול —
 * בדיוק בשעות של ההשכמות המוקדמות והסירות.
 */
const TRIP_TZ = 'Asia/Bangkok';
function tripToday(){
  try{
    return new Intl.DateTimeFormat('en-CA', {timeZone:TRIP_TZ, year:'numeric', month:'2-digit', day:'2-digit'})
      .format(new Date());
  }catch(e){
    const d = new Date(Date.now() + 7*3600*1000);   // בלי Intl — היסט קבוע
    return d.toISOString().slice(0,10);
  }
}
/** התאריך המקומי של מי שמחזיק את הטלפון — לרישום הוצאות והחזרים */
function localToday(){
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
}

/** ימים עד תאריך — נמדד מול היום בשעון הטיול, כדי ש״היום״ ו״מחר״ יסכימו זה עם זה */
function daysUntil(d){ if(!d) return 0;
  const from=new Date(tripToday()+"T00:00:00Z"), to=new Date(d+"T00:00:00Z");
  return Math.round((to-from)/86400000); }
function money(n){ if(n===null||n===undefined||n==="") return "—"; return "₪"+Number(n).toLocaleString('he-IL'); }
function allDestinations(){ let arr=[]; STATE.countries.forEach(c=>c.destinations.forEach(d=>arr.push({...d, countryId:c.id, countryName:c.name, countryColor:c.color, countryFlag:c.flag}))); return arr; }
function findCountry(id){ return STATE.countries.find(c=>c.id===id); }
function findDestination(countryId, destId){ const c=findCountry(countryId); return c? c.destinations.find(d=>d.id===destId) : null; }
/** מקום שמור שייך למי שהיעד או המדינה שלו שייכים לו */
function myPlace(p){
  const c = findCountry(p.countryId);
  if(c && !mine(c)) return false;
  const d = p.destinationId ? findDestination(p.countryId, p.destinationId) : null;
  if(d && !mine(d)) return false;
  return true;
}
function placesFor(countryId, destId){ return STATE.savedPlaces.filter(p=>p.countryId===countryId && p.destinationId===destId); }
function totalPlannedBudget(){ let sum=0; STATE.countries.forEach(c=>{ Object.values(c.budget).forEach(v=>sum+=(Number(v)||0)); }); return sum; }

/* ---- Unified expense system: "enter once, appears everywhere" ----
   Every euro/shekel entered anywhere in the app (a flight price, a hotel
   total, a visa fee on a task) is treated as ONE expense record. Instead of
   duplicating that number into a separate Expenses list, we derive a live
   row for it here. Editing the source (e.g. changing a flight price)
   automatically updates every screen that shows it, and deleting a derived
   row clears the price on its source instead of creating a second copy. */
function allExpenseRows(){
  let rows = [];
  // הפנקס המשותף (Splitwise) — מקור האמת להוצאות בפועל
  (wallet().expenses||[]).forEach(x=> rows.push({
    id:'wallet_'+x.id, amountILS:expenseIls(x), localAmount:x.currency==='THB'?x.amount:'', localCurrency:x.currency==='THB'?'THB':'',
    category:x.category||'other', countryId:x.countryId||null, destinationId:null, date:x.date||'',
    description:x.title, note:x.note||'', paymentStatus:'שולם',
    source:'wallet', sourceId:x.id
  }));
  STATE.expenses.forEach(e=> rows.push({
    id:'manual_'+e.id, amountILS:Number(e.amountILS)||0, localAmount:e.localAmount||'', localCurrency:e.localCurrency||'',
    category:e.category||'other', countryId:e.countryId||null, destinationId:e.destinationId||null, date:e.date||'',
    description:e.note||expCatLabel(e.category), note:e.note||'', paymentStatus:e.paymentStatus||'שולם',
    source:'manual', sourceId:e.id
  }));
  STATE.countries.forEach(c=>{
    c.transport.forEach(f=>{
      const amt = Number(f.price)||0;
      if(amt>0) rows.push({
        id:'transport_'+f.id, amountILS:amt, localAmount:f.localAmount||'', localCurrency:f.localCurrency||c.currency||'',
        category: f.kind==='טיסה'?'flights':'transport', countryId:c.id, destinationId:f.destinationId||null, date:f.date||'',
        description:`${f.kind}: ${f.from} → ${f.to}`, note:'', paymentStatus: f.paymentStatus || (f.status==='הוזמן'?'הוזמן':'מתוכנן'),
        source:'transport', sourceId:f.id
      });
    });
    c.accommodations.forEach(a=>{
      const amt = Number(a.priceTotal)||0;
      if(amt>0) rows.push({
        id:'stay_'+a.id, amountILS:amt, localAmount:a.localAmount||'', localCurrency:a.localCurrency||c.currency||'',
        category:'accommodation', countryId:c.id, destinationId:a.destinationId||null, date:a.checkIn||'',
        description:`לינה: ${a.name}`, note:a.notes||'', paymentStatus: a.paymentStatus || (a.status==='Booked'?'הוזמן':'מתוכנן'),
        source:'stay', sourceId:a.id
      });
    });
    c.prepChecklist.forEach(tk=>{
      const amt = Number(tk.cost)||0;
      if(amt>0) rows.push({
        id:'prep_'+tk.id, amountILS:amt, localAmount:'', localCurrency:c.currency||'',
        category: tk.expenseCategory||'visasInsurance', countryId:c.id, destinationId:null, date:tk.deadline||'',
        description:tk.title, note:tk.notes||'', paymentStatus: tk.paymentStatus || (tk.status==='done'?'שולם':'מתוכנן'),
        source:'prepTask', sourceId:tk.id
      });
    });
  });
  STATE.masterChecklist.forEach(tk=>{
    const amt = Number(tk.cost)||0;
    if(amt>0) rows.push({
      id:'master_'+tk.id, amountILS:amt, localAmount:'', localCurrency:'',
      category: tk.expenseCategory||'other', countryId:tk.countryId||null, destinationId:null, date:tk.deadline||'',
      description:tk.title, note:tk.notes||'', paymentStatus: tk.paymentStatus || (tk.status==='done'?'שולם':'מתוכנן'),
      source:'masterTask', sourceId:tk.id
    });
  });
  return rows;
}
function spendSummary(rows){
  const sum=(pred)=> rows.filter(pred).reduce((s,r)=>s+(Number(r.amountILS)||0),0);
  const planned = sum(r=>r.paymentStatus==='מתוכנן');
  const booked = sum(r=>r.paymentStatus==='הוזמן');
  const paid = sum(r=>r.paymentStatus==='שולם');
  return {planned, booked, paid, actual: booked+paid, total: planned+booked+paid};
}
function totalActualSpent(){ return spendSummary(allExpenseRows()).actual; }
function actualSpentFor(countryId, categoryId){ return spendSummary(allExpenseRows().filter(r=>r.countryId===countryId && (!categoryId||r.category===categoryId))).actual; }
function routeEditExpenseRow(source, countryId, sourceId){
  if(source==='wallet' || source==='manual') openExpenseModal(sourceId);
  else if(source==='transport') openTransportModal(countryId, sourceId);
  else if(source==='stay') openStayModal(countryId, sourceId);
  else if(source==='prepTask') openTaskModal('prep', countryId, sourceId);
  else if(source==='masterTask') openTaskModal('master', null, sourceId);
}
function sourceLabel(source){ return {wallet:'הוצאה משותפת', manual:'הוצאה ידנית', transport:'טיסה/תחבורה', stay:'לינה', prepTask:'משימה', masterTask:'משימה כללית'}[source] || source; }
function tripProgressPercent(){
  const mc = STATE.masterChecklist;
  const mcDone = mc.filter(x=>x.status==='done').length;
  const mcPct = mc.length? mcDone/mc.length : 0;
  const dests = allDestinations().filter(d=>d.arrival);
  const bookedPct = dests.length ? dests.filter(d=>d.status==='booked').length/dests.length : 0;
  return Math.round(((mcPct*0.5)+(bookedPct*0.5))*100);
}
function computeNextSteps(){
  let items=[];
  STATE.masterChecklist.filter(t=>mine(t) && t.status!=='done' && t.deadline)
    .sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,3)
    .forEach(t=>{ items.push({label:t.title, sub:`עד ${fmtDateShort(t.deadline)}`}); });
  STATE.countries.filter(mine).forEach(c=>{
    c.prepChecklist.filter(t=>mine(t) && t.status!=='done').slice(0,2).forEach(t=>{ items.push({label:`${c.flag} ${t.title}`, sub: t.deadline? `עד ${fmtDateShort(t.deadline)}`:'ללא דדליין'}); });
    c.transport.filter(f=>f.status==='מחפשת').forEach(f=>{ items.push({label:`${c.flag} להזמין: ${f.from} → ${f.to}`, sub:f.date? fmtDateShort(f.date):''}); });
  });
  return items.slice(0,6);
}
function computeWarnings(){
  let warns=[];
  const dests = allDestinations().filter(d=>mine(d) && d.arrival && d.departure);
  dests.forEach(d=>{ if(!d.accommodation && d.status!=='optional'){ warns.push(`אין עדיין לינה מאושרת ב${d.name}`); } });
  STATE.masterChecklist.filter(t=>mine(t) && t.deadline && t.status!=='done').forEach(t=>{
    const dd = daysUntil(t.deadline);
    if(dd<=14 && dd>=0) warns.push(`"${t.title}" — נותרו ${dd} ימים`);
    if(dd<0) warns.push(`"${t.title}" — עבר הדדליין!`);
  });
  STATE.countries.filter(mine).forEach(c=>{
    c.prepChecklist.filter(mine).forEach(t=>{
      if(t.deadline && t.status!=='done'){
        const dd = daysUntil(t.deadline);
        if(dd<=14 && dd>=0) warns.push(`${c.flag} "${t.title}" — נותרו ${dd} ימים`);
        if(dd<0) warns.push(`${c.flag} "${t.title}" — עבר הדדליין!`);
      }
    });
  });
  const spent = totalActualSpent();
  if(spent > STATE.budgetTotal) warns.push(`ההוצאות בפועל (${money(spent)}) חורגות מהתקציב הכולל (${money(STATE.budgetTotal)})`);
  return warns.slice(0,6);
}
function cycleStatus(s){ return s==='todo'?'progress': s==='progress'?'done':'todo'; }
function statusIcon(s){ return s==='done'?'✓':s==='progress'?'◐':''; }
function extractMapsInfo(url){
  let lat=null, lng=null, nameGuess='';
  if(!url) return {lat,lng,nameGuess};
  try{
    let m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if(!m) m = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if(!m) m = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if(m){ lat=parseFloat(m[1]); lng=parseFloat(m[2]); }
    let pm = url.match(/\/maps\/place\/([^\/@]+)/);
    if(pm){ nameGuess = decodeURIComponent(pm[1].replace(/\+/g,' ')); }
  }catch(e){}
  return {lat,lng,nameGuess};
}
function getCssVar(v){
  if(!v) return '#C97B5A';
  if(v.startsWith('var(')){
    const name = v.replace('var(--','').replace(')','');
    return getComputedStyle(document.documentElement).getPropertyValue('--'+name).trim() || '#C97B5A';
  }
  return v;
}

/* =========================================================
   RENDER: ROOT
========================================================= */
function render(){
  applyTheme();
  document.getElementById('storage-banner').classList.toggle('hidden', storageAvailable);
  renderNav();
  const c = document.getElementById('content');
  if(activeTab==='home') c.innerHTML = renderHome();
  else if(activeTab==='today'){ c.innerHTML = renderToday(); initSwipe(); centerDayStrip(); initDayMap(myDays()[currentDayIndex()]); }
  else if(activeTab==='journal'){ c.innerHTML = renderJournal(); initJournalMap(); }
  else if(activeTab==='route'){ c.innerHTML = renderRouteTab(); initRouteMap(); }
  else if(activeTab==='money') c.innerHTML = renderMoney();
  else if(activeTab==='map') { c.innerHTML = renderMapShell(); initMapIfNeeded(); }
  else if(activeTab==='countries') c.innerHTML = renderCountries();
  else if(activeTab==='more'){
    c.innerHTML = renderMore();
    if(moreSection==='map') initMapIfNeeded();
    if(moreSection==='docs') loadFiles();
    if(moreSection==='shopping') initShopSwipe();
  }
  else { activeTab='home'; c.innerHTML = renderHome(); }
  renderWhoPill();
  renderPresence();
  initPullToRefresh();
  loadVisibleImages();
}

/* =========================================================
   ניווט — לכל אחד הלשוניות שרלוונטיות לו
========================================================= */
function uiIcon(name){
  const paths = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    today:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h3"/>',
    journal:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><path d="M9 10h6"/>',
    route:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>',
    money:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 9h18m-5 5h2"/>',
    more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    'אוכל':'<path d="M5 3v7m4-7v7M3 3v5a4 4 0 0 0 8 0V3M7 12v9m11-18v18m0-18c-5 4-5 10 0 10"/>',
    'תחבורה':'<rect x="4" y="5" width="16" height="13" rx="3"/><path d="M4 12h16M7 18v3m10-3v3M8 8h8"/>',
    'אטרקציות':'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    'לינה':'<path d="M3 21V5h18v16M8 21v-5h8v5M7 9h2m6 0h2"/>',
    'אחר':'<circle cx="12" cy="12" r="8"/><path d="M12 8v4m0 4h.01"/>'
  };
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths['אחר']}</svg>`;
}
// Isolate embedded Latin identifiers and numeric values inside Hebrew copy.
function itineraryText(value){
  return String(value||'').split(/([A-Za-z0-9][A-Za-z0-9:.,/–−+() -]*)/g).map((text,i)=>i%2?`<bdi dir="ltr">${escapeHtml(text)}</bdi>`:escapeHtml(text)).join('');
}
function navItems(){
  const common = [
    {tab:'home',  icon:'🏠', label:'בית'},
    {tab:'today', icon:'📆', label:'היום'},
    {tab:'journal', icon:'📍', label:'יומן'},
    {tab:'route', icon:'🧭', label:'המסלול'},
    {tab:'money', icon:'💸', label:'כסף'}
  ];
  return [...common, {tab:'more', icon:'more', label:'עוד'}];
}

function renderNav(){
  const nav = document.getElementById('bottomnav');
  if(!nav) return;
  nav.innerHTML = navItems().map(n=>
    `<button class="nav-btn ${(activeTab===n.tab || (n.tab==='more' && ['map','countries'].includes(activeTab)))?'active':''}" data-action="setTab" data-id="${n.tab}">
       <span class="ni">${uiIcon(n.tab)}</span>${n.label}
     </button>`).join('');
}

/* =========================================================
   תמונות — נטענות מוויקיפדיה בזמן אמת, עם נפילה רכה לגרדיאנט
========================================================= */
/*
 * כתובות שנבדקו מראש מול Wikimedia — כך שהתמונות עולות מיד, בלי תלות
 * בקריאת API בזמן טעינה. יעד שמישהו מוסיף בעצמו נפתר בזמן אמת.
 */
const DEST_IMAGES = {
 "Bangkok": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/4Y1A1159_Bangkok_%2833536795515%29.jpg/1280px-4Y1A1159_Bangkok_%2833536795515%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Ko Yao Noi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg/1280px-Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Ao Nang": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Ao_Nang_beach_panorama_1.jpg/1280px-Ao_Nang_beach_panorama_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Khao Lak": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Khao_Lak_Beach%2C_Thailand.jpg/1280px-Khao_Lak_Beach%2C_Thailand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Chiang Mai": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg/1280px-0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Pai, Thailand": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/View_of_Pai_3.jpg/1280px-View_of_Pai_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Colombo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Colombo_city_skyline_at_night.png/1280px-Colombo_city_skyline_at_night.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Mirissa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Mirissa-Plage_%283%29.jpg/1280px-Mirissa-Plage_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Ella, Sri Lanka": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Ella_railway_station.jpg/1280px-Ella_railway_station.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Arugam Bay": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Beach_of_Arugam_Bay.jpg/1280px-Beach_of_Arugam_Bay.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Hanoi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/1280px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Manila": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Cityscape_of_Manila%2C_2025_%2801%29.jpg/1280px-Cityscape_of_Manila%2C_2025_%2801%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
};

const ROW_IMAGES = {
 "Grand Palace": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/0005574_-_Wat_Phra_Kaew_006.jpg/960px-0005574_-_Wat_Phra_Kaew_006.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Khao Lak": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Khao_Lak_Beach%2C_Thailand.jpg/960px-Khao_Lak_Beach%2C_Thailand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Khao Sok National Park": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/1022_KhaoSokNationalPark_2.jpg/960px-1022_KhaoSokNationalPark_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Loy Krathong": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Thai_people_setting_their_candle-lit_krathongs_in_the_Ping_river_at_night_during_Loy_Krathong_2015-10_%2822715933524%29.jpg/960px-Thai_people_setting_their_candle-lit_krathongs_in_the_Ping_river_at_night_during_Loy_Krathong_2015-10_%2822715933524%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Lumphini Park": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Aerial_view_of_Lumphini_Park.jpg/960px-Aerial_view_of_Lumphini_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "MBK Center": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/MBK_CENTER_%288%29.jpg/960px-MBK_CENTER_%288%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Muay Thai": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Muay_Thai_Fight_Us_Vs_Burma_%2880668065%29.jpeg/960px-Muay_Thai_Fight_Us_Vs_Burma_%2880668065%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Phang Nga Bay": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg/960px-Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Railay Beach": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Railay_Beach_5.jpg/960px-Railay_Beach_5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Rajadamnern Stadium": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/RajInfront.jpg/960px-RajInfront.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Wat Arun": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%932.jpg/960px-%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%932.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Wat Pho": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B9%84%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%8A%E0%B8%95%E0%B8%B8%E0%B8%9E%E0%B8%99.jpg/960px-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B9%84%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%8A%E0%B8%95%E0%B8%B8%E0%B8%9E%E0%B8%99.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Yaowarat Road": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/%282022%29_%E0%B8%95%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%96%E0%B8%A7%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%80%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%A3%E0%B8%B2%E0%B8%8A_%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%A7%E0%B8%87%E0%B8%A8%E0%B9%8C_%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3_%284%29.jpg/960px-%282022%29_%E0%B8%95%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%96%E0%B8%A7%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%80%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%A3%E0%B8%B2%E0%B8%8A_%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%A7%E0%B8%87%E0%B8%A8%E0%B9%8C_%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3_%284%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Phra Nang Cave Beach": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Railay_Beach_5.jpg/960px-Railay_Beach_5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
 "Similan Islands": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Similan_islands.png",
 "Zip line": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Texas_Zip_liner_5430.JPG/960px-Texas_Zip_liner_5430.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
};

const imageCache = Object.assign({}, DEST_IMAGES, ROW_IMAGES);
function imageBox(wiki, hue, cls){
  const key = wiki || '';
  const cached = imageCache[key];
  const style = `--hue:${hue||'#C97B5A'}`;
  return `<div class="photo ${cls||''} ${cached?'loaded':''}" style="${style}" data-wiki="${escapeAttr(key)}">
    ${cached?`<img src="${cached}" alt="" loading="lazy" onerror="imageFailed(this)">`:''}
  </div>`;
}
async function loadVisibleImages(){
  const boxes = [...document.querySelectorAll('.photo[data-wiki]:not(.loaded)')];
  for(const box of boxes){
    const title = box.dataset.wiki;
    if(!title) continue;
    if(imageCache[title]){ paintImage(box, imageCache[title]); continue; }
    const url = await wikiImage(title);
    if(url){ imageCache[title] = url; paintImage(box, url); }
  }
}
/** תמונה מוויקיפדיה ליעד שלא נמצא ברשימה המוכנה — קודם עברית, אחר כך אנגלית */
async function wikiImage(title){
  for(const lang of ['he','en']){
    try{
      const api = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages` +
                  `&piprop=thumbnail&pithumbsize=1024&format=json&redirects=1&origin=*` +
                  `&titles=${encodeURIComponent(title)}`;
      const res = await fetch(api);
      if(!res.ok) continue;
      const data = await res.json();
      const pages = data && data.query && data.query.pages;
      if(!pages) continue;
      const page = Object.values(pages)[0];
      const url = page && page.thumbnail && page.thumbnail.source;
      if(url) return url;
    }catch(e){ /* אין רשת — הגרדיאנט נשאר */ }
  }
  return null;
}
/** תמונה שלא נטענה — חוזרים לגרדיאנט במקום אייקון שבור */
function imageFailed(img){
  const box = img.closest('.photo');
  if(box){
    box.classList.remove('loaded');
    delete imageCache[box.dataset.wiki];
  }
  img.remove();
}
function paintImage(box, url){
  box.classList.add('loaded');
  if(!box.querySelector('img')){
    const img = document.createElement('img');
    img.src = url; img.alt = ''; img.loading = 'lazy';
    img.onerror = ()=>{ box.classList.remove('loaded'); img.remove(); };
    box.appendChild(img);
  }
}

/* =========================================================
   עזרי כסף ומסלול
========================================================= */
function sh(){ return STATE.shared; }
function wallet(){ return STATE.money; }
function baht(n){ return '฿' + Math.round(n).toLocaleString('he-IL'); }
function ils(n){ return '₪' + Math.round(n).toLocaleString('he-IL'); }
function rate(){ return Number(wallet().rate) || 0.08981; }
function toIls(bahtAmount){ return (Number(bahtAmount)||0) * rate(); }

const SHARED_STATUS_CLASS = {
  'מוזמן':'booked', 'להזמין':'todo', 'משלמים במקום':'onsite', 'אופציונלי':'optional',
  'כלול בחבילה':'booked', 'לברר':'todo', 'ממתינים לפרטי בנק ולתשלום מקדמה':'todo'
};

/** סכום היום בבאט — בלי השורות המסומנות ״אופציונלי״, בדיוק כמו בגיליון */
function dayTotalBaht(day){
  return day.rows.reduce((sum,r)=> optionalPrice(r) ? sum : sum + sharedRowPrice(r).base / rate(), 0);
}
function groundTotalBaht(){
  return sh().days.reduce((sum,d)=>sum+dayTotalBaht(d), 0) + (Number(sh().reserveBaht)||0);
}
function sharedCategoryTotals(){
  const totals = {};
  sh().days.forEach(d=>d.rows.forEach(r=>{
    if(optionalPrice(r)) return;
    const category=expCatLabel(sharedRowCategory(r));
    totals[category] = (totals[category]||0) + sharedRowPrice(r).base / rate();
  }));
  return totals;
}

/** היעדים שרלוונטיים למי שמחובר, לפי סדר התאריכים */
function myDestinations(){
  return allDestinations()
    .filter(d=>mine(d) && !afterMyTrip(d.arrival))
    .sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999'));
}

/** איתי חוזר לארץ ב-10/12 — מה שמתחיל אחרי זה כבר לא הטיול שלו */
function afterMyTrip(date){
  if(meId()!=='itai' || !date) return false;
  return date >= homeDate();
}
/** יום שסומן לאחד מהם בלבד (9–10/12 של איתי) לא מופיע אצל השני */
function dayIsMine(day){ return !day.owner || day.owner==='both' || day.owner===meId(); }
/**
 * הימים המפורטים מהגיליון ששייכים ליעד מסוים.
 * יום מעבר שייך לתחנה שמגיעים אליה — חוץ מיום הפרידה (10/12), ששייך
 * לבנגקוק: שם שניהם מתעוררים, ומשם איתי נוסע לשדה התעופה.
 */
function daysForDest(dest){
  if(!sh() || !dest.arrival) return [];
  const end = dest.departure || dest.arrival;
  const split = splitDate(), home = homeDate();
  return sh().days.filter(d=>{
    if(!dayIsMine(d)) return false;
    if(d.date < dest.arrival) return false;
    if(d.date === split) return end === split;   // התחנה שיוצאים ממנה, לא זו שמגיעים אליה
    if(d.date === home && home !== split) return end === home;
    return d.date < end;
  });
}

/* =========================================================
   המסלול — יעד אחרי יעד, ובתוך כל יעד השעות מהגיליון
========================================================= */
function renderRouteTab(){
  const dests = myDestinations();
  const isItai = meId()==='itai';
  const meta = STATE.trip[meId()] || {};
  const untilDays = daysUntil(STATE.startDate);
  const totalNights = dests.reduce((n,d)=>n+(Number(d.nights)||0),0);

  return `
  ${renderBigHero(meta.title||'המסלול', meta.subtitle||'', dests[0])}
  <div class="section">
    <div class="stat-strip">
      <div class="stat-cell"><b>${untilDays>0?untilDays:0}</b><span>ימים להמראה</span></div>
      <div class="stat-cell"><b>${dests.length}</b><span>תחנות</span></div>
      <div class="stat-cell"><b>${totalNights}</b><span>לילות</span></div>
    </div>
    <div class="route-map-wrap"><div id="route-map" class="route-map"></div>
      <div class="day-map-cap">כל התחנות לפי הסדר · לחיצה על מספר קופצת לתחנה</div></div>
    ${isItai ? '' : ''}
    ${dests.map((d,i)=>{
      const marker = (!isItai && d.arrival >= splitDate() &&
                      (i===0 || dests[i-1].arrival < splitDate())) ? renderSplitMarker() : '';
      return marker + renderDestCard(d, i, dests.length);
    }).join('')}
    ${isItai ? `<div class="card dashed" style="text-align:center">
        <div style="font-size:22px">✈️</div>
        <b>${STATE.trip.itai.homeFlight}</b>
        <div class="small" style="margin-top:6px">מכאן ${other().name} ממשיכה לבד — הטיול שלה נמשך</div>
      </div>` : ''}
  </div>`;
}

/** נקודת הפרידה — שני מטוסים באותו יום */
function renderSplitMarker(){
  const t = STATE.trip.talia || {};
  return `
  <div class="split-marker">
    <div class="sm-line"></div>
    <div class="sm-body">
      <div class="sm-title">✈️ ${fmtDateShort(splitDate())} — נפרדים בבנגקוק</div>
      <div class="sm-text">
        ${PEOPLE.itai.name} טס הביתה · ${STATE.trip.itai.homeFlight}<br>
        ${PEOPLE.talia.name} ממשיכה · ${t.onwardFlight || ''}
      </div>
    </div>
  </div>`;
}

function renderBigHero(title, subtitle, dest){
  return `
  <div class="big-hero">
    ${imageBox(dest&&dest.wiki, dest&&dest.hue, 'hero-photo')}
    <div class="big-hero-text">
      <div class="bh-title">${title}</div>
      <div class="bh-sub">${subtitle}</div>
    </div>
  </div>`;
}

function nightsLabel(n){
  const count = Number(n)||0;
  if(!count) return '';
  return count===1 ? 'לילה אחד' : count+' לילות';
}
function datesLabel(d){
  if(!d.arrival) return 'תאריכים עוד לא נקבעו';
  const range = `${fmtDateShort(d.arrival)} – ${fmtDateShort(d.departure)}`;
  const nights = nightsLabel(d.nights);
  return nights ? `${range} · ${nights}` : range;
}
/** התמונות של התחנה — מכל הימים בה, בלי כפילויות */
function destGallery(d){
  const seen = new Set([d.wiki]);
  const shots = [];
  daysForDest(d).forEach(day=>day.rows.filter(r=>r.time).forEach(r=>{
    const w = rowWiki(r);
    if(w && !seen.has(w)){ seen.add(w); shots.push({w, r, day}); }
  }));
  if(!shots.length) return '';
  return `<div class="dest-gallery">${shots.slice(0,8).map(x=>`
    <button class="gal-card" data-action="toggleDest" data-id="${d.id}">
      ${imageBox(x.w, d.hue, 'gal-img')}
      <span class="gal-cap">${itineraryText(x.r.act)}</span>
    </button>`).join('')}</div>`;
}

/** מפת הטיול כולו — תחנה ממוספרת לכל יעד, וקו לפי הסדר */
let routeMap = null;
function initRouteMap(){
  const el = document.getElementById('route-map');
  if(!el) return;
  if(routeMap){ try{ routeMap.remove(); }catch(e){} routeMap = null; }
  if(typeof L === 'undefined'){ setTimeout(()=>{ if(activeTab==='route') initRouteMap(); }, 800); return; }
  const dests = myDestinations().filter(d=>d.lat && d.lng);
  if(!dests.length){ el.style.display='none'; return; }
  routeMap = L.map(el, {zoomControl:false, scrollWheelZoom:false, dragging:!L.Browser.mobile, tap:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18, attribution:'© OpenStreetMap'}).addTo(routeMap);
  const pts = dests.map(d=>[d.lat, d.lng]);
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2F6F6B';
  if(pts.length > 1) L.polyline(pts, {color:accent, weight:3, dashArray:'6 6', opacity:.85}).addTo(routeMap);
  const today = tripToday();
  dests.forEach((d,i)=>{
    const past = (d.departure||d.arrival) < today;
    const icon = L.divIcon({className:'', html:`<div class="map-pin big ${past?'done':''}">${i+1}</div>`, iconSize:[32,32], iconAnchor:[16,16]});
    L.marker([d.lat, d.lng], {icon}).addTo(routeMap)
      .bindPopup(`<b>${escapeHtml(d.name)}</b><br>${escapeHtml(datesLabel(d))}`)
      .on('click', ()=>{ const card=document.getElementById('dest-'+d.id); if(card) card.scrollIntoView({behavior:'smooth', block:'start'}); });
  });
  routeMap.fitBounds(pts, {padding:[28,28]});
}

function renderDestCard(d, index, total){
  const open = expandedDest[d.id] === true;
  const days = daysForDest(d);
  const totalB = days.reduce((n,day)=>n+dayTotalBaht(day),0);
  const mapsLink = 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(d.name + ' ' + (d.countryName||''));
  return `
  <div class="dest-card ${open?'open':''}" id="dest-${d.id}">
    <div class="dest-top" data-action="toggleDest" data-id="${d.id}">
      ${imageBox(d.wiki, d.hue, 'dest-photo')}
      <div class="dest-overlay">
        <div class="dest-step">${index+1}/${total}</div>
        <div class="dest-name">${d.name}</div>
        <div class="dest-dates">${datesLabel(d)}</div>
        <div class="dest-tags">
          ${ownerBadge(d.owner)}
          ${d.status==='booked'?'<span class="own-tag booked">מוזמן</span>':''}
        </div>
      </div>
    </div>
    <div class="dest-body">
      ${destGallery(d)}
      ${d.notes?`<div class="dest-note">${d.notes}</div>`:''}
      ${renderScooter(d)}
      ${d.accommodation?`<div class="dest-line">🏨 ${d.accommodation}</div>`:''}
      ${d.transport?`<div class="dest-line">🚕 ${d.transport}</div>`:''}
      <div class="chip-row">
        <a class="chip" href="${mapsLink}" target="_blank" rel="noopener">🗺️ במפה</a>
        ${d.wiki?`<a class="chip" href="https://he.wikipedia.org/wiki/${encodeURIComponent(d.wiki)}" target="_blank" rel="noopener">📖 קצת רקע</a>`:''}
        ${days.length?`<button class="chip strong" data-action="toggleDest" data-id="${d.id}">${open?'▲ לסגור את הימים':'▼ '+days.length+' ימים, שעה אחר שעה'}</button>`:''}
      </div>
      ${days.length?`<div class="dest-cost">אומדן ${ils(toIls(totalB))} לתחנה הזאת</div>`:''}
      ${open?`<div class="day-list">${days.map(day=>renderDayCard(day)).join('')}</div>`:''}
    </div>
  </div>`;
}

/** הקטנוע בתחנה הזאת — כמה, כמה זה עולה, ומתי לא לגעת */
function renderScooter(d){
  const sc = d.scooter;
  if(!sc) return '';
  if(!sc.ok){
    return `<div class="moto off">
      <span class="moto-icon">🛵</span>
      <div><b>${sc.headline}</b><div class="moto-note">${sc.note}</div></div>
    </div>`;
  }
  const total = (Number(sc.perDay)||0) * (Number(sc.bikes)||1) * (Number(sc.days)||1);
  const bikes = sc.bikes===1 ? 'קטנוע אחד' : sc.bikes+' קטנועים';
  const days  = sc.days===1 ? 'ליום' : `ל-${sc.days} ימים`;
  const who = sc.rider
    ? `<div class="moto-who">${PEOPLE[sc.rider].name} רוכב · ${PEOPLE[sc.pillion].name} מאחור · שתי קסדות</div>`
    : (sc.soloRider ? `<div class="moto-who">רכיבה עצמאית — רישיון A על השם של ${PEOPLE[sc.soloRider].name}</div>` : '');
  return `<div class="moto">
    <span class="moto-icon">🛵</span>
    <div>
      <b>${sc.headline}</b>
      <div class="moto-line">${bikes} ${days} · ${ils(toIls(sc.perDay))} ליום · ${ils(toIls(total))} בסך הכל</div>
      ${who}
      <div class="moto-note">${sc.note}</div>
    </div>
  </div>`;
}

const ROW_ICONS = {'אוכל':'🍜','תחבורה':'🛵','אטרקציות':'📍','לינה':'🏨','אחר':'•'};

function rowThumb(r){
  const w = rowWiki(r);
  if(w) return imageBox(w, '#8C8272', 'row-photo');
  return `<div class="row-icon">${uiIcon(r.cat)}</div>`;
}

function renderDayCard(day){
  const open = expandedDays[day.id] === true;
  const total = dayTotalBaht(day);
  return `
  <div class="day-card">
    <div class="day-head" data-action="toggleDay" data-id="${day.id}">
      <div class="dnum-photo">${(()=>{ const r=day.rows.find(x=>x.time&&rowWiki(x)); return r?imageBox(rowWiki(r),'#8C8272','dnum-img'):''; })()}<span class="dnum">${day.day}</span></div>
      <div class="dmain">
        <div class="dtitle">${day.summary || day.dest}</div>
        <div class="dsub">${day.dow} ${fmtDateShort(day.date)} · ${day.rows.length} שורות${day.sun?` · <span dir="ltr">🌅 ${day.sun.rise} · 🌇 ${day.sun.set}</span>`:''}</div>
      </div>
      <div class="dcost">${ils(toIls(total))}<br><span style="font-weight:400;color:var(--muted)">אומדן</span></div>
    </div>
    ${open ? `<div class="day-rows">${day.rows.map(r=>renderSharedRow(day,r)).join('')}</div>` : ''}
  </div>`;
}

function renderSharedRow(day, r){
  const statusCls = SHARED_STATUS_CLASS[r.status] || 'onsite';
  const open = expandedRow[r.id] === true;
  const meta = [r.loc, r.dur && (r.dur+' שעות')].filter(Boolean).join(' · ');
  const hasMore = !!(r.notes || r.link || r.baht);
  return `
  <div class="irow ${r.done?'done':''} ${open?'open':''}">
    <input class="icheck" aria-label="${escapeAttr(r.act)}" type="checkbox" ${r.done?'checked':''} data-action="toggleSharedRow" data-day="${day.id}" data-id="${r.id}">
    ${rowThumb(r)}
    <div class="ibody" ${hasMore?`data-action="toggleRow" data-id="${r.id}"`:''}>
      <div class="irow-top">
        <div class="iact">${itineraryText(r.act)}</div>
        ${r.time?`<div class="itime" dir="ltr">${escapeHtml(r.time)}</div>`:''}
      </div>
      <div class="imeta">
        ${itineraryText(meta)}
        ${renderPriceBadge(r)}
        <span class="tag-s ${statusCls}">${r.status||''}</span>
      </div>
      ${open ? `
        ${r.notes?`<div class="inotes">${r.notes}</div>`:''}
        <div class="chip-row tight">
          ${r.link?`<a class="chip mini" href="${r.link}" target="_blank" rel="noopener">↗ פתיחה</a>`:''}
          ${r.baht?`<button class="chip mini" data-action="expenseFromRow" data-day="${day.id}" data-id="${r.id}">💸 לרשום כהוצאה</button>`:''}
          <button class="chip mini" data-action="editSharedRow" data-day="${day.id}" data-id="${r.id}">✏️ עריכה</button>
        </div>` : (hasMore?`<div class="imore">${r.notes? r.notes.slice(0,52)+(r.notes.length>52?'…':'') : 'פרטים'}</div>`:'')}
    </div>
  </div>`;
}

/* =========================================================
   היום — חפיסת ימים שמחליקים בין הכרטיסים שלה
========================================================= */

/** הימים שרלוונטיים למי שמחובר, לפי הסדר */
function myDays(){
  if(!sh() || !sh().days) return [];
  return sh().days.filter(d=> dayIsMine(d) && (!afterMyTrip(d.date) || d.date === homeDate()));
}

/** היום של היום — ואם הטיול עוד לא התחיל, היום הראשון */
function defaultDayIndex(){
  const days = myDays();
  if(!days.length) return 0;
  const today = tripToday();
  const exact = days.findIndex(d=>d.date === today);
  if(exact >= 0) return exact;
  const next = days.findIndex(d=>d.date > today);
  return next >= 0 ? next : days.length-1;
}

function currentDayIndex(){
  const days = myDays();
  if(todayIndex === null) todayIndex = defaultDayIndex();
  return Math.max(0, Math.min(days.length-1, todayIndex));
}

function renderToday(){
  const days = myDays();
  if(!days.length) return `<div class="section"><div class="empty">אין ימים מפורטים להצגה</div></div>`;
  const i = currentDayIndex();
  const day = days[i];
  const isToday = day.date === tripToday();
  const until = daysUntil(day.date);
  const done = day.rows.filter(r=>r.done).length;
  const total = day.rows.length;
  const pct = total ? Math.round(done/total*100) : 0;
  const dest = myDestinations().find(d=>d.arrival <= day.date && day.date <= (d.departure||d.arrival));
  const prev = days[i-1], next = days[i+1];

  const when = isToday ? 'היום'
    : until === 1 ? 'מחר'
    : until > 1 ? `בעוד ${until} ימים`
    : until === -1 ? 'אתמול'
    : `לפני ${Math.abs(until)} ימים`;

  const timed = day.rows.filter(r=>r.time);
  const nowHM = new Intl.DateTimeFormat('en-GB',{timeZone:TRIP_TZ,hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
  const focus = isToday
    ? (timed.find(r=>!r.done && r.time >= nowHM) || timed.find(r=>!r.done))
    : timed.find(r=>!r.done);
  const ring = 2*Math.PI*20;

  return `
  <div class="today-wrap">
    <div class="day-strip" id="day-strip">
      ${days.map((d,idx)=>{
        const dd = d.rows.length && d.rows.every(r=>r.done);
        return `<button class="dchip ${idx===i?'on':''} ${dd?'full':''} ${d.date===tripToday()?'is-today':''}" data-action="dayJump" data-id="${idx}">
          <span class="dchip-dow">${d.dow}</span>
          <span class="dchip-num">${Number(d.date.slice(8))}</span>
          <span class="dchip-place">${escapeHtml(String(d.dest).split(/\s*[→—]\s*/)[0].trim())}</span>
        </button>`;}).join('')}
    </div>

    <div class="day-deck" id="day-deck">
      <div class="deck-card" id="deck-card">
        <div class="deck-hero">
          ${imageBox(dest && dest.wiki, dest && dest.hue, 'deck-photo')}
          <div class="deck-hero-text">
            <div class="deck-when">יום ${day.day} מתוך ${days.length} · ${when}</div>
            <div class="deck-place">${day.dest}</div>
            <div class="deck-date">${day.dow} <bdi dir="ltr">${fmtDate(day.date)}</bdi></div>
          </div>
          <div class="hero-ring" title="מה כבר עשיתם היום">
            <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" class="ring-bg"/><circle cx="24" cy="24" r="20" class="ring-fg"
              style="stroke-dasharray:${ring};stroke-dashoffset:${ring*(1-pct/100)}"/></svg>
            <span><b>${done}</b>/${total}</span>
          </div>
        </div>

        <div class="day-nav">
          <button class="nav-day ${prev?'':'off'}" data-action="dayStep" data-id="-1" ${prev?'':'disabled'}>
            <span class="nav-arrow">→</span><span><small>יום קודם</small>${prev?escapeHtml(prev.dest):'—'}</span></button>
          <button class="nav-day next ${next?'':'off'}" data-action="dayStep" data-id="1" ${next?'':'disabled'}>
            <span><small>יום הבא</small>${next?escapeHtml(next.dest):'—'}</span><span class="nav-arrow">←</span></button>
        </div>

        <div class="deck-body">
          ${renderFieldBar(day)}
          ${day.summary?`<h1 class="deck-summary">${itineraryText(day.summary)}</h1>`:''}
          ${day.sun?`<div class="deck-sun">זריחה <b dir="ltr">${day.sun.rise}</b> · שקיעה <b dir="ltr">${day.sun.set}</b></div>`:''}
          ${renderDayShape(day)}
          <div class="day-map-wrap"><div id="day-map" class="day-map"></div><div class="day-map-cap">המסלול של היום · המספרים לפי סדר השעות</div></div>
          ${renderDayPhotos(day)}

          ${focus?`
          <div class="focus-card" data-action="expandRow" data-id="${focus.id}">
            <div class="focus-label">${isToday?'עכשיו / הבא בתור':'הדבר הראשון ביום'}</div>
            <div class="focus-main"><span class="focus-time" dir="ltr">${escapeHtml(focus.time)}</span>
              <span class="focus-act">${rowEmoji(focus)} ${itineraryText(focus.act)}</span></div>
            ${focus.loc?`<div class="focus-loc">📍 ${itineraryText(focus.loc)}</div>`:''}
          </div>`:`<div class="focus-card all-done"><div class="focus-label">כל היום סומן 🎉</div></div>`}

          <div class="today-legend">
            <span>הקישו על פעילות לפרטים · ✓ = עשינו</span>
            ${(()=>{ const allOpen = day.rows.every(r=>expandedRow['t_'+r.id]);
              return `<button class="legend-btn" data-action="${allOpen?'collapseAllRows':'expandAllRows'}">${allOpen?'▴ סגירת הכל':'▾ פתיחת הכל'}</button>`; })()}
          </div>
          <div class="trow-list">${day.rows.filter(r=>r.time).map(r=>renderTodayRow(day, r, focus)).join('')}</div>
          ${day.rows.some(r=>!r.time)?`
          <details class="trow-extra" ${expandedRow.extra?'open':''}>
            <summary>לינה והוצאות בלי שעה · ${day.rows.filter(r=>!r.time).length}</summary>
            <div class="trow-list">${day.rows.filter(r=>!r.time).map(r=>renderTodayRow(day, r, focus)).join('')}</div>
          </details>`:''}

          ${renderDaySpend(day)}

          ${next?`
          <button class="tomorrow" data-action="dayStep" data-id="1">
            <div class="tomorrow-head"><span>מחר · ${next.dow} <bdi dir="ltr">${fmtDate(next.date)}</bdi></span><span>${escapeHtml(next.dest)} ←</span></div>
            <div class="tomorrow-list">${next.rows.filter(r=>r.time).slice(0,3).map(r=>`<div><bdi dir="ltr">${escapeHtml(r.time)}</bdi> ${itineraryText(r.act)}</div>`).join('')}</div>
            ${next.rows.find(r=>r.time) && next.rows.find(r=>r.time).time < '07:30' ? `<div class="tomorrow-warn">⏰ מתחילים מוקדם — ${escapeHtml(next.rows.find(r=>r.time).time)}</div>`:''}
          </button>`:''}
        </div>
      </div>
    </div>

    <div class="deck-hint">אפשר גם להחליק את המסך ימינה ושמאלה בין הימים</div>
  </div>`;
}

/** הפס העליון מתמרכז על היום הנבחר — רק כשהיום מתחלף, לא בכל סימון */
let stripCenteredOn = null;
function centerDayStrip(){
  const strip = document.getElementById('day-strip');
  const on = strip && strip.querySelector('.dchip.on');
  if(!on) return;
  const key = on.dataset.id;
  if(key === stripCenteredOn && strip.dataset.ready) return;
  const sr = strip.getBoundingClientRect(), or = on.getBoundingClientRect();
  strip.scrollLeft += (or.left + or.width/2) - (sr.left + sr.width/2);
  strip.dataset.ready = '1';
  stripCenteredOn = key;
}

/*
 * מקומות מוכרים במסלול — לכל אחד עמוד ויקיפדיה (לתמונה) וקואורדינטות (למפת היום).
 * מותאם לפי הפעילות והמיקום של השורה; הראשון שמתאים מנצח, אז הספציפי לפני הכללי.
 */
const PLACES = [
  {m:/דוי סותפ/,                         wiki:'Wat Phra That Doi Suthep',   ll:[18.8048,98.9216]},
  {m:/פרה סינג|צ׳די לואנג/,              wiki:'Wat Chedi Luang',            ll:[18.7870,98.9866]},
  {m:/מקלט פילים/,                       wiki:'Elephant Nature Park',       ll:[19.2133,98.8603]},
  {m:/יי פנג|נהר הפינג|שער תא פאה|Centara Riverside/, wiki:'Yi Peng',  ll:[18.7880,99.0010]},
  {m:/צ׳יאנג מאי|קאו סוי|CNX/,           wiki:'Chiang Mai',                 ll:[18.7883,98.9853]},
  {m:/תעלות תונבורי|תא צ׳אנג/,          wiki:'Khlong',                     ll:[13.7520,100.4890]},
  {m:/הנדנדה הענקית|סוטאט/,             wiki:'Giant Swing',                ll:[13.7515,100.5013]},
  {m:/ואט סאקט|הר הזהב/,                wiki:'Wat Saket',                  ll:[13.7539,100.5066]},
  {m:/צ׳אנגוואטנה/,                     wiki:'CentralPlaza Chaengwattana', ll:[13.9036,100.5286]},
  {m:/Loh Dalum|טונסאי|ChaoKoh|פי פי/,   wiki:'Phi Phi Islands',         ll:[7.7407,98.7740]},
  {m:/מאיה ביי|פילה לגון/,               wiki:'Maya Bay',                   ll:[7.6780,98.7660]},
  {m:/Bangla|פטונג|See2Sea/,             wiki:'Patong',                     ll:[7.8930,98.2970]},
  {m:/Lomprayah|Thong Sala|שוק הלילה ב/, wiki:'Ko Pha-ngan',            ll:[9.7120,99.9920]},
  {m:/Halfmoon|Magic Forest/,           wiki:'Ko Pha-ngan',                ll:[9.7180,100.0420]},
  {m:/Haad Rin|Haad Yuan/,              wiki:'Haad Rin',                   ll:[9.6780,100.0640]},
  {m:/Zen Beach|Sri Thanu/,             wiki:'Ko Pha-ngan',                ll:[9.7560,99.9680]},
  {m:/Bottle Beach/,                    wiki:'Ko Pha-ngan',                ll:[9.7960,100.0330]},
  {m:/Sarana|באן טאי|קופנגן/,            wiki:'Ko Pha-ngan',                ll:[9.7120,100.0330]},
  {m:/Our Jungle House|Palmview|River Lodge|נהר סוק|נאם טאלו|ספארי לילה/,     wiki:'Khao Sok National Park',     ll:[8.9130,98.5280]},
  {m:/Eleven Bangkok|סוקומווית/,          wiki:'Sukhumvit Road',             ll:[13.7440,100.5560]},
  {m:/סובארנבומי|BKK/,                 wiki:'Suvarnabhumi Airport',       ll:[13.6900,100.7501]},
  {m:/IZ598|פוקט → תל אביב|לשדה התעופה/, wiki:'Phuket International Airport', ll:[8.1132,98.3169]},
  {m:/HKT|נחיתה וכבודה/,                wiki:'Phuket International Airport', ll:[8.1132,98.3169]},
  {m:/רכבת שדה התעופה|ARL/,             wiki:'Airport Rail Link (Bangkok)', ll:[13.7563,100.5348]},
  {m:/הארמון המלכותי|Grand Palace/,     wiki:'Grand Palace',               ll:[13.7500,100.4913]},
  {m:/ואט פו|Wat Pho/,                  wiki:'Wat Pho',                    ll:[13.7465,100.4930]},
  {m:/ואט ארון|סאלה ראטנקוסין|קראתונג/,  wiki:'Wat Arun',                   ll:[13.7437,100.4889]},
  {m:/חאו סן|רמבוטרי/,                  wiki:'Khao San Road',              ll:[13.7589,100.4974]},
  {m:/יאווארט|צ׳יינטאון/,               wiki:'Yaowarat Road',              ll:[13.7398,100.5097]},
  {m:/לומפיני/,                         wiki:'Lumphini Park',              ll:[13.7314,100.5414]},
  {m:/רג׳אדמנרן/,                       wiki:'Rajadamnern Stadium',        ll:[13.7595,100.5050]},
  {m:/MBK|סנטרל וורלד/,                 wiki:'MBK Center',                 ll:[13.7446,100.5297]},
  {m:/ISB/,                             wiki:'International School Bangkok', ll:[13.9122,100.5470]},
  {m:/סירת נהר|תא טיין|Chao Phraya/,    wiki:'Chao Phraya Express Boat',   ll:[13.7442,100.4904]},
  {m:/BTS|אסוק/,                        wiki:'BTS Skytrain',               ll:[13.7370,100.5603]},
  {m:/מונטראג׳|Montraj|סוכומוויט/,       wiki:'Sukhumvit Road',             ll:[13.7375,100.5585]},
  {m:/באנג רונג|Bang Rong/,             wiki:'Phang Nga Bay',              ll:[8.0478,98.4199]},
  {m:/מאנו|KYN|המחנה|אימון|קו יאו נוי/,  wiki:'Ko Yao Noi',                 ll:[8.1270,98.6170]},
  {m:/מפרץ|פאנג נגה/,                   wiki:'Phang Nga Bay',              ll:[8.2700,98.5000]},
  {m:/ריילאי|פרה נאנג|טיפוס/,           wiki:'Railay Beach',               ll:[8.0118,98.8378]},
  {m:/אאו תלאנה|מנגרוב|קיאק/,           wiki:'Sea kayak',                  ll:[8.0920,98.7600]},
  {m:/ASAI/,                            wiki:'Yaowarat Road',              ll:[13.7417,100.5085]},
  {m:/צ׳רמנטרה|Chermantra|COSI/,             wiki:'Ao Nang',                    ll:[8.0350,98.8190]},
  {m:/אאו נאנג/,                        wiki:'Ao Nang',                    ll:[8.0310,98.8236]},
  {m:/תאב לאמו|סימילן/,                 wiki:'Similan Islands',            ll:[8.6500,97.6440]},
  {m:/צ׳או לאן|רצ׳פרפה|ראצ׳אפראפה|Panvaree|קאו סוק/,        wiki:'Khao Sok National Park',     ll:[8.9690,98.8170]},
  {m:/זיפליין/,                         wiki:'Zip line',                   ll:[8.7000,98.2700]},
  {m:/באנג לה און/,                     wiki:'Khao Lak',                   ll:[8.6630,98.2520]},
  {m:/קלימה|Kalima|קאו לק|קאו לאק|באנג ניאנג/, wiki:'Khao Lak',           ll:[8.6430,98.2470]}
];
/* תמונה כללית לפי סוג, כשאין מקום מוכר */
const KIND_WIKI = [
  {m:/מואיי תאי|אימון/, wiki:'Muay Thai'},
  {m:/מסאז׳|עיסוי|ספא/, wiki:'Thai massage'},
  {m:/טוק-טוק/, wiki:'Tuk-tuk'},
  {m:/לונגטייל/, wiki:'Long-tail boat'},
  {m:/ספידבוט/, wiki:'Phang Nga Bay'},
  {m:/שוק לילה/, wiki:'Street food'},
  {m:/מופעי אש/, wiki:'Fire dancing'},
  {m:/קטנוע/, wiki:'Motorcycle taxi'},
  {m:/TG203|Thai Airways/, wiki:'Thai Airways'},
  {m:/ארקיע|IZ591/, wiki:'Arkia'}
];
function rowPlace(r){
  const txt = `${r.act||''} ${r.loc||''}`;
  return PLACES.find(p=>p.m.test(txt)) || null;
}
function rowWiki(r){
  if(r.wiki) return r.wiki;
  const txt = `${r.act||''} ${r.loc||''}`;
  const k = KIND_WIKI.find(x=>x.m.test(r.act||''));
  if(k) return k.wiki;
  const p = rowPlace(r);
  return p ? p.wiki : null;
}

/** מפת היום — נקודה ממוספרת לכל מקום לפי סדר השעות, וקו שמחבר ביניהן */
let dayMap = null;
function initDayMap(day){
  const el = document.getElementById('day-map');
  if(!el) return;
  if(dayMap){ try{ dayMap.remove(); }catch(e){} dayMap = null; }
  if(typeof L === 'undefined'){ setTimeout(()=>{ if(activeTab==='today') initDayMap(day); }, 800); return; }
  const stops = [];
  day.rows.filter(r=>r.time).forEach(r=>{
    const p = rowPlace(r);
    if(!p) return;
    const last = stops[stops.length-1];
    if(last && last.ll[0]===p.ll[0] && last.ll[1]===p.ll[1]){ last.rows.push(r); return; }
    stops.push({ll:p.ll, rows:[r]});
  });
  if(!stops.length){ el.style.display='none'; return; }
  dayMap = L.map(el, {zoomControl:false, attributionControl:true, scrollWheelZoom:false, dragging:!L.Browser.mobile, tap:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18, attribution:'© OpenStreetMap'}).addTo(dayMap);
  const pts = stops.map(s=>s.ll);
  if(pts.length > 1) L.polyline(pts, {color:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#2F6F6B', weight:3, dashArray:'6 6', opacity:.8}).addTo(dayMap);
  stops.forEach((s,i)=>{
    const done = s.rows.every(r=>r.done);
    const icon = L.divIcon({className:'', html:`<div class="map-pin ${done?'done':''}">${i+1}</div>`, iconSize:[26,26], iconAnchor:[13,13]});
    L.marker(s.ll, {icon}).addTo(dayMap)
      .bindPopup(s.rows.map(r=>`<b dir="ltr">${escapeHtml(r.time)}</b> ${escapeHtml(r.act)}`).join('<br>'))
      .on('click', ()=>{ const r=s.rows[0]; expandedRow['t_'+r.id]=true; });
  });
  if(pts.length === 1) dayMap.setView(pts[0], 13);
  else dayMap.fitBounds(pts, {padding:[24,24], maxZoom:15});
}

/** צבע לפי סוג — אותו צבע בפס היום ובאייקון של השורה */
function rowKind(r){
  const e = rowEmoji(r);
  if(e==='🍸') return 'night';
  if(e==='✈️'||e==='🚤'||r.cat==='תחבורה') return 'move';
  if(r.cat==='אוכל') return 'food';
  if(e==='🥊'||e==='💆'||e==='🏖️') return 'body';
  if(r.cat==='אטרקציות') return 'see';
  return 'other';
}
const KIND_LABEL = {move:'דרכים', see:'אטרקציות', food:'אוכל', body:'גוף וים', night:'לילה', other:'אחר'};
function minutesOf(t){ const m=/^(\d{1,2}):(\d{2})$/.exec(t||''); return m ? (+m[1])*60 + (+m[2]) : null; }

/** פס היום: מ-06:00 עד 02:00, כל פעילות בצבע שלה לפי השעה והמשך */
function renderDayShape(day){
  const START = 6*60, END = 26*60, span = END-START;
  const segs = day.rows.filter(r=>r.time).map(r=>{
    let a = minutesOf(r.time); if(a===null) return '';
    if(a < START) a += 24*60;
    const d = Math.max(20, minutesOf(r.dur) || 30);
    const left = Math.max(0, Math.min(100, (a-START)/span*100));
    const width = Math.max(1.2, Math.min(100-left, d/span*100));
    return `<span class="shape-seg k-${rowKind(r)} ${r.done?'done':''}" style="inset-inline-start:${left}%;width:${width}%"
              data-action="expandRow" data-id="${r.id}" title="${escapeAttr(r.time+' '+r.act)}"></span>`;
  }).join('');
  const kinds = [...new Set(day.rows.filter(r=>r.time).map(rowKind))];
  return `
  <div class="day-shape">
    <div class="shape-bar">${segs}</div>
    <div class="shape-hours"><span>06</span><span>12</span><span>18</span><span>00</span></div>
    <div class="shape-legend">${kinds.map(k=>`<span><i class="k-${k}"></i>${KIND_LABEL[k]}</span>`).join('')}</div>
  </div>`;
}

/** תמונות של הרגעים הגדולים ביום — מה שבשבילו קמים */
function renderDayPhotos(day){
  const seen = new Set();
  const shots = day.rows.filter(r=>r.time && rowWiki(r)).filter(r=>{ const w=rowWiki(r); if(seen.has(w)) return false; seen.add(w); return true; });
  if(!shots.length) return '';
  return `<div class="day-photos">${shots.map(r=>`
    <button class="photo-card ${r.done?'done':''}" data-action="expandRow" data-id="${r.id}">
      ${imageBox(rowWiki(r), '#8C8272', 'photo-img')}
      <span class="photo-cap"><b dir="ltr">${escapeHtml(r.time)}</b>${itineraryText(r.act)}</span>
      ${r.done?'<span class="photo-done">✓</span>':''}
    </button>`).join('')}</div>`;
}

/** אייקון לפי סוג הפעילות — כדי שאפשר לסרוק את היום בעין */
function rowEmoji(r){
  const a = r.act || '';
  if(/טיסה|ארקיע|Airways|Vietjet|נחיתה/.test(a)) return '✈️';
  if(/ספידבוט|סירה|לונגטייל|סימילן|קיאק/.test(a)) return '🚤';
  if(r.cat==='אטרקציות' && /(^|[\s—])(בר|ברים|ברי)(?=[\s—]|$)|חאו סן|מוזיקה חיה|מופעי אש|הלילה הגדול|לילה אחרון/.test(a)) return '🍸';
  if(/אימון|מואיי תאי/.test(a)) return '🥊';
  if(/קטנוע/.test(a)) return '🛵';
  if(/ספא|עיסוי|מסאז/.test(a)) return '💆';
  if(/חוף|בריכה/.test(a)) return '🏖️';
  return ({'תחבורה':'🚕','אוכל':'🍜','לינה':'🛏️','אטרקציות':'🎟️'})[r.cat] || '•';
}

/* פעילויות שדורשות ציוד מסוים — מוצג על הכרטיס של היום עצמו */
const GEAR_HINTS = [
  {match:/זיפליין/,            gear:'נעליים סגורות — לא כפכפים'},
  {match:/אימון|מואיי תאי/,    gear:'תחבושות ידיים, מגן שיניים, בגדי אימון'},
  {match:/טיפוס/,              gear:'נעליים עם אחיזה · הציוד מגיע מהמדריך'},
  {match:/קיאק|שנורקל|סימילן/, gear:'בגד ים, קרם הגנה עמיד במים, Dry Bag לטלפון'},
  {match:/הארמון|ואט /,        gear:'כתפיים וברכיים מכוסות — נאכף בכניסה'},
  {match:/קטנוע/,              gear:'רישיון בינלאומי 1949 עם קטגוריה A · שתי קסדות'},
  {match:/לונגטייל|ספידבוט|סירה/, gear:'Dry Bag — הרסס נכנס לתיק'},
  {match:/אגם צ׳או לאן|קאו סוק/, gear:'נעליים שנרטבות, החלפה יבשה, דוחה יתושים'}
];
/**
 * התזכורת מופיעה פעם אחת ביום, על השורה הראשונה שדורשת אותה — שתי נסיעות
 * בלונגטייל באותו יום לא אומרות לארוז Dry Bag פעמיים.
 */
function gearFor(row, day){
  if(/^אחרי\b/.test(row.act)) return null;
  const hit = GEAR_HINTS.find(h=>h.match.test(row.act));
  if(!hit) return null;
  if(day && Array.isArray(day.rows)){
    const first = day.rows.find(r=>!/^אחרי\b/.test(r.act) && hit.match.test(r.act));
    if(first && first.id !== row.id) return null;
  }
  return hit.gear;
}

/* =========================================================
   שיחה על שורה — במקום להתכתב בוואטסאפ על מה שכתוב כאן
========================================================= */
function rowNotes(row){ return Array.isArray(row.talk) ? row.talk : []; }

function renderRowNotes(day, r){
  const talk = rowNotes(r);
  const open = expandedRow['talk_'+r.id] === true;
  if(!talk.length && !open){
    return `<button class="chip mini" data-action="openTalk" data-id="${r.id}">💬 להגיד משהו</button>`;
  }
  if(!open){
    const last = talk[talk.length-1];
    return `<button class="chip mini" data-action="openTalk" data-id="${r.id}">
      💬 ${talk.length} · ${escapeHtml(personName(last.by))}: ${escapeHtml(last.text.slice(0,24))}${last.text.length>24?'…':''}
    </button>`;
  }
  return `
  <div class="row-notes">
    ${talk.map(n=>`
      <div class="note">
        <span class="note-who ${n.by}">${escapeHtml(personName(n.by))}</span>
        <span class="note-text">${escapeHtml(n.text)}</span>
        ${n.by===meId()?`<button class="note-del" data-action="delNote" data-day="${day.id}" data-id="${r.id}" data-note="${n.id}">✕</button>`:''}
      </div>`).join('') || '<div class="note-count">עוד לא נאמר כלום</div>'}
    <div class="note-add">
      <input id="note-${r.id}" placeholder="מה חושבים?" maxlength="280"
             data-action="noteKey" data-day="${day.id}" data-id="${r.id}">
      <button class="chip strong" data-action="addNote" data-day="${day.id}" data-id="${r.id}">שליחה</button>
    </div>
  </div>`;
}

function addRowNote(dayId, rowId){
  const input = document.getElementById('note-'+rowId);
  const text = input && input.value.trim();
  if(!text) return;
  const day = sh().days.find(d=>d.id===dayId);
  const row = day && day.rows.find(r=>r.id===rowId);
  if(!row) return;
  if(!Array.isArray(row.talk)) row.talk = [];
  row.talk.push({id:uid('n'), by:meId(), text, at:new Date().toISOString()});
  buzz(12);
  persist(); cacheState(); render();
}

function deleteRowNote(dayId, rowId, noteId){
  const day = sh().days.find(d=>d.id===dayId);
  const row = day && day.rows.find(r=>r.id===rowId);
  if(!row || !Array.isArray(row.talk)) return;
  row.talk = row.talk.filter(n=>n.id!==noteId);
  persist(); cacheState(); render();
}

function renderTodayRow(day, r, focus){
  const statusCls = SHARED_STATUS_CLASS[r.status] || 'onsite';
  const open = expandedRow['t_'+r.id] === true;
  const gear = gearFor(r, day);
  const talk = rowNotes(r).length;
  return `
  <div class="trow k-${rowKind(r)} ${r.done?'done':''} ${open?'open':''} ${focus&&focus.id===r.id?'focus':''}" id="trow-${r.id}">
    <div class="trow-main" data-action="expandRow" data-id="${r.id}">
      <div class="trow-time" dir="ltr">${r.time?escapeHtml(r.time):''}</div>
      <div class="trow-emoji k-${rowKind(r)}">${rowWiki(r)?imageBox(rowWiki(r),'#8C8272','trow-photo'):rowEmoji(r)}</div>
      <div class="trow-text">
        <div class="tact">${itineraryText(r.act)}</div>
        <div class="trow-sub">${r.loc?itineraryText(r.loc):''}${gear?` · 🎒`:''}${talk?` · 💬${talk}`:''}</div>
      </div>
      <span class="trow-caret">${open?'▴':'▾'}</span>
    </div>
    <button class="tcheck ${r.done?'on':''}" aria-label="${r.done?'לבטל סימון':'סמנו שעשינו'}: ${escapeAttr(r.act)}"
            data-action="toggleSharedRow" data-day="${day.id}" data-id="${r.id}">${r.done?'✓':''}</button>
    ${open?`
    <div class="trow-more">
      <div class="chip-row tight">
        ${renderPriceBadge(r)}
        <span class="tag-s ${statusCls}">${r.status||''}</span>
        ${r.dur?`<span class="tag-s">⏱ ${escapeHtml(r.dur)}</span>`:''}
        ${r.link?`<a class="chip mini" href="${r.link}" target="_blank" rel="noopener">פתיחה ↗</a>`:''}
        ${(r.loc||rowPlace(r))?`<a class="chip mini" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rowPlace(r)?rowPlace(r).ll.join(','):(r.loc+' Thailand'))}">📍 ניווט</a>`:''}
      </div>
      ${rowWiki(r)?`<div class="trow-hero">${imageBox(rowWiki(r),'#8C8272','trow-hero-img')}</div>`:''}
      ${r.notes?`<div class="tnotes">${itineraryText(r.notes)}</div>`:''}
      ${gear?`<div class="gear-note">🎒 ${gear}</div>`:''}
      <div class="chip-row tight">${renderRowNotes(day, r)}</div>
    </div>`:''}
  </div>`;
}

/** מעבר יום: 1 = קדימה בזמן. ב-RTL החלקה שמאלה מקדמת. */
function stepDay(delta){
  const days = myDays();
  const next = currentDayIndex() + delta;
  if(next < 0 || next >= days.length) return false;
  todayIndex = next;
  buzz(8);
  render();
  return true;
}

/** גרירה בעכבר ובאצבע — הכרטיס עוקב אחרי היד, ומשלים את התנועה בשחרור */
function initSwipe(){
  const deck = document.getElementById('day-deck');
  const card = document.getElementById('deck-card');
  if(!deck || !card) return;

  let startX = 0, startY = 0, dx = 0, dragging = false, locked = null;

  const onStart = (x,y)=>{ startX=x; startY=y; dx=0; dragging=true; locked=null; card.style.transition='none'; };
  const onMove = (x,y,e)=>{
    if(!dragging) return;
    const moveX = x-startX, moveY = y-startY;
    if(locked === null && (Math.abs(moveX) > 8 || Math.abs(moveY) > 8)){
      locked = Math.abs(moveX) > Math.abs(moveY) ? 'x' : 'y';
    }
    if(locked !== 'x') return;
    if(e && e.cancelable) e.preventDefault();
    dx = moveX;
    card.style.transform = `translateX(${dx}px) rotate(${dx/40}deg)`;
    card.style.opacity = String(Math.max(0.45, 1 - Math.abs(dx)/420));
  };
  const onEnd = ()=>{
    if(!dragging) return;
    dragging = false;
    card.style.transition = 'transform .28s ease, opacity .28s ease';
    const threshold = 70;
    if(locked === 'x' && Math.abs(dx) > threshold){
      // RTL: גרירה שמאלה מביאה את היום הבא
      const moved = stepDay(dx < 0 ? 1 : -1);
      if(moved) return;             // render() בונה כרטיס חדש
    }
    card.style.transform = '';
    card.style.opacity = '';
  };

  deck.addEventListener('touchstart', e=>onStart(e.touches[0].clientX, e.touches[0].clientY), {passive:true});
  deck.addEventListener('touchmove',  e=>onMove(e.touches[0].clientX, e.touches[0].clientY, e), {passive:false});
  deck.addEventListener('touchend', onEnd);
  deck.addEventListener('touchcancel', onEnd);

  deck.addEventListener('mousedown', e=>{ if(e.target.closest('input,button,a,.day-map')) return; onStart(e.clientX, e.clientY); });
  window.addEventListener('mousemove', e=>onMove(e.clientX, e.clientY, null));
  window.addEventListener('mouseup', onEnd);

  if(!window.__dayKeys){
    window.__dayKeys = true;
    document.addEventListener('keydown', e=>{
      if(activeTab !== 'today' || modalOpen()) return;
      if(e.key === 'ArrowLeft') stepDay(1);
      if(e.key === 'ArrowRight') stepDay(-1);
    });
  }
}



/* =========================================================
   כסף — חלוקת הוצאות בסגנון Splitwise
========================================================= */
function splitShares(expense){
  const amount = expenseIls(expense);
  const def = wallet().defaultSplit;
  if(expense.split==='equal') return {itai:amount/2, talia:amount/2};
  if(expense.split==='full-itai') return {itai:amount, talia:0};
  if(expense.split==='full-talia') return {itai:0, talia:amount};
  return {itai:amount*def.itai, talia:amount*def.talia};
}
function expenseIls(expense){
  const amount = Number(expense.amount)||0;
  return expense.currency==='THB' ? amount*rate() : amount;
}
function splitLabel(expense){
  if(expense.split==='equal') return 'חצי-חצי';
  if(expense.split==='full-itai') return 'על איתי';
  if(expense.split==='full-talia') return 'על טליה';
  const d = wallet().defaultSplit;
  return Math.round(d.itai*100)+'/'+Math.round(d.talia*100);
}

function isDue(x){ return x.status === 'due'; }

/**
 * מי חייב למי. היתרה נספרת רק ממה שכבר שולם — מה שמשלמים במקום עוד לא
 * חוב של אף אחד — ובמקביל מחושבת גם התמונה הצפויה, כולל מה שטרם שולם.
 */
function balance(){
  let itaiPaid=0, taliaPaid=0, itaiOwes=0, taliaOwes=0;
  let duePaid=0, dueOwesItai=0, dueTotal=0;
  wallet().expenses.forEach(x=>{
    const amount = expenseIls(x);
    const shares = splitShares(x);
    if(isDue(x)){
      dueTotal += amount;
      duePaid += (x.paidBy==='itai' ? amount : -amount);
      dueOwesItai += shares.itai;
      return;
    }
    if(x.paidBy==='itai') itaiPaid += amount; else taliaPaid += amount;
    itaiOwes += shares.itai; taliaOwes += shares.talia;
  });
  let transfers = 0; // חיובי = איתי העביר לטליה
  (wallet().settlements||[]).forEach(s=>{
    transfers += (s.from==='itai' ? Number(s.amount)||0 : -(Number(s.amount)||0));
  });
  // נטו חיובי = טליה חייבת לאיתי
  const net = (itaiPaid - itaiOwes) + transfers;
  const projected = net + (duePaid - dueOwesItai);
  return {itaiPaid, taliaPaid, itaiOwes, taliaOwes, net, projected,
          dueTotal, total:itaiPaid+taliaPaid};
}

function renderMoney(){
  const sections = [['balance','מי חייב למי'],['list','ההוצאות'],['budget','התקציב']];
  let body = '';
  if(moneySection==='balance') body = renderBalance();
  else if(moneySection==='list') body = renderExpenseList();
  else body = renderMoneyBudget();
  return `
  <div class="section">
    <div class="section-title">כסף 💸 <span class="tag">${wallet().expenses.length} הוצאות</span></div>
    <div class="seg-tabs">
      ${sections.map(([id,label])=>`<button data-action="moneySection" data-id="${id}" class="${moneySection===id?'active':''}">${label}</button>`).join('')}
    </div>
    ${body}
  </div>`;
}

function renderBalance(){
  const b = balance();
  const net = b.net;
  const iAmOwed = (meId()==='itai' && net>0) || (meId()==='talia' && net<0);
  const amount = Math.abs(net);
  const settled = amount < 1;

  const proj = b.projected;
  const projMine = (meId()==='itai' && proj>0) || (meId()==='talia' && proj<0);
  const projLine = b.dueTotal > 0
    ? `<div class="bal-proj">כולל ${ils(b.dueTotal)} שעוד לא שולמו:
         ${Math.abs(proj)<1 ? 'מסודרים' : (projMine ? `לזכותך ${ils(Math.abs(proj))}` : `לחובתך ${ils(Math.abs(proj))}`)}</div>`
    : '';

  return `
  <div class="balance-card ${settled?'even':(iAmOwed?'plus':'minus')}">
    <div class="bal-label">${settled ? 'אתם מסודרים' : (iAmOwed ? `${other().name} חייב/ת לך` : `את/ה חייב/ת ל${other().name}`)}</div>
    <div class="bal-amount">${settled ? '✓' : ils(amount)}</div>
    ${projLine}
    ${settled?'':`<button class="btn full" data-action="settleUp" style="margin-top:14px">לסגור חשבון</button>`}
  </div>

  <div class="split-cards">
    <div class="pcard itai">
      <div class="pc-top">${PEOPLE.itai.emoji} ${PEOPLE.itai.name}</div>
      <div class="pc-row"><span>שילם</span><b>${ils(b.itaiPaid)}</b></div>
      <div class="pc-row"><span>חלקו</span><b>${ils(b.itaiOwes)}</b></div>
    </div>
    <div class="pcard talia">
      <div class="pc-top">${PEOPLE.talia.emoji} ${PEOPLE.talia.name}</div>
      <div class="pc-row"><span>שילמה</span><b>${ils(b.taliaPaid)}</b></div>
      <div class="pc-row"><span>חלקה</span><b>${ils(b.taliaOwes)}</b></div>
    </div>
  </div>

  <div class="card" style="margin-top:12px">
    <div class="row"><b>סה״כ הוצאות משותפות</b><b>${ils(b.total)}</b></div>
    <div class="small" style="margin-top:6px">
      ברירת המחדל לחלוקה היא ${Math.round(wallet().defaultSplit.itai*100)}% איתי · ${Math.round(wallet().defaultSplit.talia*100)}% טליה.
      אפשר לשנות לכל הוצאה בנפרד.
    </div>
  </div>

  ${(wallet().settlements||[]).length?`
  <h3 class="section-title" style="margin-top:18px">החזרים</h3>
  ${wallet().settlements.slice().reverse().map(s=>`
    <div class="card small">
      ${personName(s.from)} → ${personName(s.to)} · <b>${ils(s.amount)}</b>
      <span style="color:var(--muted)"> · ${fmtDateShort(s.date)}</span>
    </div>`).join('')}`:''}

  <button class="btn full" data-action="addExpense" style="margin-top:16px">+ הוצאה חדשה</button>`;
}

function moneyCategoryId(x){
  return EXPENSE_CATEGORIES.some(c=>c.id===x.category) ? x.category : 'other';
}
function moneyTotals(rows){
  return rows.reduce((totals,x)=>{
    const amount=expenseIls(x);
    totals[isDue(x)?'due':'paid']+=amount;
    totals.share+=splitShares(x)[meId()];
    return totals;
  },{paid:0,due:0,share:0});
}
function filteredMoneyExpenses(){
  return wallet().expenses.filter(x=>(!moneyCategory || moneyCategoryId(x)===moneyCategory)
    && (!moneyPayment || (isDue(x)?'due':'paid')===moneyPayment))
    .sort((a,b)=>(b.date||'').localeCompare(a.date||''));
}
function renderExpenseList(){
  const list=filteredMoneyExpenses();
  const totals=moneyTotals(list);
  const categories=EXPENSE_CATEGORIES.map(cat=>{
    const rows=wallet().expenses.filter(x=>moneyCategoryId(x)===cat.id);
    return {...cat,count:rows.length,...moneyTotals(rows)};
  });
  return `
  <div class="money-categories" role="group" aria-label="סינון לפי קטגוריה">
    <button class="money-category ${!moneyCategory?'selected':''}" data-action="moneyCategory" data-id="" aria-pressed="${!moneyCategory}"><b>כל ההוצאות</b><span>${wallet().expenses.length} הוצאות</span></button>
    ${categories.map(cat=>`<button class="money-category ${moneyCategory===cat.id?'selected':''}" data-action="moneyCategory" data-id="${cat.id}" aria-pressed="${moneyCategory===cat.id}"><b>${cat.label} · ${cat.count}</b><span>שולם ${ils(cat.paid)}</span><span>טרם שולם ${ils(cat.due)}</span></button>`).join('')}
  </div>
  <div class="pillrow money-payment" role="group" aria-label="סינון לפי מצב תשלום">
    ${[['','הכל'],['paid','שולם'],['due','טרם שולם']].map(([id,label])=>`<button class="pill ${moneyPayment===id?'active':''}" data-action="moneyPayment" data-id="${id}" aria-pressed="${moneyPayment===id}">${label}</button>`).join('')}
  </div>
  <div class="money-summary" aria-live="polite">
    <b>${list.length} הוצאות · ${ils(totals.paid+totals.due)}</b>
    <span>שולם ${ils(totals.paid)} · טרם שולם ${ils(totals.due)}</span>
    <span>חלקך, כולל טרם שולם: ${ils(totals.share)}</span>
    <small>סיכומים בשקלים · באט מומר לפי השער המוגדר. חבילות לינה כוללות גם את הארוחות והאימונים הכלולים במחירן.</small>
  </div>
  ${list.map(x=>{
    const shares = splitShares(x);
    const myShare = shares[meId()];
    const iPaid = x.paidBy===meId();
    return `
    <div class="exp-card ${isDue(x)?'due':''}">
      <div class="exp-main" data-action="editExpense" data-id="${x.id}">
        <div class="exp-title">${escapeHtml(x.title)}${isDue(x)?' <span class="due-tag">טרם שולם</span>':''}</div>
        <div class="exp-meta">
          ${fmtDateShort(x.date)} · ${expCatLabel(x.category)} ·
          ${isDue(x)?'משלם/ת מתוכנן/ת':'שילם/ה'} ${personName(x.paidBy)} · ${splitLabel(x)}
        </div>
        ${x.note?`<div class="exp-note">${escapeHtml(x.note)}</div>`:''}
      </div>
      <div class="exp-side">
        <div class="exp-amount">${x.currency==='THB'?baht(x.amount):ils(x.amount)}</div>
        <div class="exp-share ${iPaid?'plus':'minus'}">
          ${isDue(x) ? 'חלקך יהיה '+ils(myShare)
                     : (iPaid ? 'שילמת · חלקך '+ils(myShare) : 'חלקך '+ils(myShare))}
        </div>
        ${isDue(x)?`<button class="chip mini" data-action="markPaid" data-id="${x.id}">✓ שולם</button>`:''}
      </div>
    </div>`;
  }).join('')}
  ${!list.length?'<div class="empty small">אין הוצאות במסננים שנבחרו</div>':''}
  <button class="btn full" data-action="addExpense" style="margin-top:12px">+ הוצאה חדשה</button>`;
}

/** השער נקבע ידנית. אחרי חודש הוא כבר לא באמת נכון. */
function rateWarning(){
  const checked = wallet().rateChecked;
  if(!checked) return '';
  const age = Math.round((Date.now() - new Date(checked+'T00:00:00').getTime())/86400000);
  if(age < 30) return '';
  return `<div class="rate-warn">
    <span>⚠️</span>
    <div>שער ההמרה (฿1 = ${wallet().rate} ₪) נבדק לפני ${age} ימים.
    כדאי לעדכן אותו — כל האומדנים בשקלים נגזרים ממנו.</div>
  </div>`;
}

function renderMoneyBudget(){
  const b = balance();
  const hasPlan = !!(sh() && sh().days);
  const myBudget = wallet().budgets[meId()] || 0;
  const mySpent = meId()==='itai' ? b.itaiOwes : b.taliaOwes;
  const left = myBudget - mySpent;
  const pct = myBudget ? Math.min(100, Math.round(mySpent/myBudget*100)) : 0;

  return `
  <div class="card">
    <div class="row"><b>התקציב שלי</b><span class="small">${ils(mySpent)} מתוך ${ils(myBudget)}</span></div>
    <div class="bar" style="margin-top:10px"><div class="bar-fill ${left<0?'over':''}" style="width:${pct}%"></div></div>
    <div class="small" style="margin-top:8px">
      ${left>=0 ? `נשאר ${ils(left)}` : `<span style="color:var(--danger)">חריגה של ${ils(-left)}</span>`}
      · מחושב מהחלק שלי בהוצאות שנרשמו
    </div>
    ${rateWarning()}
    <button class="btn secondary full" style="margin-top:12px" data-action="editBudgets">✏️ תקציבים, שער המרה וחלוקה</button>
  </div>

  ${hasPlan ? renderSharedForecast() : ''}`;
}

/* =========================================================
   מה כבר סגור ומידע שימושי — בתוך ״עוד״
========================================================= */
function renderBookingsSection(){
  const s = sh();
  return `
  <div class="card warn">
    <b>הדדליין הקרוב · ${fmtDate(s.deadline.date)}</b>
    <div class="small" style="margin-top:5px">${s.deadline.text}</div>
  </div>
  ${s.bookings.map(b=>`
    <div class="card">
      <div style="font-weight:600;font-size:13.5px">${b.what}</div>
      <div class="small" style="margin-top:4px">${[b.when,b.details].filter(Boolean).join(' · ')}</div>
      <div class="small" style="margin-top:6px">${b.payment||''}</div>
      <div class="small" style="margin-top:4px;color:var(--muted)">אישור: ${b.ref||'—'} · ביטול חינם: ${b.freeCancel||'—'}</div>
      ${renderBookingExtras(b)}
    </div>`).join('')}

  <h3 class="section-title" style="margin-top:18px">מלונות שנבדקו</h3>
  ${s.hotels.map(h=>{
    const perNight = Number(h.perNight), nights = Number(h.nights);
    const totalB = (perNight && nights) ? perNight*nights : null;
    return `
    <div class="card">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
        <div style="min-width:0">
          <div style="font-weight:600;font-size:13.5px">${h.hotel}</div>
          <div class="small" style="margin-top:3px">${h.dest} · ${h.dates} · ${h.nights} לילות</div>
        </div>
        <span class="stamp ${h.choice==='מוזמן'?'booked':'planned'}">${h.choice||''}</span>
      </div>
      <div class="small" style="margin-top:7px">${h.what||''}</div>
      <div class="chip-row tight" style="margin-top:8px">
        ${totalB?`<span class="chip mini">${baht(totalB)} · ${ils(toIls(totalB))}</span>`:''}
        ${h.linkLink?`<a class="chip mini" href="${h.linkLink}" target="_blank" rel="noopener">↗ בוקינג</a>`:''}
      </div>
    </div>`;
  }).join('')}`;
}

function renderInfoSection(){
  const camp = sh().campPayment;
  const campBlock = camp ? `
    <div class="card warn">
      <b>💳 ${camp.title}</b>
      <ul class="moto-list">${camp.lines.map(l=>`<li>${l}</li>`).join('')}</ul>
    </div>` : '';
  const moto = sh().scooterInfo;
  const motoBlock = moto ? `
    <div class="card warn">
      <b>🛵 ${moto.title}</b>
      <ul class="moto-list">${moto.lines.map(l=>`<li>${l}</li>`).join('')}</ul>
    </div>` : '';
  const maps = (sh().mapLists||[]).map(m=>`
    <div class="card map-list" data-map-list="${m.id}">
      <b>🗺️ ${m.title}</b>
      <div class="map-list-sub">${m.note||''} · <a href="https://www.google.com/maps/placelists/list/${m.id}" target="_blank" rel="noopener">פתיחה בגוגל מפות</a></div>
      <ul class="map-places">${mapListHtml(m.id)}</ul>
    </div>`).join('');
  setTimeout(loadMapLists, 0);
  return campBlock + motoBlock + maps + sh().info.map(i=>`<div class="info-row"><b>${i.topic}</b><span>${i.detail}</span></div>`).join('');
}

/* רשימות שמורות בגוגל מפות — נקראות בכל פתיחה, אז כל מקום חדש שנשמר שם מופיע כאן */
const MAP_LISTS = {};
function mapListHtml(id){
  const m = MAP_LISTS[id];
  if(!m) return '<li class="map-empty">טוען את המקומות…</li>';
  if(m.error) return `<li class="map-empty">לא הצלחנו לטעון את הרשימה (${escapeHtml(m.error)}). הקישור לגוגל מפות עובד.</li>`;
  if(!m.places.length) return '<li class="map-empty">עוד לא נשמרו מקומות ברשימה.</li>';
  return m.places.map(p=>`<li><a href="${escapeAttr(p.url)}" target="_blank" rel="noopener">${escapeHtml(p.name)}</a>${p.address?`<span>${escapeHtml(p.address)}</span>`:''}${p.note?`<em>${escapeHtml(p.note)}</em>`:''}</li>`).join('');
}
function loadMapLists(){
  (sh().mapLists||[]).forEach(m=>{
    const st = MAP_LISTS[m.id];
    if(st && (st.loading || Date.now()-st.at < 60000)) return;
    MAP_LISTS[m.id] = Object.assign(st||{}, {loading:true});
    fetch(`/api/maplist/${encodeURIComponent(m.id)}`).then(r=>r.json()).then(d=>{
      MAP_LISTS[m.id] = d.error ? {error:d.error, at:Date.now()} : {places:d.places||[], at:Date.now()};
    }).catch(e=>{ MAP_LISTS[m.id] = {error:String(e.message||e), at:Date.now()}; }).finally(()=>{
      const box = document.querySelector(`[data-map-list="${m.id}"] .map-places`);
      if(box) box.innerHTML = mapListHtml(m.id);
    });
  });
}

function renderWhoPill(){
  const el = document.getElementById('who-pill');
  if(!el) return;
  el.innerHTML = `${me().emoji} ${me().name} <button data-action="logout">יציאה</button>`;
}

/** הבית בתמונות: התחנות, ומה מחכה בדרך */
function renderHomeGallery(){
  const dests = myDestinations().filter(d=>d.arrival);
  const days = myDays();
  const seen = new Set(dests.map(d=>d.wiki));
  const moments = [];
  days.forEach((day, idx)=>day.rows.filter(r=>r.time && r.cat!=='תחבורה').forEach(r=>{
    const w = rowWiki(r);
    if(!w || seen.has(w)) return;
    seen.add(w);
    moments.push({w, r, day, idx});
  }));
  return `
  <div class="section" style="padding-top:0;">
    <div class="section-title">התחנות</div>
    <div class="home-mosaic">${dests.map((d,i)=>`
      <button class="mosaic-tile ${i===0 || (i===dests.length-1 && (dests.length-1)%2===1)?'wide':''}" data-action="setTab" data-id="route">
        ${imageBox(d.wiki, d.hue, 'mosaic-img')}
        <span class="mosaic-cap"><b>${escapeHtml(d.name.split(' — ')[0])}</b>${escapeHtml(datesLabel(d))}</span>
      </button>`).join('')}</div>
  </div>
  ${moments.length?`
  <div class="section" style="padding-top:0;">
    <div class="section-title">רגעים שמחכים לכם <span class="tag">${moments.length}</span></div>
    <div class="moments">${moments.map(m=>`
      <button class="moment ${m.r.done?'done':''}" data-action="jumpToDay" data-id="${m.idx}">
        ${imageBox(m.w, '#8C8272', 'moment-img')}
        <span class="moment-date">${m.day.dow} ${Number(m.day.date.slice(8))}/${Number(m.day.date.slice(5,7))}</span>
        <span class="moment-cap">${itineraryText(m.r.act)}</span>
      </button>`).join('')}</div>
  </div>`:''}`;
}

function renderHome(){
  const days = daysUntil(STATE.startDate);
  const tripDays = days<=0 ? Math.abs(days) : 0;
  const dests = myDestinations().filter(d=>d.arrival && d.departure);
  const now = new Date();
  const current = dests.find(d=> new Date(d.arrival)<=now && new Date(d.departure)>=now);
  const next = dests.filter(d=>new Date(d.arrival)>now)[0];
  const b = balance();
  const myBudget = wallet().budgets[meId()] || 0;
  const mySpent = meId()==='itai' ? b.itaiOwes : b.taliaOwes;
  const pct = myBudget ? Math.min(100, Math.round(mySpent/myBudget*100)) : 0;
  const nextSteps = computeNextSteps();
  const warnings = computeWarnings();
  const meta = STATE.trip[meId()] || {};
  const isItai = meId()==='itai';

  const net = b.net;
  const iAmOwed = (isItai && net>0) || (!isItai && net<0);
  const owedAmount = Math.abs(net);

  const totalNights = dests.reduce((n,d)=>n+(Number(d.nights)||0),0);
  const openTasks = STATE.masterChecklist.filter(t=>mine(t) && t.status!=='done').length;

  return `
  ${renderBigHero(meta.title || STATE.tripName, meta.subtitle || '', next || current || dests[0])}

  <div class="section">
    <div class="greeting">${me().emoji} ${greetingFor()}, ${me().name}</div>

    <div class="stat-strip">
      <div class="stat-cell"><b>${days>0?days:tripDays}</b><span>${days>0?'ימים לטיסה':'ימים בטיול'}</span></div>
      <div class="stat-cell"><b>${totalNights}</b><span>לילות</span></div>
      <div class="stat-cell"><b>${openTasks}</b><span>משימות פתוחות</span></div>
    </div>

    ${renderDeadlines()}

    ${next ? `
    <div class="next-up" data-action="setTab" data-id="route">
      ${imageBox(next.wiki, next.hue, 'nextup-photo')}
      <div class="nu-text">
        <div class="nu-label">${current ? 'התחנה הבאה' : 'מתחילים כאן'}</div>
        <div class="nu-name">${next.name}</div>
        <div class="nu-dates">${fmtDateShort(next.arrival)}${nightsLabel(next.nights)?' · '+nightsLabel(next.nights):''} · ${ownerBadge(next.owner)}</div>
      </div>
    </div>` : ''}

    <div class="mini-grid">
      <div class="mini-card" data-action="setTab" data-id="money">
        <div class="mc-label">${owedAmount<1 ? 'החשבון ביניכם' : (iAmOwed ? `${other().name} חייב/ת לך` : `את/ה חייב/ת ל${other().name}`)}</div>
        <div class="mc-value ${owedAmount<1?'':(iAmOwed?'plus':'minus')}">${owedAmount<1 ? 'מסודר ✓' : ils(owedAmount)}</div>
      </div>
      <div class="mini-card" data-action="setTab" data-id="money">
        <div class="mc-label">התקציב שלי</div>
        <div class="mc-value">${ils(myBudget-mySpent)}</div>
        <div class="bar"><div class="bar-fill ${mySpent>myBudget?'over':''}" style="width:${pct}%"></div></div>
      </div>
    </div>

    ${isItai ? `
      <div class="card soft">
        <b>שבועיים וחצי</b>
        <div class="small" style="margin-top:6px">
          נוחתים ב-23/11 בבנגקוק, ומשם קו יאו נוי, אאו נאנג, קאו סוק וקאו לאק — ולילה אחרון ביחד בבנגקוק.
          הטיסה הביתה: ${STATE.trip.itai.homeFlight}.
        </div>
      </div>` : `
      <div class="card soft">
        <b>אחרי שנפרדים</b>
        <div class="small" style="margin-top:6px">
          מ-${fmtDateShort(splitDate())} הטיול ממשיך לבד — צ׳יאנג מאי, הקורס בפאי, ואז סרי לנקה, וייטנאם והפיליפינים.
        </div>
      </div>`}
  </div>

  ${renderHomeGallery()}

  <div class="section" style="padding-top:0;">
    <div class="section-title">מה הצעד הבא <span class="tag">${nextSteps.length}</span></div>
    ${nextSteps.length
      ? nextSteps.map(n=>`<div class="next-card"><span>👉</span><div><div style="font-weight:500;font-size:13.5px;">${n.label}</div><div class="muted small">${n.sub}</div></div></div>`).join('')
      : `<div class="empty small">הכל סגור לעכשיו ✨</div>`}
  </div>

  ${warnings.length ? `
  <div class="section" style="padding-top:0;">
    <div class="section-title">התרעות <span class="tag">${warnings.length}</span></div>
    ${warnings.map(w=>`<div class="warning-card"><span>⚠️</span><div class="small">${w}</div></div>`).join('')}
  </div>`:''}
  `;
}

/** מה שנסגר בקרוב — דברים שעולים כסף אם מפספסים אותם */
function renderDeadlines(){
  const soon = STATE.masterChecklist
    .filter(t=>mine(t) && t.status!=='done' && t.deadline)
    .map(t=>({...t, days: daysUntil(t.deadline)}))
    .filter(t=>t.days <= 21)
    .sort((a,b)=>a.days-b.days)
    .slice(0,3);
  if(!soon.length) return '';
  return `
  <div class="deadlines" data-action="setTab" data-id="more">
    <div class="dl-head">⏳ נסגר בקרוב</div>
    ${soon.map(t=>`
      <div class="dl-row ${t.days<0?'late':(t.days<=3?'urgent':'')}">
        <span class="dl-when">${t.days<0 ? 'עבר' : (t.days===0 ? 'היום' : (t.days===1 ? 'מחר' : t.days+' ימים'))}</span>
        <span class="dl-title">${t.title}</span>
      </div>`).join('')}
  </div>`;
}

function greetingFor(){
  const h = new Date().getHours();
  if(h < 5) return 'לילה טוב';
  if(h < 12) return 'בוקר טוב';
  if(h < 17) return 'צהריים טובים';
  if(h < 21) return 'ערב טוב';
  return 'לילה טוב';
}

/* ===== MAP ===== */
function renderMapShell(){
  return `
  <div class="section" style="padding-bottom:0;"><div class="section-title">מפת המסלול 🗺️</div></div>
  <div id="map"></div>
  <div class="map-toolbar">
    <button class="pill ${mapFilter==='routes'?'active':''}" data-action="setMapFilter" data-id="routes" style="padding:6px 12px;font-size:12px;">יעדי מסלול</button>
    <button class="pill ${mapFilter==='places'?'active':''}" data-action="setMapFilter" data-id="places" style="padding:6px 12px;font-size:12px;">מקומות שמורים</button>
    <button class="pill ${mapFilter==='both'?'active':''}" data-action="setMapFilter" data-id="both" style="padding:6px 12px;font-size:12px;">הכל</button>
  </div>
  <div class="map-toolbar">
    <button class="btn small" id="btnAddPin">+ הוסף יעד מהמפה</button>
    <button class="btn ghost small" id="btnCancelPin">ביטול</button>
  </div>
  <div class="map-legend">${STATE.countries.filter(mine).map(c=>`<div class="legend-chip"><span class="legend-dot" style="background:${getCssVar(c.color)};"></span>${c.flag} ${c.name}</div>`).join('')}</div>
  <div class="section" style="padding-top:0;"><div class="muted small">● נקודה גדולה = יעד במסלול · ❤ נקודה קטנה = מקום שמור. לחיצה על נקודה תפתח פרטים לעריכה.</div></div>
  `;
}
function initMapIfNeeded(){
  document.getElementById('btnAddPin').onclick = ()=>{ mapAddMode=true; document.getElementById('btnAddPin').textContent="לחצי על המפה לבחירת מיקום..."; };
  document.getElementById('btnCancelPin').onclick = ()=>{ mapAddMode=false; document.getElementById('btnAddPin').textContent="+ הוסף יעד מהמפה"; };
  setTimeout(()=>{
    if(typeof L === 'undefined'){
      // ספריית המפה לא נטענה (אין רשת) — שאר האפליקציה ממשיכה לעבוד
      const el = document.getElementById('map');
      if(el) el.innerHTML = '<div class="empty small" style="padding:24px;text-align:center">המפה לא נטענה — בדקו את החיבור לאינטרנט</div>';
      return;
    }
    if(!leafletMap){
      leafletMap = L.map('map',{scrollWheelZoom:false}).setView([13,95],3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(leafletMap);
      leafletMap.on('click', (e)=>{ if(mapAddMode){ mapAddMode=false; openDestinationModal(null, e.latlng.lat, e.latlng.lng); } });
    } else { leafletMap.invalidateSize(); }
    drawMapMarkers();
  }, 60);
}
function drawMapMarkers(){
  if(!leafletMap) return;
  mapMarkers.forEach(m=>leafletMap.removeLayer(m)); mapMarkers=[];
  if(mapPolyline){ leafletMap.removeLayer(mapPolyline); mapPolyline=null; }
  const latlngs = [];
  if(mapFilter==='routes' || mapFilter==='both'){
    const dests = allDestinations().filter(d=>mine(d) && d.lat && d.lng).sort((a,b)=>(a.arrival||'').localeCompare(b.arrival||''));
    dests.forEach(d=>{
      const opacity = d.status==='optional'?0.55:1;
      const color = getCssVar(d.countryColor);
      const icon = L.divIcon({className:'', html:`<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4);opacity:${opacity};"></div>`, iconSize:[16,16]});
      const marker = L.marker([d.lat,d.lng], {icon}).addTo(leafletMap);
      marker.bindPopup(destPopupHtml(d));
      marker.on('popupopen', ()=>{ const b=document.getElementById('popedit-'+d.id); if(b) b.onclick=()=>openDestinationModal(d.countryId,null,null,d.id); });
      mapMarkers.push(marker); latlngs.push([d.lat,d.lng]);
    });
    if(latlngs.length>1){ mapPolyline = L.polyline(latlngs, {color:'#8C8272', weight:2, dashArray:'6 6'}).addTo(leafletMap); }
  }
  if(mapFilter==='places' || mapFilter==='both'){
    STATE.savedPlaces.filter(p=>p.lat && p.lng && myPlace(p)).forEach(p=>{
      const c = findCountry(p.countryId);
      const color = c? getCssVar(c.color) : '#8C8272';
      const icon = L.divIcon({className:'', html:`<div style="width:11px;height:11px;border-radius:50% 50% 50% 0;background:${color};border:1.5px solid white;transform:rotate(45deg);box-shadow:0 1px 3px rgba(0,0,0,.4);"></div>`, iconSize:[11,11]});
      const marker = L.marker([p.lat,p.lng], {icon}).addTo(leafletMap);
      marker.bindPopup(placePopupHtml(p));
      marker.on('popupopen', ()=>{
        const eb=document.getElementById('popeditplace-'+p.id); if(eb) eb.onclick=()=>openPlaceModal(p.countryId,p.destinationId,p.id);
        const mb=document.getElementById('popmaps-'+p.id); if(mb) mb.onclick=()=>window.open(p.mapsLink,'_blank');
      });
      mapMarkers.push(marker);
    });
  }
  if(mapFilter==='routes' && latlngs.length){ leafletMap.fitBounds(latlngs, {padding:[30,30]}); }
}
function destPopupHtml(d){
  return `<div style="min-width:170px;font-family:'Heebo',sans-serif;text-align:right;">
    <div style="font-weight:700;font-size:14px;">${d.countryFlag} ${d.name}</div>
    <div style="font-size:12px;color:#8C8272;margin:3px 0;">${fmtDateShort(d.arrival)} – ${fmtDateShort(d.departure)} · ${d.nights||'-'} לילות</div>
    <div style="font-size:11.5px;">${d.notes||''}</div>
    <button id="popedit-${d.id}" style="margin-top:6px;background:#C97B5A;color:white;border:none;border-radius:8px;padding:5px 10px;font-size:11.5px;cursor:pointer;">עריכה</button>
  </div>`;
}
function placePopupHtml(p){
  const cat = catInfo(p.category); const st = statusInfo(p.status);
  return `<div style="min-width:170px;font-family:'Heebo',sans-serif;text-align:right;">
    <div style="font-weight:700;font-size:14px;">${cat.icon} ${p.name}</div>
    <div style="font-size:12px;color:#8C8272;margin:3px 0;">${cat.label} · ${st.icon} ${st.label}</div>
    ${p.note?`<div style="font-size:11.5px;">${p.note}</div>`:''}
    <div style="display:flex;gap:6px;margin-top:6px;">
      <button id="popeditplace-${p.id}" style="background:#EAE0C8;color:#3A332C;border:none;border-radius:8px;padding:5px 10px;font-size:11.5px;cursor:pointer;">עריכה</button>
      ${p.mapsLink?`<button id="popmaps-${p.id}" style="background:#C97B5A;color:white;border:none;border-radius:8px;padding:5px 10px;font-size:11.5px;cursor:pointer;">Google Maps</button>`:''}
    </div>
  </div>`;
}

/* ===== COUNTRIES ===== */
function renderCountries(){
  const visible = STATE.countries.filter(mine);
  if(!visible.find(x=>x.id===activeCountry) && visible[0]) activeCountry = visible[0].id;
  const c = findCountry(activeCountry) || visible[0];
  if(c) activeCountry = c.id;
  return `
  <div class="section" style="padding-bottom:0;">
    <div class="section-title">מדינות</div>
    <div class="pillrow">
      ${visible.map(co=>`<button class="pill ${co.id===activeCountry?'active':''}" style="--accent:${getCssVar(co.color)}" data-action="setCountry" data-id="${co.id}">${co.flag} ${co.name}</button>`).join('')}
      <button class="pill addnew" data-action="addCountry">+ מדינה</button>
    </div>
    ${c? `
    <div class="row" style="margin-bottom:10px;">
      <div class="muted small">${c.currency? 'מטבע: '+c.currency : ''}</div>
      <button class="btn ghost small" data-action="editCountry" data-id="${c.id}">✎ עריכת מדינה</button>
    </div>
    <div class="subnav">
      ${[['prep','הכנות'],['route','מסלול'],['transport','טיסות ותחבורה'],['stay','לינה'],['places','📍 מקומות והמלצות'],['budget','תקציב']].map(s=>`<button class="${activeCountrySection===s[0]?'active':''}" data-action="setCSection" data-id="${s[0]}">${s[1]}</button>`).join('')}
    </div>` : ''}
  </div>
  <div class="section" style="padding-top:0;">
    ${!c? `<div class="empty"><span class="ei">🌍</span>אין עדיין מדינות — התחילי בהוספת אחת</div>` : `
    ${activeCountrySection==='prep'?renderPrep(c):''}
    ${activeCountrySection==='route'?renderRoute(c):''}
    ${activeCountrySection==='transport'?renderTransport(c):''}
    ${activeCountrySection==='stay'?renderStay(c):''}
    ${activeCountrySection==='places'?renderCountryPlaces(c):''}
    ${activeCountrySection==='budget'?renderCountryBudget(c):''}
    `}
  </div>
  `;
}
function renderPrep(c){
  const list = [...c.prepChecklist].sort((a,b)=>(a.order||0)-(b.order||0));
  return `
  <div class="card dashed">
    <div class="muted small" style="margin-bottom:4px;font-weight:600;">📝 הערות כלליות — ${c.flag} ${c.name}</div>
    <textarea data-action-blur="setCountryNotes" data-id="${c.id}" placeholder="כל מה שרוצים לזכור על המדינה הזו...">${c.notes||''}</textarea>
  </div>
  <div class="row" style="margin-bottom:8px;"><b>הכנות ומנהלות</b><button class="icon-btn" data-action="addPrepItem" data-id="${c.id}">+</button></div>
  <div class="card">
    ${list.length? list.map((t,i)=>`
      <div class="checklist-item">
        <div class="chk-toggle ${t.status}" data-action="cyclePrep" data-country="${c.id}" data-id="${t.id}">${statusIcon(t.status)}</div>
        <div class="chk-body" data-action="editPrep" data-country="${c.id}" data-id="${t.id}">
          <div class="chk-title ${t.status==='done'?'done':''}">${t.title}${t.priority?(' · '+t.priority):''}</div>
          <div class="chk-meta">${t.deadline?('עד '+fmtDateShort(t.deadline)+' · '):''}${t.notes||''}${t.link?' · 🔗':''}</div>
        </div>
        <div class="chk-actions">
          <div class="reorder-col">
            <button class="mini-btn" data-action="reorder" data-type="prep" data-country="${c.id}" data-id="${t.id}" data-dir="-1" ${i===0?'disabled style="opacity:.3"':''}>▲</button>
            <button class="mini-btn" data-action="reorder" data-type="prep" data-country="${c.id}" data-id="${t.id}" data-dir="1" ${i===list.length-1?'disabled style="opacity:.3"':''}>▼</button>
          </div>
          <button class="mini-btn" data-action="dup" data-type="prep" data-country="${c.id}" data-id="${t.id}">⎘</button>
          <button class="mini-btn" data-action="confirmDel" data-type="prep" data-country="${c.id}" data-id="${t.id}" data-label="${t.title}">✕</button>
        </div>
      </div>`).join('') : `<div class="empty small">אין עדיין משימות</div>`}
  </div>`;
}
function renderRoute(c){
  const list = c.destinations.filter(mine).sort((a,b)=>(a.order||0)-(b.order||0));
  return `
  <div class="row" style="margin-bottom:8px;"><b>מסלול / יעדים — ${c.flag} ${c.name}</b><button class="icon-btn" data-action="addDest" data-id="${c.id}">+</button></div>
  ${list.length? list.map((d,i)=>`
    <div class="postcard" style="--accent:${getCssVar(c.color)}">
      <div class="row"><b>${d.name}</b><span class="stamp ${d.status}">${d.status==='booked'?'הוזמן':d.status==='optional'?'אופציונלי':'מתוכנן'}</span></div>
      <div class="muted small" style="margin:4px 0;">${fmtDateShort(d.arrival)} – ${fmtDateShort(d.departure)} · ${d.nights||'-'} לילות · ${(d.companions||[]).join(', ')||''}</div>
      <div class="small">${d.notes||''}</div>
      <div class="row" style="margin-top:8px;">
        <span class="small muted">תקציב משוער: ${money(d.budget)}</span>
        <div style="display:flex;gap:4px;align-items:center;">
          <button class="mini-btn" data-action="reorder" data-type="dest" data-country="${c.id}" data-id="${d.id}" data-dir="-1" ${i===0?'disabled style="opacity:.3"':''}>▲</button>
          <button class="mini-btn" data-action="reorder" data-type="dest" data-country="${c.id}" data-id="${d.id}" data-dir="1" ${i===list.length-1?'disabled style="opacity:.3"':''}>▼</button>
          <button class="mini-btn" data-action="dup" data-type="dest" data-country="${c.id}" data-id="${d.id}">⎘</button>
          <button class="btn ghost small" data-action="editDest" data-country="${c.id}" data-id="${d.id}">עריכה</button>
        </div>
      </div>
    </div>`).join('') : `<div class="empty small">אין עדיין יעדים במדינה זו</div>`}
  `;
}
function renderTransport(c){
  return `
  <div class="row" style="margin-bottom:8px;"><b>טיסות ותחבורה — ${c.flag} ${c.name}</b><button class="icon-btn" data-action="addTransport" data-id="${c.id}">+</button></div>
  ${c.transport.length? c.transport.map(f=>`
    <div class="card">
      <div class="row"><b>${f.kind}: ${f.from} → ${f.to}</b><span class="stamp ${f.status==='הוזמן'?'booked':'planned'}">${f.status}</span></div>
      <div class="muted small">${fmtDateShort(f.date)} ${f.time||''} · ${f.carrier||''} ${f.flightNumber||''}</div>
      ${f.price?`<div class="small">מחיר: ${money(f.price)} · כבודה: ${f.luggage||'-'}</div>`:''}
      <div class="row" style="margin-top:6px;">
        <span class="small muted">${f.bookingRef?('אישור: '+f.bookingRef):''}</span>
        <div style="display:flex;gap:4px;"><button class="mini-btn" data-action="dup" data-type="transport" data-country="${c.id}" data-id="${f.id}">⎘</button><button class="btn ghost small" data-action="editTransport" data-country="${c.id}" data-id="${f.id}">עריכה</button></div>
      </div>
    </div>`).join('') : `<div class="empty small">אין עדיין טיסות/מעברים מתוכננים</div>`}
  `;
}
function renderStay(c){
  return `
  <div class="row" style="margin-bottom:8px;"><b>לינה — ${c.flag} ${c.name}</b><button class="icon-btn" data-action="addStay" data-id="${c.id}">+</button></div>
  ${c.accommodations.length? c.accommodations.map(a=>`
    <div class="card">
      <div class="row"><b>${a.name}</b><span class="stamp ${a.status==='Booked'?'booked':a.status==='Considering'?'planned':'optional'}">${a.status==='Booked'?'✓ הוזמן':a.status==='Considering'?'? שוקלת':'♡ שמור'}</span></div>
      <div class="muted small">${a.location||''} · ${a.dates||''}</div>
      <div class="small">${a.roomType||''} · ${money(a.pricePerNight)}/לילה · סה"כ ${money(a.priceTotal)}</div>
      <div class="row" style="margin-top:6px;"><span></span><div style="display:flex;gap:4px;"><button class="mini-btn" data-action="dup" data-type="stay" data-country="${c.id}" data-id="${a.id}">⎘</button><button class="btn ghost small" data-action="editStay" data-country="${c.id}" data-id="${a.id}">עריכה</button></div></div>
    </div>`).join('') : `<div class="empty small">אין עדיין מקומות לינה שמורים</div>`}
  `;
}
function renderCountryBudget(c){
  const rows = allExpenseRows().filter(r=>r.countryId===c.id).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  return `
  <div class="row" style="margin-bottom:8px;"><b>תקציב — ${c.flag} ${c.name}</b><button class="btn small" data-action="addExpense" data-country="${c.id}">+ הוצאה (אחר)</button></div>
  <div class="card">
    <div class="muted small" style="margin-bottom:6px;font-weight:600;">מתוכנן לעומת בפועל</div>
    ${EXPENSE_CATEGORIES.map(cat=>{
      const actual = actualSpentFor(c.id, cat.id);
      return `<div class="row" style="padding:7px 0;border-bottom:1px solid var(--line);">
        <span class="small">${cat.label}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <input type="number" inputmode="numeric" style="width:76px;text-align:left;padding:5px 8px;border:1px solid var(--line);border-radius:8px;" value="${c.budget[cat.id]||''}" data-action="setBudget" data-country="${c.id}" data-key="${cat.id}" placeholder="מתוכנן">
          <span class="small muted">בפועל: ${money(actual)}</span>
        </div>
      </div>`;
    }).join('')}
    <div class="row" style="padding-top:8px;"><b class="small">סה"כ</b><b class="small">מתוכנן ${money(Object.values(c.budget).reduce((a,b)=>a+(Number(b)||0),0))} · בפועל ${money(actualSpentFor(c.id))}</b></div>
  </div>
  <div class="muted small" style="margin-bottom:10px;">"מתוכנן" הוא ההערכה שאת מזינה כאן ידנית; "בפועל" מחושב אוטומטית מכל הטיסות, הלינה, המשימות המחויבות וההוצאות הידניות שרשמת — כל פריט נספר פעם אחת בלבד.</div>
  <div class="row" style="margin-bottom:6px;"><b class="small">כל ההוצאות של ${c.name}</b></div>
  ${rows.length? rows.map(r=>{
    const dest = r.destinationId? findDestination(c.id, r.destinationId) : null;
    return `<div class="place-card">
      <div class="row"><b>${money(r.amountILS)}</b><span class="small muted">${expCatLabel(r.category)} · ${fmtDateShort(r.date)}</span></div>
      <div class="muted small" style="margin:3px 0;">${r.description}${dest?(' · '+dest.name):''} · ${sourceLabel(r.source)} · ${r.paymentStatus}</div>
      <div class="row" style="margin-top:6px;"><span></span><div class="place-actions"><button data-action="editExpenseRow" data-source="${r.source}" data-country="${c.id}" data-sourceid="${r.sourceId}">✎</button><button data-action="confirmDelExpenseRow" data-source="${r.source}" data-country="${c.id}" data-sourceid="${r.sourceId}" data-label="${r.description}">✕</button></div></div>
    </div>`;
  }).join('') : `<div class="empty small">אין עדיין הוצאות רשומות למדינה זו</div>`}
  `;
}

/* ===== COUNTRY PLACES ===== */
function renderCountryPlaces(c){
  const dests = [...c.destinations].sort((a,b)=>(a.order||0)-(b.order||0));
  return `
  <div class="row" style="margin-bottom:12px;"><b>📍 מקומות והמלצות — ${c.flag} ${c.name}</b><button class="btn small" data-action="addPlace" data-country="${c.id}" data-dest="">+ הוספת מקום</button></div>
  ${dests.length? dests.map(d=>renderDestPlacesBlock(c,d)).join('') : `<div class="empty small">אין עדיין יעדים במדינה זו להוסיף אליהם מקומות</div>`}
  `;
}
function renderDestPlacesBlock(c,d){
  const places = placesFor(c.id, d.id);
  const byCat = {}; places.forEach(p=>{ (byCat[p.category]=byCat[p.category]||[]).push(p); });
  const catsWithCount = Object.keys(byCat);
  return `
  <div class="dest-places-block">
    <div class="dest-places-head"><h4>❤️ המקומות שלי ב${d.name}</h4><button class="icon-btn" data-action="addPlace" data-country="${c.id}" data-dest="${d.id}">+</button></div>
    ${catsWithCount.length? `
      <div class="cat-grid">${catsWithCount.map(catId=>{
        const cat = catInfo(catId); const key = d.id+'_'+catId; const isActive = !!expandedCats[key];
        return `<button class="cat-chip ${isActive?'active':''}" data-action="toggleCat" data-key="${key}"><span>${cat.icon} ${cat.label}</span><b>${byCat[catId].length}</b></button>`;
      }).join('')}</div>
      ${catsWithCount.map(catId=>{ const key=d.id+'_'+catId; if(!expandedCats[key]) return ''; return byCat[catId].map(p=>renderPlaceCard(p)).join(''); }).join('')}
    ` : `<div class="empty small">אין עדיין מקומות שמורים ב${d.name}</div>`}
  </div>`;
}
function renderPlaceCard(p){
  const cat = catInfo(p.category); const st = statusInfo(p.status);
  return `
  <div class="place-card">
    <div class="row"><b>${cat.icon} ${p.name}</b><span class="stamp ${p.status}">${st.icon} ${st.label}</span></div>
    <div class="muted small" style="margin:3px 0;">${cat.label}${p.priority?(' · עדיפות '+p.priority):''}</div>
    ${p.note?`<div class="small">${p.note}</div>`:''}
    <div class="row" style="margin-top:8px;">
      ${p.mapsLink?`<button class="btn ghost small" data-action="openMaps" data-id="${p.id}">פתח ב-Google Maps</button>`:'<span></span>'}
      <div class="place-actions">
        <button data-action="dup" data-type="place" data-id="${p.id}">⎘</button>
        <button data-action="editPlace" data-country="${p.countryId}" data-dest="${p.destinationId||''}" data-id="${p.id}">✎</button>
        <button data-action="confirmDel" data-type="place" data-id="${p.id}" data-label="${p.name}">✕</button>
      </div>
    </div>
  </div>`;
}

/* ===== TIMELINE ===== */
function renderTimeline(){
  const dests = allDestinations().filter(d=>mine(d) && d.arrival).sort((a,b)=>a.arrival.localeCompare(b.arrival));
  let byMonth = {};
  dests.forEach(d=>{ const dt=new Date(d.arrival+"T00:00:00"); const key=dt.toLocaleDateString('he-IL',{month:'long',year:'numeric'}); (byMonth[key]=byMonth[key]||[]).push(d); });
  return `
  <div class="section">
    <div class="section-title">ציר הזמן של הטיול 📅</div>
    ${Object.keys(byMonth).length? Object.keys(byMonth).map(month=>`
      <div style="margin-bottom:16px;">
        <div style="font-family:'Frank Ruhl Libre',serif;font-size:15px;margin-bottom:8px;color:var(--terracotta-dark);">${month}</div>
        ${byMonth[month].map(d=>`<div class="postcard" style="--accent:${getCssVar(d.countryColor)}"><div class="row"><b>${d.countryFlag} ${d.name}</b><span class="small muted">${fmtDateShort(d.arrival)} – ${fmtDateShort(d.departure)}</span></div><div class="small muted">${d.notes||''}</div></div>`).join('')}
      </div>`).join('') : `<div class="empty"><span class="ei">🗓️</span>עדיין אין תאריכים במסלול</div>`}
  </div>`;
}

/* ===== MORE ===== */
function renderMore(){
  const tabs = [
    ['field','בשטח'], ['master','רשימת הכנה'], ['packing','ציוד'], ['shopping','קניות'], ['bookings','מה סגור'],
    ['info','מידע שימושי'], ['saved','מקומות שמורים'], ['timeline','ציר זמן'],
    ['docs','מסמכים']
  ];
  // לטליה המפה יושבת כאן, כי בניווט התחתון יש לה ״מדינות״ במקום
  if(meId()==='talia') tabs.splice(5, 0, ['map','מפה']);
  if(!tabs.find(t=>t[0]===moreSection)) moreSection = 'master';
  return `
  <div class="section" style="padding-bottom:0;">
    <div class="section-title">עוד</div>
    <div class="chip-row more-destinations"><button class="chip" data-action="setTab" data-id="map">מפה</button>${meId()==='talia'?`<button class="chip" data-action="setTab" data-id="countries">מדינות</button>`:''}</div>
    <div class="subnav">${tabs.map(t=>`<button class="${moreSection===t[0]?'active':''}" data-action="setMore" data-id="${t[0]}">${t[1]}</button>`).join('')}</div>
  </div>
  <div class="section" style="padding-top:0;">
    ${moreSection==='field'?renderFieldSection():''}
    ${moreSection==='master'?renderMasterChecklist():''}
    ${moreSection==='packing'?renderPacking():''}
    ${moreSection==='shopping'?renderShopping():''}
    ${moreSection==='bookings'?renderBookingsSection():''}
    ${moreSection==='info'?renderInfoSection():''}
    ${moreSection==='saved'?renderSavedGlobal():''}
    ${moreSection==='timeline'?renderTimeline():''}
    ${moreSection==='map'?renderMapShell():''}
    ${moreSection==='docs'?renderDocs():''}
  </div>`;
}
function renderMasterChecklist(){
  const list = STATE.masterChecklist.filter(mine).sort((a,b)=>(a.order||0)-(b.order||0));
  const groups = {}; list.forEach(t=>{ (groups[t.category]=groups[t.category]||[]).push(t); });
  return `
  <div class="row" style="margin-bottom:8px;"><b>רשימת הכנה כללית 🎒</b><button class="icon-btn" data-action="addMaster">+</button></div>
  ${Object.keys(groups).map(cat=>`
    <div class="card">
      <div class="muted small" style="margin-bottom:4px;font-weight:600;">${cat}</div>
      ${groups[cat].map((t,i)=>{
        const idxInAll = list.findIndex(x=>x.id===t.id);
        const cInfo = t.countryId? findCountry(t.countryId) : null;
        return `
        <div class="checklist-item">
          <div class="chk-toggle ${t.status}" data-action="cycleMaster" data-id="${t.id}">${statusIcon(t.status)}</div>
          <div class="chk-body" data-action="editMaster" data-id="${t.id}">
            <div class="chk-title ${t.status==='done'?'done':''}">${cInfo?cInfo.flag+' ':''}${t.title}${t.priority?(' · '+t.priority):''}</div>
            <div class="chk-meta">${t.deadline?('עד '+fmtDateShort(t.deadline)+' · '):''}${t.notes||''}${t.link?' · 🔗':''}</div>
          </div>
          <div class="chk-actions">
            <div class="reorder-col">
              <button class="mini-btn" data-action="reorder" data-type="master" data-id="${t.id}" data-dir="-1" ${idxInAll===0?'disabled style="opacity:.3"':''}>▲</button>
              <button class="mini-btn" data-action="reorder" data-type="master" data-id="${t.id}" data-dir="1" ${idxInAll===list.length-1?'disabled style="opacity:.3"':''}>▼</button>
            </div>
            <button class="mini-btn" data-action="dup" data-type="master" data-id="${t.id}">⎘</button>
            <button class="mini-btn" data-action="confirmDel" data-type="master" data-id="${t.id}" data-label="${t.title}">✕</button>
          </div>
        </div>`;
      }).join('')}
    </div>`).join('')}
  `;
}
/** רק מה שבאמת צריך לקנות — פריטים שיש להם מקום קנייה */
function shoppingItems(){
  return STATE.packingList.filter(mine).filter(p=>p.buyIn==='il' || p.buyIn==='th');
}

/** סיכום רשימת הקניות בשקלים, בלי פריטי הרשות ובלי מה שכבר נקנה */
function shoppingTotals(){
  const mineShop = shoppingItems();
  const open = mineShop.filter(p=>p.status==='need' && !p.optional);
  const il = open.filter(p=>p.buyIn==='il').reduce((s,p)=>s+(Number(p.cost)||0),0);
  const th = open.filter(p=>p.buyIn==='th').reduce((s,p)=>s+(Number(p.cost)||0),0);

  /* מה שכבר נקנה — לפי מה ששולם בפועל אם נרשם, אחרת לפי האומדן */
  const done = mineShop.filter(p=>p.status!=='need');
  const spent = done.reduce((s,p)=>{
    const paid = p.paid===undefined || p.paid==='' ? Number(p.cost)||0 : Number(p.paid)||0;
    return s + (p.buyIn==='th' ? paid*rate() : paid);
  }, 0);

  const musts = mineShop.filter(p=>!p.optional);
  return {
    il, th, thIls: th*rate(), total: il + th*rate(),
    spent, done: done.length, count: mineShop.length,
    doneMust: musts.filter(p=>p.status!=='need').length, countMust: musts.length
  };
}

/** מה שמוצג כרגע — לפי הסינון שנבחר למעלה */
function shopVisible(where){
  return shoppingItems().filter(p=>p.buyIn===where)
    .filter(p=>shopFilter==='all' || shopFilter===where);
}

/** שורה אחת ברשימת הקניות — אפשר לסמן, להחליק, ולתקן את המחיר בלחיצה */
function shopLine(p){
  const unit = p.buyIn==='il' ? '₪' : '฿';
  const done = p.status!=='need';
  const paid = p.paid===undefined || p.paid==='' ? null : Number(p.paid);
  const shown = done && paid!==null ? paid : p.cost;
  return `
  <div class="shop-row${done?' bought':''}" data-swipe-buy="${done?'':p.id}">
    <button class="shop-tick${done?' on':''}" data-action="${done?'unbuyItem':'buyItem'}" data-id="${p.id}"
            aria-label="${done?'לבטל את הסימון':'סמנו שנקנה'}">${done?'✓':'○'}</button>
    <div class="chk-body" data-action="editPacking" data-id="${p.id}">
      <div class="chk-title">${p.item}${p.quantity?(' ×'+p.quantity):''}</div>
      ${p.notes?`<div class="chk-meta">${p.notes}</div>`:''}
      ${done && paid!==null && paid!==p.cost
        ? `<div class="chk-meta">שולם ${unit}${paid.toLocaleString('he-IL')} · האומדן היה ${unit}${Number(p.cost).toLocaleString('he-IL')}</div>`
        : ''}
    </div>
    <button class="shop-price${done?' bought':''}" data-action="editPrice" data-id="${p.id}"
            aria-label="לתקן את המחיר">${shown ? unit+Number(shown).toLocaleString('he-IL') : '＋מחיר'}</button>
  </div>`;
}

function renderShoppingGroup(where){
  const all = shopVisible(where);
  if(!all.length) return '';
  const open = all.filter(p=>p.status==='need');
  const bought = all.filter(p=>p.status!=='need');
  const must = open.filter(p=>!p.optional), extra = open.filter(p=>p.optional);
  const sum = must.reduce((s,p)=>s+(Number(p.cost)||0),0);
  const head = where==='il'
    ? {title:'🇮🇱 בארץ, לפני הטיסה', why:'מה שחייב התאמה אישית, מה שלא מוכרים שם, ומה שצריך להיות ביד ברגע הנחיתה.'}
    : {title:'🇹🇭 שם — זול יותר וטוב יותר', why:'ציוד המואיי תאי מגיע משם מלכתחילה ועולה שם כשליש, והנוזלים פשוט לא שווים את הסחיבה.'};
  const open_ = shopBoughtOpen[where];
  return `
  <div class="card">
    <div class="row"><b>${head.title}</b><span class="shop-sum">${where==='il'?ils(sum):baht(sum)}</span></div>
    <div class="small muted" style="margin:2px 0 8px;">${head.why}</div>
    ${must.map(shopLine).join('')}
    ${extra.length?`
      <div class="muted small shop-divider">אם בא לכם — לא בסכום</div>
      ${extra.map(shopLine).join('')}`:''}
    ${!open.length?`<div class="muted small" style="padding:6px 0;">הכול נקנה 🎉</div>`:''}
    ${bought.length?`
      <button class="shop-fold" data-action="toggleBought" data-id="${where}">
        <span>✓ ${bought.length} כבר נקנו</span><span class="shop-caret">${open_?'▾':'▸'}</span>
      </button>
      ${open_ ? bought.map(shopLine).join('') : ''}`:''}
  </div>`;
}

function renderShopping(){
  const t = shoppingTotals();
  const hasThai = shoppingItems().some(p=>p.buyIn==='th' && p.status==='need');
  const pct = t.countMust ? Math.round(t.doneMust/t.countMust*100) : 0;
  const chips = [['all','הכול'],['il','בארץ'],['th','שם']];
  return `
  <div class="row" style="margin-bottom:8px;">
    <b>הקניות של ${me().name} ${me().emoji}</b>
    <button class="icon-btn" data-action="addShopping">+</button>
  </div>

  <div class="card">
    <div class="row"><b>${t.doneMust===t.countMust?'הכול נקנה':'נשאר לקנות'}</b>
      <b class="shop-total">${ils(t.total)}</b></div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="row muted small">
      <span>${t.doneMust} מתוך ${t.countMust} · ${pct}%</span>
      <span>${t.spent?('כבר יצאו '+ils(t.spent)):''}</span>
    </div>
    <div class="small muted" style="margin-top:8px;">
      ${ils(t.il)} בארץ · ${baht(t.th)} שם, שהם ${ils(t.thIls)} · לפי ${baht(100)} ≈ ${ils(rate()*100)}
    </div>
    <div class="small muted" style="margin-top:6px;">
      זה לא נכנס לפנקס ההוצאות של הטיול — הפנקס סופר את מה שקורה בדרך, וזה מה שקונים לפניה.
    </div>
  </div>

  <div class="pillrow" style="margin-bottom:10px;">
    ${chips.map(([id,label])=>`
      <button class="pill${shopFilter===id?' active':''}" data-action="shopFilter" data-id="${id}">${label}</button>
    `).join('')}
  </div>

  ${renderShoppingGroup('il')}
  ${renderShoppingGroup('th')}

  ${hasThai?`
  <div class="card dashed">
    <div class="muted small" style="margin-bottom:4px;font-weight:600;">🛍️ איפה קונים את זה</div>
    <div class="small">
      ${shoppingItems().some(p=>p.buyIn==='th' && p.status==='need' && p.category==='🥊 מואיי תאי')?`
      <b>ציוד מואיי תאי — MBK Center</b>, קומה 4: כמה חנויות זו לצד זו (Fairtex, Twins, Yokkao).
      פתוח כל יום 10:00–22:00, תחנת BTS National Stadium. יש דוכנים גם ליד
      <b>רג׳אדמנרן</b> בערב הקרב.<br><br>`:''}
      <b>הדברים הקטנים</b> — סבון, שמפו, דוחה יתושים, כפכפים, Namman Muay —
      ב-7-Eleven ובבתי המרקחת בכל פינה, גם בקו יאו נוי ובאאו נאנג. אין סיבה לקנות מראש.<br><br>
      <b>שימו לב לתאריכים:</b> אתם בבנגקוק ב-23–26/11, שני עד חמישי — ו<b>צ׳טוצ׳אק סגור</b>,
      הוא שוק של סוף שבוע. סרונגים, בגדי יוגה ומזכרות אפשר להשלים בצ׳יאנג מאי או בפאי.
    </div>
  </div>`:''}

  <div class="muted small">
    לחיצה על ○ או החלקה של השורה מסמנת שנקנה — ואפשר לבטל מיד.
    לחיצה על המחיר מתקנת אותו למה ששילמתם בפועל.
  </div>
  `;
}

/**
 * סימון פריט כנקנה. מחכים רגע עם הרינדור כדי שהאנימציה תיראה, ומציעים
 * ביטול — לחיצה אחת בטעות לא אמורה למחוק פריט מהרשימה בלי דרך חזרה.
 */
function markBought(id){
  const p = STATE.packingList.find(x=>x.id===id);
  if(!p || p.status!=='need') return;
  snapshotUndo(p.item, 'סומן כנקנה');
  const row = document.querySelector(`.shop-row [data-id="${id}"]`);
  const el = row && row.closest('.shop-row');
  if(el) el.classList.add('buying');
  buzz();
  p.status = 'have';
  persist();
  setTimeout(render, el ? 260 : 0);
}

/** תיקון המחיר במקום, בלי מודאל — עומדים בחנות ומקלידים כמה זה באמת עלה */
function startPriceEdit(button, id){
  const p = STATE.packingList.find(x=>x.id===id);
  if(!p || button.querySelector('input')) return;
  const unit = p.buyIn==='il' ? '₪' : '฿';
  const current = p.status!=='need' && p.paid!==undefined && p.paid!=='' ? p.paid : p.cost;
  button.classList.add('editing');
  button.innerHTML = `<span class="shop-unit">${unit}</span><input class="shop-input" type="number"
    inputmode="decimal" min="0" step="1" value="${current||''}" aria-label="מחיר">`;
  const input = button.querySelector('input');
  input.focus();
  input.select();
  let closed = false;
  const commit = (save)=>{
    if(closed) return;
    closed = true;
    if(save){
      const val = input.value==='' ? 0 : Math.max(0, Number(input.value));
      if(!Number.isNaN(val)){
        // פריט שכבר נקנה — המחיר החדש הוא מה ששולם; אחרת זה תיקון האומדן
        if(p.status!=='need') p.paid = val; else p.cost = val;
        persist();
      }
    }
    render();
  };
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter'){ e.preventDefault(); commit(true); }
    if(e.key==='Escape'){ e.preventDefault(); commit(false); }
  });
  input.addEventListener('blur', ()=>commit(true));
}

/**
 * החלקה של שורה מסמנת אותה כנקנה — אותה תנועה שכבר קיימת בלשונית "היום",
 * כדי שלא צריך לכוון לעיגול הקטן כשהידיים תפוסות בשקיות.
 */
function initShopSwipe(){
  const rows = document.querySelectorAll('.shop-row[data-swipe-buy]:not([data-swipe-buy=""])');
  rows.forEach(row=>{
    let x0 = 0, y0 = 0, dx = 0, active = false;
    const start = e=>{
      const t = e.touches[0];
      x0 = t.clientX; y0 = t.clientY; dx = 0; active = true;
      row.style.transition = 'none';
    };
    const move = e=>{
      if(!active) return;
      const t = e.touches[0];
      const ox = t.clientX - x0, oy = t.clientY - y0;
      if(Math.abs(oy) > Math.abs(ox)){ active = false; row.style.transform = ''; return; }
      dx = ox;
      row.style.transform = `translateX(${dx}px)`;
      row.classList.toggle('will-buy', Math.abs(dx) > 70);
    };
    const end = ()=>{
      if(!active) return;
      active = false;
      row.style.transition = '';
      row.style.transform = '';
      row.classList.remove('will-buy');
      if(Math.abs(dx) > 70) markBought(row.dataset.swipeBuy);
    };
    row.addEventListener('touchstart', start, {passive:true});
    row.addEventListener('touchmove', move, {passive:true});
    row.addEventListener('touchend', end);
    row.addEventListener('touchcancel', end);
  });
}

function renderPacking(){
  const groups = {};
  STATE.packingList.filter(mine).forEach(p=>{ (groups[p.category]=groups[p.category]||[]).push(p); });
  return `
  <div class="row" style="margin-bottom:8px;"><b>הציוד של ${me().name} ${me().emoji}</b><button class="icon-btn" data-action="addPacking">+</button></div>
  ${meId()==='talia' ? `
  <div class="card dashed"><div class="muted small" style="margin-bottom:4px;font-weight:600;">🎒 חלוקת הציוד</div><div class="small">${STATE.packingBreakdown}</div></div>
  <div class="card"><div class="muted small" style="margin-bottom:4px;font-weight:600;">✈️ בתיק ה־20L בזמן טיסות ומעברים</div><div class="small muted" style="margin-bottom:4px;">את הדברים האלה לא להכניס ל־65L:</div><div class="small">${STATE.packingCarryOn.join(' · ')}</div></div>`
  : `<div class="card dashed"><div class="muted small" style="margin-bottom:4px;font-weight:600;">🎒 שבועיים, תיק אחד</div><div class="small">תיק עלייה למטוס + תיק יום. הכביסה נעשית בדרך, אז אין צורך ביותר מזה — חוץ מציוד האימונים.</div></div>`}
  ${Object.keys(groups).map(cat=>`
    <div class="card">
      <div class="muted small" style="margin-bottom:4px;font-weight:600;">${cat}</div>
      ${groups[cat].map(p=>`
        <div class="checklist-item">
          <div class="chk-body" data-action="editPacking" data-id="${p.id}">
            <div class="chk-title">${p.item}${p.quantity?(' ×'+p.quantity):''}${
              p.buyIn && p.status==='need'
                ? `<span class="buy-tag ${p.buyIn}">${p.buyIn==='il'?'בארץ':'שם'}${p.cost?' · '+(p.buyIn==='il'?ils(p.cost):baht(p.cost)):''}</span>`
                : ''}</div>
            ${p.notes?`<div class="chk-meta">${p.notes}</div>`:''}
          </div>
          <select data-action="setPackStatus" data-id="${p.id}" style="border:1px solid var(--line);border-radius:8px;padding:4px 6px;font-size:12px;">
            ${['need','have','packed'].map(s=>`<option value="${s}" ${p.status===s?'selected':''}>${s==='need'?'לקנות':s==='have'?'יש כבר':'ארוז'}</option>`).join('')}
          </select>
          <button class="mini-btn" data-action="dup" data-type="packing" data-id="${p.id}">⎘</button>
          <button class="mini-btn" data-action="confirmDel" data-type="packing" data-id="${p.id}" data-label="${p.item}">✕</button>
        </div>`).join('')}
    </div>`).join('')}
  `;
}
function renderDocs(){
  return `
  <div class="row" style="margin-bottom:8px;"><b>מסמכים 📄</b><button class="icon-btn" data-action="addDoc">+</button></div>

  <div class="card">
    <div class="row"><b>קבצים</b><button class="btn small" data-action="uploadFile">+ העלאה</button></div>
    <div class="small" style="margin-top:6px;color:var(--muted)">
      צילום דרכון, פוליסת ביטוח, אישורי הזמנה — שמורים מאחורי ההתחברות, וזמינים לשניכם.
      תמונות ו-PDF עד 6MB.
    </div>
    <div id="file-list" class="file-list">${renderFileList()}</div>
  </div>

  <div class="card">
    <div class="muted small" style="margin-bottom:6px;font-weight:600;">רשימת מה שצריך</div>
    ${STATE.documents.map(doc=>`
      <div class="checklist-item">
        <div class="chk-body">
          <div class="sensitive-row">
            <div><div class="chk-title">${doc.sensitive && !doc.revealed ? '••••••••' : doc.name}</div><div class="chk-meta">${doc.category}${doc.notes?(' · '+doc.notes):''}</div></div>
            ${doc.sensitive?`<button class="reveal-btn" data-action="revealDoc" data-id="${doc.id}">${doc.revealed?'הסתר':'הצג'}</button>`:''}
          </div>
        </div>
        <button class="chk-del" data-action="confirmDel" data-type="doc" data-id="${doc.id}" data-label="${doc.name}">✕</button>
      </div>`).join('')}
  </div>
  <div class="muted small">מסמכים רגישים מוסתרים כברירת מחדל.</div>
  `;
}

/* הקבצים חיים בשרת ולא במסמך המשותף, ולכן נטענים בנפרד */
let uploadedFiles = null;

function renderFileList(){
  if(uploadedFiles === null) return '<div class="small" style="color:var(--muted)">טוען…</div>';
  if(!uploadedFiles.length) return '<div class="small" style="color:var(--muted)">עוד לא הועלו קבצים</div>';
  return uploadedFiles.map(f=>`
    <div class="file-row">
      <a class="file-name" href="/api/files/${f.id}" target="_blank" rel="noopener">
        ${f.mime==='application/pdf'?'📄':'🖼️'} ${escapeHtml(f.name)}
      </a>
      <span class="file-meta">${Math.round(f.size/1024)}KB · ${personName(f.uploaded_by)}</span>
      <button class="chk-del" data-action="deleteFile" data-id="${f.id}" data-label="${escapeAttr(f.name)}">✕</button>
    </div>`).join('');
}

async function loadFiles(force){
  if(uploadedFiles !== null && !force) return;
  try{
    const res = await fetch('/api/files', {cache:'no-store'});
    if(!res.ok) throw new Error('files');
    uploadedFiles = (await res.json()).files || [];
    rememberFileList(uploadedFiles);
    prefetchFiles(uploadedFiles.map(f=>f.id));
  }catch(e){
    uploadedFiles = cachedFileList();
  }
  const box = document.getElementById('file-list');
  if(box) box.innerHTML = renderFileList();
}

function pickAndUploadFile(after){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*,application/pdf';
  input.onchange = async ()=>{
    const file = input.files && input.files[0];
    if(!file) return;
    toast('מעלה את ' + file.name + '…');
    const form = new FormData();
    form.append('file', file);
    form.append('name', file.name);
    try{
      const res = await fetch('/api/files', {method:'POST', body:form});
      const payload = await res.json();
      if(!res.ok) throw new Error(payload.error || 'ההעלאה נכשלה');
      await loadFiles(true);
      toast('הועלה');
      if(after) after();
    }catch(e){
      toast(e.message || 'ההעלאה נכשלה');
    }
  };
  input.click();
}

async function deleteFile(id, label){
  confirmThenDelete(label, async ()=>{
    try{
      await fetch('/api/files/'+id, {method:'DELETE'});
      await loadFiles(true);
    }catch(e){ toast('המחיקה נכשלה'); }
  });
}

function renderSavedGlobal(){
  const countryOpts = STATE.countries.map(c=>`<option value="${c.id}" ${savedFilter.country===c.id?'selected':''}>${c.flag} ${c.name}</option>`).join('');
  let destOpts = '<option value="">כל היעדים</option>';
  if(savedFilter.country){ const c=findCountry(savedFilter.country); if(c) destOpts += c.destinations.map(d=>`<option value="${d.id}" ${savedFilter.dest===d.id?'selected':''}>${d.name}</option>`).join(''); }
  const catOpts = CATEGORIES.map(cat=>`<option value="${cat.id}" ${savedFilter.category===cat.id?'selected':''}>${cat.icon} ${cat.label}</option>`).join('');
  const statusOpts = STATUS_OPTIONS.map(s=>`<option value="${s.id}" ${savedFilter.status===s.id?'selected':''}>${s.icon} ${s.label}</option>`).join('');
  let list = STATE.savedPlaces.slice();
  if(savedFilter.country) list = list.filter(p=>p.countryId===savedFilter.country);
  if(savedFilter.dest) list = list.filter(p=>p.destinationId===savedFilter.dest);
  if(savedFilter.category) list = list.filter(p=>p.category===savedFilter.category);
  if(savedFilter.status) list = list.filter(p=>p.status===savedFilter.status);
  return `
  <div class="row" style="margin-bottom:10px;"><b>מקומות שמורים ❤️</b><button class="btn small" data-action="addPlace" data-country="${activeCountry}" data-dest="">+ הוספת מקום</button></div>
  <div class="filters-grid">
    <select data-action="setSavedFilter" data-key="country"><option value="">כל המדינות</option>${countryOpts}</select>
    <select data-action="setSavedFilter" data-key="dest">${destOpts}</select>
    <select data-action="setSavedFilter" data-key="category"><option value="">כל הקטגוריות</option>${catOpts}</select>
    <select data-action="setSavedFilter" data-key="status"><option value="">כל הסטטוסים</option>${statusOpts}</select>
  </div>
  ${list.length? list.map(p=>{
    const c=findCountry(p.countryId); const dest=p.destinationId?findDestination(p.countryId,p.destinationId):null; const cat=catInfo(p.category); const st=statusInfo(p.status);
    return `<div class="place-card">
      <div class="row"><b>${cat.icon} ${p.name}</b><span class="stamp ${p.status}">${st.icon} ${st.label}</span></div>
      <div class="muted small" style="margin:3px 0;">${c?c.flag+' '+c.name:''}${dest?(' · '+dest.name):''} · ${cat.label}${p.priority?(' · עדיפות '+p.priority):''}</div>
      ${p.note?`<div class="small">${p.note}</div>`:''}
      <div class="row" style="margin-top:8px;">
        ${p.mapsLink?`<button class="btn ghost small" data-action="openMaps" data-id="${p.id}">פתח ב-Google Maps</button>`:'<span></span>'}
        <div class="place-actions"><button data-action="dup" data-type="place" data-id="${p.id}">⎘</button><button data-action="editPlace" data-country="${p.countryId}" data-dest="${p.destinationId||''}" data-id="${p.id}">✎</button><button data-action="confirmDel" data-type="place" data-id="${p.id}" data-label="${p.name}">✕</button></div>
      </div>
    </div>`;
  }).join('') : `<div class="empty small">אין מקומות שתואמים את הסינון</div>`}
  `;
}
function openModal(html, onOpen){
  document.getElementById('modal').innerHTML = `<div class="modal-handle"></div>${html}`;
  document.getElementById('modal-backdrop').classList.add('open');
  if(onOpen) onOpen();
}
function closeModal(){ document.getElementById('modal-backdrop').classList.remove('open'); }

function openDestinationModal(countryId, lat, lng, editId){
  let c = countryId ? findCountry(countryId) : null;
  let d = null;
  if(editId){ STATE.countries.forEach(co=>{ const f=co.destinations.find(x=>x.id===editId); if(f){ d=f; c=co; } }); }
  if(!c) c = STATE.countries[0];
  const countryOptions = STATE.countries.map(co=>`<option value="${co.id}" ${c&&c.id===co.id?'selected':''}>${co.flag} ${co.name}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${d?'עריכת יעד':'יעד חדש'}</h3>
    <div class="field"><label>מדינה</label><select id="f-country">${countryOptions}</select></div>
    <div class="field"><label>שם היעד</label><input id="f-name" value="${d?d.name:''}"></div>
    <div class="field-row"><div class="field"><label>תאריך הגעה</label><input type="date" id="f-arrival" value="${d?d.arrival:''}"></div><div class="field"><label>תאריך עזיבה</label><input type="date" id="f-departure" value="${d?d.departure:''}"></div></div>
    <div class="field-row">
      <div class="field"><label>סטטוס</label><select id="f-status">
        <option value="planned" ${d&&d.status==='planned'?'selected':''}>מתוכנן</option><option value="booked" ${d&&d.status==='booked'?'selected':''}>הוזמן</option><option value="optional" ${d&&d.status==='optional'?'selected':''}>אופציונלי</option>
      </select></div>
      <div class="field"><label>תקציב משוער (₪)</label><input type="number" id="f-budget" value="${d?d.budget||'':''}"></div>
    </div>
    <div class="field"><label>מי בקטע הזה</label><select id="f-owner">
      <option value="both" ${!d||!d.owner||d.owner==='both'?'selected':''}>ביחד — שנינו</option>
      <option value="itai" ${d&&d.owner==='itai'?'selected':''}>${PEOPLE.itai.emoji} איתי לבד</option>
      <option value="talia" ${d&&d.owner==='talia'?'selected':''}>${PEOPLE.talia.emoji} טליה לבד</option>
    </select></div>
    <div class="field"><label>איך מגיעים</label><input id="f-transport" value="${d?d.transport||'':''}"></div>
    <div class="field"><label>מקום לינה</label><input id="f-accommodation" value="${d?d.accommodation||'':''}"></div>
    <div class="field"><label>הערות</label><textarea id="f-notes">${d?d.notes||'':''}</textarea></div>
    <div class="modal-actions">
      <button class="btn full" id="f-save">שמירה</button>
      ${d?'<button class="btn ghost" id="f-delete">מחיקה</button>':''}
      <button class="btn secondary" id="f-cancel">ביטול</button>
    </div>
  `, ()=>{
    document.getElementById('f-cancel').onclick = closeModal;
    if(d) document.getElementById('f-delete').onclick = ()=> confirmThenDelete(d.name, ()=>{ c.destinations = c.destinations.filter(x=>x.id!==d.id); });
    document.getElementById('f-save').onclick = ()=>{
      const targetCountryId = document.getElementById('f-country').value;
      const targetCountry = findCountry(targetCountryId);
      const arrival = document.getElementById('f-arrival').value;
      const departure = document.getElementById('f-departure').value;
      let nights = null;
      if(arrival && departure){ nights = Math.max(0, Math.round((new Date(departure)-new Date(arrival))/86400000)); }
      const payload = {
        name: document.getElementById('f-name').value || 'יעד ללא שם', arrival, departure, nights,
        status: document.getElementById('f-status').value, budget: document.getElementById('f-budget').value || null,
        transport: document.getElementById('f-transport').value, accommodation: document.getElementById('f-accommodation').value,
        notes: document.getElementById('f-notes').value, owner: document.getElementById('f-owner').value,
        lat: d? d.lat : lat, lng: d? d.lng : lng, companions: d? d.companions : []
      };
      if(d){
        if(targetCountryId!==c.id){ c.destinations = c.destinations.filter(x=>x.id!==d.id); targetCountry.destinations.push({...d, ...payload, order: targetCountry.destinations.length+1}); }
        else { Object.assign(d, payload); }
      } else {
        targetCountry.destinations.push({id:uid('d'), order: targetCountry.destinations.length+1, ...payload});
      }
      persist(); closeModal(); activeCountry = targetCountryId; render();
    };
  });
}

function openTransportModal(countryId, editId){
  const c = findCountry(countryId);
  const f = editId ? c.transport.find(x=>x.id===editId) : null;
  const destOptions = '<option value="">ללא יעד מקושר</option>'+c.destinations.map(d=>`<option value="${d.id}" ${f&&f.destinationId===d.id?'selected':''}>${d.name}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${f?'עריכת מעבר':'מעבר חדש'} — ${c.flag} ${c.name}</h3>
    <div class="field"><label>סוג</label><select id="t-kind">${['טיסה','רכבת','אוטובוס','מעבורת','טרנספר','אחר'].map(k=>`<option ${f&&f.kind===k?'selected':''}>${k}</option>`).join('')}</select></div>
    <div class="field-row"><div class="field"><label>מוצא</label><input id="t-from" value="${f?f.from:''}"></div><div class="field"><label>יעד</label><input id="t-to" value="${f?f.to:''}"></div></div>
    <div class="field"><label>יעד מקושר (למסלול ולתקציב)</label><select id="t-dest">${destOptions}</select></div>
    <div class="field-row"><div class="field"><label>תאריך</label><input type="date" id="t-date" value="${f?f.date:''}"></div><div class="field"><label>שעה</label><input type="time" id="t-time" value="${f?f.time||'':''}"></div></div>
    <div class="field-row"><div class="field"><label>חברה</label><input id="t-carrier" value="${f?f.carrier||'':''}"></div><div class="field"><label>מספר טיסה</label><input id="t-flightnum" value="${f?f.flightNumber||'':''}"></div></div>
    <div class="field-row"><div class="field"><label>מחיר בשקלים (₪) — ישמש לחישוב התקציב</label><input type="number" id="t-price" value="${f?f.price||'':''}"></div><div class="field"><label>כבודה</label><input id="t-luggage" value="${f?f.luggage||'':''}"></div></div>
    <div class="field-row"><div class="field"><label>סכום במטבע מקומי (לא חובה)</label><input type="number" id="t-localamt" value="${f?f.localAmount||'':''}"></div><div class="field"><label>מטבע מקומי</label><input id="t-localcur" value="${f?f.localCurrency||'':''}" placeholder="THB"></div></div>
    <div class="field"><label>סטטוס הזמנה</label><select id="t-status">${['מחפשת','אופציה','הוזמן'].map(s=>`<option ${f&&f.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="field"><label>סטטוס תשלום</label><select id="t-paystatus">${['מתוכנן','הוזמן','שולם'].map(s=>`<option value="${s}" ${f&&f.paymentStatus===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="field"><label>Booking reference</label><input id="t-ref" value="${f?f.bookingRef||'':''}"></div>
    <div class="modal-actions"><button class="btn full" id="t-save">שמירה</button>${f?'<button class="btn ghost" id="t-delete">מחיקה</button>':''}<button class="btn secondary" id="t-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('t-cancel').onclick = closeModal;
    if(f) document.getElementById('t-delete').onclick = ()=> confirmThenDelete(`${f.from} → ${f.to}`, ()=>{ c.transport = c.transport.filter(x=>x.id!==f.id); });
    document.getElementById('t-save').onclick = ()=>{
      const payload = {kind:document.getElementById('t-kind').value, from:document.getElementById('t-from').value, to:document.getElementById('t-to').value,
        destinationId:document.getElementById('t-dest').value||null,
        date:document.getElementById('t-date').value, time:document.getElementById('t-time').value, carrier:document.getElementById('t-carrier').value,
        flightNumber:document.getElementById('t-flightnum').value, price:document.getElementById('t-price').value, luggage:document.getElementById('t-luggage').value,
        localAmount:document.getElementById('t-localamt').value, localCurrency:document.getElementById('t-localcur').value,
        status:document.getElementById('t-status').value, paymentStatus:document.getElementById('t-paystatus').value, bookingRef:document.getElementById('t-ref').value, link:''};
      if(f) Object.assign(f,payload); else c.transport.push({id:uid('f'),...payload});
      persist(); closeModal(); render();
    };
  });
}

function openStayModal(countryId, editId){
  const c = findCountry(countryId);
  const a = editId? c.accommodations.find(x=>x.id===editId) : null;
  const destOptions = '<option value="">ללא יעד מקושר</option>'+c.destinations.map(d=>`<option value="${d.id}" ${a&&a.destinationId===d.id?'selected':''}>${d.name}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${a?'עריכת לינה':'לינה חדשה'} — ${c.flag} ${c.name}</h3>
    <div class="field"><label>שם המקום</label><input id="a-name" value="${a?a.name:''}"></div>
    <div class="field"><label>יעד מקושר (למסלול ולתקציב)</label><select id="a-dest">${destOptions}</select></div>
    <div class="field"><label>מיקום</label><input id="a-location" value="${a?a.location||'':''}"></div>
    <div class="field-row"><div class="field"><label>תאריך check-in</label><input type="date" id="a-checkin" value="${a?a.checkIn||'':''}"></div><div class="field"><label>תיאור תאריכים</label><input id="a-dates" placeholder="לדוגמה 5-10 בינואר" value="${a?a.dates||'':''}"></div></div>
    <div class="field-row"><div class="field"><label>מחיר ללילה (₪)</label><input type="number" id="a-price" value="${a?a.pricePerNight||'':''}"></div><div class="field"><label>מחיר כולל בשקלים (₪) — ישמש לחישוב התקציב</label><input type="number" id="a-total" value="${a?a.priceTotal||'':''}"></div></div>
    <div class="field-row"><div class="field"><label>סכום במטבע מקומי (לא חובה)</label><input type="number" id="a-localamt" value="${a?a.localAmount||'':''}"></div><div class="field"><label>מטבע מקומי</label><input id="a-localcur" value="${a?a.localCurrency||'':''}" placeholder="THB"></div></div>
    <div class="field"><label>סוג חדר</label><input id="a-room" value="${a?a.roomType||'':''}"></div>
    <div class="field"><label>סטטוס הזמנה</label><select id="a-status">${['Saved','Considering','Booked'].map(s=>`<option value="${s}" ${a&&a.status===s?'selected':''}>${s==='Saved'?'♡ שמור':s==='Considering'?'? שוקלת':'✓ הוזמן'}</option>`).join('')}</select></div>
    <div class="field"><label>סטטוס תשלום</label><select id="a-paystatus">${['מתוכנן','הוזמן','שולם'].map(s=>`<option value="${s}" ${a&&a.paymentStatus===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="field"><label>הערות</label><textarea id="a-notes">${a?a.notes||'':''}</textarea></div>
    <div class="modal-actions"><button class="btn full" id="a-save">שמירה</button>${a?'<button class="btn ghost" id="a-delete">מחיקה</button>':''}<button class="btn secondary" id="a-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('a-cancel').onclick = closeModal;
    if(a) document.getElementById('a-delete').onclick = ()=> confirmThenDelete(a.name, ()=>{ c.accommodations = c.accommodations.filter(x=>x.id!==a.id); });
    document.getElementById('a-save').onclick = ()=>{
      const payload = {name:document.getElementById('a-name').value, destinationId:document.getElementById('a-dest').value||null,
        location:document.getElementById('a-location').value, checkIn:document.getElementById('a-checkin').value, dates:document.getElementById('a-dates').value,
        pricePerNight:document.getElementById('a-price').value, priceTotal:document.getElementById('a-total').value, roomType:document.getElementById('a-room').value,
        localAmount:document.getElementById('a-localamt').value, localCurrency:document.getElementById('a-localcur').value,
        status:document.getElementById('a-status').value, paymentStatus:document.getElementById('a-paystatus').value, notes:document.getElementById('a-notes').value, link:'', confirmation:''};
      if(a) Object.assign(a,payload); else c.accommodations.push({id:uid('a'),...payload});
      persist(); closeModal(); render();
    };
  });
}

function openPlaceModal(countryId, destinationId, editId){
  let c = findCountry(countryId) || STATE.countries[0];
  let p = editId ? STATE.savedPlaces.find(x=>x.id===editId) : null;
  if(p){ c = findCountry(p.countryId); }
  const currentDest = p ? p.destinationId : destinationId;
  const countryOptions = STATE.countries.map(co=>`<option value="${co.id}" ${c.id===co.id?'selected':''}>${co.flag} ${co.name}</option>`).join('');
  const destOptions = ()=>{
    const cc = findCountry(document.getElementById('pl-country') ? document.getElementById('pl-country').value : c.id) || c;
    return '<option value="">ללא יעד ספציפי</option>' + cc.destinations.map(d=>`<option value="${d.id}" ${currentDest===d.id?'selected':''}>${d.name}</option>`).join('');
  };
  const catOptions = CATEGORIES.map(cat=>`<option value="${cat.id}" ${p&&p.category===cat.id?'selected':''}>${cat.icon} ${cat.label}</option>`).join('');
  const statusOptions = STATUS_OPTIONS.map(s=>`<option value="${s.id}" ${p&&p.status===s.id?'selected':''}>${s.icon} ${s.label}</option>`).join('');
  const priorityOptions = PRIORITY_OPTIONS.map(pr=>`<option value="${pr}" ${p&&p.priority===pr?'selected':''}>${pr}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${p?'עריכת מקום':'מקום חדש'}</h3>
    <div class="field"><label>קישור Google Maps</label><input id="pl-link" placeholder="הדביקי כאן לינק מ-Google Maps (Share → Copy link)" value="${p?p.mapsLink||'':''}"><div class="field-hint" id="pl-hint">הדבקה תנסה לזהות שם ומיקום אוטומטית — אם לא הצליח, פשוט מלאי ידנית למטה.</div></div>
    <div class="field-row"><div class="field"><label>מדינה</label><select id="pl-country">${countryOptions}</select></div><div class="field"><label>יעד / עיר</label><select id="pl-dest">${destOptions()}</select></div></div>
    <div class="field"><label>שם המקום</label><input id="pl-name" value="${p?p.name:''}"></div>
    <div class="field-row"><div class="field"><label>קטגוריה</label><select id="pl-category">${catOptions}</select></div><div class="field"><label>עדיפות</label><select id="pl-priority">${priorityOptions}</select></div></div>
    <div class="field"><label>סטטוס</label><select id="pl-status">${statusOptions}</select></div>
    <div class="field"><label>הערה אישית</label><textarea id="pl-note">${p?p.note||'':''}</textarea></div>
    <div class="field-row"><div class="field"><label>קו רוחב (lat)</label><input id="pl-lat" type="number" step="any" value="${p&&p.lat!=null?p.lat:''}"></div><div class="field"><label>קו אורך (lng)</label><input id="pl-lng" type="number" step="any" value="${p&&p.lng!=null?p.lng:''}"></div></div>
    <div class="modal-actions"><button class="btn full" id="pl-save">שמירה</button>${p?'<button class="btn ghost" id="pl-delete">מחיקה</button>':''}<button class="btn secondary" id="pl-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('pl-cancel').onclick = closeModal;
    document.getElementById('pl-country').onchange = ()=>{ document.getElementById('pl-dest').innerHTML = destOptions(); };
    document.getElementById('pl-link').addEventListener('blur', ()=>{
      const url = document.getElementById('pl-link').value.trim(); if(!url) return;
      const info = extractMapsInfo(url);
      if(info.lat && info.lng){ document.getElementById('pl-lat').value=info.lat; document.getElementById('pl-lng').value=info.lng; document.getElementById('pl-hint').textContent='זוהו קואורדינטות מהקישור ✓'; }
      else { document.getElementById('pl-hint').textContent='לא הצלחתי לזהות קואורדינטות מהקישור הזה (נפוץ בקישורים מקוצרים) — הלינק נשמר בכל זאת, אפשר למלא שם/קטגוריה ידנית.'; }
      if(info.nameGuess && !document.getElementById('pl-name').value){ document.getElementById('pl-name').value = info.nameGuess; }
    });
    if(p) document.getElementById('pl-delete').onclick = ()=> confirmThenDelete(p.name, ()=>{ STATE.savedPlaces = STATE.savedPlaces.filter(x=>x.id!==p.id); });
    document.getElementById('pl-save').onclick = ()=>{
      const payload = {countryId:document.getElementById('pl-country').value, destinationId:document.getElementById('pl-dest').value||null,
        name:document.getElementById('pl-name').value||'מקום ללא שם', category:document.getElementById('pl-category').value,
        priority:document.getElementById('pl-priority').value, status:document.getElementById('pl-status').value, note:document.getElementById('pl-note').value,
        mapsLink:document.getElementById('pl-link').value, lat:document.getElementById('pl-lat').value?parseFloat(document.getElementById('pl-lat').value):null,
        lng:document.getElementById('pl-lng').value?parseFloat(document.getElementById('pl-lng').value):null};
      if(p) Object.assign(p,payload); else STATE.savedPlaces.push({id:uid('sp'), ...payload});
      persist(); closeModal(); render();
    };
  });
}

function openTaskModal(kind, countryId, editId){
  let arr, item=null, c=null;
  if(kind==='master'){ arr = STATE.masterChecklist; item = editId? arr.find(x=>x.id===editId) : null; }
  else { c = findCountry(countryId); arr = c.prepChecklist; item = editId? arr.find(x=>x.id===editId) : null; }
  const countryOptions = kind==='master' ? ('<option value="">ללא מדינה ספציפית</option>'+STATE.countries.map(co=>`<option value="${co.id}" ${item&&item.countryId===co.id?'selected':''}>${co.flag} ${co.name}</option>`).join('')) : '';
  const expCatOptions = '<option value="">ללא הוצאה</option>'+EXPENSE_CATEGORIES.map(ec=>`<option value="${ec.id}" ${item&&item.expenseCategory===ec.id?'selected':''}>${ec.label}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${item?'עריכת משימה':'משימה חדשה'}</h3>
    ${kind==='master'?`<div class="field"><label>קטגוריה</label><input id="tk-category" value="${item?item.category||'':''}" placeholder="לדוגמה: דרכון"></div>
    <div class="field"><label>מדינה רלוונטית</label><select id="tk-country">${countryOptions}</select></div>`:''}
    <div class="field"><label>שם המשימה</label><input id="tk-title" value="${item?item.title:''}"></div>
    <div class="field-row"><div class="field"><label>דדליין</label><input type="date" id="tk-deadline" value="${item?item.deadline||'':''}"></div>
    <div class="field"><label>סטטוס</label><select id="tk-status"><option value="todo" ${item&&item.status==='todo'?'selected':''}>To Do</option><option value="progress" ${item&&item.status==='progress'?'selected':''}>In Progress</option><option value="done" ${item&&item.status==='done'?'selected':''}>Done</option></select></div></div>
    <div class="field"><label>עדיפות</label><select id="tk-priority"><option value="">—</option>${PRIORITY_OPTIONS.map(p=>`<option value="${p}" ${item&&item.priority===p?'selected':''}>${p}</option>`).join('')}</select></div>
    <div class="field"><label>הערות</label><textarea id="tk-notes">${item?item.notes||'':''}</textarea></div>
    <div class="field"><label>לינק רלוונטי</label><input id="tk-link" value="${item?item.link||'':''}" placeholder="https://..."></div>
    <div class="field-row"><div class="field"><label>עלות בשקלים (₪) — אם יש (לדוגמה אגרת ויזה)</label><input type="number" id="tk-cost" value="${item?item.cost||'':''}"></div><div class="field"><label>קטגוריית הוצאה</label><select id="tk-expcat">${expCatOptions}</select></div></div>
    <div class="field"><label>סטטוס תשלום</label><select id="tk-paystatus">${['מתוכנן','הוזמן','שולם'].map(s=>`<option value="${s}" ${item&&item.paymentStatus===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="modal-actions"><button class="btn full" id="tk-save">שמירה</button>${item?'<button class="btn ghost" id="tk-delete">מחיקה</button>':''}<button class="btn secondary" id="tk-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('tk-cancel').onclick = closeModal;
    if(item) document.getElementById('tk-delete').onclick = ()=> confirmThenDelete(item.title, ()=>{ if(kind==='master'){ STATE.masterChecklist = STATE.masterChecklist.filter(x=>x.id!==item.id); } else { c.prepChecklist = c.prepChecklist.filter(x=>x.id!==item.id); } });
    document.getElementById('tk-save').onclick = ()=>{
      const payload = {title:document.getElementById('tk-title').value||'משימה חדשה', deadline:document.getElementById('tk-deadline').value,
        status:document.getElementById('tk-status').value, priority:document.getElementById('tk-priority').value,
        notes:document.getElementById('tk-notes').value, link:document.getElementById('tk-link').value,
        cost:document.getElementById('tk-cost').value, expenseCategory:document.getElementById('tk-expcat').value, paymentStatus:document.getElementById('tk-paystatus').value};
      if(kind==='master'){ payload.category = document.getElementById('tk-category').value||'כללי'; payload.countryId = document.getElementById('tk-country').value||null; }
      if(item) Object.assign(item,payload);
      else if(kind==='master') STATE.masterChecklist.push({id:uid('m'), owner:meId(), order:STATE.masterChecklist.length+1, ...payload});
      else c.prepChecklist.push({id:uid('t'), order:c.prepChecklist.length+1, ...payload});
      persist(); closeModal(); render();
    };
  });
}

function openPackingModal(editId, opts){
  const p = editId ? STATE.packingList.find(x=>x.id===editId) : null;
  const shopping = (opts && opts.shopping) || (p && !!p.buyIn);
  const buyIn = p ? (p.buyIn||'') : (shopping ? 'il' : '');
  openModal(`
    <h3 style="margin-bottom:14px;">${p?'עריכת פריט':(shopping?'מה עוד צריך לקנות':'פריט חדש לציוד')}</h3>
    <div class="field"><label>קטגוריה (אפשר להקליד קטגוריה חדשה)</label><input id="pk-category" value="${p?p.category:''}" placeholder="לדוגמה: 👕 בגדים"></div>
    <div class="field"><label>שם הפריט</label><input id="pk-item" value="${p?p.item:''}"></div>
    <div class="field-row"><div class="field"><label>כמות</label><input id="pk-qty" value="${p?p.quantity||'':''}" placeholder="לדוגמה: 2"></div>
    <div class="field"><label>סטטוס</label><select id="pk-status"><option value="need" ${!p||p.status==='need'?'selected':''}>לקנות</option><option value="have" ${p&&p.status==='have'?'selected':''}>יש כבר</option><option value="packed" ${p&&p.status==='packed'?'selected':''}>ארוז</option></select></div></div>
    <div class="field-row">
      <div class="field"><label>איפה קונים</label><select id="pk-where">
        <option value="" ${!buyIn?'selected':''}>לא קנייה — כבר יש</option>
        <option value="il" ${buyIn==='il'?'selected':''}>🇮🇱 בארץ</option>
        <option value="th" ${buyIn==='th'?'selected':''}>🇹🇭 בתאילנד</option>
      </select></div>
      <div class="field"><label>מחיר משוער</label><input id="pk-cost" type="number" inputmode="decimal" min="0" value="${p&&p.cost?p.cost:''}" placeholder="₪ בארץ · ฿ שם"></div>
    </div>
    <div class="field"><label class="row"><span>נחמד שיהיה — לא נספר בסכום</span>
      <input id="pk-optional" type="checkbox" ${p&&p.optional?'checked':''}></label></div>
    <div class="field"><label>הערות</label><textarea id="pk-notes">${p?p.notes||'':''}</textarea></div>
    <div class="modal-actions"><button class="btn full" id="pk-save">שמירה</button>${p?'<button class="btn ghost" id="pk-delete">מחיקה</button>':''}<button class="btn secondary" id="pk-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('pk-cancel').onclick = closeModal;
    if(p) document.getElementById('pk-delete').onclick = ()=> confirmThenDelete(p.item, ()=>{ STATE.packingList = STATE.packingList.filter(x=>x.id!==p.id); });
    document.getElementById('pk-save').onclick = ()=>{
      const where = document.getElementById('pk-where').value;
      const payload = {category:document.getElementById('pk-category').value||'כללי', item:document.getElementById('pk-item').value||'פריט',
        quantity:document.getElementById('pk-qty').value, status:document.getElementById('pk-status').value, notes:document.getElementById('pk-notes').value,
        buyIn:where, cost: where ? (Number(document.getElementById('pk-cost').value)||0) : 0,
        optional: where ? document.getElementById('pk-optional').checked : false};
      if(p) Object.assign(p,payload); else STATE.packingList.push({id:uid('p'), owner:meId(), ...payload});
      persist(); closeModal(); render();
    };
  });
}

/** קטגוריה בגיליון → קטגוריית הוצאה באפליקציה */
function catFromSheet(cat){
  const map = {'לינה':'accommodation','אוכל':'food','תחבורה':'transport','אטרקציות':'activities','אחר':'other'};
  return map[cat] || 'other';
}

/** הוצאה חדשה או עריכה — כולל מי שילם ואיך מתחלק */
function openExpenseModal(editId, preset){
  const x = editId ? wallet().expenses.find(e=>e.id===editId) : null;
  const p = preset || {};
  const val = (key, fallback)=> x ? (x[key]!=null?x[key]:'') : (p[key]!=null?p[key]:(fallback!==undefined?fallback:''));
  const d = wallet().defaultSplit;
  const splitValue = x ? x.split : 'ratio';
  const cats = EXPENSE_CATEGORIES.map(c=>
    `<option value="${c.id}" ${val('category','other')===c.id?'selected':''}>${c.label}</option>`).join('');

  openModal(`
    <h3 style="margin-bottom:14px;">${x?'עריכת הוצאה':'הוצאה חדשה'}</h3>
    <div class="field"><label>על מה</label><input id="ex-title" value="${escapeAttr(val('title'))}" placeholder="ארוחת ערב ביאווארט"></div>
    <div class="field-row">
      <div class="field"><label>סכום</label><input id="ex-amount" type="number" inputmode="decimal" value="${val('amount')}"></div>
      <div class="field"><label>מטבע</label><select id="ex-currency">
        <option value="ILS" ${val('currency','ILS')==='ILS'?'selected':''}>₪ שקל</option>
        <option value="THB" ${val('currency')==='THB'?'selected':''}>฿ באט</option>
      </select></div>
    </div>
    <div class="field-row">
      <div class="field"><label>תאריך</label><input id="ex-date" type="date" value="${val('date', localToday())}"></div>
      <div class="field"><label>קטגוריה</label><select id="ex-category">${cats}</select></div>
    </div>
    <div class="field"><label>מי שילם</label><div class="choice-row" id="ex-paid">
      ${['itai','talia'].map(pid=>`
        <button type="button" class="choice ${val('paidBy', meId())===pid?'active':''}" data-value="${pid}">
          ${PEOPLE[pid].emoji} ${PEOPLE[pid].name}
        </button>`).join('')}
    </div></div>
    <div class="field"><label>איך מתחלק</label><div class="choice-col" id="ex-split">
      <button type="button" class="choice ${splitValue==='ratio'?'active':''}" data-value="ratio">
        לפי היחס הקבוע · ${Math.round(d.itai*100)}% איתי / ${Math.round(d.talia*100)}% טליה
      </button>
      <button type="button" class="choice ${splitValue==='equal'?'active':''}" data-value="equal">חצי-חצי</button>
      <button type="button" class="choice ${splitValue==='full-itai'?'active':''}" data-value="full-itai">הכל על איתי</button>
      <button type="button" class="choice ${splitValue==='full-talia'?'active':''}" data-value="full-talia">הכל על טליה</button>
    </div></div>
    <div class="field"><label>מצב תשלום</label><div class="choice-row" id="ex-status">
      <button type="button" class="choice ${val('status','paid')!=='due'?'active':''}" data-value="paid">כבר שולם</button>
      <button type="button" class="choice ${val('status')==='due'?'active':''}" data-value="due">טרם שולם</button>
    </div></div>
    <div class="field"><label>הערה</label><input id="ex-note" value="${escapeAttr(val('note'))}"></div>
    <div id="ex-preview" class="split-preview"></div>
    <div class="modal-actions">
      <button class="btn full" id="ex-save">שמירה</button>
      ${x?'<button class="btn ghost" id="ex-delete">מחיקה</button>':''}
      <button class="btn secondary" id="ex-cancel">ביטול</button>
    </div>
  `, ()=>{
    let paidBy = val('paidBy', meId());
    let split = splitValue;
    let status = val('status','paid') === 'due' ? 'due' : 'paid';

    function chooser(containerId, onPick){
      const box = document.getElementById(containerId);
      box.querySelectorAll('.choice').forEach(btn=>{
        btn.onclick = ()=>{
          box.querySelectorAll('.choice').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          onPick(btn.dataset.value);
          preview();
        };
      });
    }
    function preview(){
      const amount = Number(document.getElementById('ex-amount').value)||0;
      const currency = document.getElementById('ex-currency').value;
      const shares = splitShares({amount, currency, split});
      document.getElementById('ex-preview').innerHTML = amount
        ? `<div>${PEOPLE.itai.name}: <b>${ils(shares.itai)}</b></div>
           <div>${PEOPLE.talia.name}: <b>${ils(shares.talia)}</b></div>`
        : '';
    }
    chooser('ex-paid', v=>paidBy=v);
    chooser('ex-split', v=>split=v);
    chooser('ex-status', v=>status=v);
    document.getElementById('ex-amount').oninput = preview;
    document.getElementById('ex-currency').onchange = preview;
    preview();

    document.getElementById('ex-cancel').onclick = closeModal;
    if(x) document.getElementById('ex-delete').onclick = ()=> confirmThenDelete(x.title, ()=>{
      wallet().expenses = wallet().expenses.filter(e=>e.id!==x.id);
    });
    document.getElementById('ex-save').onclick = ()=>{
      const payload = {
        title: document.getElementById('ex-title').value || 'הוצאה',
        amount: Number(document.getElementById('ex-amount').value)||0,
        currency: document.getElementById('ex-currency').value,
        date: document.getElementById('ex-date').value,
        category: document.getElementById('ex-category').value,
        note: document.getElementById('ex-note').value,
        paidBy, split, status
      };
      if(x) Object.assign(x, payload);
      else wallet().expenses.push({id:uid('x'), ...payload});
      persist(); closeModal(); render();
    };
  });
}

/** סגירת חשבון — מי מעביר למי, וכמה */
function openSettleModal(){
  const b = balance();
  const net = b.net;
  const from = net > 0 ? 'talia' : 'itai';   // נטו חיובי = טליה חייבת לאיתי
  const to   = net > 0 ? 'itai' : 'talia';
  const amount = Math.abs(net);
  openModal(`
    <h3 style="margin-bottom:10px;">לסגור חשבון</h3>
    <div class="small" style="margin-bottom:16px;">
      ${personName(from)} מעביר/ה ל${personName(to)} <b>${ils(amount)}</b>, והחשבון מתאפס.
    </div>
    <div class="field"><label>סכום בפועל (₪)</label><input id="st-amount" type="number" value="${Math.round(amount)}"></div>
    <div class="field"><label>תאריך</label><input id="st-date" type="date" value="${localToday()}"></div>
    <div class="modal-actions">
      <button class="btn full" id="st-save">נסגר ✓</button>
      <button class="btn secondary" id="st-cancel">ביטול</button>
    </div>
  `, ()=>{
    document.getElementById('st-cancel').onclick = closeModal;
    document.getElementById('st-save').onclick = ()=>{
      const value = Number(document.getElementById('st-amount').value)||0;
      if(value > 0){
        wallet().settlements = wallet().settlements || [];
        wallet().settlements.push({
          id: uid('s'), from, to, amount: value,
          date: document.getElementById('st-date').value
        });
      }
      persist(); closeModal(); render();
    };
  });
}

function openSharedRowModal(dayId, rowId){
  const day = sh().days.find(d=>d.id===dayId);
  const r = day && day.rows.find(x=>x.id===rowId);
  if(!r) return;
  const statuses = Object.keys(SHARED_STATUS_CLASS);
  const currentPrice = sharedRowPrice(r);
  openModal(`
    <h3 style="margin-bottom:14px;">עריכת שורה · יום ${day.day}</h3>
    <div class="field"><label>מה</label><input id="sr-act" value="${escapeAttr(r.act)}"></div>
    <div class="field"><label>שעה</label><input id="sr-time" value="${escapeAttr(r.time||'')}" placeholder="09:30"></div>
    <div class="field"><label>מיקום</label><input id="sr-loc" value="${escapeAttr(r.loc||'')}"></div>
    <div class="field"><label>אומדן מחיר בשקלים (₪)</label><input id="sr-baht" type="number" min="0" step="0.01" inputmode="decimal" value="${currentPrice.base.toFixed(2)}"></div>
    <div class="small muted">${escapeHtml(r.priceEstimate?.basis||'אומדן תכנון')} שינוי המחיר כאן מעדכן את האומדן בלבד.</div>
    <div class="field"><label><input id="sr-include" type="checkbox" ${!optionalPrice(r)?'checked':''}> לכלול באומדן הראשי</label></div>
    <div class="field"><label>סטטוס</label><select id="sr-status">
      ${statuses.map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s}</option>`).join('')}
    </select></div>
    <div class="field"><label>הערות</label><textarea id="sr-notes">${escapeHtml(r.notes||'')}</textarea></div>
    <div class="modal-actions">
      <button class="btn full" id="sr-save">שמירה</button>
      <button class="btn secondary" id="sr-cancel">ביטול</button>
    </div>
  `, ()=>{
    document.getElementById('sr-cancel').onclick = closeModal;
    document.getElementById('sr-save').onclick = ()=>{
      const bahtValue = document.getElementById('sr-baht').value;
      const nextPrice=Number(bahtValue);
      if(bahtValue==='' || !Number.isFinite(nextPrice) || nextPrice<0){toast('יש להזין סכום תקין בשקלים');return;}
      r.act = document.getElementById('sr-act').value || r.act;
      r.time = document.getElementById('sr-time').value;
      r.loc = document.getElementById('sr-loc').value;
      if(Math.abs(nextPrice-currentPrice.base)>0.011){
        r.priceEstimate={...(r.priceEstimate||{}),kind:'custom',fixedIls:nextPrice,lowFactor:1,highFactor:1,basis:'אומדן שנערך ידנית בשקלים',sourceUrl:''};
        r.baht=nextPrice/rate();
      }
      r.status = document.getElementById('sr-status').value;
      const include=document.getElementById('sr-include').checked;
      r.priceEstimate={...(r.priceEstimate||{}),optional:!include};
      if(include && r.status==='אופציונלי') r.status='משלמים במקום';
      r.notes = document.getElementById('sr-notes').value;
      persist(); closeModal(); render();
    };
  });
}

function openSharedBudgetModal(){
  const s = sh();
  openModal(`
    <h3 style="margin-bottom:14px;">התקציב המשותף</h3>
    <div class="field"><label>שער המרה · באט אחד בשקלים</label><input id="sb-rate" type="number" min="0.00001" step="0.00001" value="${rate()}"></div>
    <div class="field"><label>רזרבה (₪)</label><input id="sb-reserve" type="number" min="0" step="0.01" value="${(Math.max(0,Number(s.reserveBaht)||0)*rate()).toFixed(2)}"></div>
    <div class="field"><label>התקציב של איתי (₪)</label><input id="sb-bi" type="number" value="${s.budgetItai}"></div>
    <div class="field"><label>התקציב של טליה (₪)</label><input id="sb-bt" type="number" value="${s.budgetTalia}"></div>
    <div class="field"><label>חלקו של איתי בהוצאות המשותפות (0–1)</label><input id="sb-si" type="number" step="0.0001" value="${s.splitItai}"></div>
    <div class="modal-actions">
      <button class="btn full" id="sb-save">שמירה</button>
      <button class="btn secondary" id="sb-cancel">ביטול</button>
    </div>
  `, ()=>{
    document.getElementById('sb-cancel').onclick = closeModal;
    document.getElementById('sb-save').onclick = ()=>{
      const newRate=Number(document.getElementById('sb-rate').value),reserveIls=Number(document.getElementById('sb-reserve').value);
      if(!Number.isFinite(newRate)||newRate<=0||!Number.isFinite(reserveIls)||reserveIls<0){toast('יש להזין שער ורזרבה תקינים');return;}
      if(newRate !== s.rate) wallet().rateChecked = localToday();   // נבדק היום
      s.rate = newRate;
      wallet().rate=newRate;
      s.reserveBaht = reserveIls/newRate;
      s.budgetItai = Number(document.getElementById('sb-bi').value) || 0;
      s.budgetTalia = Number(document.getElementById('sb-bt').value) || 0;
      const split = Number(document.getElementById('sb-si').value);
      if(split > 0 && split < 1){ s.splitItai = split; s.splitTalia = 1 - split; }
      wallet().budgets={itai:s.budgetItai,talia:s.budgetTalia};
      wallet().defaultSplit={itai:s.splitItai,talia:s.splitTalia};
      persist(); closeModal(); render();
    };
  });
}

function escapeHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttr(str){
  return escapeHtml(str).replace(/"/g,'&quot;');
}

function openCountryModal(editId){
  const c = editId ? findCountry(editId) : null;
  let selectedColor = c ? c.color : COLOR_CHOICES[STATE.countries.length % COLOR_CHOICES.length];
  openModal(`
    <h3 style="margin-bottom:14px;">${c?'עריכת מדינה':'מדינה חדשה'}</h3>
    <div class="field"><label>שם המדינה</label><input id="co-name" value="${c?c.name:''}"></div>
    <div class="field"><label>דגל (אימוג'י)</label><input id="co-flag" value="${c?c.flag:''}" placeholder="🇹🇭"></div>
    <div class="field"><label>צבע</label><div class="color-swatches" id="co-swatches">${COLOR_CHOICES.map(hex=>`<div class="color-swatch ${getCssVar(selectedColor)===hex?'selected':''}" style="background:${hex};" data-hex="${hex}"></div>`).join('')}</div></div>
    <div class="field"><label>מטבע</label><input id="co-currency" value="${c?c.currency||'':''}" placeholder="THB"></div>
    <div class="field"><label>הערות</label><textarea id="co-notes">${c?c.notes||'':''}</textarea></div>
    <div class="modal-actions"><button class="btn full" id="co-save">שמירה</button>${c?'<button class="btn ghost" id="co-delete">מחיקת מדינה</button>':''}<button class="btn secondary" id="co-cancel">ביטול</button></div>
  `, ()=>{
    let chosenColor = selectedColor.startsWith('var(')? getCssVar(selectedColor) : selectedColor;
    document.getElementById('co-swatches').querySelectorAll('.color-swatch').forEach(sw=>{
      sw.onclick = ()=>{ document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected')); sw.classList.add('selected'); chosenColor = sw.dataset.hex; };
    });
    document.getElementById('co-cancel').onclick = closeModal;
    if(c) document.getElementById('co-delete').onclick = ()=> confirmThenDelete(c.name+' (כל היעדים, המשימות וההוצאות שלה יימחקו)', ()=>{
      STATE.countries = STATE.countries.filter(x=>x.id!==c.id);
      STATE.savedPlaces = STATE.savedPlaces.filter(x=>x.countryId!==c.id);
      STATE.expenses = STATE.expenses.filter(x=>x.countryId!==c.id);
      if(activeCountry===c.id && STATE.countries[0]) activeCountry = STATE.countries[0].id;
    });
    document.getElementById('co-save').onclick = ()=>{
      const payload = {name:document.getElementById('co-name').value||'מדינה חדשה', flag:document.getElementById('co-flag').value||'🌍',
        color:chosenColor, currency:document.getElementById('co-currency').value, notes:document.getElementById('co-notes').value};
      if(c){ Object.assign(c,payload); }
      else {
        const newC = {id:uid('country'), order:STATE.countries.length+1, destinations:[], prepChecklist:[], transport:[], accommodations:[], budget:defaultBudget(), ...payload};
        STATE.countries.push(newC); activeCountry = newC.id;
      }
      persist(); closeModal(); render();
    };
  });
}

/* =========================================================
   EVENT DELEGATION
========================================================= */
document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-action]');
  if(!t) return;
  const action = t.dataset.action;
  const id = t.dataset.id;
  const country = t.dataset.country;

  if(action==='setTab'){ activeTab=id; render(); window.scrollTo(0,0); }
  else if(action==='moneySection'){ moneySection=id; render(); }
  else if(action==='editForecastRow'){ openSharedRowModal(t.dataset.day,id); }
  else if(action==='moneyCategory'){ moneyCategory=id; render(); }
  else if(action==='moneyPayment'){ moneyPayment=id; render(); }
  else if(action==='toggleDest'){
    expandedDest[id] = !expandedDest[id];
    render();
  }
  else if(action==='dayStep'){ stepDay(Number(id)); }
  else if(action==='jumpToDay'){ todayIndex = Number(id); activeTab='today'; render(); window.scrollTo(0,0); }
  else if(action==='dayJump'){ todayIndex = Number(id); buzz(8); render(); }
  else if(action==='toggleRow'){ expandedRow[id] = !expandedRow[id]; render(); }
  else if(action==='toggleDay'){
    expandedDays[id] = !expandedDays[id];
    render();
  }
  else if(action==='openTalk'){ expandedRow['talk_'+id] = !expandedRow['talk_'+id]; render(); }
  else if(action==='addNote'){ addRowNote(t.dataset.day, id); }
  else if(action==='delNote'){ deleteRowNote(t.dataset.day, id, t.dataset.note); }
  else if(action==='tapRow'){
    // כל הכרטיס הוא כפתור — חוץ מקישורים וכפתורים שבתוכו
    if(e.target.closest('a,button,input')) return;
    toggleRowDone(t.dataset.day, id, t);
  }
  else if(action==='expandAllRows' || action==='collapseAllRows'){
    const day = myDays()[currentDayIndex()];
    const open = action==='expandAllRows';
    day.rows.forEach(r=>{ expandedRow['t_'+r.id] = open; });
    expandedRow.extra = open;
    render();
  }
  else if(action==='expandRow'){
    expandedRow['t_'+id] = !expandedRow['t_'+id];
    render();
    const el = document.getElementById('trow-'+id);
    if(el && expandedRow['t_'+id]) el.scrollIntoView({block:'nearest', behavior:'smooth'});
  }
  else if(action==='toggleSharedRow'){
    toggleRowDone(t.dataset.day, id, t.closest('.tcard,.irow,.trow'));
  }
  else if(action==='editSharedRow'){ openSharedRowModal(t.dataset.day, id); }
  else if(action==='expenseFromRow'){
    const day = sh().days.find(d=>d.id===t.dataset.day);
    const row = day && day.rows.find(r=>r.id===id);
    if(row) openExpenseModal(null, {title:row.act, amount:row.baht, currency:'THB', date:day.date, category:catFromSheet(row.cat)});
  }
  else if(action==='uploadFile'){ pickAndUploadFile(); }
  else if(action==='deleteFile'){ deleteFile(id, t.dataset.label); }
  else if(action==='markPaid'){
    const x = wallet().expenses.find(e=>e.id===id);
    if(x){ x.status = 'paid'; persist(); render(); toast('נרשם כשולם'); }
  }
  else if(action==='settleUp'){ openSettleModal(); }
  else if(action==='editBudgets'){ openSharedBudgetModal(); }
  else if(action==='logout'){ logout(); }
  else if(action==='setCountry'){ activeCountry=id; render(); }
  else if(action==='setCSection'){ activeCountrySection=id; render(); }
  else if(action==='setMore'){ moreSection=id; render(); }
  else if(action==='setMapFilter'){ mapFilter=id; drawMapMarkers(); render(); }
  else if(action==='addCountry'){ openCountryModal(null); }
  else if(action==='editCountry'){ openCountryModal(id); }

  else if(action==='cyclePrep'){ const c=findCountry(country); const item=c.prepChecklist.find(x=>x.id===id); item.status=cycleStatus(item.status); persist(); render(); }
  else if(action==='editPrep'){ openTaskModal('prep', country, id); }
  else if(action==='addPrepItem'){ openTaskModal('prep', id, null); }

  else if(action==='addDest'){ openDestinationModal(id); }
  else if(action==='editDest'){ openDestinationModal(country, null, null, id); }

  else if(action==='addTransport'){ openTransportModal(id); }
  else if(action==='editTransport'){ openTransportModal(country, id); }

  else if(action==='addStay'){ openStayModal(id); }
  else if(action==='editStay'){ openStayModal(country, id); }

  else if(action==='addPlace'){ openPlaceModal(country, t.dataset.dest||null); }
  else if(action==='editPlace'){ openPlaceModal(country, t.dataset.dest||null, id); }
  else if(action==='openMaps'){ const p=STATE.savedPlaces.find(x=>x.id===id); if(p&&p.mapsLink) window.open(p.mapsLink,'_blank'); }
  else if(action==='toggleCat'){ expandedCats[t.dataset.key] = !expandedCats[t.dataset.key]; render(); }

  else if(action==='cycleMaster'){ const item=STATE.masterChecklist.find(x=>x.id===id); item.status=cycleStatus(item.status); persist(); render(); }
  else if(action==='editMaster'){ openTaskModal('master', null, id); }
  else if(action==='addMaster'){ openTaskModal('master', null, null); }

  else if(action==='editPacking'){ openPackingModal(id); }
  else if(action==='addPacking'){ openPackingModal(null); }
  else if(action==='buyItem'){ markBought(id); }
  else if(action==='unbuyItem'){
    const p = STATE.packingList.find(x=>x.id===id);
    if(p){ p.status = 'need'; delete p.paid; buzz(); persist(); render(); }
  }
  else if(action==='toggleBought'){ shopBoughtOpen[id] = !shopBoughtOpen[id]; render(); }
  else if(action==='shopFilter'){ shopFilter = id; render(); }
  else if(action==='editPrice'){ startPriceEdit(t, id); }
  else if(action==='addShopping'){ openPackingModal(null, {shopping:true}); }

  else if(action==='revealDoc'){ const d=STATE.documents.find(x=>x.id===id); d.revealed=!d.revealed; render(); }
  else if(action==='addDoc'){
    openModal(`<h3 style="margin-bottom:14px;">מסמך חדש</h3>
      <div class="field"><label>שם המסמך</label><input id="dc-name"></div>
      <div class="field"><label>קטגוריה</label><input id="dc-category"></div>
      <div class="modal-actions"><button class="btn full" id="dc-save">הוספה</button><button class="btn secondary" id="dc-cancel">ביטול</button></div>`,
      ()=>{ document.getElementById('dc-cancel').onclick=closeModal;
        document.getElementById('dc-save').onclick=()=>{ STATE.documents.push({id:uid('doc'), name:document.getElementById('dc-name').value||'מסמך', category:document.getElementById('dc-category').value||'כללי', sensitive:true, notes:''}); persist(); closeModal(); render(); }; });
  }

  else if(action==='addExpense'){ openExpenseModal(null, country); }
  else if(action==='editExpense'){ openExpenseModal(id); }
  else if(action==='editExpenseRow'){ routeEditExpenseRow(t.dataset.source, t.dataset.country, t.dataset.sourceid); }
  else if(action==='confirmDelExpenseRow'){
    const source=t.dataset.source, sid=t.dataset.sourceid, cid=t.dataset.country, label=t.dataset.label||'';
    confirmThenDelete(label, ()=>{
      if(source==='manual'){ STATE.expenses = STATE.expenses.filter(x=>x.id!==sid); }
      else if(source==='transport'){ const c=findCountry(cid); const f=c&&c.transport.find(x=>x.id===sid); if(f){ f.price=''; f.localAmount=''; } }
      else if(source==='stay'){ const c=findCountry(cid); const a=c&&c.accommodations.find(x=>x.id===sid); if(a){ a.priceTotal=''; } }
      else if(source==='prepTask'){ const c=findCountry(cid); const tk=c&&c.prepChecklist.find(x=>x.id===sid); if(tk) tk.cost=''; }
      else if(source==='masterTask'){ const tk=STATE.masterChecklist.find(x=>x.id===sid); if(tk) tk.cost=''; }
    });
  }

  else if(action==='dup'){
    const type = t.dataset.type;
    if(type==='dest'){ const c=findCountry(country); const item=c.destinations.find(x=>x.id===id); c.destinations.push({...item, id:uid('d'), name:item.name+' (עותק)', order:c.destinations.length+1}); }
    else if(type==='transport'){ const c=findCountry(country); const item=c.transport.find(x=>x.id===id); c.transport.push({...item, id:uid('f')}); }
    else if(type==='stay'){ const c=findCountry(country); const item=c.accommodations.find(x=>x.id===id); c.accommodations.push({...item, id:uid('a'), name:item.name+' (עותק)'}); }
    else if(type==='place'){ const item=STATE.savedPlaces.find(x=>x.id===id); STATE.savedPlaces.push({...item, id:uid('sp')}); }
    else if(type==='prep'){ const c=findCountry(country); const item=c.prepChecklist.find(x=>x.id===id); c.prepChecklist.push({...item, id:uid('t'), order:c.prepChecklist.length+1}); }
    else if(type==='master'){ const item=STATE.masterChecklist.find(x=>x.id===id); STATE.masterChecklist.push({...item, id:uid('m'), order:STATE.masterChecklist.length+1}); }
    else if(type==='packing'){ const item=STATE.packingList.find(x=>x.id===id); STATE.packingList.push({...item, id:uid('p')}); }
    else if(type==='expense'){ const item=STATE.expenses.find(x=>x.id===id); STATE.expenses.push({...item, id:uid('exp')}); }
    persist(); render();
  }

  else if(action==='reorder'){
    const type = t.dataset.type; const dir = parseInt(t.dataset.dir);
    let list = null;
    if(type==='dest') list = findCountry(country).destinations;
    else if(type==='prep') list = findCountry(country).prepChecklist;
    else if(type==='master') list = STATE.masterChecklist;
    if(list && reorder(list, id, dir)){ persist(); render(); }
  }

  else if(action==='confirmDel'){
    const type = t.dataset.type; const label = t.dataset.label||'';
    confirmThenDelete(label, ()=>{
      if(type==='prep'){ const c=findCountry(country); c.prepChecklist = c.prepChecklist.filter(x=>x.id!==id); }
      else if(type==='master'){ STATE.masterChecklist = STATE.masterChecklist.filter(x=>x.id!==id); }
      else if(type==='packing'){ STATE.packingList = STATE.packingList.filter(x=>x.id!==id); }
      else if(type==='doc'){ STATE.documents = STATE.documents.filter(x=>x.id!==id); }
      else if(type==='place'){ STATE.savedPlaces = STATE.savedPlaces.filter(x=>x.id!==id); }
      else if(type==='expense'){ STATE.expenses = STATE.expenses.filter(x=>x.id!==id); }
    });
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key!=='Enter') return;
  const input = e.target.closest('[data-action="noteKey"]');
  if(!input) return;
  e.preventDefault();
  addRowNote(input.dataset.day, input.dataset.id);
});

document.addEventListener('toggle', (e)=>{
  if(e.target.classList && e.target.classList.contains('trow-extra')) expandedRow.extra = e.target.open;
}, true);
document.addEventListener('change', (e)=>{
  if(e.target.dataset.action==='setBudget'){ const c=findCountry(e.target.dataset.country); c.budget[e.target.dataset.key]=e.target.value; persist(); render(); }
  if(e.target.dataset.action==='setPackStatus'){ const p=STATE.packingList.find(x=>x.id===e.target.dataset.id); p.status=e.target.value; persist(); }
  if(e.target.dataset.action==='setSavedFilter'){ const key=e.target.dataset.key; savedFilter[key]=e.target.value; if(key==='country') savedFilter.dest=''; render(); }
  if(e.target.dataset.action==='setExpenseFilter'){ const key=e.target.dataset.key; expenseFilter[key]=e.target.value; if(key==='country') expenseFilter.dest=''; render(); }
});
document.addEventListener('blur', (e)=>{
  if(e.target.dataset && e.target.dataset.actionBlur==='setCountryNotes'){
    const c = findCountry(e.target.dataset.id); if(c){ c.notes = e.target.value; persist(); }
  }
}, true);


// Forecasts are separate from the payment ledger. They never create paid expenses.
function sharedEstimateDays(){
  return (sh()?.days||[]).filter(d=>d.date>='2026-11-22' && d.date<='2026-12-10' && d.owner!=='talia');
}
function ensureSharedPriceEstimates(){
  const seed=window.SHARED_SEED;
  if(!STATE.shared || !seed || STATE.shared.priceEstimateVersion>=1) return;
  const previous=seed.priceEstimateBaseline||{};
  for(const day of STATE.shared.days||[]){
    if(day.date<'2026-11-22'||day.date>'2026-12-08'||day.owner==='talia')continue;
    const seedDay=seed.days.find(d=>d.id===day.id);
    if(!seedDay)continue;
    for(const row of day.rows){
      const fresh=seedDay.rows.find(r=>r.id===row.id),before=previous[row.id];
      if(!fresh || !before || row.priceEstimate || !fresh.priceEstimate)continue;
      row.priceEstimate=JSON.parse(JSON.stringify(fresh.priceEstimate));
      if((row.baht??null)===(before.baht??null)) row.baht=fresh.baht;
      else row.priceEstimate={...row.priceEstimate,kind:'custom',fixedIls:(Number(row.baht)||0)*rate(),lowFactor:1,highFactor:1,basis:'מחיר קיים שנערך ידנית — נשמר',sourceUrl:''};
      if(row.cat===before.cat)row.cat=fresh.cat;
    }
    for(const fresh of seedDay.rows){
      if(!previous[fresh.id] && !day.rows.some(r=>r.id===fresh.id))day.rows.push(JSON.parse(JSON.stringify(fresh)));
    }
  }
  STATE.shared.priceEstimateVersion=1;
}
function optionalPrice(row){return row.status==='אופציונלי'||!!row.priceEstimate?.optional;}
function sharedRowCategory(row){return row.priceEstimate?.category || row.priceEstimate?.booking?.category || catFromSheet(row.cat);}
function sharedRowPrice(row){
  const p=row.priceEstimate||{},booking=p.booking;
  let base=p.fixedIls!=null?Number(p.fixedIls):(Number(row.baht)||0)*rate();
  let split=p.split||booking?.split||'ratio',kind=p.kind||(base?'estimate':'no-extra');
  if(booking){
    const expense=wallet().expenses.find(x=>booking.key==='kyn' ? x.bookingKey==='kyn-2026-11' || x.id==='x_kyn_package_2026' : (x.title||'').includes(booking.match));
    if(expense)split=expense.split||split;
    if(p.fixedIls==null)base=(expense?expenseIls(expense):booking.totalIls??booking.totalThb*rate())/booking.rows;
  }
  base=Math.max(0,Number.isFinite(base)?base:0);
  const low=base*Math.max(0,Math.min(1,p.lowFactor??.8));
  const high=base*Math.max(1,p.highFactor??1.3);
  const shares=splitShares({amount:base,currency:'ILS',split});
  return {base,low,high,kind,shares};
}
function priceKindLabel(kind){return ({estimate:'אומדן',published:'מחירון · אומדן',booking:'מחיר מההזמנה',quote:'הצעת KYN',included:'כלול', 'no-extra':'ללא חיוב נפרד',custom:'אומדן ידני'})[kind]||'אומדן';}
function renderPriceBadge(row){
  const p=sharedRowPrice(row);
  return `<span class="estimate-price">${p.base?ils(p.base):p.kind==='included'?'כלול':'₪0'} · ${priceKindLabel(p.kind)}${optionalPrice(row)?' · לבחירה':''}</span>`;
}
function sharedForecast(){
  const days=sharedEstimateDays().map(day=>({day,rows:day.rows.filter(r=>r.cat||r.priceEstimate?.booking).map(row=>({row,...sharedRowPrice(row),category:sharedRowCategory(row),optional:optionalPrice(row)}))}));
  const result={days,base:0,low:0,high:0,optional:0,known:0,categories:{},itai:0,talia:0};
  for(const {rows} of days)for(const p of rows){
    if(p.optional){result.optional+=p.base;continue;}
    result.base+=p.base;result.low+=p.low;result.high+=p.high;
    result.itai+=p.shares.itai;result.talia+=p.shares.talia;
    result.categories[p.category]=(result.categories[p.category]||0)+p.base;
    if(p.kind==='booking'||p.kind==='quote')result.known+=p.base;
  }
  result.reserve=Math.max(0,Number(sh().reserveBaht)||0)*rate();
  const shares=splitShares({amount:result.reserve,currency:'ILS',split:'ratio'});
  for(const key of ['base','low','high'])result[key]+=result.reserve;
  result.itai+=shares.itai;result.talia+=shares.talia;
  return result;
}
function renderSharedForecast(){
  const f=sharedForecast();
  return `<div class="forecast-hero">
    <b>אומדן כל הטיול · בשקלים</b>
    <div class="forecast-meta">22/11–10/12/2026 · בנגקוק, קו יאו נוי, אאו נאנג, קאו סוק וקאו לאק · כולל הטיסה של איתי הביתה</div>
    <div class="forecast-amount">${ils(f.base)}</div>
    <div class="small">טווח תכנון: ${ils(f.low)}–${ils(f.high)} · החלק של איתי: <b>${ils(f.itai)}</b></div>
    <div class="forecast-meta">כולל הזמנות קיימות ורזרבה של ${ils(f.reserve)}. אופציות לבחירה: עוד ${ils(f.optional)} — אינן נכללות בסכום הראשי, וחלקן חלופות זו לזו.</div>
    <div class="forecast-meta">הוצאות ששולמו כבר כלולות במחיר הטיול; אין להוסיף את פנקס ההוצאות שוב. אומדנים אינם יוצרים חוב או תשלום. פיקדונות מוחזרים אינם הוצאה.</div>
    <div class="forecast-meta">הסכומים לזוג, פרט לטיסת החזור, ביטוח איתי ונסיעותיו לנתב״ג. אין כאן את ההמשך של טליה. טווחי התכנון הם מרווחי תקציב, לא הצעות מחיר. ההמרה לפי השער השמור: ₪${rate().toFixed(5)} לבאט.</div>
  </div>
  <table class="forecast-table"><thead><tr><th>קטגוריה</th><th>אומדן בשקלים</th></tr></thead><tbody>
    ${EXPENSE_CATEGORIES.filter(c=>f.categories[c.id]!=null).map(c=>`<tr><td>${c.label}</td><td class="num">${ils(f.categories[c.id])}</td></tr>`).join('')}
    <tr><td>רזרבה</td><td class="num">${ils(f.reserve)}</td></tr><tr class="total"><td>סה״כ כולל רזרבה</td><td class="num">${ils(f.base)}</td></tr>
  </tbody></table>
  <div class="forecast-meta">מחירי הזמנות והצעת KYN: ${ils(f.known)}. שאר הסכום הוא אומדנים ורזרבה. מחירון אינטרנט אינו אישור מחיר לתאריכי הנסיעה. ציוד וקניות לפני הנסיעה אינם כלולים כאן — הם יושבים בלשונית ״עוד → קניות״, ${ils(shoppingTotals().total)} נכון לעכשיו. הקצבת הביטוח טעונה הצעה אישית.</div>
  <h3 class="section-title" style="margin-top:18px">פירוט לפי יום</h3>
  <div class="small muted">פתחו יום כדי לראות כל מחיר, את הבסיס לאומדן ולערוך אותו בשקלים. הקצבות לכל הטיול מרוכזות ביום הראשון או ביום ההשכרה.</div>
  ${f.days.map(({day,rows})=>`<details class="forecast-day"><summary><span>${fmtDateShort(day.date)} · ${escapeHtml(day.dest)}</span><b>${ils(rows.filter(p=>!p.optional).reduce((s,p)=>s+p.base,0))}</b></summary>
    ${rows.map(p=>`<div class="forecast-item"><div class="row"><b class="small">${escapeHtml(p.row.act)}</b><button class="btn ghost mini" data-action="editForecastRow" data-day="${escapeAttr(day.id)}" data-id="${escapeAttr(p.row.id)}">${ils(p.base)} ✎</button></div>
      <div class="forecast-meta">${priceKindLabel(p.kind)}${p.optional?' · לבחירה, מחוץ לסה״כ':''}${p.low!==p.high?' · '+ils(p.low)+'–'+ils(p.high):''}</div>
      <div class="small muted">${escapeHtml(p.row.priceEstimate?.basis||'לפי המסלול השמור')}</div>
      ${p.row.priceEstimate?.sourceUrl?`<a class="forecast-source" href="${escapeAttr(p.row.priceEstimate.sourceUrl)}" target="_blank" rel="noopener">מקור המחיר · נבדק ${escapeHtml(p.row.priceEstimate.checked)}</a>`:''}
    </div>`).join('')}</details>`).join('')}`;
}


/* INIT */

/* =========================================================
   בשטח — מה שצריך כשעומדים מול נהג, ברציף בלי קליטה, או במצב חירום
========================================================= */

/*
 * כרטיסים לנהג: השם והכתובת בתאית, כמו שנהג מונית או גראב קורא.
 * הכתובות מאישורי ההזמנה ומדפי המלונות; תמיד יש גם טלפון לתת לנהג ומפה.
 */
const TAXI_PLACES = [
  {id:'asai', from:'2026-11-23', to:'2026-11-26', emoji:'🏨', name:'ASAI Bangkok Chinatown',
   th:'โรงแรมอาศัย กรุงเทพ ไชน่าทาวน์', addr:'531 ถนนเจริญกรุง แขวงป้อมปราบ เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ 10100',
   near:'เยาวราช · ใกล้ MRT วัดมังกร', maps:'ASAI Bangkok Chinatown'},
  {id:'sala', from:'2026-11-24', to:'2026-11-24', emoji:'🏮', name:'Sala Rattanakosin',
   th:'ศาลา รัตนโกสินทร์', addr:'39 ถนนมหาราช แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพฯ 10200',
   near:'ท่าเตียน · ใกล้วัดโพธิ์', phone:'+6626221388', maps:'Sala Rattanakosin Bangkok'},
  {id:'isb', from:'2026-11-25', to:'2026-11-25', emoji:'🏫', name:'International School Bangkok (ISB)',
   th:'โรงเรียนนานาชาติกรุงเทพ (ISB)', addr:'หมู่บ้านนิชดาธานี อำเภอปากเกร็ด จังหวัดนนทบุรี',
   near:'นิชดาธานี ปากเกร็ด', maps:'International School Bangkok'},
  {id:'rajadamnern', from:'2026-11-25', to:'2026-11-25', emoji:'🥊', name:'Rajadamnern Stadium',
   th:'สนามมวยเวทีราชดำเนิน', addr:'ถนนราชดำเนินนอก เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ',
   near:'', maps:'Rajadamnern Stadium'},
  {id:'bkk-dom', from:'2026-11-26', to:'2026-11-26', emoji:'✈️', name:'Suvarnabhumi Airport (BKK) — domestic departures',
   th:'สนามบินสุวรรณภูมิ', addr:'ผู้โดยสารขาออก ภายในประเทศ (Thai Vietjet)',
   near:'', maps:'Suvarnabhumi Airport'},
  {id:'bangrong', from:'2026-11-26', to:'2026-11-26', emoji:'⛴️', name:'Bang Rong Pier, Phuket',
   th:'ท่าเรือบางโรง', addr:'ตำบลป่าคลอก อำเภอถลาง จังหวัดภูเก็ต',
   near:'เรือไปเกาะยาวน้อย', maps:'Bang Rong Pier Phuket'},
  {id:'kyn', from:'2026-11-26', to:'2026-11-29', emoji:'🥊', name:'KYN Phoenix Muay Thai, Koh Yao Noi',
   th:'ค่ายมวยไทย KYN Phoenix เกาะยาวน้อย', addr:'เกาะยาวน้อย อำเภอเกาะยาว จังหวัดพังงา',
   near:'', maps:'KYN Phoenix Koh Yao Noi'},
  {id:'cosi', from:'2026-11-29', to:'2026-12-03', emoji:'🏨', name:'COSI Krabi Ao Nang Beach',
   th:'โรงแรมโคซี่ กระบี่ อ่าวนาง', addr:'1125 หมู่ 2 ซอยอ่าวนาง 15 ตำบลอ่าวนาง อำเภอเมืองกระบี่ จังหวัดกระบี่ 81180',
   near:'', phone:'+6675819999', maps:'COSI Krabi Ao Nang Beach'},
  {id:'pier', from:'2026-12-03', to:'2026-12-04', emoji:'⛴️', name:'Ratchaprapha Dam Pier (Cheow Lan Lake)',
   th:'ท่าเรือเขื่อนรัชชประภา', addr:'ตำบลเขาพัง อำเภอบ้านตาขุน จังหวัดสุราษฎร์ธานี',
   near:'เขื่อนเชี่ยวหลาน', maps:'Ratchaprapha Dam Pier'},
  {id:'riverlodge', from:'2026-12-04', to:'2026-12-05', emoji:'🏨', name:'Khao Sok River Lodge',
   th:'เขาสก ริเวอร์ ลอดจ์', addr:'6/2 หมู่ 6 ตำบลคลองศก อำเภอพนม จังหวัดสุราษฎร์ธานี 84250',
   near:'ใกล้อุทยานแห่งชาติเขาสก', phone:'+66897252277', maps:'8.9127,98.5253'},
  {id:'kalima', from:'2026-12-05', to:'2026-12-09', emoji:'🏨', name:'Kalima Resort & Villas Khao Lak',
   th:'กาลิมา รีสอร์ท แอนด์ วิลล่า เขาหลัก', addr:'3/88 หมู่ 2 ถนนเพชรเกษม ตำบลลำแก่น อำเภอท้ายเหมือง จังหวัดพังงา 82210',
   near:'เขาหลัก', phone:'+6676427999', maps:'Kalima Resort and Villas Khao Lak'},
  {id:'hkt', from:'2026-12-09', to:'2026-12-09', emoji:'✈️', name:'Phuket Airport (HKT) — domestic departures',
   th:'สนามบินภูเก็ต', addr:'ผู้โดยสารขาออก ภายในประเทศ (Thai Vietjet)',
   near:'', maps:'Phuket International Airport'},
  {id:'eleven', from:'2026-12-09', to:'2026-12-12', emoji:'🏨', name:'Eleven Bangkok Sukhumvit 11',
   th:'โรงแรมอีเลฟเว่น กรุงเทพ สุขุมวิท 11', addr:'11 ซอยสุขุมวิท 11 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110',
   near:'ใกล้ BTS นานา', maps:'Eleven Bangkok Sukhumvit 11'},
  {id:'bkk-int', from:'2026-12-10', to:'2026-12-10', emoji:'✈️', name:'Suvarnabhumi Airport (BKK) — international departures',
   th:'สนามบินสุวรรณภูมิ', addr:'ผู้โดยสารขาออก ระหว่างประเทศ (Arkia)',
   near:'', maps:'Suvarnabhumi Airport'}
];
// מילת הנימוס בסוף: ครับ לגבר, ค่ะ לאישה
const TAXI_PHRASES = [
  ['ไปที่นี่', 'לכאן, בבקשה'],
  ['เปิดมิเตอร์ด้วย', 'בבקשה להפעיל מונה'],
  ['เท่าไหร่', 'כמה זה עולה?'],
  ['จอดตรงนี้', 'לעצור כאן'],
  ['ขอบคุณ', 'תודה']
];
function politeTh(){ return meId()==='talia' ? 'ค่ะ' : 'ครับ'; }
function taxiPlacesFor(date){
  const here = TAXI_PLACES.filter(p=>p.from<=date && date<=p.to);
  return here.length ? here : TAXI_PLACES;
}
function mapsUrl(q){ return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q); }
function telHref(n){ return 'tel:'+String(n).replace(/[^+\d]/g,''); }
function waHref(n){ return 'https://wa.me/'+String(n).replace(/\D/g,''); }

function renderTaxiList(places){
  return places.map(p=>`
    <button class="fld-place" data-action="fldTaxi" data-id="${p.id}">
      <span class="fld-emoji">${p.emoji}</span>
      <span class="fld-place-txt"><b dir="ltr">${escapeHtml(p.name)}</b><small lang="th" dir="ltr">${escapeHtml(p.th)}</small></span>
      <span class="fld-go">←</span>
    </button>`).join('');
}
function openTaxiPicker(date){
  const here = TAXI_PLACES.filter(p=>p.from<=date && date<=p.to);
  const rest = TAXI_PLACES.filter(p=>!here.includes(p));
  openModal(`
    <h3 style="margin-bottom:6px;">🚕 להראות לנהג</h3>
    <div class="small" style="margin-bottom:12px;color:var(--muted)">בוחרים לאן נוסעים, והכתובת נפתחת בתאית בגדול</div>
    ${here.length?`<div class="fld-label">היום</div>${renderTaxiList(here)}`:''}
    <details class="fld-more" ${here.length?'':'open'}><summary>כל המקומות בטיול</summary>${renderTaxiList(rest)}</details>
    <div class="modal-actions"><button class="btn secondary full" data-action="fldClose">סגירה</button></div>`);
}
function openTaxiCard(id){
  const p = TAXI_PLACES.find(x=>x.id===id); if(!p) return;
  openModal(`
    <div class="taxi-card">
      <div class="taxi-th" lang="th" dir="ltr">${escapeHtml(p.th)}</div>
      <div class="taxi-addr" lang="th" dir="ltr">${escapeHtml(p.addr)}</div>
      ${p.near?`<div class="taxi-near" lang="th" dir="ltr">${escapeHtml(p.near)}</div>`:''}
      <div class="taxi-en" dir="ltr">${escapeHtml(p.name)}</div>
    </div>
    <div class="fld-actions">
      ${p.phone?`<a class="btn" href="${telHref(p.phone)}">📞 להתקשר למקום ולתת לנהג</a>`:''}
      <a class="btn secondary" href="${mapsUrl(p.maps||p.name)}" target="_blank" rel="noopener">🗺️ מפה וניווט</a>
      <button class="btn secondary" data-action="fldCopy" data-id="${p.id}">📋 להעתיק את הכתובת בתאית (לגראב)</button>
    </div>
    <div class="fld-label" style="margin-top:14px">משפטים לנהג</div>
    <div class="taxi-phrases">${TAXI_PHRASES.map(([th,he])=>`<div><b lang="th" dir="ltr">${th}${politeTh()}</b><span>${he}</span></div>`).join('')}</div>
    <div class="modal-actions"><button class="btn secondary full" data-action="fldClose">סגירה</button></div>`);
}

/* אנשי קשר להזמנות — טלפון ווטסאפ במקום חיפוש במייל */
const BOOKING_CONTACTS = [
  {m:/Siam Tour/, label:'Lukas · Siam Tour', wa:'+66825796015'},
  {m:/River Lodge/, label:'River Lodge', phone:'+66897252277'},
  {m:/COSI/, label:'COSI', phone:'+6675819999'},
  {m:/סאלה|Sala/, label:'Sala', phone:'+6626221388'},
  {m:/Kalima|קלימה/, label:'Kalima', phone:'+6676427999'},
  {m:/סימילן|Similan|Asian Trails/, label:'Patty · Asian Trails', wa:'+66935795676', phone:'+66950409339'}
];
function bookingContact(b){ return BOOKING_CONTACTS.find(c=>c.m.test((b.what||'')+' '+(b.details||''))); }
/** קבצים שצורפו ידנית, ועוד אישורים שהשם שלהם כולל את מספר ההזמנה (או את ה-fileTag) */
function bookingFileTokens(b){
  const refs = String(b.ref||'').split(/[^A-Za-z0-9-]+/).filter(t=>/\d{4,}|^[A-Za-z][A-Za-z0-9]{4,}$/.test(t));
  return refs.concat(b.fileTag ? [b.fileTag] : []);
}
function bookingFiles(b){
  const map = sh().bookingFiles || {};
  const ids = (map[b.what]||[]).map(String);
  const tokens = bookingFileTokens(b);
  if(tokens.length){
    (uploadedFiles || cachedFileList()).forEach(f=>{
      const name = String(f.name||'');
      if(tokens.some(t=>name.includes(t)) && !ids.includes(String(f.id))) ids.push(String(f.id));
    });
  }
  return ids;
}
/** "3–4/12", "26/11 + 9/12", "5–6/12" — האם ההזמנה נוגעת ליום הזה */
function bookingCovers(b, date){
  const when = String(b.when||'');
  const m = Number(date.slice(5,7)), d = Number(date.slice(8,10));
  const re = /(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?\/(\d{1,2})/g;
  let hit;
  while((hit = re.exec(when))){
    const from = Number(hit[1]), to = Number(hit[2]||hit[1]), month = Number(hit[3]);
    if(month===m && d>=from && d<=to) return true;
  }
  return false;
}
function renderBookingExtras(b){
  const c = bookingContact(b);
  const files = bookingFiles(b);
  const known = uploadedFiles || cachedFileList();
  const chips = files.map(fid=>{
    const f = known.find(x=>String(x.id)===String(fid));
    return `<a class="chip mini" href="/api/files/${encodeURIComponent(fid)}" target="_blank" rel="noopener">${f&&f.mime==='application/pdf'?'📄':'🖼️'} ${escapeHtml(f?f.name:'קובץ')}</a>`;
  }).join('');
  return `<div class="chip-row tight" style="margin-top:8px">
    ${c&&c.phone?`<a class="chip mini" href="${telHref(c.phone)}">📞 ${escapeHtml(c.label)}</a>`:''}
    ${c&&c.wa?`<a class="chip mini" href="${waHref(c.wa)}" target="_blank" rel="noopener">💬 WhatsApp</a>`:''}
    ${chips}
    <button class="chip mini" data-action="fldAttach" data-id="${escapeAttr(b.what)}">📎 ${files.length?'קבצים':'לצרף אישור'}</button>
  </div>`;
}
function openWalletModal(date){
  const all = sh().bookings || [];
  const cancelled = b=>/בוטל|בוטלה|cancel/i.test([b.what,b.details,b.payment,b.freeCancel].join(' '));
  const here = all.filter(b=>!cancelled(b) && bookingCovers(b, date));
  const card = b=>`
    <div class="card" style="margin-bottom:8px">
      <div style="font-weight:600;font-size:13.5px">${escapeHtml(b.what)}</div>
      <div class="small" style="margin-top:4px">${escapeHtml([b.when,b.details].filter(Boolean).join(' · '))}</div>
      <div class="small" style="margin-top:4px"><b>אישור:</b> <bdi dir="ltr">${escapeHtml(b.ref||'—')}</bdi> · ${escapeHtml(b.payment||'')}</div>
      ${renderBookingExtras(b)}
    </div>`;
  openModal(`
    <h3 style="margin-bottom:6px;">🎫 אישורים</h3>
    <div class="small" style="margin-bottom:12px;color:var(--muted)">מספרי אישור, טלפונים וקבצים — הקבצים נשמרים בטלפון ונפתחים גם בלי קליטה</div>
    ${here.length?`<div class="fld-label">היום · ${fmtDateShort(date)}</div>${here.map(card).join('')}`:`<div class="small" style="margin-bottom:10px">אין הזמנה שנוגעת ליום הזה</div>`}
    <details class="fld-more"><summary>כל ההזמנות · ${all.length}</summary>${all.filter(b=>!here.includes(b)).map(card).join('')}</details>
    <div class="modal-actions"><button class="btn secondary full" data-action="fldClose">סגירה</button></div>`);
}
async function openAttachModal(what){
  if(uploadedFiles===null) await loadFiles();
  const files = uploadedFiles && uploadedFiles.length ? uploadedFiles : cachedFileList();
  const map = sh().bookingFiles || (sh().bookingFiles = {});
  const chosen = new Set((map[what]||[]).map(String));
  openModal(`
    <h3 style="margin-bottom:6px;">📎 קבצים · ${escapeHtml(what)}</h3>
    <div class="small" style="margin-bottom:12px;color:var(--muted)">בוחרים מהקבצים שהועלו, או מעלים צילום חדש של השובר</div>
    <div id="att-list">${files.length?files.map(f=>`
      <label class="att-row"><input type="checkbox" value="${escapeAttr(String(f.id))}" ${chosen.has(String(f.id))?'checked':''}>
        <span>${f.mime==='application/pdf'?'📄':'🖼️'} ${escapeHtml(f.name)}</span></label>`).join(''):'<div class="small">עוד לא הועלו קבצים</div>'}</div>
    <div class="modal-actions">
      <button class="btn full" id="att-save">שמירה</button>
      <button class="btn secondary" id="att-upload">+ העלאה חדשה</button>
      <button class="btn secondary" data-action="fldClose">ביטול</button>
    </div>`, ()=>{
    document.getElementById('att-save').onclick = ()=>{
      map[what] = [...document.querySelectorAll('#att-list input:checked')].map(i=>i.value);
      persist(); closeModal(); render();
      prefetchFiles(map[what]);
    };
    document.getElementById('att-upload').onclick = ()=>{ closeModal(); pickAndUploadFile(()=>openAttachModal(what)); };
  });
}

/* רשימת הקבצים נשמרת בטלפון, והקבצים עצמם נטענים מראש כדי שייפתחו בלי קליטה */
const FILES_LIST_KEY = 'trip-files-list';
function cachedFileList(){
  try{ return JSON.parse(localStorage.getItem(FILES_LIST_KEY)||'[]') || []; }catch(e){ return []; }
}
function rememberFileList(list){
  try{ localStorage.setItem(FILES_LIST_KEY, JSON.stringify(list||[])); }catch(e){}
}
function prefetchFiles(ids){
  if(!('serviceWorker' in navigator) || !navigator.onLine) return;
  (ids||[]).forEach(id=>{ fetch('/api/files/'+encodeURIComponent(id), {credentials:'same-origin'}).catch(()=>{}); });
}

/* הוצאה מהירה — סכום בבאט ושתי לחיצות */
const QUICK_EXPENSES = [
  {label:'🍜 אוכל', title:'אוכל', category:'food'},
  {label:'🚕 מונית', title:'מונית', category:'transport'},
  {label:'🎟️ כניסה', title:'כניסה', category:'activities'},
  {label:'💆 עיסוי', title:'עיסוי', category:'other'},
  {label:'🛍️ קניות', title:'קניות', category:'shopping'},
  {label:'🍺 שתייה', title:'שתייה', category:'food'}
];
function dayExpensesIls(date){
  return wallet().expenses.filter(x=>x.date===date && x.status!=='due' && !x.bookingKey)
    .reduce((s,x)=>s+expenseIls(x),0);
}
function openQuickExpense(date){
  let pick = QUICK_EXPENSES[0];
  openModal(`
    <h3 style="margin-bottom:12px;">฿ הוצאה מהירה · ${fmtDateShort(date)}</h3>
    <div class="quick-amount"><span>฿</span><input id="qx-amount" type="number" inputmode="decimal" placeholder="0" autofocus></div>
    <div id="qx-ils" class="small" style="text-align:center;margin:6px 0 12px;color:var(--muted)">&nbsp;</div>
    <div class="chip-row" id="qx-cats">${QUICK_EXPENSES.map((q,i)=>`<button type="button" class="chip ${i===0?'active':''}" data-i="${i}">${q.label}</button>`).join('')}</div>
    <div class="field" style="margin-top:10px"><label>פירוט (לא חובה)</label><input id="qx-title" placeholder="למשל: פאד תאי בשוק"></div>
    <div class="small" style="color:var(--muted)">משולם על ידי ${personName(meId())}, מתחלק לפי היחס הקבוע · לשינויים — במסך הכסף</div>
    <div class="modal-actions"><button class="btn full" id="qx-save">שמירה</button><button class="btn secondary" data-action="fldClose">ביטול</button></div>`, ()=>{
    const amount = document.getElementById('qx-amount');
    const show = ()=>{ const v=Number(amount.value)||0; document.getElementById('qx-ils').textContent = v ? '≈ '+ils(toIls(v)) : '\u00a0'; };
    amount.oninput = show; setTimeout(()=>amount.focus(), 50);
    document.querySelectorAll('#qx-cats .chip').forEach(b=>b.onclick=()=>{
      document.querySelectorAll('#qx-cats .chip').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); pick = QUICK_EXPENSES[Number(b.dataset.i)];
    });
    document.getElementById('qx-save').onclick = ()=>{
      const v = Number(amount.value)||0;
      if(!v){ amount.focus(); return; }
      const extra = document.getElementById('qx-title').value.trim();
      wallet().expenses.push({id:uid('x'), title: extra ? pick.title+' · '+extra : pick.title, amount:v, currency:'THB',
        date, category:pick.category, note:'', paidBy:meId(), split:'ratio', status:'paid'});
      persist(); closeModal(); toast('נשמר · '+baht(v)); render();
    };
  });
}

/* חירום — נשמר במסמך המשותף, זמין גם בלי קליטה */
const EMERGENCY_NUMBERS = [
  ['1155','משטרת התיירות — באנגלית, 24 שעות'],
  ['1669','אמבולנס'],
  ['191','משטרה'],
  ['199','כיבוי אש']
];
const EMERGENCY_HOSPITALS = [
  {from:'2026-11-23', to:'2026-11-26', area:'בנגקוק', name:'Bumrungrad International — חדר מיון', phone:'+6620115222'},
  {from:'2026-12-09', to:'2026-12-12', area:'בנגקוק', name:'Bumrungrad International — חדר מיון (5 דקות מ-Eleven)', phone:'+6620115222'},
  {from:'2026-11-26', to:'2026-11-29', area:'קו יאו נוי / פוקט', name:'Bangkok Hospital Phuket', phone:'+6676254425'},
  {from:'2026-11-29', to:'2026-12-03', area:'קראבי', name:'Krabi Nakharin International (קראבי טאון, כחצי שעה מאאו נאנג)', phone:'+6675626555'},
  {from:'2026-12-03', to:'2026-12-05', area:'קאו סוק', name:'אין בית חולים קרוב — 1669, או Bangkok Hospital Phuket', phone:'+6676254425'},
  {from:'2026-12-05', to:'2026-12-09', area:'קאו לאק', name:'Bangkok Phuket Clinic Khao Lak (08:00–20:00) · בית חולים: Bangkok Hospital Phuket, כשעה וחצי', phone:'+66610019659'}
];
function emergencyData(){
  if(!sh().emergency) sh().emergency = {insurer:'', policy:'', phone:'', notes:''};
  return sh().emergency;
}
function renderEmergency(date){
  const e = emergencyData();
  const hosp = EMERGENCY_HOSPITALS.filter(h=>h.from<=date && date<=h.to);
  const hospList = hosp.length ? hosp : EMERGENCY_HOSPITALS;
  return `
    <div class="card warn">
      <b>🛡️ ביטוח</b>
      ${e.insurer||e.policy||e.phone?`
        <div class="small" style="margin-top:6px">${escapeHtml(e.insurer||'')}${e.policy?` · פוליסה <bdi dir="ltr">${escapeHtml(e.policy)}</bdi>`:''}</div>
        ${e.phone?`<a class="btn" style="margin-top:8px" href="${telHref(e.phone)}">📞 מוקד החירום של הביטוח</a>`:''}
        ${e.notes?`<div class="small" style="margin-top:6px">${escapeHtml(e.notes)}</div>`:''}`
      :`<div class="small" style="margin-top:6px">עוד לא מילאתם — חברה, מספר פוליסה וטלפון חירום</div>`}
      <button class="btn small secondary" style="margin-top:8px" data-action="fldEditInsurance">✎ עריכה</button>
    </div>
    <div class="card">
      <b>מספרי חירום בתאילנד</b>
      <div class="emg-grid">${EMERGENCY_NUMBERS.map(([n,l])=>`<a class="emg-num" href="tel:${n}"><b dir="ltr">${n}</b><span>${l}</span></a>`).join('')}</div>
    </div>
    <div class="card">
      <b>🏥 בית חולים קרוב${hosp.length?' · '+escapeHtml(hosp[0].area):''}</b>
      ${hospList.map(h=>`<div class="emg-row"><span>${hosp.length?'':escapeHtml(h.area)+' · '}${escapeHtml(h.name)}</span><a class="chip mini" href="${telHref(h.phone)}" dir="ltr">${h.phone}</a></div>`).join('')}
    </div>
    <div class="card">
      <b>🇮🇱 שגרירות ישראל בבנגקוק</b>
      <div class="small" style="margin-top:4px">Ocean Tower 2, קומה 25, 75 Sukhumvit Soi 19</div>
      <div class="chip-row tight" style="margin-top:8px">
        <a class="chip mini" href="tel:+6622049200" dir="ltr">+66 2 204 9200</a>
        <span class="small" style="align-self:center">קונסוליה:</span><a class="chip mini" href="tel:+6622049226" dir="ltr">+66 2 204 9226</a>
      </div>
    </div>`;
}
function openEmergency(date){
  openModal(`<h3 style="margin-bottom:12px;">🆘 חירום</h3>${renderEmergency(date)}
    <div class="modal-actions"><button class="btn secondary full" data-action="fldClose">סגירה</button></div>`);
}
function openInsuranceEdit(){
  const e = emergencyData();
  openModal(`
    <h3 style="margin-bottom:14px;">ביטוח נסיעות</h3>
    <div class="field"><label>חברה</label><input id="in-insurer" value="${escapeAttr(e.insurer)}" placeholder="הראל / פספורטכארד…"></div>
    <div class="field"><label>מספר פוליסה</label><input id="in-policy" value="${escapeAttr(e.policy)}"></div>
    <div class="field"><label>טלפון חירום (מחו״ל)</label><input id="in-phone" type="tel" dir="ltr" value="${escapeAttr(e.phone)}" placeholder="+972…"></div>
    <div class="field"><label>הערות</label><input id="in-notes" value="${escapeAttr(e.notes)}" placeholder="למשל: אפליקציה, ספורט אתגרי מכוסה"></div>
    <div class="modal-actions"><button class="btn full" id="in-save">שמירה</button><button class="btn secondary" data-action="fldClose">ביטול</button></div>`, ()=>{
    document.getElementById('in-save').onclick = ()=>{
      Object.assign(e, {insurer:document.getElementById('in-insurer').value.trim(), policy:document.getElementById('in-policy').value.trim(),
        phone:document.getElementById('in-phone').value.trim(), notes:document.getElementById('in-notes').value.trim()});
      persist(); closeModal(); render();
    };
  });
}

/* יומן — קובץ ICS עם התראות, כי התראות מהדפדפן לא אמינות באייפון */
function icsRows(onlyFixed){
  const fixed = /טיסה|VZ\d|IZ\d|איסוף|ספידבוט|מונית|ואן|הסעה|צ׳ק-אאוט|צ׳ק-אין|סירה/;
  return myDays().flatMap(day=>day.rows.filter(r=>r.time && /^\d{1,2}:\d{2}$/.test(r.time))
    .filter(r=>!onlyFixed || r.status==='מוזמן' || fixed.test(r.act||''))
    .map(r=>({day, r})));
}
function icsEscape(s){ return String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/([,;])/g,'\\$1'); }
function buildIcs(onlyFixed){
  const pad = n=>String(n).padStart(2,'0');
  const utc = (date, hm)=>{ // שעות המסלול הן שעון תאילנד, UTC+7
    const [h,m] = hm.split(':').map(Number);
    const t = Date.UTC(Number(date.slice(0,4)), Number(date.slice(5,7))-1, Number(date.slice(8,10)), h-7, m);
    const d = new Date(t);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };
  const durMin = s=>{ const m=/^(\d+):(\d{2})$/.exec(s||''); return m ? Number(m[1])*60+Number(m[2]) : 30; };
  const stamp = utc(localToday(), '12:00');
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//itiuly//trip//HE','CALSCALE:GREGORIAN','X-WR-CALNAME:תאילנד 2026'];
  icsRows(onlyFixed).forEach(({day, r})=>{
    const start = utc(day.date, r.time);
    const endT = new Date(Date.parse(start.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,'$1-$2-$3T$4:$5:$6Z')) + Math.max(15, durMin(r.dur))*60000);
    const end = `${endT.getUTCFullYear()}${pad(endT.getUTCMonth()+1)}${pad(endT.getUTCDate())}T${pad(endT.getUTCHours())}${pad(endT.getUTCMinutes())}00Z`;
    lines.push('BEGIN:VEVENT', `UID:${r.id}-${day.date}@itiuly-trip`, `DTSTAMP:${stamp}`, `DTSTART:${start}`, `DTEND:${end}`,
      `SUMMARY:${icsEscape(r.act)}`, `LOCATION:${icsEscape(r.loc)}`, `DESCRIPTION:${icsEscape(r.notes)}`,
      'BEGIN:VALARM','ACTION:DISPLAY',`DESCRIPTION:${icsEscape(r.act)}`,'TRIGGER:-PT1H','END:VALARM');
    if(r.time < '10:00') lines.push('BEGIN:VALARM','ACTION:DISPLAY',`DESCRIPTION:מחר ב-${r.time}: ${icsEscape(r.act)}`,'TRIGGER:-PT12H','END:VALARM');
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.map(l=>l.length>74 ? l.match(/.{1,74}/g).join('\r\n ') : l).join('\r\n');
}
async function exportCalendar(onlyFixed){
  const text = buildIcs(onlyFixed);
  const name = onlyFixed ? 'thailand-booked.ics' : 'thailand-all.ics';
  const file = new File([text], name, {type:'text/calendar'});
  try{
    if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file], title:'תאילנד 2026'}); return; }
  }catch(e){ if(e && e.name==='AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

/* פס הכלים במסך היום, והלשונית ״בשטח״ */
function renderFieldBar(day){
  return `<div class="fld-bar">
    <button data-action="fldTaxiPick" data-id="${day.date}"><span>🚕</span>לנהג</button>
    <button data-action="fldWallet" data-id="${day.date}"><span>🎫</span>אישורים</button>
    <button data-action="fldExpense" data-id="${day.date}"><span>฿</span>הוצאה</button>
    <button data-action="fldEmergency" data-id="${day.date}" class="sos"><span>🆘</span>חירום</button>
  </div>`;
}
function renderDaySpend(day){
  const spent = dayExpensesIls(day.date);
  const est = toIls(dayTotalBaht(day));
  return `<div class="deck-total">אומדן היום · ${ils(est)}${spent?` · הוצאתם <b>${ils(spent)}</b>`:''}</div>`;
}
function renderFieldSection(){
  const days = myDays();
  const day = days[currentDayIndex()] || days[0];
  const date = day ? day.date : tripToday();
  return `
    <div class="card">
      <b>🚕 כרטיסים לנהג</b>
      <div class="small" style="margin:4px 0 8px;color:var(--muted)">שם וכתובת בתאית, טלפון למקום, ומפה</div>
      ${renderTaxiList(TAXI_PLACES)}
    </div>
    <div class="card">
      <b>📅 הלו״ז ביומן של הטלפון</b>
      <div class="small" style="margin:4px 0 8px;color:var(--muted)">התראה שעה לפני, ולפעילות של הבוקר גם ערב לפני. עובד בלי אינטרנט. מייבאים פעם אחת — אם המסלול משתנה, מייבאים שוב.</div>
      <div class="chip-row">
        <button class="btn small" data-action="fldIcs" data-id="fixed">טיסות, הסעות ומה שהוזמן</button>
        <button class="btn small secondary" data-action="fldIcs" data-id="all">כל הפעילויות</button>
      </div>
    </div>
    <h3 class="section-title" style="margin-top:18px">🆘 חירום</h3>
    ${renderEmergency(date)}`;
}

document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-action^="fld"]');
  if(!t) return;
  const a = t.dataset.action, id = t.dataset.id;
  if(a==='fldClose') closeModal();
  else if(a==='fldTaxiPick') openTaxiPicker(id);
  else if(a==='fldTaxi') openTaxiCard(id);
  else if(a==='fldCopy'){
    const p = TAXI_PLACES.find(x=>x.id===id);
    if(p && navigator.clipboard) navigator.clipboard.writeText(p.th+' '+p.addr).then(()=>toast('הועתק'), ()=>toast('לא הצלחתי להעתיק'));
  }
  else if(a==='fldWallet') openWalletModal(id);
  else if(a==='fldAttach') openAttachModal(id);
  else if(a==='fldExpense') openQuickExpense(id);
  else if(a==='fldEmergency') openEmergency(id);
  else if(a==='fldEditInsurance') openInsuranceEdit();
  else if(a==='fldIcs') exportCalendar(id==='fixed');
});
/* =========================================================
   יומן בדרכים — צעדים, תמונות והמסלול שעשיתם בפועל (כמו Polarsteps)
   הכל עובד בלי קליטה: צעדים ותמונות נשמרים בטלפון ועולים כשיש חיבור.
========================================================= */
const JRN_CACHE = 'trip-journal-cache';
const JRN_QUEUE = 'trip-journal-queue';
const JRN_TRACKING = 'trip-journal-tracking';
let JOURNAL = (()=>{ try{ return JSON.parse(localStorage.getItem(JRN_CACHE)||'null') || {steps:[], track:[], follow:null, ping:null}; }catch(e){ return {steps:[], track:[], follow:null, ping:null}; } })();
let journalLoaded = false, journalFlushing = false, journalMap = null;
const localPhotoUrls = {};

function jrnSave(){ try{ localStorage.setItem(JRN_CACHE, JSON.stringify(JOURNAL)); }catch(e){} }
function jrnQueue(){ try{ return JSON.parse(localStorage.getItem(JRN_QUEUE)||'[]'); }catch(e){ return []; } }
function jrnSetQueue(q){ try{ localStorage.setItem(JRN_QUEUE, JSON.stringify(q)); }catch(e){} }
function jrnEnqueue(op){ const q = jrnQueue(); q.push(op); jrnSetQueue(q); flushJournal(); }

/* תמונות שעוד לא עלו — IndexedDB, כי localStorage קטן מדי לתמונות */
function jrnDb(){
  return new Promise((res, rej)=>{
    try{
      const r = indexedDB.open('trip-journal', 1);
      r.onupgradeneeded = ()=> r.result.createObjectStore('photos');
      r.onsuccess = ()=> res(r.result);
      r.onerror = ()=> rej(r.error);
    }catch(e){ rej(e); }
  });
}
async function idbPut(key, blob){ const db = await jrnDb(); return new Promise((res,rej)=>{ const t=db.transaction('photos','readwrite'); t.objectStore('photos').put(blob,key); t.oncomplete=()=>res(); t.onerror=()=>rej(t.error); }); }
async function idbGet(key){ const db = await jrnDb(); return new Promise((res,rej)=>{ const t=db.transaction('photos'); const r=t.objectStore('photos').get(key); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); }); }
async function idbDel(key){ const db = await jrnDb(); return new Promise((res)=>{ const t=db.transaction('photos','readwrite'); t.objectStore('photos').delete(key); t.oncomplete=()=>res(); t.onerror=()=>res(); }); }

function jrnPhotoUrl(id){
  if(String(id).startsWith('local:')){
    const key = id.slice(6);
    if(localPhotoUrls[key]) return localPhotoUrls[key];
    idbGet(key).then(b=>{ if(b){ localPhotoUrls[key] = URL.createObjectURL(b); if(activeTab==='journal') render(); } }).catch(()=>{});
    return 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
  }
  return '/api/files/'+encodeURIComponent(id);
}

/** EXIF: מיקום ושעת צילום מתוך JPEG — כך תמונה מהגלריה יודעת איפה ומתי צולמה */
function readExif(buf){
  try{
    const v = new DataView(buf);
    if(v.getUint16(0) !== 0xFFD8) return {};
    let off = 2;
    while(off < v.byteLength - 4){
      const marker = v.getUint16(off), size = v.getUint16(off+2);
      if(marker === 0xFFE1 && v.getUint32(off+4) === 0x45786966){
        const t = off + 10, le = v.getUint16(t) === 0x4949;
        const u16 = p=>v.getUint16(p, le), u32 = p=>v.getUint32(p, le);
        const ifd = start=>{ const n = u16(start), out = {}; for(let i=0;i<n;i++){ const e = start+2+i*12; out[u16(e)] = {type:u16(e+2), count:u32(e+4), at:e+8}; } return out; };
        const valOff = ent=> (ent.count*({2:1,5:8,10:8,3:2,4:4}[ent.type]||1) > 4) ? t + u32(ent.at) : ent.at;
        const ascii = ent=>{ let s='', p = valOff(ent); for(let i=0;i<ent.count-1;i++) s += String.fromCharCode(v.getUint8(p+i)); return s; };
        const rat = (p,i)=> u32(p+i*8) / (u32(p+i*8+4)||1);
        const ifd0 = ifd(t + u32(t+4));
        const res = {};
        if(ifd0[0x8769]){
          const ex = ifd(t + u32(ifd0[0x8769].at));
          if(ex[0x9003]) res.taken = ascii(ex[0x9003]);
          if(ex[0x9011]) res.offset = ascii(ex[0x9011]);
        }
        if(ifd0[0x8825]){
          const g = ifd(t + u32(ifd0[0x8825].at));
          if(g[2] && g[4]){
            const dms = ent=>{ const p = valOff(ent); return rat(p,0) + rat(p,1)/60 + rat(p,2)/3600; };
            let lat = dms(g[2]), lng = dms(g[4]);
            if(g[1] && ascii(g[1]) === 'S') lat = -lat;
            if(g[3] && ascii(g[3]) === 'W') lng = -lng;
            if(Number.isFinite(lat) && Number.isFinite(lng) && (lat || lng)) Object.assign(res, {lat, lng});
          }
        }
        return res;
      }
      if((marker & 0xFF00) !== 0xFF00) break;
      off += 2 + size;
    }
  }catch(e){}
  return {};
}
function exifTime(ex, fallbackMs){
  const m = /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(ex.taken||'');
  if(!m) return new Date(fallbackMs || Date.now()).toISOString();
  const off = /^[+-]\d{2}:\d{2}$/.test(ex.offset||'') ? ex.offset : '+07:00'; // טלפון בתאילנד — שעון תאילנד
  return new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}${off}`).toISOString();
}

/** מכווץ תמונה ל-2048 פיקסלים — עשרות תמונות נכנסות בלי לחשוב על נפח */
async function compressPhoto(file){
  const buf = await file.arrayBuffer();
  const ex = /jpe?g/i.test(file.type) || !file.type ? readExif(buf) : {};
  let blob = file;
  try{
    const bmp = await createImageBitmap(new Blob([buf], {type:file.type||'image/jpeg'}));
    const scale = Math.min(1, 2048/Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width*scale); c.height = Math.round(bmp.height*scale);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    blob = await new Promise(r=>c.toBlob(r, 'image/jpeg', 0.82)) || file;
  }catch(e){}
  return {blob, at: exifTime(ex, file.lastModified), lat: ex.lat ?? null, lng: ex.lng ?? null};
}

/* מיקום — מה-GPS, ואם אין, מנקודת המסלול הקרובה בזמן, ואם אין, מהיעד המתוכנן של אותו יום */
function getFix(timeout){
  return new Promise(res=>{
    if(!navigator.geolocation) return res(null);
    navigator.geolocation.getCurrentPosition(p=>res({lat:p.coords.latitude, lng:p.coords.longitude, acc:p.coords.accuracy}), ()=>res(null),
      {enableHighAccuracy:true, timeout:timeout||10000, maximumAge:120000});
  });
}
function plannedPlace(iso){
  const date = JV.dayKey(iso);
  const day = (sh().days||[]).find(d=>d.date===date && dayIsMine(d));
  const dest = myDestinations().find(d=>d.lat && d.arrival <= date && date <= (d.departure||d.arrival));
  return {name: day ? String(day.dest).split(/\s*[→—]\s*/)[0] : (dest ? dest.name : ''), lat: dest ? dest.lat : null, lng: dest ? dest.lng : null};
}
function nearestTrackPoint(iso, maxHours){
  const t = Date.parse(iso); let best = null, bd = Infinity;
  JOURNAL.track.forEach(p=>{ const d = Math.abs(Date.parse(p.at)-t); if(d < bd){ bd = d; best = p; } });
  return best && bd <= (maxHours||3)*3600000 ? best : null;
}

/* GPS כל עוד האפליקציה פתוחה — נקודה כל 200 מ׳ או כל 10 דקות */
let trackWatch = null, lastPoint = null, pendingPoints = [];
function trackingOn(){ try{ return localStorage.getItem(JRN_TRACKING) === 'on'; }catch(e){ return false; } }
function startTracking(){
  if(!navigator.geolocation || trackWatch !== null || !trackingOn() || document.hidden) return;
  trackWatch = navigator.geolocation.watchPosition(p=>{
    const pt = {lat:p.coords.latitude, lng:p.coords.longitude, acc:Math.round(p.coords.accuracy), at:new Date().toISOString()};
    if(pt.acc > 300) return;
    if(lastPoint && JV.haversine(lastPoint, pt) < 0.2 && Date.parse(pt.at) - Date.parse(lastPoint.at) < 600000) return;
    lastPoint = pt; pendingPoints.push(pt);
    JOURNAL.track.push({...pt, author:meId(), source:'app'}); jrnSave();
    if(pendingPoints.length >= 5) flushPoints();
  }, ()=>{}, {enableHighAccuracy:false, maximumAge:60000, timeout:30000});
}
function stopTracking(){ if(trackWatch !== null){ navigator.geolocation.clearWatch(trackWatch); trackWatch = null; } flushPoints(); }
function flushPoints(){ if(!pendingPoints.length) return; jrnEnqueue({op:'points', points:pendingPoints.splice(0)}); }
document.addEventListener('visibilitychange', ()=>{ if(document.hidden) stopTracking(); else { startTracking(); flushJournal(); } });
if(window.addEventListener) window.addEventListener('online', ()=>flushJournal());

/* סנכרון — התור נשלח לפי הסדר, ונעצר בשגיאה הראשונה עד החיבור הבא */
async function flushJournal(){
  if(journalFlushing || !navigator.onLine) return;
  journalFlushing = true;
  try{
    let q = jrnQueue();
    while(q.length){
      const op = q[0];
      if(op.op === 'step'){
        const step = {...op.step};
        for(let i=0;i<step.photos.length;i++){
          const id = step.photos[i];
          if(!String(id).startsWith('local:')) continue;
          const key = id.slice(6), blob = await idbGet(key);
          if(!blob){ step.photos.splice(i--,1); continue; }
          const form = new FormData();
          form.append('file', new File([blob], 'journal.jpg', {type:'image/jpeg'}));
          form.append('name', 'יומן · '+JV.dayKey(step.at)+' · '+(step.place||'צעד'));
          const r = await fetch('/api/files', {method:'POST', body:form});
          if(!r.ok) throw new Error('upload');
          const fid = (await r.json()).file.id;
          step.photos[i] = fid;
          await idbDel(key);
          const mine = JOURNAL.steps.find(s=>s.id===step.id); if(mine) mine.photos = mine.photos.map(p=>p===id?fid:p);
          q = jrnQueue(); q.forEach(o=>{ if(o.op==='step' && o.step.id===step.id) o.step.photos = o.step.photos.map(p=>p===id?fid:p); }); jrnSetQueue(q);
        }
        const r = await fetch('/api/journal', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({step})});
        if(!r.ok && r.status !== 400) throw new Error('step');
      }else if(op.op === 'delete'){
        const r = await fetch('/api/journal/'+encodeURIComponent(op.id), {method:'DELETE'});
        if(!r.ok) throw new Error('delete');
      }else if(op.op === 'points'){
        const r = await fetch('/api/journal/track', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({points:op.points, source:op.source})});
        if(!r.ok) throw new Error('points');
      }
      q = jrnQueue(); q.shift(); jrnSetQueue(q);
    }
    jrnSave();
  }catch(e){}
  journalFlushing = false;
  if(activeTab==='journal') render();
}

async function loadJournal(){
  try{
    const r = await fetch('/api/journal', {cache:'no-store'});
    if(!r.ok) return;
    const data = await r.json();
    // מה שעוד בתור מקומי גובר על מה שבשרת
    const q = jrnQueue();
    const pendingSteps = q.filter(o=>o.op==='step').map(o=>o.step);
    const deleted = new Set(q.filter(o=>o.op==='delete').map(o=>o.id));
    const steps = data.steps.filter(s=>!deleted.has(s.id) && !pendingSteps.some(p=>p.id===s.id)).concat(pendingSteps);
    const pendingPts = q.filter(o=>o.op==='points').flatMap(o=>o.points.map(p=>({...p, author:meId(), source:'app'})));
    JOURNAL = {steps, track:data.track.concat(pendingPts), follow:data.follow, ping:data.ping};
    journalLoaded = true; jrnSave();
    if(activeTab==='journal') render();
  }catch(e){}
}

/* ---------- המסך ---------- */
function plannedRoute(){
  return myDestinations().filter(d=>d.lat && d.lng).map(d=>[d.lat, d.lng]);
}
function renderJournal(){
  const st = JV.stats(JOURNAL.steps, JOURNAL.track);
  const q = jrnQueue().length;
  const people = {itai:{name:PEOPLE.itai.name, emoji:PEOPLE.itai.emoji}, talia:{name:PEOPLE.talia.name, emoji:PEOPLE.talia.emoji}};
  const start = (myDays()[0]||{}).date;
  return `<div class="section">
    <div class="jv-hero">
      <div class="jv-hero-top"><div><h2>היומן בדרכים</h2><div class="jv-hero-sub">תאילנד 2026 · ${escapeHtml(PEOPLE.itai.name)} ו${escapeHtml(PEOPLE.talia.name)}</div></div>
        ${q?`<span class="jv-pending">⏳ ${q} ממתינים לחיבור</span>`:''}</div>
      ${JV.statsHtml(st)}
    </div>
    <div id="jrn-map" class="jv-map"></div>
    <div class="jrn-actions">
      <button class="jrn-act main" data-action="jrnAdd"><span>📍</span><b>צעד חדש</b><small>כאן ועכשיו</small></button>
      <button class="jrn-act" data-action="jrnPast"><span>🕰️</span><b>צעד שהיה</b><small>תאריך ומיקום</small></button>
      <button class="jrn-act" data-action="jrnGallery"><span>🖼️</span><b>מהגלריה</b><small>כמה תמונות</small></button>
    </div>
    <div id="jrn-timeline">${JV.timeline(JOURNAL.steps, {photoUrl:jrnPhotoUrl, people, editable:true, startDate:start, empty:'הצעד הראשון: כשנוחתים, לוחצים על ״צעד חדש״'})}</div>
    <h3 class="section-title" style="margin-top:22px">הגדרות</h3>
    ${renderJournalSettings()}
  </div>`;
}
function renderJournalSettings(){
  const tracking = trackingOn();
  const follow = JOURNAL.follow ? location.origin+'/follow/'+JOURNAL.follow : '';
  const ping = JOURNAL.ping ? location.origin+'/api/ping?k='+JOURNAL.ping : '';
  return `
  <div class="card">
    <div class="row"><b>🛰️ מעקב מסלול</b>
      <button class="btn small ${tracking?'':'secondary'}" data-action="jrnTrack">${tracking?'פועל':'כבוי'}</button></div>
    <div class="small" style="margin-top:6px;color:var(--muted)">כשהאפליקציה פתוחה — נקודה כל 200 מ׳. כדי לעקוב גם כשהיא סגורה — הקיצור למטה.</div>
  </div>
  <div class="card">
    <b>📲 מעקב גם כשהאפליקציה סגורה — OwnTracks</b>
    <div class="small" style="margin-top:6px">אפליקציה חינמית (אנדרואיד ואייפון) ששולחת את המיקום ברקע, כל הזמן, גם כשהאפליקציה שלנו סגורה. מגדירים פעם אחת:</div>
    ${ping?`
    <ol class="small jrn-steps">
      <li>להתקין <b>OwnTracks</b> מ-Google Play / App Store, ולאשר מיקום <b>״כל הזמן״</b>.</li>
      <li>⚙️ ← <b>Connection</b> (חיבור) ← <b>Mode</b>: לבחור <b>HTTP</b>.</li>
      <li><b>Host / URL</b>: להדביק את הכתובת למטה (כפתור ״להעתיק״).</li>
      <li>במסך הראשי של OwnTracks, למעלה: מצב <b>Significant</b> (חוסך סוללה) או <b>Move</b> (מדויק יותר).</li>
      <li>באנדרואיד: הגדרות ← סוללה ← OwnTracks ← <b>ללא הגבלה</b>, כדי שהטלפון לא יעצור אותה.</li>
    </ol>
    <div class="jrn-url" dir="ltr">${escapeHtml(ping)}</div>
    <div class="chip-row tight"><button class="chip mini" data-action="jrnCopy" data-id="ping">📋 להעתיק</button>
      <a class="chip mini" href="https://owntracks.org/booklet/guide/apps/" target="_blank" rel="noopener">⬇️ איפה מורידים</a>
      <button class="chip mini" data-action="jrnPingNew">🔄 קוד חדש (מבטל את הישן)</button></div>
    <div class="small" style="margin-top:6px;color:var(--muted)">הכתובת אישית — לכל אחד משניכם יש קוד משלו (טליה יוצרת אותו מהטלפון שלה). כל מי שיש לו את הכתובת יכול להוסיף נקודות למסלול שלך, אז לא לשתף. אחרי ההגדרה, הנקודות מופיעות במפה של היומן.</div>
    <details class="fld-more"><summary>באייפון בלי OwnTracks — אוטומציה ב״קיצורים״</summary>
      <ol class="small jrn-steps">
        <li>קיצורים ← אוטומציה ← <b>+</b> ← <b>שעה ביום</b>, ולהפעיל <b>מיד</b>.</li>
        <li>פעולה: <b>קבלת מיקום נוכחי</b>, ואז <b>קבלת תוכן של URL</b> עם הכתובת למעלה, שיטה <b>POST</b>, גוף <b>JSON</b>: <code>lat</code>, <code>lng</code>.</li>
        <li>לשכפל לכמה שעות ביום.</li>
      </ol></details>`
    :`<button class="btn small" style="margin-top:8px" data-action="jrnPingNew">ליצור קוד אישי</button>`}
  </div>
  <div class="card">
    <b>👨‍👩‍👧 קישור למשפחה</b>
    <div class="small" style="margin-top:6px;color:var(--muted)">עמוד לקריאה בלבד: המפה, הצעדים והתמונות. בלי תקציב, הזמנות או מסמכים.</div>
    ${follow?`<div class="jrn-url" dir="ltr">${escapeHtml(follow)}</div>
      <div class="chip-row tight"><button class="chip mini" data-action="jrnShare">📤 לשתף</button><button class="chip mini" data-action="jrnCopy" data-id="follow">📋 להעתיק</button>
      <button class="chip mini" data-action="jrnFollowOff">⛔ לבטל את הקישור</button></div>`
    :`<button class="btn small" style="margin-top:8px" data-action="jrnFollowOn">ליצור קישור</button>`}
  </div>
  <div class="card">
    <b>📖 ספר הטיול</b>
    <div class="small" style="margin-top:6px;color:var(--muted)">כל הימים, הצעדים והתמונות, מעוצב להדפסה. בחלון ההדפסה: ״שמירה כ-PDF״ — ואת ה-PDF אפשר להדפיס כספר בכל חנות צילום או אתר אלבומים.</div>
    <button class="btn small" style="margin-top:8px" data-action="jrnBook">ליצור את הספר</button>
  </div>`;
}
function initJournalMap(){
  const el = document.getElementById('jrn-map');
  journalMap = JV.initMap(el, JOURNAL.steps, JOURNAL.track, {photoUrl:jrnPhotoUrl, planned:plannedRoute()});
  JV.bindPhotos(document.getElementById('jrn-timeline'), ()=>JOURNAL.steps, jrnPhotoUrl);
  if(!journalLoaded) loadJournal();
  startTracking();
}

/* ---------- הוספה ועריכה ---------- */
function jrnLocalIso(iso){ // datetime-local בשעון של הטלפון
  const d = new Date(iso), pad = n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function jrnFromLocal(v){ return new Date(v).toISOString(); }

async function openStepModal(step, opts){
  const isNew = !step, past = !!(opts && opts.past);
  const s = step ? JSON.parse(JSON.stringify(step)) : {id:uid('st'), author:meId(), at:new Date().toISOString(), lat:null, lng:null, place:'', text:'', photos:[]};
  if(isNew){ const pl = plannedPlace(s.at); s.place = pl.name; }
  let photoMeta = [];
  openModal(`
    <h3 style="margin-bottom:12px;">${isNew?(past?'🕰️ צעד שהיה':'📍 צעד חדש'):'עריכת צעד'}</h3>
    ${past?'<div class="small" style="margin:-6px 0 12px;color:var(--muted)">בוחרים מתי ואיפה — או מוסיפים תמונה, והמיקום והשעה נלקחים ממנה</div>':''}
    <div class="field"><label>איפה</label><input id="st-place" value="${escapeAttr(s.place)}" placeholder="למשל: ואט ארון"></div>
    <button type="button" class="loc-btn" id="st-loc">${s.lat!=null?'📍 המיקום נשמר':(isNew&&!past?'📍 מאתר מיקום…':'📍 בחירת מיקום במפה')}<small>שינוי</small></button>
    <div class="field"><label>מה היה</label><textarea id="st-text" rows="4" placeholder="כמה מילים — מה ראיתם, מה אכלתם, מה הצחיק">${escapeHtml(s.text)}</textarea></div>
    <div class="field"><label>מתי</label><input id="st-at" type="datetime-local" value="${jrnLocalIso(s.at)}"></div>
    <div class="field"><label>תמונות</label>
      <div id="st-photos" class="st-photos">${s.photos.map((p,i)=>`<div class="st-ph"><img src="${jrnPhotoUrl(p)}"><button data-i="${i}">✕</button></div>`).join('')}</div>
      <button class="btn small secondary" id="st-add-ph" type="button">+ תמונות</button>
    </div>
    <div class="modal-actions">
      <button class="btn full" id="st-save">שמירה</button>
      ${isNew?'':'<button class="btn ghost" id="st-del">מחיקה</button>'}
      <button class="btn secondary" id="st-cancel">ביטול</button>
    </div>`, ()=>{
    const drawPhotos = ()=>{
      const box = document.getElementById('st-photos');
      box.innerHTML = s.photos.map((p,i)=>`<div class="st-ph"><img src="${jrnPhotoUrl(p)}"><button data-i="${i}" type="button">✕</button></div>`).join('');
      box.querySelectorAll('button').forEach(b=>b.onclick=()=>{ s.photos.splice(Number(b.dataset.i),1); drawPhotos(); });
    };
    drawPhotos();
    const locLabel = txt=>{ const el = document.getElementById('st-loc'); if(el) el.innerHTML = txt+'<small>שינוי</small>'; };
    if(isNew && !past) getFix(10000).then(fix=>{
      if(s.locked) return;
      if(fix){ s.lat = fix.lat; s.lng = fix.lng; }
      else { const tp = nearestTrackPoint(s.at, 2); const pl = plannedPlace(s.at); s.lat = tp ? tp.lat : pl.lat; s.lng = tp ? tp.lng : pl.lng; }
      locLabel(fix ? '📍 המיקום הנוכחי' : (s.lat!=null ? '📍 מיקום משוער (בלי GPS)' : '📍 בלי מיקום — לבחור במפה'));
    });
    document.getElementById('st-loc').onclick = ()=> openLocationPicker({lat:s.lat, lng:s.lng, at:s.at}, pick=>{
      s.lat = pick.lat; s.lng = pick.lng; s.locked = true;
      const placeEl = document.getElementById('st-place');
      if(pick.label && placeEl && !placeEl.value.trim()) placeEl.value = pick.label;
      locLabel('📍 '+escapeHtml(pick.label || 'נבחר במפה'));
    });
    document.getElementById('st-add-ph').onclick = ()=>{
      const input = document.createElement('input'); input.type='file'; input.accept='image/*'; input.multiple = true;
      input.onchange = async ()=>{
        const batch = [];
        for(const f of [...input.files]) batch.push(await compressPhoto(f));
        batch.sort((x,y)=>x.at<y.at?-1:1); // התמונות לפי סדר הצילום
        for(const c of batch){
          const key = uid('ph');
          await idbPut(key, c.blob);
          localPhotoUrls[key] = URL.createObjectURL(c.blob);
          s.photos.push('local:'+key); photoMeta.push(c);
          if((s.lat==null || (!s.locked && past)) && c.lat!=null){ s.lat = c.lat; s.lng = c.lng; s.locked = true; locLabel('📍 המיקום מהתמונה'); }
          if(past && photoMeta.length===1){ s.at = c.at; const a = document.getElementById('st-at'); if(a) a.value = jrnLocalIso(c.at); }
        }
        drawPhotos();
      };
      input.click();
    };
    document.getElementById('st-cancel').onclick = closeModal;
    if(!isNew) document.getElementById('st-del').onclick = ()=> confirmThenDelete(s.place||'הצעד', ()=>{
      JOURNAL.steps = JOURNAL.steps.filter(x=>x.id!==s.id); jrnSave();
      jrnEnqueue({op:'delete', id:s.id});
    });
    document.getElementById('st-save').onclick = ()=>{
      delete s.locked;
      s.place = document.getElementById('st-place').value.trim();
      s.text = document.getElementById('st-text').value.trim();
      const v = document.getElementById('st-at').value; if(v) s.at = jrnFromLocal(v);
      const i = JOURNAL.steps.findIndex(x=>x.id===s.id);
      if(i>=0) JOURNAL.steps[i] = s; else JOURNAL.steps.push(s);
      jrnSave(); jrnEnqueue({op:'step', step:s});
      // תמונות עם GPS מוסיפות נקודות למסלול
      const pts = photoMeta.filter(c=>c.lat!=null).map(c=>({lat:c.lat, lng:c.lng, at:c.at}));
      if(pts.length){ JOURNAL.track.push(...pts.map(p=>({...p, author:meId(), source:'photo'}))); jrnEnqueue({op:'points', points:pts, source:'photo'}); }
      closeModal(); render(); toast(navigator.onLine?'נשמר':'נשמר בטלפון — יעלה כשיהיה חיבור');
    };
  });
}

/** מהגלריה: תמונות מתקבצות לצעדים לפי זמן ומקום, ומקבלות מיקום מה-EXIF או מהמסלול */
async function importFromGallery(){
  const input = document.createElement('input'); input.type='file'; input.accept='image/*'; input.multiple = true;
  input.onchange = async ()=>{
    const files = [...input.files]; if(!files.length) return;
    toast('מעבד '+files.length+' תמונות…');
    const items = [];
    for(const f of files){
      const c = await compressPhoto(f);
      if(c.lat==null){ const tp = nearestTrackPoint(c.at, 3); if(tp){ c.lat = tp.lat; c.lng = tp.lng; c.guess = true; } }
      items.push(c);
    }
    items.sort((a,b)=>a.at<b.at?-1:1);
    const groups = [];
    for(const it of items){
      const g = groups[groups.length-1];
      const near = g && JV.dayKey(g.items[0].at)===JV.dayKey(it.at) && Date.parse(it.at)-Date.parse(g.items[g.items.length-1].at) < 3*3600000
        && (it.lat==null || g.lat==null || JV.haversine(g, it) < 2);
      if(near){ g.items.push(it); if(g.lat==null && it.lat!=null){ g.lat=it.lat; g.lng=it.lng; } }
      else groups.push({items:[it], lat:it.lat, lng:it.lng});
    }
    const withGps = items.filter(i=>i.lat!=null && !i.guess).length;
    openModal(`
      <h3 style="margin-bottom:8px;">🖼️ ${groups.length} צעדים מ-${items.length} תמונות</h3>
      <div class="small" style="margin-bottom:10px;color:var(--muted)">${withGps} תמונות עם מיקום מהמצלמה · השאר לפי המסלול או לפי התוכנית של אותו יום. אפשר לערוך כל צעד אחר כך.</div>
      <div id="imp-list"></div>
      <div class="modal-actions"><button class="btn full" id="imp-save">להוסיף ליומן</button><button class="btn secondary" id="imp-cancel">ביטול</button></div>`, ()=>{
      const drawGroups = ()=>{ document.getElementById('imp-list').innerHTML = groups.map((g,i)=>{
        const pl = plannedPlace(g.items[0].at);
        const src = g.picked ? '📍 '+escapeHtml(g.label||'נבחר') : g.items.some(x=>x.lat!=null && !x.guess) ? '📍 מהמצלמה' : g.lat!=null ? '📍 לפי המסלול' : '⚠️ בלי מיקום';
        return `<div class="imp-row">
          <img src="${URL.createObjectURL(g.items[0].blob)}" alt="">
          <div><b>${escapeHtml(g.label||pl.name||'צעד')}</b><span class="small">${JV.dayKey(g.items[0].at)} · <bdi dir="ltr">${JV.timeOf(g.items[0].at)}</bdi> · ${g.items.length} תמונות</span></div>
          <button type="button" class="chip mini" data-g="${i}">${src}</button></div>`; }).join('');
        document.querySelectorAll('#imp-list [data-g]').forEach(b=>b.onclick=()=>{ const g = groups[Number(b.dataset.g)];
          openLocationPicker({lat:g.lat, lng:g.lng, at:g.items[0].at}, pick=>{ g.lat = pick.lat; g.lng = pick.lng; g.label = pick.label; g.picked = true; drawGroups(); }); });
      };
      drawGroups();
      document.getElementById('imp-cancel').onclick = closeModal;
      document.getElementById('imp-save').onclick = async ()=>{
        for(const g of groups){
          const pl = plannedPlace(g.items[0].at);
          const step = {id:uid('st'), author:meId(), at:g.items[0].at, lat:g.lat ?? pl.lat, lng:g.lng ?? pl.lng, place:g.label || pl.name, text:'', photos:[]};
          for(const it of g.items){ const key = uid('ph'); await idbPut(key, it.blob); localPhotoUrls[key] = URL.createObjectURL(it.blob); step.photos.push('local:'+key); }
          JOURNAL.steps.push(step); jrnEnqueue({op:'step', step});
          const pts = g.items.filter(i=>i.lat!=null && !i.guess).map(i=>({lat:i.lat, lng:i.lng, at:i.at}));
          if(pts.length){ JOURNAL.track.push(...pts.map(p=>({...p, author:meId(), source:'photo'}))); jrnEnqueue({op:'points', points:pts, source:'photo'}); }
        }
        jrnSave(); closeModal(); render(); toast('נוספו '+groups.length+' צעדים');
      };
    });
  };
  input.click();
}


/* ---------- בחירת מיקום: חיפוש, מקומות מהטיול, נעיצת סיכה במפה ---------- */
function openLocationPicker(init, onPick){
  const box = document.createElement('div');
  box.className = 'loc-picker';
  const dests = myDestinations().filter(d=>d.lat && d.lng);
  const day = init.at ? JV.dayKey(init.at) : null;
  const near = day ? dests.filter(d=>d.arrival <= day && day <= (d.departure||d.arrival)) : [];
  const quick = [...near, ...dests.filter(d=>!near.includes(d))];
  let pick = init.lat!=null ? {lat:init.lat, lng:init.lng, label:''} : null;
  box.innerHTML = `
    <div class="lp-head"><button class="lp-x" type="button">✕</button><b>איפה זה היה?</b><button class="btn small" id="lp-ok" type="button">אישור</button></div>
    <div class="lp-search"><input id="lp-q" placeholder="חיפוש מקום — למשל Wat Arun, Railay" autocomplete="off"><button class="btn small secondary" id="lp-go" type="button">חיפוש</button></div>
    <div id="lp-results" class="lp-results"></div>
    <div class="chip-row tight lp-quick">
      <button class="chip mini" type="button" id="lp-me">📡 המיקום שלי</button>
      ${quick.map((d,i)=>`<button class="chip mini" type="button" data-q="${i}">${escapeHtml(d.name)}</button>`).join('')}
    </div>
    <div id="lp-map" class="lp-map"></div>
    <div class="lp-hint" id="lp-hint">${window.L && navigator.onLine ? 'נוגעים במפה כדי לנעוץ סיכה, או גוררים אותה' : 'בלי חיבור אין מפה — בוחרים מהרשימה או ״המיקום שלי״'}</div>`;
  document.body.appendChild(box);
  let map = null, marker = null;
  const setPick = (lat, lng, label, fly)=>{
    pick = {lat, lng, label: label || (pick && pick.label) || ''};
    document.getElementById('lp-hint').textContent = '📍 ' + (pick.label || lat.toFixed(4)+', '+lng.toFixed(4));
    if(map){
      if(marker) marker.setLatLng([lat,lng]); else { marker = L.marker([lat,lng], {draggable:true}).addTo(map); marker.on('dragend', ()=>{ const p = marker.getLatLng(); setPick(p.lat, p.lng, ''); }); }
      if(fly) map.setView([lat,lng], Math.max(map.getZoom(), 13));
    }
  };
  if(window.L && navigator.onLine){
    map = L.map('lp-map', {zoomControl:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'© OpenStreetMap'}).addTo(map);
    const c = pick || (near[0] ? {lat:near[0].lat, lng:near[0].lng} : quick[0] ? {lat:quick[0].lat, lng:quick[0].lng} : {lat:13.75, lng:100.5});
    map.setView([c.lat, c.lng], pick ? 14 : 11);
    if(pick) setPick(pick.lat, pick.lng, '');
    map.on('click', e=>setPick(e.latlng.lat, e.latlng.lng, ''));
    setTimeout(()=>map.invalidateSize(), 120);
  }
  const close = ()=>{ if(map) map.remove(); box.remove(); };
  box.querySelector('.lp-x').onclick = close;
  document.getElementById('lp-ok').onclick = ()=>{ if(!pick){ toast('בוחרים מקום קודם'); return; } close(); onPick(pick); };
  document.getElementById('lp-me').onclick = async ()=>{ const f = await getFix(12000); if(f) setPick(f.lat, f.lng, 'המיקום שלי', true); else toast('אין מיקום — צריך לאשר גישה'); };
  box.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{ const d = quick[Number(b.dataset.q)]; setPick(d.lat, d.lng, d.name, true); });
  const search = async ()=>{
    const q = document.getElementById('lp-q').value.trim(); if(!q) return;
    const res = document.getElementById('lp-results');
    if(!navigator.onLine){ res.innerHTML = '<div class="small">חיפוש צריך חיבור — אפשר לבחור מהרשימה</div>'; return; }
    res.innerHTML = '<div class="small">מחפש…</div>';
    try{
      const r = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=6&accept-language=he,en&q='+encodeURIComponent(q));
      const list = await r.json();
      res.innerHTML = list.length ? list.map((x,i)=>`<button type="button" class="lp-res" data-r="${i}">${escapeHtml(x.display_name)}</button>`).join('') : '<div class="small">לא נמצא — אפשר לנעוץ סיכה במפה</div>';
      res.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{ const x = list[Number(b.dataset.r)]; setPick(Number(x.lat), Number(x.lon), String(x.display_name).split(',')[0], true); res.innerHTML=''; });
    }catch(e){ res.innerHTML = '<div class="small">החיפוש לא עבד — אפשר לנעוץ סיכה במפה</div>'; }
  };
  document.getElementById('lp-go').onclick = search;
  document.getElementById('lp-q').onkeydown = e=>{ if(e.key==='Enter'){ e.preventDefault(); search(); } };
}

/* ---------- ספר להדפסה ---------- */
function openJournalBook(){
  const steps = [...JOURNAL.steps].sort((a,b)=>a.at<b.at?-1:1);
  const st = JV.stats(steps, JOURNAL.track);
  const byDay = {};
  steps.forEach(s=>{ (byDay[JV.stepDay(s)] = byDay[JV.stepDay(s)] || []).push(s); });
  const days = Object.keys(byDay).sort();
  const box = document.createElement('div');
  box.id = 'jrn-book';
  box.innerHTML = `
    <div class="book-bar"><button class="btn" id="book-print">🖨️ הדפסה / PDF</button><button class="btn secondary" id="book-close">סגירה</button></div>
    <section class="book-page book-cover">
      <h1>תאילנד 2026</h1><div class="book-sub">איתי וטליה · ${days.length?new Date(days[0]+'T12:00').toLocaleDateString('he-IL',{day:'numeric',month:'long'})+' – '+new Date(days[days.length-1]+'T12:00').toLocaleDateString('he-IL',{day:'numeric',month:'long',year:'numeric'}):''}</div>
      ${JV.svgRoute(steps, JOURNAL.track, 500, 420)}
      ${JV.statsHtml(st)}
    </section>
    ${days.map((d,i)=>`<section class="book-page">
      <h2>יום ${i+1} · ${new Date(d+'T12:00').toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'})}</h2>
      ${byDay[d].map(s=>`<article class="book-step"><h3>${escapeHtml(s.place||'')}<small> · ${JV.timeOf(s.at, s.lat, s.lng)}</small></h3>
        ${s.text?`<p>${escapeHtml(s.text).replace(/\n/g,'<br>')}</p>`:''}
        ${s.photos.length?`<div class="book-photos n${Math.min(4,s.photos.length)}">${s.photos.map(p=>`<img src="${jrnPhotoUrl(p)}">`).join('')}</div>`:''}
      </article>`).join('')}
    </section>`).join('')}`;
  document.body.appendChild(box);
  document.body.classList.add('book-open');
  document.getElementById('book-close').onclick = ()=>{ box.remove(); document.body.classList.remove('book-open'); };
  document.getElementById('book-print').onclick = ()=>window.print();
}

async function jrnSetting(action){
  try{
    const r = await fetch('/api/journal/settings', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action})});
    if(!r.ok) throw new Error();
    const d = await r.json();
    if('follow' in d) JOURNAL.follow = d.follow;
    if('ping' in d) JOURNAL.ping = d.ping;
    jrnSave(); render();
  }catch(e){ toast('צריך חיבור לאינטרנט בשביל זה'); }
}

document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-action^="jrn"]');
  if(!t) return;
  const a = t.dataset.action, id = t.dataset.id;
  if(a==='jrnAdd') openStepModal(null);
  else if(a==='jrnPast') openStepModal(null, {past:true});
  else if(a==='jrnEdit') openStepModal(JOURNAL.steps.find(s=>s.id===id));
  else if(a==='jrnGallery') importFromGallery();
  else if(a==='jrnBook') openJournalBook();
  else if(a==='jrnTrack'){
    const on = !trackingOn();
    try{ localStorage.setItem(JRN_TRACKING, on?'on':'off'); }catch(err){}
    if(on){ getFix(15000).then(fix=>{ if(!fix) toast('צריך לאשר גישה למיקום'); }); startTracking(); } else stopTracking();
    render();
  }
  else if(a==='jrnFollowOn') jrnSetting('follow-on');
  else if(a==='jrnFollowOff') confirmThenDelete('הקישור למשפחה', ()=>jrnSetting('follow-off'));
  else if(a==='jrnPingNew') jrnSetting('ping-new');
  else if(a==='jrnCopy'){
    const v = id==='ping' ? location.origin+'/api/ping?k='+JOURNAL.ping : location.origin+'/follow/'+JOURNAL.follow;
    navigator.clipboard && navigator.clipboard.writeText(v).then(()=>toast('הועתק'), ()=>toast('לא הצלחתי להעתיק'));
  }
  else if(a==='jrnShare'){
    const url = location.origin+'/follow/'+JOURNAL.follow;
    if(navigator.share) navigator.share({title:'איתי וטליה בתאילנד', text:'המסלול והיומן שלנו, מתעדכן מהטיול:', url}).catch(()=>{});
    else navigator.clipboard && navigator.clipboard.writeText(url).then(()=>toast('הקישור הועתק'));
  }
});


loadState();

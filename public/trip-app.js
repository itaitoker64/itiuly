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

function seedData(){
  const bangkokId = uid('d'), koyaoId = uid('d'), aonangId = uid('d'), khaolakId = uid('d');
  const chiangmaiId = uid('d'), paiId = uid('d');
  const colomboId = uid('d'), mirissaId = uid('d'), ellaId = uid('d'), arugamId = uid('d');
  const hanoiId = uid('d'), manilaId = uid('d');

  return {
    schema:3,
    tripName:"My Big Trip 🌏",
    startDate:"2026-11-22",
    endDate:null,
    budgetTotal:50000,
    currency:"ILS",

    /* מה שמשותף לשניים, ומה שממשיך אחרי שאיתי טס הביתה */
    trip:{
      splitDate:"2026-12-08",
      together:{title:"תאילנד · מבנגקוק לאנדמן", subtitle:"22 בנובמבר – 8 בדצמבר 2026 · 15 לילות", nights:15},
      itai:{title:"השבועיים שלי", subtitle:"22/11 – 8/12 · ואז הביתה", homeFlight:"ארקיע IZ598 · פוקט → תל אביב · 8/12, 17:20"},
      talia:{title:"הטיול הגדול", subtitle:"מ-22/11/2026 והלאה · תאילנד, סרי לנקה, וייטנאם, פיליפינים",
             onwardFlight:"פוקט → צ׳יאנג מאי · 8/12 — באותו יום שאיתי טס הביתה", onwardDate:"2026-12-08"}
    },

    /* חלוקת הוצאות בסגנון Splitwise */
    money:{
      rate:0.08981,                 // ฿1 בשקלים
      defaultSplit:{itai:0.6667, talia:0.3333},
      budgets:{itai:12000, talia:8000},
      expenses:[
        {id:uid('x'), date:"2026-09-10", title:"ארקיע IZ591 · תל אביב → בנגקוק", category:"flights",
         amount:3777, currency:"ILS", paidBy:"itai", split:"ratio", note:"לשניים · שולם", settled:false},
        {id:uid('x'), date:"2026-09-10", title:"ארקיע IZ598 · פוקט → תל אביב", category:"flights",
         amount:1891, currency:"ILS", paidBy:"talia", split:"full-itai", note:"הטיסה הביתה של איתי · שולם", settled:false},
        {id:uid('x'), date:"2026-09-10", title:"Chermantra Aonang · 3 לילות", category:"accommodation",
         amount:1839, currency:"ILS", paidBy:"itai", split:"ratio", note:"ביטול חינם עד 14/11", settled:false},
        {id:uid('x'), date:"2026-09-10", title:"Kalima Resort · 6 לילות בקאו לק", category:"accommodation",
         amount:4029, currency:"ILS", paidBy:"itai", split:"ratio", note:"ביטול חינם", settled:false}
      ],
      settlements:[]
    },

    countries:[
      {id:"thailand", owner:"both", name:"תאילנד", flag:"🇹🇭", color:"var(--thailand)", order:1, currency:"THB", notes:"",
        destinations:[
          {id:bangkokId, owner:"both", name:"בנגקוק", wiki:"Bangkok", hue:"#C97B5A",
           lat:13.7563, lng:100.5018, arrival:"2026-11-23", departure:"2026-11-26", nights:3,
           accommodation:"Montraj Coach Sukhumvit", transport:"ארקיע IZ591 מתל אביב",
           notes:"לוי קראתונג בליל הירח המלא, הארמון המלכותי, ISB, ומואיי תאי ברג׳אדמנרן",
           budget:2500, status:"booked", companions:["ביחד"], order:1},
          {id:koyaoId, owner:"both", name:"קו יאו נוי — מחנה מואיי תאי", wiki:"Ko Yao Noi", hue:"#6F8F6A",
           lat:8.1099, lng:98.5892, arrival:"2026-11-26", departure:"2026-11-29", nights:3,
           accommodation:"Panoramic Sunset View · KYN Phoenix", transport:"Vietjet לפוקט ואז ספידבוט",
           notes:"שני אימונים ביום, יוגה, ולונגטייל למפרץ פאנג נגה מהצד שאין בו סירות",
           budget:2200, status:"planned", companions:["ביחד"], order:2},
          {id:aonangId, owner:"both", name:"אאו נאנג וריילאי", wiki:"Ao Nang", hue:"#6E88A0",
           lat:8.0320, lng:98.8210, arrival:"2026-11-29", departure:"2026-12-02", nights:3,
           accommodation:"Chermantra Aonang · Mountain Pool Villa", transport:"ספידבוט מקו יאו נוי",
           notes:"קורס טיפוס בריילאי, חוף פרה נאנג, קיאקים במנגרובים של אאו תלאנה",
           budget:2600, status:"booked", companions:["ביחד"], order:3},
          {id:khaolakId, owner:"both", name:"קאו לק", wiki:"Khao Lak", hue:"#C9A24C",
           lat:8.6392, lng:98.2450, arrival:"2026-12-02", departure:"2026-12-08", nights:6,
           accommodation:"Kalima Resort and Villas", transport:"רכב פרטי דרך פאנג נגה",
           notes:"פרק המנוחה — ספא, בריכת אינפיניטי, ויום אחד באגם צ׳או לאן בקאו סוק",
           budget:4400, status:"booked", companions:["ביחד"], order:4},
          {id:chiangmaiId, owner:"talia", name:"צ'יאנג מאי", wiki:"Chiang Mai", hue:"#8C6FA0",
           lat:18.7883, lng:98.9853, arrival:"2026-12-08", departure:"2026-12-09", nights:1,
           accommodation:"", transport:"טיסה מפוקט — באותו יום שאיתי טס הביתה",
           notes:"לילה אחד בדרך לפאי. הטיסה מפוקט לצ׳יאנג מאי היא עם עצירה — לבדוק שעות מול שעת הצ׳ק-אאוט בקאו לק.",
           budget:600, status:"planned", companions:["לבד"], order:5},
          {id:paiId, owner:"talia", name:"פאי — קורס מורים ליוגה", wiki:"Pai, Thailand", hue:"#4E8B8B",
           lat:19.3583, lng:98.4383, arrival:"2026-12-09", departure:"2027-01-08", nights:30,
           accommodation:"", transport:"מיניבאן מצ'יאנג מאי",
           notes:"קבוע במסלול — לא לזוז. קורס טיטשריניג חודשי.",
           budget:3000, status:"booked", companions:["לבד"], order:6}
        ],
        prepChecklist:[
          {id:uid('t'), title:"ויזה לתאילנד", status:"todo", deadline:"2026-11-01", notes:"לבדוק אם צריך ויזה מראש או ויזה בכניסה (Visa Exemption)", link:"", priority:"גבוהה", order:1},
          {id:uid('t'), title:"הוכחת יציאה / onward ticket", status:"todo", deadline:"2026-11-15", notes:"", link:"", priority:"בינונית", order:2},
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
          {id:colomboId, owner:"talia", name:"קולומבו", lat:6.9271, lng:79.8612, arrival:"2027-01-08", departure:"2027-01-09", nights:1, accommodation:"", transport:"טיסה מתאילנד", notes:"תחנת כניסה", budget:600, status:"planned", companions:["Solo"], order:1},
          {id:mirissaId, owner:"talia", name:"מיריסה", lat:5.9483, lng:80.4589, arrival:"2027-01-09", departure:"2027-01-15", nights:6, accommodation:"", transport:"רכבת/אוטובוס", notes:"חופים, גלישה, יוגה", budget:2400, status:"planned", companions:["Solo"], order:2},
          {id:ellaId, owner:"talia", name:"אלה", lat:6.8667, lng:81.0466, arrival:"2027-01-15", departure:"2027-01-19", nights:4, accommodation:"", transport:"רכבת ההרים המפורסמת", notes:"טבע, טיולים, נופים", budget:1400, status:"optional", companions:["Solo"], order:3},
          {id:arugamId, owner:"talia", name:"ארוגם ביי", lat:6.8400, lng:81.8360, arrival:"2027-01-19", departure:"2027-01-25", nights:6, accommodation:"", transport:"אוטובוס", notes:"גלישה נוספת, חוף רגוע", budget:2000, status:"optional", companions:["Solo"], order:4}
        ],
        prepChecklist:[
          {id:uid('t'), title:"ETA / ויזה אלקטרונית לסרי לנקה", status:"todo", deadline:"2026-12-20", notes:"", link:"", priority:"גבוהה", order:1},
          {id:uid('t'), title:"ביטוח נסיעות — עדכון תאריכים", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:2}
        ],
        transport:[], accommodations:[], budget:defaultBudget()
      },
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
    masterChecklist:[
      {id:uid('m'), category:"דרכון", title:"לבדוק תוקף דרכון (6+ חודשים)", status:"todo", deadline:"2026-10-15", notes:"", priority:"גבוהה", link:"", countryId:null, order:1},
      {id:uid('m'), category:"ביטוח נסיעות", title:"לרכוש ביטוח נסיעות ארוך טווח", status:"todo", deadline:"2026-11-05", notes:"לוודא כיסוי לענפי ספורט/גלישה ויוגה", priority:"גבוהה", link:"", countryId:null, order:2},
      {id:uid('m'), category:"כרטיסי אשראי", title:"לעדכן בנק על נסיעה ממושכת", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:3},
      {id:uid('m'), category:"טלפון/eSIM", title:"להשוות ספקי eSIM אזוריים", status:"todo", deadline:"", notes:"", priority:"נמוכה", link:"", countryId:null, order:4},
      {id:uid('m'), category:"מסמכים וגיבויים", title:"לסרוק ולגבות את כל המסמכים החשובים", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:5},
      {id:uid('m'), category:"בישראל לפני הטיול", title:"לסגור עניינים פתוחים (דואר, מנויים, ביטוח לאומי)", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:6},
      {id:uid('m'), category:"תרופות", title:"להצטייד בערכת תרופות בסיסית", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:7},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"לסגור את צ׳רמנטרה לפני הדדליין", status:"todo", deadline:"2026-11-14", notes:"אחרי 14/11 הכרטיס מחויב במלוא הסכום", priority:"גבוהה", link:"", countryId:"thailand", order:8},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"להזמין את טיסת Vietjet VZ314 לפוקט", status:"todo", deadline:"2026-11-01", notes:"฿4,720 לשניים, Deluxe עם 20 ק״ג", priority:"גבוהה", link:"", countryId:"thailand", order:9},
      {id:uid('m'), owner:"both", category:"הזמנות", title:"לסגור את המחנה בקו יאו נוי", status:"todo", deadline:"2026-10-20", notes:"מקדמה 50% שאינה מוחזרת — לשאול אם ฿3,800 כולל ארוחות ואימונים", priority:"גבוהה", link:"", countryId:"thailand", order:10},
      {id:uid('m'), owner:"both", category:"כניסה לתאילנד", title:"להגיש TDAC — 72 שעות לפני הנחיתה", status:"todo", deadline:"2026-11-19", notes:"חובה, חינם, אונליין. כל אתר שגובה כסף הוא לא הרשמי", priority:"גבוהה", link:"", countryId:"thailand", order:11},

      {id:uid('m'), owner:"itai", category:"מואיי תאי", title:"לקנות מגן שיניים בארץ", status:"todo", deadline:"2026-11-15", notes:"", priority:"בינונית", link:"", countryId:null, order:12},
      {id:uid('m'), owner:"itai", category:"מואיי תאי", title:"לוודא שהביטוח מכסה ספורט מגע", status:"todo", deadline:"2026-11-10", notes:"מואיי תאי לא תמיד כלול בפוליסה רגילה", priority:"גבוהה", link:"", countryId:null, order:13},
      {id:uid('m'), owner:"itai", category:"קטנוע", title:"רישיון בינלאומי 1949 — רק אם רוכבים", status:"todo", deadline:"2026-11-10", notes:"רישיון ישראלי לא מספיק, וגם בינלאומי רגיל לא", priority:"נמוכה", link:"", countryId:null, order:14},
      {id:uid('m'), owner:"itai", category:"ISB", title:"לתאם ביקור בוגרים ב-ISB", status:"todo", deadline:"2026-11-20", notes:"isbalum@isb.ac.th, לפחות יומיים מראש, תעודה מזהה בשער", priority:"בינונית", link:"", countryId:"thailand", order:15},

      {id:uid('m'), owner:"talia", category:"קורס יוגה", title:"לשלם את היתרה על הקורס בפאי", status:"todo", deadline:"2026-11-01", notes:"", priority:"גבוהה", link:"", countryId:"thailand", order:16},
      {id:uid('m'), owner:"talia", category:"ויזה", title:"הארכת שהייה — הפטור קוצר ל-30 יום", status:"todo", deadline:"2026-12-15", notes:"הארכה של 30 יום במשרד ההגירה ฿1,900. רלוונטי כי את נשארת אחרי 8/12", priority:"גבוהה", link:"", countryId:"thailand", order:17},
      {id:uid('m'), owner:"talia", category:"טיסות המשך", title:"טיסה מתאילנד לסרי לנקה", status:"todo", deadline:"2026-12-01", notes:"", priority:"בינונית", link:"", countryId:null, order:18}
    ],
    packingBreakdown:"Osprey Renn 65L לכל הציוד → Osprey Daylite Plus 20L למטוס, נסיעות וטיולי יום → קרוסבודי קטן לטלפון, כסף ודרכון ביום־יום.",
    packingCarryOn:["דרכון","ארנק","טלפון","Power Bank","תרופות למיגרנה","תרופה לבחילות","משקפי שמש","אטמי אוזניים","מסכת עיניים","אוזניות","מגבונים קטנים","טישו","AirTag מחובר למוצ'ילה הגדולה","חולצה + תחתונים להחלפה"],
    packingList:[
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
    ],
    savedPlaces:[
      {id:uid('sp'), countryId:"thailand", destinationId:paiId, name:"Coffee in Love", category:"cafe", mapsLink:"", note:"נשמע כמו מקום שקט לעבוד ממנו", status:"want", priority:"בינונית", lat:19.3611, lng:98.4394},
      {id:uid('sp'), countryId:"thailand", destinationId:paiId, name:"Yoga Garden Pai", category:"yoga", mapsLink:"", note:"", status:"must", priority:"גבוהה", lat:null, lng:null},
      {id:uid('sp'), countryId:"srilanka", destinationId:mirissaId, name:"Coconut Tree Hill", category:"view", mapsLink:"", note:"נקודת צילום מפורסמת של מיריסה", status:"want", priority:"בינונית", lat:5.9270, lng:80.4457}
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
let expandedDest = {};
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

/** התאריך שבו איתי טס הביתה — הגבול בין הקטע המשותף להמשך של טליה */
function splitDate(){ return (STATE.trip && STATE.trip.splitDate) || '2026-12-08'; }

function applyTheme(){
  document.documentElement.dataset.user = me().theme;
}

function ensureDefaults(){
  if(!STATE.savedPlaces) STATE.savedPlaces = [];
  if(!STATE.expenses) STATE.expenses = [];

  /* מסמך שנשמר לפני שהאפליקציה התפצלה לשני משתמשים — משלימים את החסר */
  const fresh = seedData();

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

    // משימות שנוספו עם הפיצול — מתווספות למי שעוד אין לו אותן
    fresh.masterChecklist.forEach(seedTask=>{
      if(!STATE.masterChecklist.some(t=>t.title===seedTask.title)){
        STATE.masterChecklist.push(JSON.parse(JSON.stringify(seedTask)));
      }
    });

    STATE.schema = 3;
  }
  if(!STATE.trip) STATE.trip = fresh.trip;
  if(!STATE.money) STATE.money = fresh.money;
  if(!STATE.money.settlements) STATE.money.settlements = [];
  if(!STATE.money.budgets) STATE.money.budgets = fresh.money.budgets;
  if(!STATE.money.defaultSplit) STATE.money.defaultSplit = fresh.money.defaultSplit;
  if(!STATE.money.rate) STATE.money.rate = fresh.money.rate;
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
    offline: ['אין חיבור — לא נשמר', 'offline'],
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

async function loadState(){
  setSyncStatus('loading');
  try{
    const res = await fetch('/api/state', {cache:'no-store'});
    if(res.status === 401){ window.location.href = '/login'; return; }
    if(!res.ok) throw new Error('load failed');
    const payload = await res.json();
    if(payload.data){
      adoptServerState(payload);
      setSyncStatus('saved');
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
    serverVersion = Number(payload.version) || serverVersion;
    lastUpdatedBy = payload.me || lastUpdatedBy;
    storageAvailable = true;
    setSyncStatus('saved');
    return true;
  }catch(e){
    storageAvailable = false;
    savePending = true;
    setSyncStatus('offline');
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
async function syncNow(){
  if(savePending || saveInFlight || modalOpen()) return;
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
  syncTimer = setInterval(()=>{ if(!document.hidden) syncNow(); }, 8000);
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
function snapshotUndo(label){
  undoSnapshot = JSON.parse(JSON.stringify(STATE));
  clearTimeout(undoTimer);
  const el = document.getElementById('undo-toast');
  el.querySelector('.ut-label').textContent = (label?('"'+label+'" '):'')+'נמחק';
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
function daysUntil(d){ const now=new Date(); now.setHours(0,0,0,0); const dt=new Date(d+"T00:00:00"); return Math.round((dt-now)/86400000); }
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
  else if(activeTab==='route') c.innerHTML = renderRouteTab();
  else if(activeTab==='money') c.innerHTML = renderMoney();
  else if(activeTab==='map') { c.innerHTML = renderMapShell(); initMapIfNeeded(); }
  else if(activeTab==='countries') c.innerHTML = renderCountries();
  else if(activeTab==='more'){ c.innerHTML = renderMore(); if(moreSection==='map') initMapIfNeeded(); }
  else { activeTab='home'; c.innerHTML = renderHome(); }
  renderWhoPill();
  loadVisibleImages();
}

/* =========================================================
   ניווט — לכל אחד הלשוניות שרלוונטיות לו
========================================================= */
function navItems(){
  const common = [
    {tab:'home',  icon:'🏠', label:'בית'},
    {tab:'route', icon:'🧭', label:'המסלול'},
    {tab:'money', icon:'💸', label:'כסף'}
  ];
  // לטליה יש ארבע מדינות לנהל; לאיתי יש שבועיים במדינה אחת, ולכן מפה במקום
  const mid = meId()==='talia'
    ? [{tab:'countries', icon:'🌍', label:'מדינות'}]
    : [{tab:'map', icon:'🗺️', label:'מפה'}];
  return [...common, ...mid, {tab:'more', icon:'🎒', label:'עוד'}];
}
function renderNav(){
  const nav = document.getElementById('bottomnav');
  if(!nav) return;
  nav.innerHTML = navItems().map(n=>
    `<button class="nav-btn ${activeTab===n.tab?'active':''}" data-action="setTab" data-id="${n.tab}">
       <span class="ni">${n.icon}</span>${n.label}
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

const imageCache = Object.assign({}, DEST_IMAGES);
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
  'מוזמן':'booked', 'להזמין':'todo', 'משלמים במקום':'onsite', 'אופציונלי':'optional'
};

/** סכום היום בבאט — בלי השורות המסומנות ״אופציונלי״, בדיוק כמו בגיליון */
function dayTotalBaht(day){
  return day.rows.reduce((sum,r)=> r.status==='אופציונלי' ? sum : sum + (Number(r.baht)||0), 0);
}
function groundTotalBaht(){
  return sh().days.reduce((sum,d)=>sum+dayTotalBaht(d), 0) + (Number(sh().reserveBaht)||0);
}
function sharedCategoryTotals(){
  const totals = {};
  sh().days.forEach(d=>d.rows.forEach(r=>{
    if(r.status==='אופציונלי') return;
    totals[r.cat||'אחר'] = (totals[r.cat||'אחר']||0) + (Number(r.baht)||0);
  }));
  return totals;
}

/** היעדים שרלוונטיים למי שמחובר, לפי סדר התאריכים */
function myDestinations(){
  return allDestinations()
    .filter(d=>mine(d) && !afterMyTrip(d.arrival))
    .sort((a,b)=>(a.arrival||'9999').localeCompare(b.arrival||'9999'));
}

/** איתי חוזר לארץ ב-8/12 — מה שמתחיל אחרי זה כבר לא הטיול שלו */
function afterMyTrip(date){
  if(meId()!=='itai' || !date) return false;
  return date >= splitDate();
}
/**
 * הימים המפורטים מהגיליון ששייכים ליעד מסוים.
 * יום מעבר שייך לתחנה שמגיעים אליה — חוץ מ-8/12, יום הפרידה, ששייך
 * לקאו לק: שם שניהם מתעוררים, ומשם כל אחד נוסע לשדה התעופה.
 */
function daysForDest(dest){
  if(!sh() || !dest.arrival) return [];
  const end = dest.departure || dest.arrival;
  const split = splitDate();
  return sh().days.filter(d=>{
    if(d.date < dest.arrival) return false;
    if(d.date === split) return end === split;   // התחנה שיוצאים ממנה, לא זו שמגיעים אליה
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
      <div class="sm-title">✈️ ${fmtDateShort(splitDate())} — נפרדים בפוקט</div>
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
function renderDestCard(d, index, total){
  const open = expandedDest[d.id] === true;
  const days = daysForDest(d);
  const totalB = days.reduce((n,day)=>n+dayTotalBaht(day),0);
  const mapsLink = 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(d.name + ' ' + (d.countryName||''));
  return `
  <div class="dest-card ${open?'open':''}">
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
      ${d.notes?`<div class="dest-note">${d.notes}</div>`:''}
      ${d.accommodation?`<div class="dest-line">🏨 ${d.accommodation}</div>`:''}
      ${d.transport?`<div class="dest-line">🚕 ${d.transport}</div>`:''}
      <div class="chip-row">
        <a class="chip" href="${mapsLink}" target="_blank" rel="noopener">🗺️ במפה</a>
        ${d.wiki?`<a class="chip" href="https://he.wikipedia.org/wiki/${encodeURIComponent(d.wiki)}" target="_blank" rel="noopener">📖 קצת רקע</a>`:''}
        ${days.length?`<button class="chip strong" data-action="toggleDest" data-id="${d.id}">${open?'▲ לסגור את הימים':'▼ '+days.length+' ימים, שעה אחר שעה'}</button>`:''}
      </div>
      ${days.length?`<div class="dest-cost">${baht(totalB)} · ${ils(toIls(totalB))} לתחנה הזאת</div>`:''}
      ${open?`<div class="day-list">${days.map(day=>renderDayCard(day)).join('')}</div>`:''}
    </div>
  </div>`;
}

function renderDayCard(day){
  const open = expandedDays[day.id] === true;
  const total = dayTotalBaht(day);
  return `
  <div class="day-card">
    <div class="day-head" data-action="toggleDay" data-id="${day.id}">
      <div class="dnum">${day.day}</div>
      <div class="dmain">
        <div class="dtitle">${day.summary || day.dest}</div>
        <div class="dsub">${day.dow} ${fmtDateShort(day.date)} · ${day.rows.length} שורות</div>
      </div>
      <div class="dcost">${baht(total)}<br><span style="font-weight:400;color:var(--muted)">${ils(toIls(total))}</span></div>
    </div>
    ${open ? `<div class="day-rows">${day.rows.map(r=>renderSharedRow(day,r)).join('')}</div>` : ''}
  </div>`;
}

function renderSharedRow(day, r){
  const statusCls = SHARED_STATUS_CLASS[r.status] || 'onsite';
  const meta = [r.loc, r.dur && (r.dur+' שעות'), r.cat].filter(Boolean).join(' · ');
  return `
  <div class="irow ${r.done?'done':''}">
    <input class="icheck" type="checkbox" ${r.done?'checked':''} data-action="toggleSharedRow" data-day="${day.id}" data-id="${r.id}">
    <div class="itime">${r.time||''}</div>
    <div class="ibody">
      <div class="iact">${r.act}</div>
      ${meta?`<div class="imeta">${meta}</div>`:''}
      ${r.notes?`<div class="inotes">${r.notes}</div>`:''}
      <div class="chip-row tight">
        ${r.link?`<a class="chip mini" href="${r.link}" target="_blank" rel="noopener">↗ פתיחה</a>`:''}
        ${r.baht?`<button class="chip mini" data-action="expenseFromRow" data-day="${day.id}" data-id="${r.id}">💸 לרשום כהוצאה</button>`:''}
        <button class="chip mini" data-action="editSharedRow" data-day="${day.id}" data-id="${r.id}">✏️ עריכה</button>
      </div>
    </div>
    <div class="iside">
      ${r.baht?`<span class="ibaht">${baht(r.baht)}</span>`:''}
      <span class="tag-s ${statusCls}">${r.status||''}</span>
    </div>
  </div>`;
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

/** מי חייב למי, אחרי כל ההוצאות וההחזרים */
function balance(){
  let itaiPaid=0, taliaPaid=0, itaiOwes=0, taliaOwes=0;
  wallet().expenses.forEach(x=>{
    const amount = expenseIls(x);
    const shares = splitShares(x);
    if(x.paidBy==='itai') itaiPaid += amount; else taliaPaid += amount;
    itaiOwes += shares.itai; taliaOwes += shares.talia;
  });
  let transfers = 0; // חיובי = איתי העביר לטליה
  (wallet().settlements||[]).forEach(s=>{
    transfers += (s.from==='itai' ? Number(s.amount)||0 : -(Number(s.amount)||0));
  });
  // נטו חיובי = טליה חייבת לאיתי
  const net = (itaiPaid - itaiOwes) + transfers;
  return {itaiPaid, taliaPaid, itaiOwes, taliaOwes, net, total:itaiPaid+taliaPaid};
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

  return `
  <div class="balance-card ${settled?'even':(iAmOwed?'plus':'minus')}">
    <div class="bal-label">${settled ? 'אתם מסודרים' : (iAmOwed ? `${other().name} חייב/ת לך` : `את/ה חייב/ת ל${other().name}`)}</div>
    <div class="bal-amount">${settled ? '✓' : ils(amount)}</div>
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

function renderExpenseList(){
  const list = wallet().expenses.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  if(!list.length) return `<div class="empty small">עוד לא נרשמו הוצאות</div>
    <button class="btn full" data-action="addExpense" style="margin-top:12px">+ הוצאה חדשה</button>`;
  return `
  ${list.map(x=>{
    const shares = splitShares(x);
    const myShare = shares[meId()];
    const iPaid = x.paidBy===meId();
    return `
    <div class="exp-card" data-action="editExpense" data-id="${x.id}">
      <div class="exp-main">
        <div class="exp-title">${x.title}</div>
        <div class="exp-meta">
          ${fmtDateShort(x.date)} · ${expCatLabel(x.category)} ·
          שילם/ה ${personName(x.paidBy)} · ${splitLabel(x)}
        </div>
        ${x.note?`<div class="exp-note">${x.note}</div>`:''}
      </div>
      <div class="exp-side">
        <div class="exp-amount">${x.currency==='THB'?baht(x.amount):ils(x.amount)}</div>
        <div class="exp-share ${iPaid?'plus':'minus'}">
          ${iPaid ? 'שילמת · חלקך '+ils(myShare) : 'חלקך '+ils(myShare)}
        </div>
      </div>
    </div>`;
  }).join('')}
  <button class="btn full" data-action="addExpense" style="margin-top:12px">+ הוצאה חדשה</button>`;
}

function renderMoneyBudget(){
  const b = balance();
  const hasPlan = !!(sh() && sh().days);
  const myBudget = wallet().budgets[meId()] || 0;
  const mySpent = meId()==='itai' ? b.itaiOwes : b.taliaOwes;
  const left = myBudget - mySpent;
  const pct = myBudget ? Math.min(100, Math.round(mySpent/myBudget*100)) : 0;
  const cats = hasPlan ? sharedCategoryTotals() : {};
  const ground = hasPlan ? groundTotalBaht() : 0;

  return `
  <div class="card">
    <div class="row"><b>התקציב שלי</b><span class="small">${ils(mySpent)} מתוך ${ils(myBudget)}</span></div>
    <div class="bar" style="margin-top:10px"><div class="bar-fill ${left<0?'over':''}" style="width:${pct}%"></div></div>
    <div class="small" style="margin-top:8px">
      ${left>=0 ? `נשאר ${ils(left)}` : `<span style="color:var(--danger)">חריגה של ${ils(-left)}</span>`}
      · מחושב מהחלק שלי בהוצאות שנרשמו
    </div>
    <button class="btn secondary full" style="margin-top:12px" data-action="editBudgets">✏️ תקציבים, שער המרה וחלוקה</button>
  </div>

  ${!hasPlan ? '' : `
  <h3 class="section-title" style="margin-top:18px">התכנון לשבועיים המשותפים</h3>
  <div class="small" style="margin-bottom:10px">מה שהגיליון צופה — לעומת מה שבאמת נרשם למעלה.</div>
  <table class="split-table">
    <tr><th>קטגוריה</th><th>בבאט</th><th>בשקלים</th></tr>
    ${Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,amount])=>`
      <tr><td>${cat}</td><td class="num">${baht(amount)}</td><td class="num">${ils(toIls(amount))}</td></tr>`).join('')}
    <tr><td>רזרבה</td><td class="num">${baht(sh().reserveBaht)}</td><td class="num">${ils(toIls(sh().reserveBaht))}</td></tr>
    <tr class="total"><td>סה״כ על הקרקע</td><td class="num">${baht(ground)}</td><td class="num">${ils(toIls(ground))}</td></tr>
  </table>

  <h3 class="section-title" style="margin-top:18px">אם צריך לחתוך</h3>
  ${sh().cuts.map(c=>`<div class="info-row"><b>${c.what} — ${c.save}</b><span>${c.lose}</span></div>`).join('')}`}`;
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
  return sh().info.map(i=>`<div class="info-row"><b>${i.topic}</b><span>${i.detail}</span></div>`).join('');
}

function renderWhoPill(){
  const el = document.getElementById('who-pill');
  if(!el) return;
  el.innerHTML = `${me().emoji} ${me().name} <button data-action="logout">יציאה</button>`;
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
        <b>השבועיים שלך</b>
        <div class="small" style="margin-top:6px">
          נוחתים ב-23/11 בבנגקוק, ארבעה בסיסים, מטוס פנימי אחד, ובלי לילת מעבר.
          הטיסה הביתה: ${STATE.trip.itai.homeFlight}.
        </div>
      </div>` : `
      <div class="card soft">
        <b>אחרי ש${other().name} טס הביתה</b>
        <div class="small" style="margin-top:6px">
          מ-${fmtDateShort(splitDate())} הטיול ממשיך לבד — צ׳יאנג מאי, הקורס בפאי, ואז סרי לנקה, וייטנאם והפיליפינים.
        </div>
      </div>`}
  </div>

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
    ['master','רשימת הכנה'], ['packing','ציוד'], ['bookings','מה סגור'],
    ['info','מידע שימושי'], ['saved','מקומות שמורים'], ['timeline','ציר זמן'],
    ['docs','מסמכים']
  ];
  // לטליה המפה יושבת כאן, כי בניווט התחתון יש לה ״מדינות״ במקום
  if(meId()==='talia') tabs.splice(5, 0, ['map','מפה']);
  if(!tabs.find(t=>t[0]===moreSection)) moreSection = 'master';
  return `
  <div class="section" style="padding-bottom:0;">
    <div class="section-title">עוד</div>
    <div class="subnav">${tabs.map(t=>`<button class="${moreSection===t[0]?'active':''}" data-action="setMore" data-id="${t[0]}">${t[1]}</button>`).join('')}</div>
  </div>
  <div class="section" style="padding-top:0;">
    ${moreSection==='master'?renderMasterChecklist():''}
    ${moreSection==='packing'?renderPacking():''}
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
            <div class="chk-title">${p.item}${p.quantity?(' ×'+p.quantity):''}</div>
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

function openPackingModal(editId){
  const p = editId ? STATE.packingList.find(x=>x.id===editId) : null;
  openModal(`
    <h3 style="margin-bottom:14px;">${p?'עריכת פריט':'פריט חדש לציוד'}</h3>
    <div class="field"><label>קטגוריה (אפשר להקליד קטגוריה חדשה)</label><input id="pk-category" value="${p?p.category:''}" placeholder="לדוגמה: 👕 בגדים"></div>
    <div class="field"><label>שם הפריט</label><input id="pk-item" value="${p?p.item:''}"></div>
    <div class="field-row"><div class="field"><label>כמות</label><input id="pk-qty" value="${p?p.quantity||'':''}" placeholder="לדוגמה: 2"></div>
    <div class="field"><label>סטטוס</label><select id="pk-status"><option value="need" ${p&&p.status==='need'?'selected':''}>לקנות</option><option value="have" ${p&&p.status==='have'?'selected':''}>יש כבר</option><option value="packed" ${p&&p.status==='packed'?'selected':''}>ארוז</option></select></div></div>
    <div class="field"><label>הערות</label><textarea id="pk-notes">${p?p.notes||'':''}</textarea></div>
    <div class="modal-actions"><button class="btn full" id="pk-save">שמירה</button>${p?'<button class="btn ghost" id="pk-delete">מחיקה</button>':''}<button class="btn secondary" id="pk-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('pk-cancel').onclick = closeModal;
    if(p) document.getElementById('pk-delete').onclick = ()=> confirmThenDelete(p.item, ()=>{ STATE.packingList = STATE.packingList.filter(x=>x.id!==p.id); });
    document.getElementById('pk-save').onclick = ()=>{
      const payload = {category:document.getElementById('pk-category').value||'כללי', item:document.getElementById('pk-item').value||'פריט',
        quantity:document.getElementById('pk-qty').value, status:document.getElementById('pk-status').value, notes:document.getElementById('pk-notes').value};
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
      <div class="field"><label>תאריך</label><input id="ex-date" type="date" value="${val('date', new Date().toISOString().slice(0,10))}"></div>
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
        paidBy, split
      };
      if(x) Object.assign(x, payload);
      else wallet().expenses.push({id:uid('x'), settled:false, ...payload});
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
    <div class="field"><label>תאריך</label><input id="st-date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
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
  const statuses = ['מוזמן','להזמין','משלמים במקום','אופציונלי'];
  openModal(`
    <h3 style="margin-bottom:14px;">עריכת שורה · יום ${day.day}</h3>
    <div class="field"><label>מה</label><input id="sr-act" value="${escapeAttr(r.act)}"></div>
    <div class="field"><label>שעה</label><input id="sr-time" value="${escapeAttr(r.time||'')}" placeholder="09:30"></div>
    <div class="field"><label>מיקום</label><input id="sr-loc" value="${escapeAttr(r.loc||'')}"></div>
    <div class="field"><label>עלות בבאט (฿)</label><input id="sr-baht" type="number" inputmode="decimal" value="${r.baht!=null?r.baht:''}"></div>
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
      r.act = document.getElementById('sr-act').value || r.act;
      r.time = document.getElementById('sr-time').value;
      r.loc = document.getElementById('sr-loc').value;
      const bahtValue = document.getElementById('sr-baht').value;
      r.baht = bahtValue==='' ? null : Number(bahtValue);
      r.status = document.getElementById('sr-status').value;
      r.notes = document.getElementById('sr-notes').value;
      persist(); closeModal(); render();
    };
  });
}

function openSharedBudgetModal(){
  const s = sh();
  openModal(`
    <h3 style="margin-bottom:14px;">התקציב המשותף</h3>
    <div class="field"><label>שער המרה · ฿1 בשקלים</label><input id="sb-rate" type="number" step="0.00001" value="${s.rate}"></div>
    <div class="field"><label>רזרבה (฿)</label><input id="sb-reserve" type="number" value="${s.reserveBaht}"></div>
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
      s.rate = Number(document.getElementById('sb-rate').value) || s.rate;
      s.reserveBaht = Number(document.getElementById('sb-reserve').value) || 0;
      s.budgetItai = Number(document.getElementById('sb-bi').value) || 0;
      s.budgetTalia = Number(document.getElementById('sb-bt').value) || 0;
      const split = Number(document.getElementById('sb-si').value);
      if(split > 0 && split < 1){ s.splitItai = split; s.splitTalia = 1 - split; }
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
  else if(action==='toggleDest'){
    expandedDest[id] = !expandedDest[id];
    render();
  }
  else if(action==='toggleDay'){
    expandedDays[id] = !expandedDays[id];
    render();
  }
  else if(action==='toggleSharedRow'){
    const day = sh().days.find(d=>d.id===t.dataset.day);
    const row = day && day.rows.find(r=>r.id===id);
    if(row){ row.done = !row.done; persist(); render(); }
  }
  else if(action==='editSharedRow'){ openSharedRowModal(t.dataset.day, id); }
  else if(action==='expenseFromRow'){
    const day = sh().days.find(d=>d.id===t.dataset.day);
    const row = day && day.rows.find(r=>r.id===id);
    if(row) openExpenseModal(null, {title:row.act, amount:row.baht, currency:'THB', date:day.date, category:catFromSheet(row.cat)});
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


/* INIT */
loadState();

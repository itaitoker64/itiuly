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

function seedData(){
  const bangkokId = uid('d'), islandsId = uid('d'), chiangmaiId = uid('d'), paiId = uid('d');
  const colomboId = uid('d'), mirissaId = uid('d'), ellaId = uid('d'), arugamId = uid('d');
  const hanoiId = uid('d'), manilaId = uid('d');

  return {
    tripName:"My Big Trip 🌏",
    startDate:"2026-11-22",
    endDate:null,
    budgetTotal:50000,
    currency:"ILS",
    countries:[
      {id:"thailand", name:"תאילנד", flag:"🇹🇭", color:"var(--thailand)", order:1, currency:"THB", notes:"",
        destinations:[
          {id:bangkokId, name:"בנגקוק", lat:13.7563, lng:100.5018, arrival:"2026-11-23", departure:"2026-11-27", nights:4, accommodation:"", transport:"טיסה מישראל", notes:"התחלה משותפת עם בן הזוג", budget:2500, status:"planned", companions:["Boyfriend"], order:1},
          {id:islandsId, name:"האיים הדרומיים (קו סמוי/פיפי)", lat:9.5357, lng:100.0623, arrival:"2026-11-27", departure:"2026-12-02", nights:5, accommodation:"", transport:"טיסה פנימית / פרי", notes:"חופים וצלילה עם בן הזוג", budget:4500, status:"planned", companions:["Boyfriend"], order:2},
          {id:chiangmaiId, name:"צ'יאנג מאי", lat:18.7883, lng:98.9853, arrival:"2026-12-02", departure:"2026-12-06", nights:4, accommodation:"", transport:"טיסה פנימית", notes:"תחנת מעבר בדרך לפאי, סיום החלק הזוגי", budget:1800, status:"planned", companions:["Boyfriend"], order:3},
          {id:paiId, name:"פאי — קורס מורים ליוגה", lat:19.3583, lng:98.4383, arrival:"2026-12-06", departure:"2027-01-05", nights:30, accommodation:"", transport:"מיניבאן מצ'יאנג מאי", notes:"קבוע במסלול — לא לזוז. קורס טיטשריניג חודשי.", budget:3000, status:"booked", companions:["Solo"], order:4}
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
      {id:"srilanka", name:"סרי לנקה", flag:"🇱🇰", color:"var(--srilanka)", order:2, currency:"LKR", notes:"",
        destinations:[
          {id:colomboId, name:"קולומבו", lat:6.9271, lng:79.8612, arrival:"2027-01-05", departure:"2027-01-06", nights:1, accommodation:"", transport:"טיסה מתאילנד", notes:"תחנת כניסה", budget:600, status:"planned", companions:["Solo"], order:1},
          {id:mirissaId, name:"מיריסה", lat:5.9483, lng:80.4589, arrival:"2027-01-06", departure:"2027-01-12", nights:6, accommodation:"", transport:"רכבת/אוטובוס", notes:"חופים, גלישה, יוגה", budget:2400, status:"planned", companions:["Solo"], order:2},
          {id:ellaId, name:"אלה", lat:6.8667, lng:81.0466, arrival:"2027-01-12", departure:"2027-01-16", nights:4, accommodation:"", transport:"רכבת ההרים המפורסמת", notes:"טבע, טיולים, נופים", budget:1400, status:"optional", companions:["Solo"], order:3},
          {id:arugamId, name:"ארוגם ביי", lat:6.8400, lng:81.8360, arrival:"2027-01-16", departure:"2027-01-22", nights:6, accommodation:"", transport:"אוטובוס", notes:"גלישה נוספת, חוף רגוע", budget:2000, status:"optional", companions:["Solo"], order:4}
        ],
        prepChecklist:[
          {id:uid('t'), title:"ETA / ויזה אלקטרונית לסרי לנקה", status:"todo", deadline:"2026-12-20", notes:"", link:"", priority:"גבוהה", order:1},
          {id:uid('t'), title:"ביטוח נסיעות — עדכון תאריכים", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:2}
        ],
        transport:[], accommodations:[], budget:defaultBudget()
      },
      {id:"vietnam", name:"וייטנאם", flag:"🇻🇳", color:"var(--vietnam)", order:3, currency:"VND", notes:"המסלול עדיין גמיש",
        destinations:[
          {id:hanoiId, name:"האנוי (רעיון ראשוני)", lat:21.0278, lng:105.8342, arrival:"", departure:"", nights:null, accommodation:"", transport:"", notes:"המסלול עדיין גמיש — לא סופי", budget:null, status:"optional", companions:[], order:1}
        ],
        prepChecklist:[{id:uid('t'), title:"לבדוק דרישת ויזה לווייטנאם", status:"todo", deadline:"", notes:"", link:"", priority:"בינונית", order:1}],
        transport:[], accommodations:[], budget:defaultBudget()
      },
      {id:"philippines", name:"פיליפינים", flag:"🇵🇭", color:"var(--philippines)", order:4, currency:"PHP", notes:"המסלול עדיין גמיש",
        destinations:[
          {id:manilaId, name:"מנילה / פלאוואן (רעיון ראשוני)", lat:14.5995, lng:120.9842, arrival:"", departure:"", nights:null, accommodation:"", transport:"", notes:"המסלול עדיין גמיש — לא סופי", budget:null, status:"optional", companions:[], order:1}
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
      {id:uid('m'), category:"תרופות", title:"להצטייד בערכת תרופות בסיסית", status:"todo", deadline:"", notes:"", priority:"בינונית", link:"", countryId:null, order:7}
    ],
    packingBreakdown:"Osprey Renn 65L לכל הציוד → Osprey Daylite Plus 20L למטוס, נסיעות וטיולי יום → קרוסבודי קטן לטלפון, כסף ודרכון ביום־יום.",
    packingCarryOn:["דרכון","ארנק","טלפון","Power Bank","תרופות למיגרנה","תרופה לבחילות","משקפי שמש","אטמי אוזניים","מסכת עיניים","אוזניות","מגבונים קטנים","טישו","AirTag מחובר למוצ'ילה הגדולה","חולצה + תחתונים להחלפה"],
    packingList:[
      {id:uid('p'), category:"👕 בגדים", item:"4–5 חולצות / גופיות קלילות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"2–3 מכנסיים קצרים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"מכנס ארוך דק ונוח", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"4–5 סטים של בגדי ספורט / יוגה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"טייץ ארוך נוסף", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"שמלה / אאוטפיט אחד יפה לערב", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"חולצה ארוכה דקה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"פליז / סווטשירט דק", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"מעיל גשם / פונצ'ו מתקפל", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"7–8 תחתונים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"2 חזיות רגילות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"3–4 חזיות ספורט", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"4–5 זוגות גרביים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"פיג'מה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"2 בגדי ים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"סרונג", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"כובע", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👕 בגדים", item:"שק כביסה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👟 נעליים", item:"נעלי ספורט / הליכה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👟 נעליים", item:"סנדלים נוחים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"👟 נעליים", item:"כפכפים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"😴 שינה", item:"אטמי אוזניים – 2–3 זוגות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"😴 שינה", item:"מסכת עיניים טובה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"😴 שינה", item:"אוזניות Noise Cancelling", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"😴 שינה", item:"כרית צוואר קומפקטית / מתנפחת", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"😴 שינה", item:"ציפית כרית דקה – אופציונלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"תרופה לבחילות / מחלת נסיעה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"שקיות הקאה קטנות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"סוכריות / מסטיק ג'ינג'ר", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"בקבוק מים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"מגבונים קטנים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🤢 בחילות ונסיעות", item:"טישו", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"תרופות למיגרנה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"משכך כאבים שמתאים לך", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"משקפי שמש", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"חטיף קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"קומפרס קר רב־פעמי – אופציונלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧠 מיגרנות", item:"מרשם / מכתב רפואי באנגלית לתרופות מרשם, במידת הצורך", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"פלסטרים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"פלסטרים לשלפוחיות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"חומר חיטוי קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"משכך כאבים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"תרופה לשלשול", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"ORS / מלחים להחזרת נוזלים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"אנטיהיסטמין", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"דוחה יתושים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"קרם להרגעת עקיצות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🩹 עזרה ראשונה", item:"תרופות קבועות + ספייר", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"שקית רחצה שלא נרטבת", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מברשת שיניים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"משחת שיניים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"דאודורנט", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"שמפו קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מרכך קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"סבון", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מברשת שיער", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"קרם פנים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"קרם הגנה SPF 50 לפנים ולגוף", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מוצרי הטיפוח הקבועים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"סכין גילוח", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"פינצטה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מוצרי מחזור", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"מגבת מיקרופייבר", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧴 רחצה וטיפוח", item:"גליל נייר טואלט קטן / טישו", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"טלפון", status:"have", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"מטען", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"כבל טעינה נוסף", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"Power Bank", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"מתאם חשמל אוניברסלי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"אוזניות", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📱 אלקטרוניקה", item:"AirTag למוצ'ילה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"דרכון", status:"have", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"צילום דרכון", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"עותק דיגיטלי של הדרכון בענן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"רישיון נהיגה", status:"have", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"רישיון נהיגה בינלאומי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"כרטיס אשראי עיקרי", status:"have", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"כרטיס אשראי נוסף – לשמור בנפרד", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"מזומן חירום", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"ביטוח נסיעות + פרטי הפוליסה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"מסמכים רפואיים רלוונטיים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"כמה תמונות פספורט", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🪪 מסמכים וכסף", item:"נרתיק מסמכים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"3–4 Packing Cubes", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"כיסוי גשם למוצ'ילה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"מנעול קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"תיק יום Osprey Daylite Plus 20L – זה שבחרנו", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"תיק צד קטן / קרוסבודי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"Dry Bag קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"כמה שקיות Ziplock", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"חבל כביסה קטן + אטבים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"פנס ראש קטן", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"בקבוק מים רב־פעמי", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"שקית בד מתקפלת", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"עט", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"מחברת קטנה", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"🧳 ציוד לטיול", item:"קלפים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📚 דברים אישיים", item:"תהילים", status:"need", quantity:"", notes:""},
      {id:uid('p'), category:"📚 דברים אישיים", item:"ספר לקריאה", status:"need", quantity:"", notes:""}
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
let activeCountrySection = "prep";
let saveTimer = null;
let leafletMap = null;
let mapMarkers = [];
let mapPolyline = null;
let mapAddMode = false;
let mapFilter = "both";
let expandedCats = {};
let moreSection = "master";
let sharedSection = "days";
let expandedDays = {};
let savedFilter = {country:'', dest:'', category:'', status:''};
let expenseFilter = {country:'', dest:'', category:'', month:'', pay:'', currency:''};
let storageAvailable = true;
let undoSnapshot = null;
let undoTimer = null;

function ensureDefaults(){
  if(!STATE.savedPlaces) STATE.savedPlaces = [];
  if(!STATE.expenses) STATE.expenses = [];
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
  if(source==='manual') openExpenseModal(sourceId);
  else if(source==='transport') openTransportModal(countryId, sourceId);
  else if(source==='stay') openStayModal(countryId, sourceId);
  else if(source==='prepTask') openTaskModal('prep', countryId, sourceId);
  else if(source==='masterTask') openTaskModal('master', null, sourceId);
}
function sourceLabel(source){ return {manual:'הוצאה ידנית', transport:'טיסה/תחבורה', stay:'לינה', prepTask:'משימה', masterTask:'משימה כללית'}[source] || source; }
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
  STATE.countries.forEach(c=>{
    c.prepChecklist.filter(t=>t.status!=='done').slice(0,2).forEach(t=>{ items.push({label:`${c.flag} ${t.title}`, sub: t.deadline? `עד ${fmtDateShort(t.deadline)}`:'ללא דדליין'}); });
    c.transport.filter(f=>f.status==='מחפשת').forEach(f=>{ items.push({label:`${c.flag} להזמין: ${f.from} → ${f.to}`, sub:f.date? fmtDateShort(f.date):''}); });
  });
  return items.slice(0,6);
}
function computeWarnings(){
  let warns=[];
  const dests = allDestinations().filter(d=>d.arrival && d.departure);
  dests.forEach(d=>{ if(!d.accommodation && d.status!=='optional'){ warns.push(`אין עדיין לינה מאושרת ב${d.name}`); } });
  STATE.countries.forEach(c=>{
    c.prepChecklist.forEach(t=>{
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
  document.getElementById('storage-banner').classList.toggle('hidden', storageAvailable);
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===activeTab));
  const c = document.getElementById('content');
  if(activeTab==='home') c.innerHTML = renderHome();
  else if(activeTab==='map') { c.innerHTML = renderMapShell(); initMapIfNeeded(); }
  else if(activeTab==='countries') c.innerHTML = renderCountries();
  else if(activeTab==='timeline') c.innerHTML = renderTimeline();
  else if(activeTab==='more') c.innerHTML = renderMore();
  else if(activeTab==='shared') c.innerHTML = renderShared();
  renderWhoPill();
}

/* =========================================================
   ביחד — השבועיים הראשונים של איתי וטליה
========================================================= */
function sh(){ return STATE.shared; }
function baht(n){ return '฿' + Math.round(n).toLocaleString('he-IL'); }
function ils(n){ return '₪' + Math.round(n).toLocaleString('he-IL'); }
function toIls(bahtAmount){ return (Number(bahtAmount)||0) * (Number(sh().rate)||0); }

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

function renderShared(){
  const s = sh();
  if(!s) return `<div class="section"><div class="card">התוכנית המשותפת לא נטענה.</div></div>`;
  const sections = [
    ['days','יום אחר יום'], ['route','המסלול'], ['bookings','מה סגור'],
    ['hotels','מלונות'], ['budget','תקציב'], ['info','מידע שימושי']
  ];
  const doneCount = s.days.reduce((n,d)=>n+d.rows.filter(r=>r.done).length,0);
  const rowCount = s.days.reduce((n,d)=>n+d.rows.length,0);
  const untilDays = daysUntil(s.startDate);

  let body = '';
  if(sharedSection==='days') body = renderSharedDays();
  else if(sharedSection==='route') body = renderSharedRoute();
  else if(sharedSection==='bookings') body = renderSharedBookings();
  else if(sharedSection==='hotels') body = renderSharedHotels();
  else if(sharedSection==='budget') body = renderSharedBudget();
  else if(sharedSection==='info') body = renderSharedInfo();

  return `
  <div class="hero">
    <div class="hero-top">
      <div>
        <div class="hero-title">${s.title}</div>
        <div class="hero-sub">${s.subtitle}</div>
      </div>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><b>${untilDays>0?untilDays:0}</b><span>ימים להמראה</span></div>
      <div class="hero-stat"><b>${s.nights}</b><span>לילות</span></div>
      <div class="hero-stat"><b>${doneCount}/${rowCount}</b><span>סומן כבוצע</span></div>
    </div>
  </div>
  <div class="section">
    <div class="seg-tabs">
      ${sections.map(([id,label])=>`<button data-action="sharedSection" data-id="${id}" class="${sharedSection===id?'active':''}">${label}</button>`).join('')}
    </div>
    ${body}
  </div>`;
}

function renderSharedDays(){
  return sh().days.map(day=>{
    const open = expandedDays[day.id] !== false; // ברירת מחדל: פתוח
    const total = dayTotalBaht(day);
    return `
    <div class="day-card">
      <div class="day-head" data-action="toggleDay" data-id="${day.id}">
        <div class="dnum">${day.day}</div>
        <div class="dmain">
          <div class="dtitle">${day.dest}${day.summary?(' — '+day.summary):''}</div>
          <div class="dsub">${day.dow} ${fmtDateShort(day.date)} · ${day.rows.length} שורות</div>
        </div>
        <div class="dcost">${baht(total)}<br><span style="font-weight:400;color:var(--muted)">${ils(toIls(total))}</span></div>
      </div>
      ${open ? `<div class="day-rows">${day.rows.map(r=>renderSharedRow(day,r)).join('')}</div>` : ''}
    </div>`;
  }).join('');
}

function renderSharedRow(day, r){
  const statusCls = SHARED_STATUS_CLASS[r.status] || 'onsite';
  const meta = [r.loc, r.dur && (r.dur+' שעות'), r.cat].filter(Boolean).join(' · ');
  return `
  <div class="irow ${r.done?'done':''}">
    <input class="icheck" type="checkbox" ${r.done?'checked':''} data-action="toggleSharedRow" data-day="${day.id}" data-id="${r.id}">
    <div class="itime">${r.time||''}</div>
    <div class="ibody">
      <div class="iact">${r.act}${r.link?` <a href="${r.link}" target="_blank" rel="noopener" style="font-size:11px">↗</a>`:''}</div>
      ${meta?`<div class="imeta">${meta}</div>`:''}
      ${r.notes?`<div class="inotes">${r.notes}</div>`:''}
    </div>
    <div class="iside">
      ${r.baht?`<span class="ibaht">${baht(r.baht)}</span>`:''}
      <span class="tag-s ${statusCls}">${r.status||''}</span>
      <button class="btn mini secondary" data-action="editSharedRow" data-day="${day.id}" data-id="${r.id}">✏️</button>
    </div>
  </div>`;
}

function renderSharedRoute(){
  const s = sh();
  return `
  <h3 class="section-title">הטיסות</h3>
  ${s.flights.map(f=>`
    <div class="card">
      <div style="font-weight:600;font-size:13.5px">${f.what}</div>
      <div class="small" style="margin-top:4px">${f.when} · ${f.time}</div>
      <div class="small" style="margin-top:6px">${f.status} · ${f.cost}</div>
    </div>`).join('')}
  <h3 class="section-title" style="margin-top:18px">ארבעה בסיסים</h3>
  ${s.bases.map(b=>`
    <div class="postcard">
      <div style="font-weight:600;font-size:14px">${b.name} <span class="small">· ${b.nights} לילות</span></div>
      <div class="small" style="margin-top:3px">${b.dates}</div>
      <div class="small" style="margin-top:5px">${b.what}</div>
    </div>`).join('')}`;
}

function renderSharedBookings(){
  const s = sh();
  return `
  <div class="card dashed" style="border-color:var(--terracotta)">
    <b>הדדליין הקרוב · ${fmtDate(s.deadline.date)}</b>
    <div class="small" style="margin-top:5px">${s.deadline.text}</div>
  </div>
  ${s.bookings.map(b=>`
    <div class="card">
      <div style="font-weight:600;font-size:13.5px">${b.what}</div>
      <div class="small" style="margin-top:4px">${[b.when,b.details].filter(Boolean).join(' · ')}</div>
      <div class="small" style="margin-top:6px">${b.payment||''}</div>
      <div class="small" style="margin-top:4px;color:var(--muted)">אישור: ${b.ref||'—'} · ביטול חינם: ${b.freeCancel||'—'}</div>
    </div>`).join('')}`;
}

function renderSharedHotels(){
  return sh().hotels.map(h=>{
    const perNight = Number(h.perNight);
    const nights = Number(h.nights);
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
      <div class="small" style="margin-top:7px;color:var(--muted)">
        ${totalB?`${baht(totalB)} · ${ils(toIls(totalB))} · `:''}ביטול חינם: ${h.freeCancel||'—'}
        ${h.linkLink?` · <a href="${h.linkLink}" target="_blank" rel="noopener">בוקינג ↗</a>`:''}
      </div>
    </div>`;
  }).join('');
}

function renderSharedBudget(){
  const s = sh();
  const cats = sharedCategoryTotals();
  const ground = groundTotalBaht();
  const groundIls = toIls(ground);
  const itaiTotal = s.flightsPaidItai + groundIls*s.splitItai;
  const taliaTotal = s.flightsPaidTalia + groundIls*s.splitTalia;
  const catRows = Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,amount])=>`
    <tr><td>${cat}</td><td class="num">${baht(amount)}</td><td class="num">${ils(toIls(amount))}</td></tr>`).join('');

  return `
  <table class="split-table" style="margin-bottom:16px">
    <tr><th>קטגוריה</th><th>בבאט</th><th>בשקלים</th></tr>
    ${catRows}
    <tr><td>רזרבה</td><td class="num">${baht(s.reserveBaht)}</td><td class="num">${ils(toIls(s.reserveBaht))}</td></tr>
    <tr class="total"><td>סה״כ על הקרקע</td><td class="num">${baht(ground)}</td><td class="num">${ils(groundIls)}</td></tr>
  </table>

  <h3 class="section-title">המספר התחתון <span class="tag">2/3 איתי · 1/3 טליה</span></h3>
  <table class="split-table">
    <tr><th></th><th>איתי</th><th>טליה</th></tr>
    <tr><td>טיסות ששולמו</td><td class="num">${ils(s.flightsPaidItai)}</td><td class="num">${ils(s.flightsPaidTalia)}</td></tr>
    <tr><td>על הקרקע</td><td class="num">${ils(groundIls*s.splitItai)}</td><td class="num">${ils(groundIls*s.splitTalia)}</td></tr>
    <tr class="total"><td>סה״כ</td><td class="num">${ils(itaiTotal)}</td><td class="num">${ils(taliaTotal)}</td></tr>
    <tr><td>התקציב</td><td class="num">${ils(s.budgetItai)}</td><td class="num">${ils(s.budgetTalia)}</td></tr>
    <tr>
      <td>נשאר</td>
      <td class="num ${s.budgetItai-itaiTotal<0?'neg':''}">${ils(s.budgetItai-itaiTotal)}</td>
      <td class="num ${s.budgetTalia-taliaTotal<0?'neg':''}">${ils(s.budgetTalia-taliaTotal)}</td>
    </tr>
  </table>
  <div class="small" style="margin-top:8px">שער ההמרה: ฿1 = ${s.rate} ₪. משנים אותו — והכל מתעדכן.</div>
  <button class="btn secondary full" style="margin-top:10px" data-action="editSharedRate">✏️ עדכון שער, תקציבים ורזרבה</button>

  <h3 class="section-title" style="margin-top:20px">אם צריך לחתוך</h3>
  ${s.cuts.map(c=>`
    <div class="info-row"><b>${c.what} — ${c.save}</b><span>${c.lose}</span></div>`).join('')}`;
}

function renderSharedInfo(){
  return sh().info.map(i=>`<div class="info-row"><b>${i.topic}</b><span>${i.detail}</span></div>`).join('');
}

function renderWhoPill(){
  const el = document.getElementById('who-pill');
  if(!el) return;
  const me = window.TRIP_USER;
  if(!me){ el.innerHTML=''; return; }
  el.innerHTML = `${me.emoji} ${me.displayName} <button data-action="logout">יציאה</button>`;
}

/* ===== HOME ===== */
function renderHome(){
  const days = daysUntil(STATE.startDate);
  const tripDays = days<=0 ? Math.abs(days) : 0;
  const order = [...STATE.countries].sort((a,b)=>a.order-b.order).map(c=>`${c.flag} ${c.name}`).join(' ← ');
  const dests = allDestinations().filter(d=>d.arrival && d.departure);
  const now = new Date();
  let current = dests.find(d=> new Date(d.arrival)<=now && new Date(d.departure)>=now);
  let next = dests.filter(d=>new Date(d.arrival)>now).sort((a,b)=>new Date(a.arrival)-new Date(b.arrival))[0];
  const spent = totalActualSpent();
  const pct = Math.min(100, Math.round((spent/STATE.budgetTotal)*100));
  const nextSteps = computeNextSteps();
  const warnings = computeWarnings();
  const progress = tripProgressPercent();

  return `
  <div class="hero">
    <div class="hero-top">
      <div><div class="hero-title">${STATE.tripName}</div><div class="hero-sub">${fmtDate(STATE.startDate)} → תאריך חזרה עדיין לא ידוע</div></div>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><b>${days>0?days:tripDays}</b><span>${days>0?'ימים לטיסה':'ימים בטיול'}</span></div>
      <div class="hero-stat"><b>${STATE.countries.length}</b><span>מדינות במסלול</span></div>
      <div class="hero-stat"><b>${progress}%</b><span>מהטיול מתוכנן</span></div>
    </div>
  </div>
  <div class="section">
    <div class="card dashed"><div class="muted small" style="margin-bottom:6px;">סדר המסלול</div><div style="font-size:14.5px;font-weight:500;">${order} ← ...</div></div>
    <div class="row" style="gap:10px;">
      <div class="card" style="flex:1;"><div class="muted small">היעד הנוכחי</div><div style="font-weight:700;font-size:15px;margin-top:3px;">${current? current.countryFlag+' '+current.name : 'טרם התחיל'}</div></div>
      <div class="card" style="flex:1;"><div class="muted small">היעד הבא</div><div style="font-weight:700;font-size:15px;margin-top:3px;">${next? next.countryFlag+' '+next.name : '—'}</div></div>
    </div>
    <div class="card">
      <div class="row"><b>תקציב הטיול</b><span class="small muted">${money(spent)} / ${money(STATE.budgetTotal)}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;background:${pct>100?'var(--danger)':'var(--sage)'};"></div></div>
      <div class="muted small">נותרו כ־${money(STATE.budgetTotal-spent)} (לפי הוצאות בפועל, לא כולל קורס היוגה) · <button class="btn ghost small" data-action="addExpense" style="margin-top:6px;">+ הוצאה</button></div>
    </div>
  </div>
  <div class="section" style="padding-top:0;">
    <div class="section-title">מה הצעד הבא <span class="tag">${nextSteps.length}</span></div>
    ${nextSteps.length? nextSteps.map(n=>`<div class="next-card"><span>👉</span><div><div style="font-weight:500;font-size:13.5px;">${n.label}</div><div class="muted small">${n.sub}</div></div></div>`).join('') : `<div class="empty small">הכל סגור לעכשיו ✨</div>`}
  </div>
  ${warnings.length? `<div class="section" style="padding-top:0;"><div class="section-title">התרעות <span class="tag">${warnings.length}</span></div>${warnings.map(w=>`<div class="warning-card"><span>⚠️</span><div class="small">${w}</div></div>`).join('')}</div>`:''}
  `;
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
  <div class="map-legend">${STATE.countries.map(c=>`<div class="legend-chip"><span class="legend-dot" style="background:${getCssVar(c.color)};"></span>${c.flag} ${c.name}</div>`).join('')}</div>
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
    const dests = allDestinations().filter(d=>d.lat && d.lng).sort((a,b)=>(a.arrival||'').localeCompare(b.arrival||''));
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
    STATE.savedPlaces.filter(p=>p.lat && p.lng).forEach(p=>{
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
  const c = findCountry(activeCountry) || STATE.countries[0];
  if(c) activeCountry = c.id;
  return `
  <div class="section" style="padding-bottom:0;">
    <div class="section-title">מדינות</div>
    <div class="pillrow">
      ${STATE.countries.map(co=>`<button class="pill ${co.id===activeCountry?'active':''}" style="--accent:${getCssVar(co.color)}" data-action="setCountry" data-id="${co.id}">${co.flag} ${co.name}</button>`).join('')}
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
  const list = [...c.destinations].sort((a,b)=>(a.order||0)-(b.order||0));
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
  const dests = allDestinations().filter(d=>d.arrival).sort((a,b)=>a.arrival.localeCompare(b.arrival));
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
  return `
  <div class="section" style="padding-bottom:0;">
    <div class="section-title">עוד</div>
    <div class="subnav">${[['master','רשימת הכנה'],['packing','ציוד'],['docs','מסמכים'],['saved','מקומות שמורים'],['expenses','הוצאות']].map(s=>`<button class="${moreSection===s[0]?'active':''}" data-action="setMore" data-id="${s[0]}">${s[1]}</button>`).join('')}</div>
  </div>
  <div class="section" style="padding-top:0;">
    ${moreSection==='master'?renderMasterChecklist():''}
    ${moreSection==='packing'?renderPacking():''}
    ${moreSection==='docs'?renderDocs():''}
    ${moreSection==='saved'?renderSavedGlobal():''}
    ${moreSection==='expenses'?renderExpensesGlobal():''}
  </div>`;
}
function renderMasterChecklist(){
  const list = [...STATE.masterChecklist].sort((a,b)=>(a.order||0)-(b.order||0));
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
  STATE.packingList.forEach(p=>{ (groups[p.category]=groups[p.category]||[]).push(p); });
  return `
  <div class="row" style="margin-bottom:8px;"><b>רשימת ציוד — מוצ'ילה 65L 🎒</b><button class="icon-btn" data-action="addPacking">+</button></div>
  <div class="card dashed"><div class="muted small" style="margin-bottom:4px;font-weight:600;">🎒 חלוקת הציוד</div><div class="small">${STATE.packingBreakdown}</div></div>
  <div class="card"><div class="muted small" style="margin-bottom:4px;font-weight:600;">✈️ בתיק ה־20L בזמן טיסות ומעברים</div><div class="small muted" style="margin-bottom:4px;">את הדברים האלה לא להכניס ל־65L:</div><div class="small">${STATE.packingCarryOn.join(' · ')}</div></div>
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
function renderExpensesGlobal(){
  const countryOpts = STATE.countries.map(c=>`<option value="${c.id}" ${expenseFilter.country===c.id?'selected':''}>${c.flag} ${c.name}</option>`).join('');
  let destOpts = '<option value="">כל היעדים</option>';
  if(expenseFilter.country){ const cc=findCountry(expenseFilter.country); if(cc) destOpts += cc.destinations.map(d=>`<option value="${d.id}" ${expenseFilter.dest===d.id?'selected':''}>${d.name}</option>`).join(''); }
  const catOpts = EXPENSE_CATEGORIES.map(c=>`<option value="${c.id}" ${expenseFilter.category===c.id?'selected':''}>${c.label}</option>`).join('');
  const payOpts = ['מתוכנן','הוזמן','שולם'].map(s=>`<option value="${s}" ${expenseFilter.pay===s?'selected':''}>${s}</option>`).join('');

  let all = allExpenseRows();
  const months = [...new Set(all.map(r=>r.date? r.date.slice(0,7):null).filter(Boolean))].sort();
  const monthOpts = months.map(m=>{
    const label = new Date(m+'-01T00:00:00').toLocaleDateString('he-IL',{month:'long',year:'numeric'});
    return `<option value="${m}" ${expenseFilter.month===m?'selected':''}>${label}</option>`;
  }).join('');
  const currencies = [...new Set(all.map(r=>r.localCurrency).filter(Boolean))];
  const curOpts = currencies.map(cu=>`<option value="${cu}" ${expenseFilter.currency===cu?'selected':''}>${cu}</option>`).join('');

  let list = all;
  if(expenseFilter.country) list = list.filter(r=>r.countryId===expenseFilter.country);
  if(expenseFilter.dest) list = list.filter(r=>r.destinationId===expenseFilter.dest);
  if(expenseFilter.category) list = list.filter(r=>r.category===expenseFilter.category);
  if(expenseFilter.month) list = list.filter(r=>r.date && r.date.slice(0,7)===expenseFilter.month);
  if(expenseFilter.pay) list = list.filter(r=>r.paymentStatus===expenseFilter.pay);
  if(expenseFilter.currency) list = list.filter(r=>r.localCurrency===expenseFilter.currency);
  list = list.sort((a,b)=>(b.date||'').localeCompare(a.date||''));

  const sAll = spendSummary(all);
  return `
  <div class="row" style="margin-bottom:10px;"><b>הוצאות 💸</b><button class="btn small" data-action="addExpense">+ הוצאה (אחר)</button></div>
  <div class="muted small" style="margin-bottom:10px;">כל הוצאה שנרשמת בכל מסך באפליקציה (טיסה, לינה, משימה עם עלות) מופיעה כאן פעם אחת — אין הזנה כפולה.</div>
  <div class="cat-grid">
    <div class="cat-chip"><span>💰 תקציב כולל</span><b>${money(STATE.budgetTotal)}</b></div>
    <div class="cat-chip"><span>🗓️ מתוכנן</span><b>${money(sAll.planned)}</b></div>
    <div class="cat-chip"><span>📌 הוזמן</span><b>${money(sAll.booked)}</b></div>
    <div class="cat-chip"><span>✅ שולם</span><b>${money(sAll.paid)}</b></div>
    <div class="cat-chip"><span>📊 הוצאה בפועל</span><b>${money(sAll.actual)}</b></div>
    <div class="cat-chip"><span>💸 נותר בתקציב</span><b>${money(STATE.budgetTotal-sAll.actual)}</b></div>
  </div>
  <div class="filters-grid" style="margin-top:10px;">
    <select data-action="setExpenseFilter" data-key="country"><option value="">כל המדינות</option>${countryOpts}</select>
    <select data-action="setExpenseFilter" data-key="dest">${destOpts}</select>
    <select data-action="setExpenseFilter" data-key="category"><option value="">כל הקטגוריות</option>${catOpts}</select>
    <select data-action="setExpenseFilter" data-key="month"><option value="">כל החודשים</option>${monthOpts}</select>
    <select data-action="setExpenseFilter" data-key="pay"><option value="">כל סטטוסי התשלום</option>${payOpts}</select>
    ${currencies.length?`<select data-action="setExpenseFilter" data-key="currency"><option value="">כל המטבעות</option>${curOpts}</select>`:''}
  </div>
  ${list.length? list.map(r=>{
    const c = findCountry(r.countryId); const dest = r.destinationId?findDestination(r.countryId,r.destinationId):null;
    return `<div class="place-card">
      <div class="row"><b>${money(r.amountILS)}</b><span class="small muted">${fmtDateShort(r.date)}</span></div>
      <div class="muted small" style="margin:3px 0;">${expCatLabel(r.category)}${c?(' · '+c.flag+' '+c.name):''}${dest?(' · '+dest.name):''}${r.localAmount?(' · '+r.localAmount+' '+(r.localCurrency||'')):''} · ${r.paymentStatus}</div>
      <div class="small">${r.description}${r.note?(' — '+r.note):''}</div>
      <div class="row" style="margin-top:6px;"><span class="small muted">מקור: ${sourceLabel(r.source)}</span><div class="place-actions">${r.source==='manual'?`<button data-action="dup" data-type="expense" data-id="${r.sourceId}">⎘</button>`:''}<button data-action="editExpenseRow" data-source="${r.source}" data-country="${r.countryId||''}" data-sourceid="${r.sourceId}">✎</button><button data-action="confirmDelExpenseRow" data-source="${r.source}" data-country="${r.countryId||''}" data-sourceid="${r.sourceId}" data-label="${r.description}">✕</button></div></div>
    </div>`;
  }).join('') : `<div class="empty small">אין הוצאות שתואמות את הסינון</div>`}
  `;
}

/* =========================================================
   MODAL SYSTEM
========================================================= */
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
        notes: document.getElementById('f-notes').value, lat: d? d.lat : lat, lng: d? d.lng : lng, companions: d? d.companions : []
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
      else if(kind==='master') STATE.masterChecklist.push({id:uid('m'), order:STATE.masterChecklist.length+1, ...payload});
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
      if(p) Object.assign(p,payload); else STATE.packingList.push({id:uid('p'), ...payload});
      persist(); closeModal(); render();
    };
  });
}

function openExpenseModal(editId, presetCountry){
  const e = editId ? STATE.expenses.find(x=>x.id===editId) : null;
  const countryId = e? e.countryId : (presetCountry||STATE.countries[0].id);
  const countryOptions = STATE.countries.map(co=>`<option value="${co.id}" ${countryId===co.id?'selected':''}>${co.flag} ${co.name}</option>`).join('');
  const destOptions = ()=>{
    const cc = findCountry(document.getElementById('ex-country')?document.getElementById('ex-country').value:countryId);
    return '<option value="">ללא יעד ספציפי</option>'+(cc?cc.destinations.map(d=>`<option value="${d.id}" ${e&&e.destinationId===d.id?'selected':''}>${d.name}</option>`).join(''):'');
  };
  const catOptions = EXPENSE_CATEGORIES.map(c=>`<option value="${c.id}" ${e&&e.category===c.id?'selected':''}>${c.label}</option>`).join('');
  openModal(`
    <h3 style="margin-bottom:14px;">${e?'עריכת הוצאה':'הוצאה חדשה'}</h3>
    <div class="field"><label>סכום בשקלים (₪) — משמש לחישוב התקציב</label><input type="number" id="ex-ils" value="${e?e.amountILS||'':''}"></div>
    <div class="field-row"><div class="field"><label>סכום במטבע מקומי (לא חובה)</label><input type="number" id="ex-local" value="${e?e.localAmount||'':''}"></div><div class="field"><label>מטבע מקומי</label><input id="ex-currency" value="${e?e.localCurrency||'':''}" placeholder="THB / LKR..."></div></div>
    <div class="field-row"><div class="field"><label>מדינה</label><select id="ex-country">${countryOptions}</select></div><div class="field"><label>יעד / עיר</label><select id="ex-dest">${destOptions()}</select></div></div>
    <div class="field-row"><div class="field"><label>קטגוריה</label><select id="ex-category">${catOptions}</select></div><div class="field"><label>תאריך</label><input type="date" id="ex-date" value="${e?e.date||'':''}"></div></div>
    <div class="field"><label>סטטוס תשלום</label><select id="ex-paystatus">${['מתוכנן','הוזמן','שולם'].map(s=>`<option value="${s}" ${e&&e.paymentStatus===s?'selected':(!e&&s==='שולם'?'selected':'')}>${s}</option>`).join('')}</select></div>
    <div class="field"><label>הערה</label><input id="ex-note" value="${e?e.note||'':''}"></div>
    <div class="modal-actions"><button class="btn full" id="ex-save">שמירה</button>${e?'<button class="btn ghost" id="ex-delete">מחיקה</button>':''}<button class="btn secondary" id="ex-cancel">ביטול</button></div>
  `, ()=>{
    document.getElementById('ex-cancel').onclick = closeModal;
    document.getElementById('ex-country').onchange = ()=>{ document.getElementById('ex-dest').innerHTML = destOptions(); };
    if(e) document.getElementById('ex-delete').onclick = ()=> confirmThenDelete('הוצאה', ()=>{ STATE.expenses = STATE.expenses.filter(x=>x.id!==e.id); });
    document.getElementById('ex-save').onclick = ()=>{
      const payload = {amountILS:document.getElementById('ex-ils').value||0, localAmount:document.getElementById('ex-local').value,
        localCurrency:document.getElementById('ex-currency').value, countryId:document.getElementById('ex-country').value,
        destinationId:document.getElementById('ex-dest').value||null, category:document.getElementById('ex-category').value,
        date:document.getElementById('ex-date').value, paymentStatus:document.getElementById('ex-paystatus').value, note:document.getElementById('ex-note').value};
      if(e) Object.assign(e,payload); else STATE.expenses.push({id:uid('exp'), ...payload});
      persist(); closeModal(); render();
    };
  });
}

/* ===== מודאלים של הפרק המשותף ===== */
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

  if(action==='sharedSection'){ sharedSection=id; render(); }
  else if(action==='toggleDay'){
    expandedDays[id] = expandedDays[id]===false ? true : false;
    render();
  }
  else if(action==='toggleSharedRow'){
    const day = sh().days.find(d=>d.id===t.dataset.day);
    const row = day && day.rows.find(r=>r.id===id);
    if(row){ row.done = !row.done; persist(); render(); }
  }
  else if(action==='editSharedRow'){ openSharedRowModal(t.dataset.day, id); }
  else if(action==='editSharedRate'){ openSharedBudgetModal(); }
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

document.querySelectorAll('.nav-btn').forEach(b=>{ b.addEventListener('click', ()=>{ activeTab=b.dataset.tab; render(); }); });

/* INIT */
loadState();

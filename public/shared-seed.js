/* התוכנית המשותפת לשבועיים הראשונים — נוצר מתוך הקובץ של טליה */
window.SHARED_SEED = {
 "title": "תאילנד · מבנגקוק לאנדמן",
 "subtitle": "איתי וטליה · 22 בנובמבר – 8 בדצמבר 2026 · 15 לילות",
 "startDate": "2026-11-22",
 "endDate": "2026-12-08",
 "nights": 15,
 "rate": 0.08981,
 "splitItai": 0.6667,
 "splitTalia": 0.3333,
 "budgetItai": 12000,
 "budgetTalia": 8000,
 "flightsPaidItai": 3777,
 "flightsPaidTalia": 1891,
 "reserveBaht": 10000,
 "bases": [
  {
   "name": "בנגקוק",
   "dates": "ב׳ 23/11 – ד׳ 25/11",
   "nights": 3,
   "what": "לוי קראתונג, הארמון, ISB, רג׳אדמנרן"
  },
  {
   "name": "קו יאו נוי",
   "dates": "ה׳ 26/11 – ש׳ 28/11",
   "nights": 3,
   "what": "מחנה מואיי תאי · מפרץ פאנג נגה"
  },
  {
   "name": "אאו נאנג",
   "dates": "א׳ 29/11 – ג׳ 1/12",
   "nights": 3,
   "what": "ריילאי, קורס טיפוס, קיאקים באאו תלאנה"
  },
  {
   "name": "קאו לק",
   "dates": "ד׳ 2/12 – ב׳ 7/12",
   "nights": 6,
   "what": "פרק ה-wellness · יום אחד באגם צ׳או לאן"
  }
 ],
 "flights": [
  {
   "when": "א׳ 22/11",
   "what": "ארקיע IZ591 · תל אביב → בנגקוק, ישירה",
   "time": "21:30 → 13:15 ב-23/11",
   "status": "מוזמן · IL-603978",
   "cost": "₪3,777 לשניים · שולם"
  },
  {
   "when": "ה׳ 26/11",
   "what": "Thai Vietjet VZ314 · בנגקוק → פוקט, Deluxe",
   "time": "06:50 → 08:25, ישירה",
   "status": "להזמין",
   "cost": "฿4,720 לשניים · 20 ק״ג לכל אחד"
  },
  {
   "when": "ג׳ 8/12",
   "what": "ארקיע IZ598 · פוקט → תל אביב, ישירה",
   "time": "17:20 → 23:00",
   "status": "מוזמן · IL-604062",
   "cost": "₪1,891 · שולם"
  }
 ],
 "days": [
  {
   "day": 1,
   "date": "2026-11-23",
   "dow": "ב׳",
   "dest": "בנגקוק",
   "rows": [
    {
     "time": "13:15",
     "dur": "",
     "act": "נחיתה — ארקיע IZ591",
     "loc": "סובארנבומי",
     "cat": "תחבורה",
     "baht": null,
     "status": "מוזמן",
     "link": "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport+Bangkok",
     "notes": "IL-603978 · המריאה 21:30 ב-22/11",
     "id": "s_1_0",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "key": "outbound",
       "match": "IZ591",
       "totalIls": 3777,
       "rows": 1,
       "category": "flights",
       "split": "ratio"
      }
     }
    },
    {
     "time": "13:15",
     "dur": "1:00",
     "act": "הגירה, כבודה, כספומט",
     "loc": "טרמינל נכנסים",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "כספומט: ฿220 עמלה קבועה לכל משיכה — למשוך גדול",
     "id": "s_1_1",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:00",
     "dur": "0:15",
     "act": "סים תיירים AIS או True",
     "loc": "דוכן רשמי, טרמינל נכנסים",
     "cat": "אחר",
     "baht": 1600,
     "status": "משלמים במקום",
     "link": "",
     "notes": "฿300–600 לאדם לשבועיים דאטה. רק בדוכן הרשמי",
     "id": "s_1_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "שני כרטיסי SIM: מחירון AIS ל-15 יום ועוד מרווח להשלמת היום ה-16 או לחבילה ארוכה יותר.",
      "lowFactor": 0.87375,
      "highFactor": 1.25,
      "sourceUrl": "https://www.ais.th/en/consumers/package/international/tourist-plan",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:20",
     "dur": "0:30",
     "act": "רכבת שדה התעופה לפאיה תאי",
     "loc": "ARL · סובארנבומי → פאיה תאי",
     "cat": "תחבורה",
     "baht": 90,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Airport+Rail+Link+Phaya+Thai+Station+Bangkok",
     "notes": "฿45 לאדם · מנצחת מונית בשעה הזאת",
     "id": "s_1_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:55",
     "dur": "0:25",
     "act": "BTS מפאיה תאי לאסוק",
     "loc": "BTS · סיאם → אסוק",
     "cat": "תחבורה",
     "baht": 90,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Asok+BTS+Station+Bangkok",
     "notes": "החלפה בסיאם · המלון 5 דק׳ הליכה מאסוק",
     "id": "s_1_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:30",
     "dur": "",
     "act": "צ׳ק-אין — מונטראג׳",
     "loc": "סוי סוכומוויט 14",
     "cat": "אחר",
     "baht": null,
     "status": "מוזמן",
     "link": "",
     "notes": "צ׳ק-אין מ-14:00 · פיקדון ฿1,000 מזומן, מוחזר בצ׳ק-אאוט",
     "id": "s_1_5",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "16:30",
     "dur": "2:00",
     "act": "MBK וסנטרל וורלד",
     "loc": "סיאם",
     "cat": "אחר",
     "baht": 2000,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=MBK+Center+Bangkok",
     "notes": "עושים את הקניונים היום כדי לא לדחוס אותם ליום החופשי",
     "id": "s_1_6",
     "done": false,
     "wiki": "MBK Center",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "תקציב קניות אישי לבחירה, מעבר לכניסה החופשית לקניונים.",
      "lowFactor": 0.5,
      "highFactor": 2,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "optional": true
     }
    },
    {
     "time": "19:30",
     "dur": "2:30",
     "act": "ארוחת ערב ביאווארט",
     "loc": "צ׳יינטאון",
     "cat": "אוכל",
     "baht": 700,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Yaowarat+Road+Chinatown+Bangkok",
     "notes": "שרימפס נהר צלויים, חביתת צדפות, גוואי ג׳אב, מנגו סטיקי רייס",
     "id": "s_1_7",
     "done": false,
     "wiki": "Yaowarat Road",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "22:15",
     "dur": "0:25",
     "act": "גראב חזרה למלון",
     "loc": "יאווארט → סוכומוויט",
     "cat": "תחבורה",
     "baht": 180,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_1_8",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Montraj Coach Sukhumvit",
     "loc": "סוי סוכומוויט 14",
     "cat": "לינה",
     "baht": 4186.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "אישור 5123136373 · ₪1,128 לשלושת הלילות · בריכה על הגג · ביטול חינם עד 20/11 · משלמים במקום",
     "id": "s_1_9",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "bangkok",
       "match": "Montraj Coach",
       "totalIls": 1128,
       "rows": 3
      }
     }
    },
    {
     "id": "s_1_atm",
     "act": "עמלות כספומט — לכל הטיול",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "אחר",
     "baht": 500,
     "status": "משלמים במקום",
     "notes": "מרווח לשתי משיכות; עמלת הכרטיס הישראלי עשויה להתווסף.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "מרווח לשתי משיכות; עמלת הכרטיס הישראלי עשויה להתווסף.",
      "lowFactor": 0.8,
      "highFactor": 1.4,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "other",
      "split": "ratio"
     }
    },
    {
     "id": "s_1_laundry",
     "act": "כביסה, מים ונשנושים — לכל הטיול",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "אחר",
     "baht": 1500,
     "status": "משלמים במקום",
     "notes": "תקציב משותף מעבר לארוחות הרשומות ולמה שכלול בסיורים.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "תקציב משותף מעבר לארוחות הרשומות ולמה שכלול בסיורים.",
      "lowFactor": 0.6666666666666666,
      "highFactor": 1.6,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "other",
      "split": "ratio"
     }
    },
    {
     "id": "s_1_tips",
     "act": "טיפים והוצאות קטנות — לכל הטיול",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "אחר",
     "baht": 600,
     "status": "משלמים במקום",
     "notes": "מרווח תכנון, לא תשלום חובה.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "מרווח תכנון, לא תשלום חובה.",
      "lowFactor": 0.5,
      "highFactor": 2,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "other",
      "split": "ratio"
     }
    },
    {
     "id": "s_1_insurance",
     "act": "ביטוח נסיעות של איתי — הקצבה",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "notes": "הקצבה בשקלים, לא הצעת ביטוח. מחיר וכיסוי לאימונים תלויים בהצעה האישית.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "הקצבה בשקלים, לא הצעת ביטוח. מחיר וכיסוי לאימונים תלויים בהצעה האישית.",
      "lowFactor": 0.5714285714285714,
      "highFactor": 1.7142857142857142,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "visasInsurance",
      "split": "full-itai",
      "fixedIls": 350
     }
    },
    {
     "id": "s_1_airport_il",
     "act": "נסיעות נתב״ג של איתי — הלוך וחזור",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "תחבורה",
     "baht": null,
     "status": "משלמים במקום",
     "notes": "אומדן בשקלים; תלוי במוצא ובבחירת רכבת או מונית.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן בשקלים; תלוי במוצא ובבחירת רכבת או מונית.",
      "lowFactor": 0.4,
      "highFactor": 2,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "transport",
      "split": "full-itai",
      "fixedIls": 250
     }
    }
   ],
   "summary": "לנחות, ולאכול",
   "id": "day_1"
  },
  {
   "day": 2,
   "date": "2026-11-24",
   "dow": "ג׳",
   "dest": "בנגקוק",
   "rows": [
    {
     "time": "07:15",
     "dur": "0:30",
     "act": "ארוחת בוקר",
     "loc": "ליד המלון",
     "cat": "אוכל",
     "baht": 250,
     "status": "משלמים במקום",
     "link": "",
     "notes": "המלון לא כולל ארוחת בוקר",
     "id": "s_2_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "07:50",
     "dur": "0:50",
     "act": "BTS לסאפאן טקסין + סירת נהר לתא טיין",
     "loc": "אסוק → תא טיין",
     "cat": "תחבורה",
     "baht": 130,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Tha+Tien+Pier+Bangkok",
     "notes": "BTS עד סאפאן טקסין, ואז Chao Phraya Express קו כתום",
     "id": "s_2_1",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:40",
     "dur": "2:00",
     "act": "הארמון המלכותי",
     "loc": "Grand Palace",
     "cat": "אטרקציות",
     "baht": 1000,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Grand+Palace+Bangkok",
     "notes": "฿500 לאדם · פתיחה 08:30, כניסה אחרונה 15:30 · כתפיים וברכיים מכוסות, נאכף",
     "id": "s_2_2",
     "done": false,
     "wiki": "Grand Palace",
     "priceEstimate": {
      "kind": "published",
      "basis": "מחירון הארמון: שני מבוגרים. לבדוק מחיר סמוך לביקור.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "https://www.royalgrandpalace.th/en/buy-ticket",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:50",
     "dur": "1:30",
     "act": "ואט פו — הבודהה השוכב",
     "loc": "Wat Pho",
     "cat": "אטרקציות",
     "baht": 600,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Wat+Pho+Bangkok",
     "notes": "฿300 לאדם · 46 מטר · אותו קוד לבוש",
     "id": "s_2_3",
     "done": false,
     "wiki": "Wat Pho",
     "priceEstimate": {
      "kind": "published",
      "basis": "מחירון ואט פו: שני מבוגרים.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "https://watpho.org/en/contact/plan",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:30",
     "dur": "1:00",
     "act": "צהריים ליד ואט פו",
     "loc": "ראטנקוסין",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_2_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:00",
     "dur": "2:30",
     "act": "חזרה למלון ומנוחה",
     "loc": "סוכומוויט",
     "cat": "תחבורה",
     "baht": 130,
     "status": "משלמים במקום",
     "link": "",
     "notes": "סירה ו-BTS חזרה · הערב ארוך",
     "id": "s_2_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:00",
     "dur": "0:20",
     "act": "קניית קראתונגים ברחוב",
     "loc": "ליד הנהר",
     "cat": "אטרקציות",
     "baht": 150,
     "status": "משלמים במקום",
     "link": "",
     "notes": "฿50–100 · מעלה בננה, לא קלקר",
     "id": "s_2_6",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:30",
     "dur": "3:00",
     "act": "ארוחת לוי קראתונג — סאלה ראטנקוסין",
     "loc": "39 Maharat Road, מול ואט ארון",
     "cat": "אוכל",
     "baht": 2800,
     "status": "להזמין",
     "link": "https://www.tablecheck.com/en/salarattanokosin-eateryandbar/reserve/message",
     "notes": "הלילה הכי מבוקש בשנה · תפריט סט מראש · wineanddine@salarattanakosin.com · גיבוי: פרה נאקהון או איקון סיאם",
     "id": "s_2_7",
     "done": false,
     "wiki": "Wat Arun",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "20:30",
     "dur": "1:30",
     "act": "השקת הקראתונגים וזיקוקים",
     "loc": "גדת ואט ארון",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Wat+Arun+Bangkok",
     "notes": "ליל הירח המלא של החודש הירחי ה-12 — אומת לשני מקורות",
     "id": "s_2_8",
     "done": false,
     "wiki": "Loy Krathong",
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "22:30",
     "dur": "0:40",
     "act": "גראב חזרה",
     "loc": "ראטנקוסין → סוכומוויט",
     "cat": "תחבורה",
     "baht": 300,
     "status": "משלמים במקום",
     "link": "",
     "notes": "תעריף מוגבר בליל החג",
     "id": "s_2_9",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Montraj Coach Sukhumvit",
     "loc": "סוכומוויט",
     "cat": "לינה",
     "baht": 4186.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "",
     "id": "s_2_10",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "bangkok",
       "match": "Montraj Coach",
       "totalIls": 1128,
       "rows": 3
      }
     }
    }
   ],
   "summary": "העיר העתיקה ביום, הנהר בלילה — לוי קראתונג",
   "id": "day_2"
  },
  {
   "day": 3,
   "date": "2026-11-25",
   "dow": "ד׳",
   "dest": "בנגקוק",
   "rows": [
    {
     "time": "06:40",
     "dur": "0:20",
     "act": "גראב לפארק לומפיני",
     "loc": "סוכומוויט → לומפיני",
     "cat": "תחבורה",
     "baht": 120,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Lumphini+Park+Bangkok",
     "notes": "",
     "id": "s_3_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "07:00",
     "dur": "1:30",
     "act": "פארק לומפיני — התעמלות בוקר",
     "loc": "Lumphini Park",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Lumphini+Park+Bangkok",
     "notes": "חינם · טאי צ׳י עם הזקנים, וורנים באגם",
     "id": "s_3_1",
     "done": false,
     "wiki": "Lumphini Park",
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:40",
     "dur": "0:35",
     "act": "ארוחת בוקר",
     "loc": "ליד הפארק",
     "cat": "אוכל",
     "baht": 300,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:20",
     "dur": "1:00",
     "act": "גראב ל-ISB בפאקרט",
     "loc": "בנגקוק → פאקרט",
     "cat": "תחבורה",
     "baht": 500,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=International+School+Bangkok+Pakkret",
     "notes": "40–60 דקות, תלוי בפקקים",
     "id": "s_3_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:30",
     "dur": "2:30",
     "act": "ISB — ביקור בוגרים",
     "loc": "פאקרט",
     "cat": "אטרקציות",
     "baht": null,
     "status": "להזמין",
     "link": "https://www.isb.ac.th/community/alumni",
     "notes": "isbalum@isb.ac.th לפחות יומיים מראש · נסגר 14:25 · תעודה מזהה בשער · לבדוק חופשת חג ההודיה ב-26/11",
     "id": "s_3_4",
     "done": false,
     "wiki": "International School Bangkok",
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:10",
     "dur": "0:50",
     "act": "צהריים באזור",
     "loc": "פאקרט",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:10",
     "dur": "1:00",
     "act": "גראב חזרה למרכז",
     "loc": "פאקרט → סוכומוויט",
     "cat": "תחבורה",
     "baht": 500,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_6",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:45",
     "dur": "1:15",
     "act": "מסאז׳ תאילנדי",
     "loc": "סוכומוויט",
     "cat": "אטרקציות",
     "baht": 700,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_7",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:40",
     "dur": "0:30",
     "act": "גראב לרג׳אדמנרן",
     "loc": "סוכומוויט → רג׳אדמנרן",
     "cat": "תחבורה",
     "baht": 200,
     "status": "אופציונלי",
     "link": "",
     "notes": "",
     "id": "s_3_8",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "18:15",
     "dur": "3:00",
     "act": "מואיי תאי באצטדיון רג׳אדמנרן",
     "loc": "Rajadamnern Stadium",
     "cat": "אטרקציות",
     "baht": 3000,
     "status": "להזמין",
     "link": "https://rajadamnern.com/tickets/",
     "notes": "קרבות יום רביעי מ-18:00 · מחלקה שלישית ฿1,000 לאדם · הכנה למחנה שמתחיל מחר",
     "id": "s_3_9",
     "done": false,
     "wiki": "Rajadamnern Stadium",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "תקציב לשני כרטיסים; המחיר משתנה לפי אירוע ומושב. אינו מחיר מאושר ל-25/11.",
      "lowFactor": 0.6666666666666666,
      "highFactor": 1.3333333333333333,
      "sourceUrl": "https://rajadamnern.com/tickets/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "21:30",
     "dur": "1:15",
     "act": "שוק לילה וארוחת ערב",
     "loc": "בנגקוק",
     "cat": "אוכל",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_10",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "22:50",
     "dur": "0:25",
     "act": "גראב חזרה",
     "loc": "→ סוכומוויט",
     "cat": "תחבורה",
     "baht": 180,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_3_11",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Montraj Coach Sukhumvit",
     "loc": "סוכומוויט",
     "cat": "לינה",
     "baht": 4186.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "",
     "id": "s_3_12",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "bangkok",
       "match": "Montraj Coach",
       "totalIls": 1128,
       "rows": 3
      }
     }
    },
    {
     "id": "s_3_dream",
     "time": "",
     "dur": "7:00",
     "act": "רעיון: יום בדרים וורלד",
     "loc": "רנגסיט, צפונית לבנגקוק",
     "cat": "אטרקציות",
     "baht": 2400,
     "status": "אופציונלי",
     "link": "https://www.google.com/maps/search/?api=1&query=Dream+World+Bangkok",
     "wiki": "Dream World (amusement park)",
     "done": false,
     "notes": "฿1,200 לאדם · יום שלם, ועוד שעה נסיעה לכל כיוון · לא נכנס בשלושת ימי בנגקוק בלי לוותר על ISB או על רג׳אדמנרן — להחליט מראש, לא באותו בוקר",
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    }
   ],
   "summary": "לומפיני, ISB, ושוק לילה",
   "id": "day_3"
  },
  {
   "day": 4,
   "date": "2026-11-26",
   "dow": "ה׳",
   "dest": "קו יאו נוי",
   "rows": [
    {
     "time": "04:30",
     "dur": "0:30",
     "act": "השכמה ואריזה",
     "loc": "המלון",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "היום הכי קשה במסלול · שקול להעביר את הטיסה ל-09:00–10:00 ולוותר על אימון ההגעה",
     "id": "s_4_0",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "05:00",
     "dur": "0:45",
     "act": "גראב לסובארנבומי",
     "loc": "סוכומוויט → BKK",
     "cat": "תחבורה",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "לפני שהפקקים מתחילים",
     "id": "s_4_1",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "05:50",
     "dur": "1:00",
     "act": "צ׳ק-אין, כבודה ובידוק",
     "loc": "טרמינל יוצאים",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_4_2",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "06:50",
     "dur": "1:35",
     "act": "Thai Vietjet VZ314 · בנגקוק → פוקט",
     "loc": "סובארנבומי → HKT",
     "cat": "תחבורה",
     "baht": 4720,
     "status": "להזמין",
     "link": "https://www.vietjetair.com/",
     "notes": "Deluxe · ישירה · 20 ק״ג לכל אחד, בחירת מושב ושינוי תאריך · ฿738 מעל הזול",
     "id": "s_4_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן לשני כרטיסי טיסה עם כבודה לפי התכנון הקודם; טרם נבדקה הצעה לתאריך הנסיעה.",
      "lowFactor": 0.85,
      "highFactor": 1.5,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "flights"
     }
    },
    {
     "time": "08:25",
     "dur": "0:35",
     "act": "נחיתה וכבודה",
     "loc": "פוקט",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_4_4",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:00",
     "dur": "0:30",
     "act": "מונית לרציף באנג רונג",
     "loc": "HKT → Bang Rong Pier",
     "cat": "תחבורה",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Bang+Rong+Pier+Phuket",
     "notes": "25–30 דקות — הסיבה לטוס לפוקט ולא לקראבי",
     "id": "s_4_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:35",
     "dur": "0:25",
     "act": "המתנה ברציף וכרטיסים",
     "loc": "באנג רונג",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "סירות: 08:40, 10:00, 11:00, 12:30, 13:30, 14:30, 16:00, 17:00",
     "id": "s_4_6",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:00",
     "dur": "0:35",
     "act": "ספידבוט לקו יאו נוי",
     "loc": "באנג רונג → רציף מאנו",
     "cat": "תחבורה",
     "baht": 1100,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Manoh+Pier+Koh+Yao+Noi",
     "notes": "฿550 לאדם",
     "id": "s_4_7",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:40",
     "dur": "0:20",
     "act": "מונית עצמאית מרציף מאנו למחנה",
     "loc": "קו יאו נוי",
     "cat": "תחבורה",
     "baht": 200,
     "status": "משלמים במקום",
     "link": "",
     "notes": "המחנה אינו מארגן העברות מבאנג רונג או מאנו. לתאם מונית עצמאית; המחנה יכול לספק הכוונה. ฿200 הוא אומדן קודם, לא הצעת מחיר.",
     "id": "s_4_8",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:00",
     "dur": "0:30",
     "act": "צ׳ק-אין במחנה",
     "loc": "KYN Phoenix",
     "cat": "אחר",
     "baht": null,
     "status": "להזמין",
     "link": "https://www.phuket-krabi-muaythai.com/",
     "notes": "אושר במייל · נסגר עם מקדמה של ฿6,075 ב-Wise. היתרה ฿6,075 במזומן בהגעה — אין כרטיסים ואין העברות במקום.",
     "id": "s_4_9",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     },
     "managed": true
    },
    {
     "time": "12:00",
     "dur": "1:00",
     "act": "צהריים במחנה",
     "loc": "KYN Phoenix",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_4_10",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "3:00",
     "act": "שינה אמיתית",
     "loc": "המחנה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "מנוחה עד אימון הטכניקה שאושר ל-16:00.",
     "id": "s_4_11",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "16:00",
     "dur": "2:00",
     "act": "אימון ראשון — טכניקה, לא כושר",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "אושר ליום ההגעה ב-16:00: דגש על טכניקה ללא כושר עצים; אימון מלא ראשון למחרת בבוקר. המחנה אישר אימוני קבוצה ב-08:00 וב-17:00. איתי: התאמת עמידה ובעיטות למואיי תאי, טיפים, מרפקים וקלינץ׳; טליה: יסודות למתחילה. ניתן להזמין אימון פרטי משותף; מחיר ומועד טרם נקבעו.",
     "id": "s_4_12",
     "done": false,
     "wiki": "Muay Thai",
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "18:30",
     "dur": "1:00",
     "act": "ארוחת ערב במחנה",
     "loc": "KYN Phoenix",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_4_13",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "חבילת KYN — Sea House Room, ארוחות ואימונים לשניים",
     "loc": "KYN Phoenix, קו יאו נוי",
     "cat": "לינה",
     "baht": 4050,
     "status": "להזמין",
     "link": "https://www.phuket-krabi-muaythai.com/prices-accomodation/",
     "notes": "฿12,150 לכל השהייה — Sea House Room לשניים, כולל חדר, ארוחות ואימוני קבוצה. ביום ראשון אין אימונים ואין הגשת אוכל. מקדמה 50% (฿6,075) ב-Wise, היתרה ฿6,075 במזומן בהגעה; אין כרטיסי אשראי ואין העברות במקום. המחיר תוקן מ-฿14,580 שהיה תעריף הדירה הפנורמית.",
     "id": "s_4_14",
     "done": false,
     "priceEstimate": {
      "kind": "quote",
      "basis": "המחיר המאושר מהמחנה, אחרי תיקון מ-฿14,580. נספר פעם אחת ומחולק בין שלושת הלילות.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-21",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "kyn",
       "match": "KYN Phoenix",
       "totalThb": 12150,
       "rows": 3
      }
     },
     "managed": true
    }
   ],
   "summary": "דרומה, ואז מחוץ למפה",
   "id": "day_4"
  },
  {
   "day": 5,
   "date": "2026-11-27",
   "dow": "ו׳",
   "dest": "קו יאו נוי",
   "rows": [
    {
     "time": "06:45",
     "dur": "0:30",
     "act": "ארוחת בוקר קלה",
     "loc": "המחנה",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_5_0",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:00",
     "dur": "2:00",
     "act": "אימון בוקר — חבל, פאדים, שק, קלינץ׳",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "המחנה אישר אימוני קבוצה ב-08:00 וב-17:00. איתי: התאמת עמידה ובעיטות למואיי תאי, טיפים, מרפקים וקלינץ׳; טליה: יסודות למתחילה. ניתן להזמין אימון פרטי משותף; מחיר ומועד טרם נקבעו.",
     "id": "s_5_1",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:00",
     "dur": "0:30",
     "act": "ארוחת בוקר אמיתית",
     "loc": "המחנה",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_5_2",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:00",
     "dur": "1:00",
     "act": "יוגה",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": 800,
     "status": "אופציונלי",
     "link": "",
     "notes": "יוגה לא אושרה כחלק מהחבילה; לברר זמינות, שעה ומחיר.",
     "id": "s_5_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "תקציב לשיעור יוגה לשניים אם אינו כלול. לא התקבלה הצעה מהמחנה.",
      "lowFactor": 0.5,
      "highFactor": 1.5,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:30",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קו יאו נוי",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "תקציב לארוחה מחוץ למחנה. ארוחות במחנה כלולות בחבילה; אם אוכלים במחנה אין הוצאה נוספת.",
     "id": "s_5_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:45",
     "dur": "2:00",
     "act": "מנוחה ושחייה",
     "loc": "המחנה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "אמצע היום מת בכוונה",
     "id": "s_5_5",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:00",
     "dur": "2:00",
     "act": "אימון שני",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "המחנה אישר אימוני קבוצה ב-08:00 וב-17:00. איתי: התאמת עמידה ובעיטות למואיי תאי, טיפים, מרפקים וקלינץ׳; טליה: יסודות למתחילה. ניתן להזמין אימון פרטי משותף; מחיר ומועד טרם נקבעו.",
     "id": "s_5_6",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:15",
     "dur": "1:00",
     "act": "ארוחת ערב",
     "loc": "המחנה",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_5_7",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "חבילת KYN — Sea House Room, ארוחות ואימונים לשניים",
     "loc": "KYN Phoenix",
     "cat": "לינה",
     "baht": 4050,
     "status": "להזמין",
     "link": "https://www.phuket-krabi-muaythai.com/prices-accomodation/",
     "notes": "฿12,150 לכל השהייה — Sea House Room לשניים, כולל חדר, ארוחות ואימוני קבוצה. ביום ראשון אין אימונים ואין הגשת אוכל. מקדמה 50% (฿6,075) ב-Wise, היתרה ฿6,075 במזומן בהגעה; אין כרטיסי אשראי ואין העברות במקום. המחיר תוקן מ-฿14,580 שהיה תעריף הדירה הפנורמית.",
     "id": "s_5_8",
     "done": false,
     "priceEstimate": {
      "kind": "quote",
      "basis": "המחיר המאושר מהמחנה, אחרי תיקון מ-฿14,580. נספר פעם אחת ומחולק בין שלושת הלילות.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-21",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "kyn",
       "match": "KYN Phoenix",
       "totalThb": 12150,
       "rows": 3
      }
     },
     "managed": true
    },
    {
     "id": "s_5_moto",
     "time": "10:45",
     "dur": "0:30",
     "act": "השכרת קטנוע — ליומיים",
     "loc": "קו יאו נוי, ליד הרציף",
     "cat": "תחבורה",
     "baht": 500,
     "status": "משלמים במקום",
     "link": "",
     "done": false,
     "notes": "฿250 ליום · שתי קסדות — גם למי שמאחור, זה חוק ונאכף · לבקש 125cc ומעלה, 110 מתקשה בשניים בעלייה · פיקדון במזומן ฿2,000–3,000, לא להשאיר דרכון · לצלם את הקטנוע לפני שיוצאים",
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "id": "s_5_fuel",
     "act": "דלק לקטנוע — לכל ההשכרות",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "תחבורה",
     "baht": 600,
     "status": "משלמים במקום",
     "notes": "קטנוע אחד בשניים, בתקופות ההשכרה שכבר במסלול.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "קטנוע אחד בשניים, בתקופות ההשכרה שכבר במסלול.",
      "lowFactor": 0.6666666666666666,
      "highFactor": 1.5,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "transport",
      "split": "ratio"
     }
    },
    {
     "id": "s_5_private",
     "act": "אימון פרטי משותף ב-KYN — לבחירה",
     "time": "",
     "dur": "",
     "loc": "תקציב לכל התקופה",
     "cat": "אטרקציות",
     "baht": 1800,
     "status": "אופציונלי",
     "notes": "אומדן בלבד; המחנה אישר את האפשרות אך לא מסר מחיר.",
     "link": "",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן בלבד; המחנה אישר את האפשרות אך לא מסר מחיר.",
      "lowFactor": 0.5555555555555556,
      "highFactor": 1.4444444444444444,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "category": "activities",
      "split": "ratio"
     }
    }
   ],
   "summary": "שני אימונים ומזרן",
   "id": "day_5"
  },
  {
   "day": 6,
   "date": "2026-11-28",
   "dow": "ש׳",
   "dest": "קו יאו נוי",
   "rows": [
    {
     "time": "06:45",
     "dur": "0:30",
     "act": "ארוחת בוקר קלה",
     "loc": "המחנה",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_6_0",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:00",
     "dur": "2:00",
     "act": "אימון בוקר",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "המחנה אישר אימוני קבוצה ב-08:00 וב-17:00. איתי: התאמת עמידה ובעיטות למואיי תאי, טיפים, מרפקים וקלינץ׳; טליה: יסודות למתחילה. ניתן להזמין אימון פרטי משותף; מחיר ומועד טרם נקבעו. אחר הצהריים מתוכנן טיול במפרץ במקום אימון.",
     "id": "s_6_1",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:00",
     "dur": "0:45",
     "act": "ארוחת בוקר",
     "loc": "המחנה",
     "cat": "אוכל",
     "baht": 0,
     "status": "כלול בחבילה",
     "link": "",
     "notes": "ארוחות במחנה כלולות בחבילת הלינה והאימונים; שעות וסוגי הארוחות לתיאום עם המחנה.",
     "id": "s_6_2",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:00",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קו יאו נוי",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "תקציב לארוחה מחוץ למחנה. ארוחות במחנה כלולות בחבילה; אם אוכלים במחנה אין הוצאה נוספת.",
     "id": "s_6_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:30",
     "dur": "0:20",
     "act": "הסעה לרציף",
     "loc": "קו יאו נוי",
     "cat": "תחבורה",
     "baht": 150,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_6_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:00",
     "dur": "4:00",
     "act": "לונגטייל למפרץ פאנג נגה",
     "loc": "מפרץ פאנג נגה",
     "cat": "אטרקציות",
     "baht": 1500,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Phang+Nga+Bay+Thailand",
     "notes": "฿1,200–1,800 לסירה · מגיעים מהצד השני, אחרי שצי הסירות מפוקט כבר הלך",
     "id": "s_6_5",
     "done": false,
     "wiki": "Phang Nga Bay",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "18:15",
     "dur": "",
     "act": "חזרה לאי",
     "loc": "רציף מאנו",
     "cat": "תחבורה",
     "baht": 150,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_6_6",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:00",
     "dur": "1:15",
     "act": "ארוחת ערב",
     "loc": "קו יאו נוי",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "תקציב לארוחה מחוץ למחנה. ארוחות במחנה כלולות בחבילה; אם אוכלים במחנה אין הוצאה נוספת.",
     "id": "s_6_7",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "חלופה לאחה״צ: סיבוב על האי בקטנוע",
     "loc": "קו יאו נוי",
     "cat": "תחבורה",
     "baht": 0,
     "status": "אופציונלי",
     "link": "https://www.google.com/maps/search/?api=1&query=Koh+Yao+Noi+viewpoint",
     "notes": "כביש אחד לאורך החוף המזרחי, שדות אורז, מסגד, תצפית — בשניים על אותו קטנוע",
     "id": "s_6_8",
     "done": false,
     "managed": true,
     "priceEstimate": {
      "kind": "included",
      "basis": "הקטנוע כבר נספר בשורת ההשכרה; הדלק בתקציב ההשלמות.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "חבילת KYN — Sea House Room, ארוחות ואימונים לשניים",
     "loc": "KYN Phoenix",
     "cat": "לינה",
     "baht": 4050,
     "status": "להזמין",
     "link": "https://www.phuket-krabi-muaythai.com/prices-accomodation/",
     "notes": "฿12,150 לכל השהייה — Sea House Room לשניים, כולל חדר, ארוחות ואימוני קבוצה. ביום ראשון אין אימונים ואין הגשת אוכל. מקדמה 50% (฿6,075) ב-Wise, היתרה ฿6,075 במזומן בהגעה; אין כרטיסי אשראי ואין העברות במקום. המחיר תוקן מ-฿14,580 שהיה תעריף הדירה הפנורמית.",
     "id": "s_6_9",
     "done": false,
     "priceEstimate": {
      "kind": "quote",
      "basis": "המחיר המאושר מהמחנה, אחרי תיקון מ-฿14,580. נספר פעם אחת ומחולק בין שלושת הלילות.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-21",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "kyn",
       "match": "KYN Phoenix",
       "totalThb": 12150,
       "rows": 3
      }
     },
     "managed": true
    }
   ],
   "summary": "אימון בוקר, ואז המפרץ",
   "id": "day_6"
  },
  {
   "day": 7,
   "date": "2026-11-29",
   "dow": "א׳",
   "dest": "אאו נאנג",
   "rows": [
    {
     "time": "06:45",
     "dur": "0:30",
     "act": "ארוחת בוקר מחוץ למחנה",
     "loc": "קו יאו נוי",
     "cat": "אוכל",
     "baht": 250,
     "status": "משלמים במקום",
     "link": "",
     "notes": "יום ראשון — המחנה לא מגיש ארוחות. לאכול בכפר לפני הסירה",
     "id": "s_7_0",
     "done": false,
     "managed": true
    },
    {
     "time": "08:00",
     "dur": "2:00",
     "act": "בוקר חופשי — אין אימון ביום ראשון",
     "loc": "KYN Phoenix",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "המחנה לא מאמן בימי ראשון. האימון האחרון הוא של שבת בבוקר — לתכנן אותו כחזק",
     "id": "s_7_1",
     "done": false,
     "managed": true
    },
    {
     "time": "10:00",
     "dur": "0:30",
     "act": "מקלחת, אריזה וצ׳ק-אאוט",
     "loc": "המחנה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "אם מתקיים אימון בוקר, נשאר חלון קצר לסירה; לתאם את המעבר מראש.",
     "id": "s_7_2",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:35",
     "dur": "0:20",
     "act": "מונית עצמאית לרציף",
     "loc": "קו יאו נוי",
     "cat": "תחבורה",
     "baht": 200,
     "status": "משלמים במקום",
     "link": "",
     "notes": "המחנה אינו מארגן העברות. לתאם מונית עצמאית; ฿200 הוא אומדן קודם.",
     "id": "s_7_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:00",
     "dur": "0:45",
     "act": "ספידבוט לאאו נאנג",
     "loc": "קו יאו נוי → אאו נאנג",
     "cat": "תחבורה",
     "baht": 1200,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Ao+Nang+Krabi",
     "notes": "฿500–600 לאדם · עונת שיא בלבד",
     "id": "s_7_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:00",
     "dur": "1:00",
     "act": "צהריים על רצועת אאו נאנג",
     "loc": "אאו נאנג",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_7_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:00",
     "dur": "0:30",
     "act": "צ׳ק-אין — צ׳רמנטרה",
     "loc": "987 Moo 2, אאו נאנג",
     "cat": "אחר",
     "baht": null,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "צ׳ק-אין 14:00–23:30 · פיקדון ฿1,000 מזומן",
     "id": "s_7_6",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:00",
     "dur": "2:00",
     "act": "הבריכה הפרטית בווילה",
     "loc": "צ׳רמנטרה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "אחרי ארבעה ימי מחנה",
     "id": "s_7_7",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:30",
     "dur": "2:00",
     "act": "לונגטייל לריילאי לשקיעה בחוף פרה נאנג",
     "loc": "חוף פרה נאנג",
     "cat": "אטרקציות",
     "baht": 600,
     "status": "אופציונלי",
     "link": "https://www.google.com/maps/search/?api=1&query=Phra+Nang+Cave+Beach+Railay+Krabi",
     "notes": "฿150 לאדם לכיוון, ฿200 אחרי החשכה",
     "id": "s_7_8",
     "done": false,
     "wiki": "Railay Beach",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:45",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "אאו נאנג",
     "cat": "אוכל",
     "baht": 700,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_7_9",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Chermantra Aonang Resort & Pool Suite",
     "loc": "אאו נאנג",
     "cat": "לינה",
     "baht": 6825.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "אישור 5553772333 · ₪1,839 לשלושת הלילות · Mountain Pool Villa · ארוחת בוקר כלולה · ביטול חינם עד 14/11",
     "id": "s_7_10",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "aonang",
       "match": "Chermantra",
       "totalIls": 1839,
       "rows": 3
      }
     }
    },
    {
     "id": "s_7_moto",
     "time": "14:45",
     "dur": "0:30",
     "act": "השכרת קטנוע באאו נאנג — ליומיים",
     "loc": "אאו נאנג",
     "cat": "תחבורה",
     "baht": 500,
     "status": "משלמים במקום",
     "link": "",
     "done": false,
     "notes": "฿250–300 ליום · מחר ריילאי (סירה בלבד, הקטנוע חונה) · הכביש לקראבי מהיר — בשניים מרחק הבלימה ארוך יותר, להשאיר פער",
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    }
   ],
   "summary": "יוצאים מהאי — בלי אימון, יום ראשון",
   "id": "day_7"
  },
  {
   "day": 8,
   "date": "2026-11-30",
   "dow": "ב׳",
   "dest": "אאו נאנג",
   "rows": [
    {
     "time": "07:30",
     "dur": "0:45",
     "act": "ארוחת בוקר — כלולה",
     "loc": "צ׳רמנטרה",
     "cat": "אוכל",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "כלולה במחיר החדר",
     "id": "s_8_0",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:40",
     "dur": "0:20",
     "act": "לונגטייל לריילאי מערב",
     "loc": "אאו נאנג → ריילאי",
     "cat": "תחבורה",
     "baht": 0,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Railay+Beach+Krabi",
     "notes": "฿150 לאדם · יוצאים כשמתמלאת סירה",
     "id": "s_8_1",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "העברה לריילאי כלולה במחירון Real Rocks ששימש לאומדן הטיפוס. אם בוחרים ספק אחר יש להוסיף אותה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "https://www.realrocksclimbing.com/group-course/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:10",
     "dur": "3:45",
     "act": "קורס טיפוס למתחילים",
     "loc": "קיר 123, ריילאי",
     "cat": "אטרקציות",
     "baht": 3000,
     "status": "להזמין",
     "link": "http://www.railay.com/railay/climbing/climbing_courses.shtml",
     "notes": "฿1,000–1,500 לאדם כולל נעליים, רתמה, חבלים ומדריך",
     "id": "s_8_2",
     "done": false,
     "wiki": "Railay Beach",
     "priceEstimate": {
      "kind": "published",
      "basis": "חצי יום טיפוס קבוצתי לשני מבוגרים לפי Real Rocks. כולל ציוד והעברות מאאו נאנג; זמינות ההעברות טעונה אישור.",
      "lowFactor": 1,
      "highFactor": 1.2,
      "sourceUrl": "https://www.realrocksclimbing.com/group-course/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "1:00",
     "act": "צהריים בריילאי",
     "loc": "ריילאי מזרח",
     "cat": "אוכל",
     "baht": 500,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_8_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:30",
     "dur": "1:00",
     "act": "חוף פרה נאנג",
     "loc": "ריילאי",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Phra+Nang+Cave+Beach+Railay+Krabi",
     "notes": "",
     "id": "s_8_4",
     "done": false,
     "wiki": "Phra Nang Cave Beach",
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:45",
     "dur": "1:45",
     "act": "תצפית ריילאי והלגונה הנסתרת",
     "loc": "ריילאי מזרח",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "https://www.google.com/maps/search/?api=1&query=Railay+Viewpoint+and+Lagoon",
     "notes": "חינם · טיפוס בוץ אנכי בחבלים, 20 דק׳ למעלה · נעליים עם אחיזה · לוותר בגשם",
     "id": "s_8_5",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:45",
     "dur": "0:20",
     "act": "לונגטייל חזרה",
     "loc": "ריילאי → אאו נאנג",
     "cat": "תחבורה",
     "baht": 0,
     "status": "משלמים במקום",
     "link": "",
     "notes": "לסכם שעת חזרה עם הסירן מראש",
     "id": "s_8_6",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "העברה חזרה כלולה באותו סיור טיפוס; לוודא שעת חזרה התואמת לתכנון.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "https://www.realrocksclimbing.com/group-course/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:45",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "אאו נאנג",
     "cat": "אוכל",
     "baht": 700,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_8_7",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Chermantra Aonang Resort & Pool Suite",
     "loc": "אאו נאנג",
     "cat": "לינה",
     "baht": 6825.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "",
     "id": "s_8_8",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "aonang",
       "match": "Chermantra",
       "totalIls": 1839,
       "rows": 3
      }
     }
    }
   ],
   "summary": "יום ריילאי — לטפס על משהו",
   "id": "day_8"
  },
  {
   "day": 9,
   "date": "2026-12-01",
   "dow": "ג׳",
   "dest": "אאו נאנג",
   "rows": [
    {
     "time": "07:15",
     "dur": "0:45",
     "act": "ארוחת בוקר — כלולה",
     "loc": "צ׳רמנטרה",
     "cat": "אוכל",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_9_0",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "08:15",
     "dur": "0:40",
     "act": "איסוף מהמלון לאאו תלאנה",
     "loc": "אאו נאנג → אאו תלאנה",
     "cat": "תחבורה",
     "baht": null,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Ao+Thalane+Krabi+kayaking",
     "notes": "ההסעה כלולה במחיר הסיור",
     "id": "s_9_1",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:00",
     "dur": "3:00",
     "act": "קיאקים במנגרובים",
     "loc": "אאו תלאנה",
     "cat": "אטרקציות",
     "baht": 1600,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Ao+Thalane+Krabi+kayaking",
     "notes": "฿600–800 לאדם כולל מדריך · לצאת בגאות · עיטי ים ומקוקים",
     "id": "s_9_2",
     "done": false,
     "wiki": "Than Bok Khorani National Park",
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:45",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "אאו נאנג",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_9_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:00",
     "dur": "2:00",
     "act": "ספא ובריכה",
     "loc": "צ׳רמנטרה",
     "cat": "אטרקציות",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_9_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "1:45",
     "act": "ארוחת ערב ושתייה על הרצועה",
     "loc": "אאו נאנג",
     "cat": "אוכל",
     "baht": 750,
     "status": "משלמים במקום",
     "link": "",
     "notes": "ברגל ולא בסירה — היתרון של לישון פה",
     "id": "s_9_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Chermantra Aonang Resort & Pool Suite",
     "loc": "אאו נאנג",
     "cat": "לינה",
     "baht": 6825.67,
     "status": "מוזמן",
     "link": "https://secure.booking.com/",
     "notes": "",
     "id": "s_9_6",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "aonang",
       "match": "Chermantra",
       "totalIls": 1839,
       "rows": 3
      }
     }
    }
   ],
   "summary": "קיאקים במנגרובים",
   "id": "day_9"
  },
  {
   "day": 10,
   "date": "2026-12-02",
   "dow": "ד׳",
   "dest": "קאו לק",
   "rows": [
    {
     "time": "07:30",
     "dur": "0:45",
     "act": "ארוחת בוקר — כלולה",
     "loc": "צ׳רמנטרה",
     "cat": "אוכל",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_10_0",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:00",
     "dur": "0:30",
     "act": "צ׳ק-אאוט ואריזה",
     "loc": "צ׳רמנטרה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "צ׳ק-אאוט עד 11:30",
     "id": "s_10_1",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:40",
     "dur": "2:45",
     "act": "רכב פרטי לקאו לק",
     "loc": "אאו נאנג → קראבי → כביש 4 → פאנג נגה → קאו לק",
     "cat": "תחבורה",
     "baht": 4100,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Khao+Lak+Phang+Nga",
     "notes": "כ-2:30–2:45 נהיגה · ואן משותף זול יותר אך עם איסופים ומגיע ל-4 שעות",
     "id": "s_10_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "תקציב לרכב פרטי קראבי–קאו לק על סמך מחירון העברות; יש לקבל הצעה לאיסוף המדויק באאו נאנג.",
      "lowFactor": 0.8536585365853658,
      "highFactor": 1.2195121951219512,
      "sourceUrl": "https://www.khaolaklanddiscovery.com/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:30",
     "dur": "0:25",
     "act": "עצירת קפה בדרך",
     "loc": "פאנג נגה",
     "cat": "אוכל",
     "baht": 150,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_10_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:50",
     "dur": "",
     "act": "הגעה לקאו לק",
     "loc": "קאו לק",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_10_4",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:10",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_10_5",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:30",
     "dur": "0:30",
     "act": "צ׳ק-אין — קלימה",
     "loc": "3/88 Moo 2, Petchkasem Road",
     "cat": "אחר",
     "baht": null,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "₪4,029 לשישה לילות · ביטול חינם",
     "id": "s_10_6",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:30",
     "dur": "3:00",
     "act": "בריכת אינפיניטי וחוף",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "מכאן והלאה זה פרק המנוחה",
     "id": "s_10_7",
     "done": false,
     "wiki": "Khao Lak",
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_10_8",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "8.8 על 2,576 ביקורות · 5 כוכבים · ספא מלא, חדר אדים, עיסוי זוגות, בריכת מים מלוחים, יוגה",
     "id": "s_10_9",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    },
    {
     "id": "s_10_moto",
     "time": "15:00",
     "dur": "0:30",
     "act": "השכרת קטנוע בקאו לק — לארבעה ימים",
     "loc": "קאו לק",
     "cat": "תחבורה",
     "baht": 1000,
     "status": "משלמים במקום",
     "link": "",
     "done": false,
     "notes": "฿250 ליום · כביש 4 מהיר ועמוס משאיות — לנסוע בכביש החוף המקומי · כך מגיעים לבאנג סאק ולאאו תונג לבד, בלי מוניות",
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    }
   ],
   "summary": "חוצים ליבשה",
   "id": "day_10"
  },
  {
   "day": 11,
   "date": "2026-12-03",
   "dow": "ה׳",
   "dest": "קאו לק",
   "rows": [
    {
     "time": "08:00",
     "dur": "1:00",
     "act": "ארוחת בוקר",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "לבדוק מול המלון אם ארוחת בוקר כלולה בתעריף שלכם",
     "id": "s_11_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:30",
     "dur": "3:00",
     "act": "חוף ובריכה",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_11_1",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_11_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:30",
     "dur": "2:00",
     "act": "ספא — עיסוי זוגי",
     "loc": "הספא בקלימה",
     "cat": "אטרקציות",
     "baht": 1600,
     "status": "משלמים במקום",
     "link": "",
     "notes": "חדר אדים, טיפולי גוף, אמבט רגליים · זה הפרק שבשבילו באתם",
     "id": "s_11_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 850,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_11_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "",
     "id": "s_11_5",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    }
   ],
   "summary": "ריזורט וספא",
   "id": "day_11"
  },
  {
   "day": 12,
   "date": "2026-12-04",
   "dow": "ו׳",
   "dest": "קאו סוק",
   "rows": [
    {
     "time": "06:15",
     "dur": "0:45",
     "act": "ארוחת בוקר מוקדמת",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "יום ארוך — לאכול טוב",
     "id": "s_12_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "07:15",
     "dur": "2:15",
     "act": "איסוף מהמלון לרציף רצ׳פרפה",
     "loc": "קאו לק → אגם צ׳או לאן",
     "cat": "תחבורה",
     "baht": null,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Ratchaprapha+Dam+Pier+Khao+Sok",
     "notes": "כשעתיים לכיוון — לא שעה. ההסעה כלולה בסיור",
     "id": "s_12_1",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "09:45",
     "dur": "5:00",
     "act": "אגם צ׳או לאן — לונגטייל, טרק, מערת פאקרנג, קאנו",
     "loc": "פארק לאומי קאו סוק",
     "cat": "אטרקציות",
     "baht": 7800,
     "status": "להזמין",
     "link": "https://www.khaolaklanddiscovery.com/khao-lak-tours/",
     "notes": "฿3,900 לאדם · כולל אגרות פארק, מדריך דובר אנגלית, צהריים, ציוד והסעות · הנוף היחיד בטיול שהוא לא חוף",
     "id": "s_12_2",
     "done": false,
     "wiki": "Khao Sok National Park",
     "priceEstimate": {
      "kind": "published",
      "basis": "מחיר פתיחה לסיור אגם לשני מבוגרים, עם העברות וצהריים. לבדוק אגרות ותוספות בהצעה הסופית.",
      "lowFactor": 1,
      "highFactor": 1.2,
      "sourceUrl": "https://www.khaolaklanddiscovery.com/khao-sok-lake-day-trip/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:30",
     "dur": "1:00",
     "act": "צהריים על האגם",
     "loc": "צ׳או לאן",
     "cat": "אוכל",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "כלול בסיור",
     "id": "s_12_3",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "15:00",
     "dur": "2:15",
     "act": "חזרה לקאו לק",
     "loc": "אגם צ׳או לאן → קאו לק",
     "cat": "תחבורה",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "כלול · עצירה בבאן נאם ראד לשחייה",
     "id": "s_12_4",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "כלול במחיר ההזמנה או החבילה; אין חיוב נוסף באומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:45",
     "dur": "",
     "act": "חזרה לריזורט",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "יום של כ-11 שעות, מתוכן 4:30 בוואן",
     "id": "s_12_5",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:45",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_12_6",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "",
     "id": "s_12_7",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    }
   ],
   "summary": "לאגם צ׳או לאן",
   "id": "day_12"
  },
  {
   "day": 13,
   "date": "2026-12-05",
   "dow": "ש׳",
   "dest": "קאו סוק → קאו לק",
   "rows": [
    {
     "time": "08:30",
     "dur": "1:00",
     "act": "ארוחת בוקר",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_13_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:00",
     "dur": "3:00",
     "act": "חוף ובריכה",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "היום שאחרי קאו סוק — בלי תוכנית",
     "id": "s_13_1",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_13_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "16:00",
     "dur": "1:30",
     "act": "מסאז׳ים",
     "loc": "קאו לק",
     "cat": "אטרקציות",
     "baht": 800,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_13_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 850,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_13_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "",
     "id": "s_13_5",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    }
   ],
   "summary": "בוקר על האגם, וחזרה",
   "id": "day_13"
  },
  {
   "day": 14,
   "date": "2026-12-06",
   "dow": "א׳",
   "dest": "קאו לק",
   "rows": [
    {
     "time": "08:30",
     "dur": "1:00",
     "act": "ארוחת בוקר",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_14_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "id": "s_14_zip",
     "time": "09:30",
     "dur": "3:30",
     "act": "זיפליין ביער הגשם — Tree Top Adventure Park",
     "loc": "קאו לק",
     "cat": "אטרקציות",
     "baht": 5000,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Tree+Top+Adventure+Park+Khao+Lak",
     "wiki": "Zip line",
     "done": false,
     "notes": "฿2,200–2,600 לאדם · מסלול של פלטפורמות, גשרים וזיפליינים בין עצי הגומי · איסוף מהמלון כלול · נעליים סגורות, בלי כפכפים",
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:30",
     "dur": "",
     "act": "אחרי הזיפליין — חוף, ספר, בריכה",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "הבוקר היה מספיק. מכאן שום דבר שדורש שעה",
     "id": "s_14_1",
     "done": false,
     "managed": true,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_14_2",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "16:00",
     "dur": "2:00",
     "act": "יוגה או חדר כושר בריזורט",
     "loc": "קלימה",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "שיעורי יוגה וכושר במקום",
     "id": "s_14_3",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "1:30",
     "act": "ארוחת ערב",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 850,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_14_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "",
     "id": "s_14_5",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    }
   ],
   "summary": "זיפליין בבוקר, ושום דבר אחרי",
   "id": "day_14"
  },
  {
   "day": 15,
   "date": "2026-12-07",
   "dow": "ב׳",
   "dest": "קאו לק",
   "rows": [
    {
     "time": "06:00",
     "dur": "0:30",
     "act": "ארוחת בוקר",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "מוקדם — היציאה לסימילן ב-07:00. לבקש מהמלון ארוחה מוקדמת או לקחת משהו לדרך",
     "id": "s_15_0",
     "done": false,
     "managed": true,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "07:00",
     "dur": "10:00",
     "act": "סימילן — יום שנורקלינג",
     "loc": "איי סימילן",
     "cat": "אטרקציות",
     "baht": 7800,
     "status": "להזמין",
     "link": "https://www.khaolaklanddiscovery.com/khao-lak-tours/",
     "notes": "฿3,900 לאדם כולל אגרת פארק · הפארק פתוח 15/10–15/5 · יציאה מרציף תאב לאמו ב-07:00, חזרה אחה״צ · שמורת האלמוגים הכי טובה באנדמן",
     "id": "s_15_1",
     "done": false,
     "wiki": "Similan Islands",
     "managed": true,
     "priceEstimate": {
      "kind": "published",
      "basis": "מחיר פתיחה לסימילן לשני מבוגרים; הספק מפרט העברות, אגרות, ציוד, ארוחת בוקר קלה וצהריים.",
      "lowFactor": 1,
      "highFactor": 1.2,
      "sourceUrl": "https://www.khaolaklanddiscovery.com/khao-lak-tours/similan-islands-tour/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "13:00",
     "dur": "1:00",
     "act": "צהריים",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 0,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_15_3",
     "done": false,
     "priceEstimate": {
      "kind": "included",
      "basis": "צהריים כלולים בסיור סימילן שעליו מבוסס האומדן.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "https://www.khaolaklanddiscovery.com/khao-lak-tours/similan-islands-tour/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:30",
     "dur": "2:00",
     "act": "חוף ובריכה אחרי סימילן",
     "loc": "קלימה",
     "cat": "אטרקציות",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "חוזרים שרופים ועייפים — הערב נשאר רגוע",
     "id": "s_15_2",
     "done": false,
     "managed": true,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "19:30",
     "dur": "2:00",
     "act": "ארוחת ערב אחרונה",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 900,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_15_4",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "לינה — Kalima Resort and Villas",
     "loc": "קאו לק",
     "cat": "לינה",
     "baht": 7476.83,
     "status": "מוזמן",
     "link": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html",
     "notes": "",
     "id": "s_15_5",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "category": "accommodation",
       "split": "ratio",
       "key": "khaolak",
       "match": "Kalima",
       "totalIls": 4029,
       "rows": 6
      }
     }
    }
   ],
   "summary": "סימילן — היום הגדול של האנדמן",
   "id": "day_15"
  },
  {
   "day": 16,
   "date": "2026-12-08",
   "dow": "ג׳",
   "dest": "קאו לק → הביתה",
   "rows": [
    {
     "time": "08:30",
     "dur": "1:00",
     "act": "ארוחת בוקר אחרונה",
     "loc": "קלימה",
     "cat": "אוכל",
     "baht": 400,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_16_0",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "10:00",
     "dur": "1:00",
     "act": "אריזה",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_16_1",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:00",
     "dur": "0:30",
     "act": "צ׳ק-אאוט ואחסון תיקים",
     "loc": "קלימה",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "צ׳ק-אאוט 11:00–12:00 · הם ישמרו את התיקים",
     "id": "s_16_2",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "11:45",
     "dur": "0:45",
     "act": "צהריים אחרון",
     "loc": "קאו לק",
     "cat": "אוכל",
     "baht": 450,
     "status": "משלמים במקום",
     "link": "",
     "notes": "",
     "id": "s_16_3",
     "done": false,
     "priceEstimate": {
      "kind": "estimate",
      "basis": "אומדן תכנון לשניים לפי המסלול הקיים; אוכל, מוניות וטיפולים משתנים לפי הבחירה.",
      "lowFactor": 0.8,
      "highFactor": 1.3,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "12:45",
     "dur": "1:15",
     "act": "רכב פרטי לשדה התעופה",
     "loc": "קאו לק → HKT",
     "cat": "תחבורה",
     "baht": 1800,
     "status": "להזמין",
     "link": "https://www.google.com/maps/search/?api=1&query=Phuket+International+Airport",
     "notes": "כ-70 ק״מ · יוצאים 12:45, לא 13:30 — טיסה בינלאומית",
     "id": "s_16_4",
     "done": false,
     "priceEstimate": {
      "kind": "published",
      "basis": "מחיר פתיחה לרכב קאו לק–שדה התעופה בפוקט; המחיר המדויק תלוי בכתובת, ברכב ובשעה.",
      "lowFactor": 1,
      "highFactor": 1.3,
      "sourceUrl": "https://www.khaolaklanddiscovery.com/",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "14:00",
     "dur": "3:20",
     "act": "צ׳ק-אין, החזר מס ובידוק",
     "loc": "HKT",
     "cat": "אחר",
     "baht": null,
     "status": "משלמים במקום",
     "link": "",
     "notes": "להגיע 3 שעות לפני",
     "id": "s_16_5",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "17:20",
     "dur": "10:40",
     "act": "ארקיע IZ598 · פוקט → תל אביב",
     "loc": "HKT → TLV",
     "cat": "תחבורה",
     "baht": null,
     "status": "מוזמן",
     "link": "",
     "notes": "ישירה · IL-604062",
     "id": "s_16_6",
     "done": false,
     "priceEstimate": {
      "kind": "booking",
      "basis": "המחיר מההזמנה השמורה; נספר פעם אחת בלבד ומחולק בין לילות הלינה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14",
      "booking": {
       "key": "return",
       "match": "IZ598",
       "totalIls": 1891,
       "rows": 1,
       "category": "flights",
       "split": "full-itai"
      }
     }
    },
    {
     "time": "23:00",
     "dur": "",
     "act": "נחיתה בנתב״ג",
     "loc": "TLV",
     "cat": "אחר",
     "baht": null,
     "status": "מוזמן",
     "link": "",
     "notes": "",
     "id": "s_16_7",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    },
    {
     "time": "",
     "dur": "",
     "act": "מקרא: ירוק = מוזמן · אדום = צריך להזמין · תכלת = משלמים במקום · צהוב = אופציונלי, מחוץ לתקציב",
     "loc": "",
     "cat": "",
     "baht": null,
     "status": "",
     "link": "",
     "notes": "",
     "id": "s_16_8",
     "done": false,
     "priceEstimate": {
      "kind": "no-extra",
      "basis": "לא הוקצה חיוב נפרד לפעולה הזאת; חיובים כלולים מופיעים בחבילה או בהזמנה.",
      "lowFactor": 1,
      "highFactor": 1,
      "sourceUrl": "",
      "checked": "2026-09-14"
     }
    }
   ],
   "summary": "בוקר בריזורט, ואז הביתה",
   "id": "day_16"
  }
 ],
 "bookings": [
  {
   "what": "ארקיע IZ591",
   "when": "22/11",
   "details": "תל אביב → בנגקוק, ישירה",
   "ref": "IL-603978",
   "payment": "שולם ₪3,777 לשניים",
   "freeCancel": "—"
  },
  {
   "what": "ארקיע IZ598",
   "when": "8/12",
   "details": "פוקט → תל אביב, ישירה",
   "ref": "IL-604062",
   "payment": "שולם ₪1,891",
   "freeCancel": "—"
  },
  {
   "what": "Montraj Coach Sukhumvit",
   "when": "23–26/11",
   "details": "בנגקוק · 3 לילות · 1st Class Coach",
   "ref": "5123136373",
   "payment": "₪1,128 — משלמים במקום",
   "freeCancel": "ביטול חינם עד 20/11 23:59"
  },
  {
   "what": "Chermantra Aonang Resort",
   "when": "29/11–2/12",
   "details": "אאו נאנג · 3 לילות · Mountain Pool Villa · ארוחת בוקר",
   "ref": "5553772333",
   "payment": "₪1,839",
   "freeCancel": "ביטול חינם עד 14/11 23:59"
  },
  {
   "what": "Kalima Resort and Villas",
   "when": "2–8/12",
   "details": "קאו לק · 6 לילות · 5 כוכבים, ספא מלא",
   "ref": "—",
   "payment": "₪4,029",
   "freeCancel": "ביטול חינם"
  },
  {
   "what": "Phor Liang Meun, צ׳יאנג מאי",
   "when": "—",
   "details": "בוטל ללא עלות",
   "ref": "6357383035",
   "payment": "฿0",
   "freeCancel": "בוטל 10/9"
  },
  {
   "id": "kyn-2026-11",
   "what": "KYN Phoenix Muay Thai · Sea House Room",
   "when": "26–29/11/2026",
   "details": "קו יאו נוי · 3 לילות · חדר, ארוחות ואימוני קבוצה לשניים. ביום ראשון אין אימון ואין אוכל",
   "ref": "אושר במייל — נסגר עם המקדמה",
   "payment": "฿12,150 · מקדמה ฿6,075 ב-Wise, היתרה ฿6,075 במזומן בהגעה",
   "freeCancel": "אין — המקדמה אינה מוחזרת"
  }
 ],
 "hotels": [
  {
   "dest": "בנגקוק",
   "dates": "23–26/11",
   "nights": 3,
   "hotel": "Montraj Coach Sukhumvit",
   "what": "1st Class Coach, מיטה זוגית · בריכה על הגג · אישור 5123136373 · פיקדון ฿1,000 מזומן · משלמים במקום · ₪1,128 לשלושת הלילות.",
   "perNight": 4186.67,
   "choice": "מוזמן",
   "freeCancel": "עד 20/11",
   "link": "בוקינג",
   "linkLink": "https://secure.booking.com/"
  },
  {
   "dest": "בנגקוק",
   "dates": "23–26/11",
   "nights": 3,
   "hotel": "Maison Hotel Bangkok",
   "what": "8.8 · סאונה, ספא, בריכה, עיסוי זוגי. סוכומוויט, ליד נאנה. מה שהתקציב המקורי הניח.",
   "perNight": 2852,
   "choice": "חלופה",
   "freeCancel": "לבדוק",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/maisonbangkok.html"
  },
  {
   "dest": "בנגקוק — ליל לוי קראתונג",
   "dates": "24/11",
   "nights": 1,
   "hotel": "Sala Rattanakosin",
   "what": "8.8 · מול ואט ארון מהחדר ומהגג, בלי להילחם על שולחן. תוספת כ-฿7,110 מול המלון הרגיל.",
   "perNight": 9962,
   "choice": "מחוץ לתקציב",
   "freeCancel": "לבדוק",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/sala-rattanakosin-bangkok.html"
  },
  {
   "dest": "קו יאו נוי",
   "dates": "26–29/11",
   "nights": 3,
   "hotel": "Sea House Room · KYN Phoenix",
   "what": "החבילה שאושרה: חדר, ארוחות ואימוני קבוצה לשניים, 3 לילות ב-฿12,150. ביום ראשון אין אימונים ואין הגשת אוכל.",
   "perNight": 4050,
   "choice": "הבחירה",
   "freeCancel": "אין — מקדמה 50% שאינה מוחזרת",
   "link": "אתר המחנה",
   "linkLink": "https://www.phuket-krabi-muaythai.com/prices-accomodation/"
  },
  {
   "dest": "קו יאו נוי",
   "dates": "26–29/11",
   "nights": 3,
   "hotel": "Deluxe A/C Room · KYN Phoenix",
   "what": "חדר מזגן במחנה בלי הנוף. חוסך ฿3,900 על שלושת הלילות.",
   "perNight": 2500,
   "choice": "חלופה",
   "freeCancel": "אין — מקדמה 50%",
   "link": "בוקינג",
   "linkLink": "https://www.phuket-krabi-muaythai.com/prices-accomodation/"
  },
  {
   "dest": "קו יאו נוי",
   "dates": "26–29/11",
   "nights": 3,
   "hotel": "Holiday Resort",
   "what": "8.1 על 1,178 ביקורות · למבוגרים בלבד, חוף פרטי, בריכה, בריכת טבילה, ספא. הזול והמאובזר מבין הגיבויים.",
   "perNight": 1710,
   "choice": "גיבוי",
   "freeCancel": "יש",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/holiday-resort.html"
  },
  {
   "dest": "קו יאו נוי",
   "dates": "26–29/11",
   "nights": 3,
   "hotel": "Sunrise House",
   "what": "8.9 על 490 ביקורות · מול הים בתא קאו, בריכה, מרחצאות באוויר הפתוח, חוף פרטי, עיסויים.",
   "perNight": 2033,
   "choice": "גיבוי",
   "freeCancel": "יש",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/baan-tha-khao-bungalow.html"
  },
  {
   "dest": "קו יאו נוי",
   "dates": "26–29/11",
   "nights": 3,
   "hotel": "Rongna Villas",
   "what": "8.8 על 241 ביקורות · וילות, עיסוי זוגות, מסעדה. בלי בריכה. הכי זול באי.",
   "perNight": 1249,
   "choice": "גיבוי",
   "freeCancel": "יש",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/orngnaawillaa.html"
  },
  {
   "dest": "אאו נאנג",
   "dates": "29/11–2/12",
   "nights": 3,
   "hotel": "Chermantra Aonang Resort & Pool Suite",
   "what": "Mountain Pool Villa עם אמבטיה ובריכה פרטית · ארוחת בוקר כלולה · אישור 5553772333 · בוקינג מחייבת את הכרטיס.",
   "perNight": 6825.67,
   "choice": "מוזמן",
   "freeCancel": "עד 14/11 — הדדליין הקרוב",
   "link": "בוקינג",
   "linkLink": "https://secure.booking.com/"
  },
  {
   "dest": "אאו נאנג",
   "dates": "29/11–2/12",
   "nights": 3,
   "hotel": "At Thara Aonang",
   "what": "8.4 · בריכה, ספא, עיסוי זוגי. הליכה לסירות של ריילאי. מה שהתקציב המקורי הניח.",
   "perNight": 1843,
   "choice": "חלופה",
   "freeCancel": "לבדוק",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/at-thara-aonang.html"
  },
  {
   "dest": "קאו לק",
   "dates": "2–8/12",
   "nights": 6,
   "hotel": "Kalima Resort and Villas Khao Lak",
   "what": "8.8 על 2,576 ביקורות · 5 כוכבים · ספא מלא עם חדר אדים, עיסוי זוגות, טיפולי גוף, בריכת אינפיניטי, בריכת מים מלוחים, בר-בריכה, יוגה וחדר כושר. גם פארק מים ומועדון ילדים.",
   "perNight": 7476.83,
   "choice": "מוזמן",
   "freeCancel": "יש",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/kalima-resort-amp-villas-khao-lak.html"
  },
  {
   "dest": "קאו סוק",
   "dates": "4–5/12",
   "nights": 1,
   "hotel": "בונגלו צף על אגם צ׳או לאן",
   "what": "כלול בסיור של ฿8,500 לאדם — לינה, אגרות פארק, מדריך, ארוחות, קאנו ומערה. הרציף כשעתיים מקאו לק, ולכן לילה ולא יום. שימו לב: החדר בקלימה משולם גם בלילה הזה.",
   "perNight": "כלול",
   "choice": "מומלץ",
   "freeCancel": "לבדוק מול המפעיל",
   "link": "בוקינג",
   "linkLink": "https://www.khaolaklanddiscovery.com/khao-lak-tours/cheow-lan-lake-khao-sok-floating-bungalows-tour/"
  },
  {
   "dest": "קו לנטה — הגרסה שנזנחה",
   "dates": "2–7/12",
   "nights": 5,
   "hotel": "Tropicana Lanta Resort",
   "what": "9.0 על 829 ביקורות · ג׳קוזי, מרחצאות פתוחים, בריכת טבילה. נשאר כאן להשוואה — דורש להחזיר את לילת המעבר בפוקט.",
   "perNight": 2925,
   "choice": "חלופה",
   "freeCancel": "יש",
   "link": "בוקינג",
   "linkLink": "https://www.booking.com/hotel/th/chaw-ka-cher-tropicana-lanta-resort.html"
  }
 ],
 "info": [
  {
   "topic": "ויזה",
   "detail": "ישראל ברשימת 60 המדינות שנשארות בפטור מוויזה אחרי 15/9/2026, והפטור קוצר מ-60 יום ל-30. הארכה של 30 יום במשרד הגירה ฿1,900. צריך הוכחה ליציאה מתאילנד בתוך החלון — ארקיע תבקש בצ׳ק-אין."
  },
  {
   "topic": "כרטיס כניסה דיגיטלי",
   "detail": "TDAC חובה, חינם, אונליין, ואפשר להגיש רק 72 שעות לפני הנחיתה. כל אתר שגובה עליו כסף הוא הונאה."
  },
  {
   "topic": "רישיון לקטנוע",
   "detail": "הרישיון הישראלי לא מספיק וגם בינלאומי רגיל לא — צריך רישיון בינלאומי לפי אמנת 1949 עם קטגוריית אופנוע (A). בלי זה הביטוח מבטל תביעה גם על שריטה. לסדר לפני הטיסה."
  },
  {
   "topic": "כסף",
   "detail": "כספומטים גובים ฿220 עמלה קבועה לכל משיכה — למשוך הרבה ולעיתים רחוקות. אוכל רחוב, סונגתאו, לונגטייל, מקדשים ופארקים לאומיים: מזומן בלבד."
  },
  {
   "topic": "סים",
   "detail": "סים תיירים של AIS או True בשדה, ฿300–600 לשבועיים דאטה. בדוכן הרשמי בטרמינל הנכנסים. כיסוי טוב בכל המסלול."
  },
  {
   "topic": "תחבורה",
   "detail": "גראב בבנגקוק ובפוקט. עם סונגתאו, טוק-טוק ולונגטייל — לסכם מחיר לפני שנכנסים. BTS ו-MRT מנצחים כל רכב בבנגקוק בין 07:00 ל-20:00."
  },
  {
   "topic": "סירות ועונה",
   "detail": "כל המעברים בין ריילאי, לנטה, קו יאו נוי ופוקט הם סירות עונתיות מנובמבר עד אפריל. לוחות 2026 מתפרסמים חודש-חודשיים מראש — המעבר ודאי, השעה פתוחה. לא לתכנן חיבור צמוד לטיסה."
  },
  {
   "topic": "מזג אוויר",
   "detail": "בנגקוק כ-32° ביום, 23° בלילה, בעיקר יבש. קראבי, לנטה ופוקט 31° ביום, ים כ-29°. תחילת דצמבר היא שיא הראות במים."
  },
  {
   "topic": "קוד לבוש",
   "detail": "הארמון המלכותי וואט פו אוכפים כתפיים וברכיים מכוסות על כולם. מכנסיים ארוכים קלים וחולצה עם שרוולים לכל אחד."
  },
  {
   "topic": "ממה להתעלם",
   "detail": "טוק-טוק שמציע סיור עיר ב-฿20, חנויות אבני חן, מי שאומר שהארמון סגור היום, וכל חוויית פילים שמפרסמת רכיבה. אותה הונאה בארבעה בגדים."
  },
  {
   "topic": "",
   "detail": "מוזמן: שתי טיסות ארקיע, מונטראג׳, צ׳רמנטרה, קלימה. כל השאר פתוח."
  },
  {
   "topic": "KYN · פרטי המחנה",
   "detail": "המחנה אישר אימוני קבוצה ב-08:00 וב-17:00. איתי: התאמת עמידה ובעיטות למואיי תאי, טיפים, מרפקים וקלינץ׳; טליה: יסודות למתחילה. ניתן להזמין אימון פרטי משותף; מחיר ומועד טרם נקבעו. ביום ההגעה אושר אימון טכניקה ב-16:00. להביא תחבושות ידיים ומגני שיניים; כפפות זמינות להשאלה או לרכישה. העברות עצמאיות בלבד."
  }
 ],
 "cuts": [
  {
   "what": "לוותר על קאו סוק",
   "save": "כ-₪700 לזוג",
   "lose": "הנוף היחיד בטיול שהוא לא חוף. נשארים שישה ימי חוף רצופים."
  },
  {
   "what": "חדר Deluxe במחנה במקום הדירה הפנורמית",
   "save": "כ-₪175",
   "lose": "הנוף לשקיעה. אותם אימונים, אותן ארוחות."
  },
  {
   "what": "לוותר על מואיי תאי ברג׳אדמנרן",
   "save": "כ-₪90",
   "lose": "אצטדיון בן שבעים שנה, ערב לפני שאתם עולים לרינג."
  },
  {
   "what": "ארוחת חג פשוטה במקום סאלה",
   "save": "כ-₪63",
   "lose": "הנוף מול ואט ארון בלילה שבשבילו באתם."
  }
 ],
 "deadline": {
  "date": "2026-11-14",
  "text": "צ׳רמנטרה — אחרי התאריך הזה הכרטיס מחויב במלוא הסכום"
 },
 "scooterInfo": {
  "title": "קטנועים",
  "lines": [
   "רק איתי רוכב, טליה מאחור — ולכן הרישיון הוא שלו: בינלאומי לפי אמנת 1949 עם קטגוריית אופנוע (A). רישיון רכב רגיל לא מספיק, ובלעדיו הביטוח לא משלם גם על שריטה.",
   "שתי קסדות, תמיד. החוק בתאילנד מחייב גם את מי שמאחור, וזה נאכף. קנס כ-฿500 לאדם.",
   "לבקש 125cc ומעלה. קטנוע 110 מתקשה בשניים בעליות, ובדיוק שם צריך כוח.",
   "בשניים הקטנוע כבד יותר ומרחק הבלימה ארוך — להשאיר פער גדול מהרגיל, במיוחד על כבישים רטובים.",
   "פיקדון: לשלם במזומן ולא להשאיר דרכון. משכירים שמחזיקים דרכון הם הדרך המוכרת לסחוט תשלום על נזק קיים.",
   "לצלם וידאו סביב הקטנוע לפני היציאה — שריטות, מראות, פנסים, מד דלק.",
   "ביטוח: לוודא שהפוליסה של איתי מכסה רכיבה, ושל טליה מכסה נסיעה כנוסעת. לבדוק גם עד איזה נפח מנוע — הרבה פוליסות עוצרות ב-125cc.",
   "לסרי לנקה צריך היתר נפרד — אישור של ה-AA המקומי. רלוונטי רק אם טליה רוכבת שם בעצמה."
  ]
 },
 "priceEstimateVersion": 1,
 "priceEstimateBaseline": {
  "s_1_0": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_1_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_1_2": {
   "baht": 800,
   "cat": "אחר"
  },
  "s_1_3": {
   "baht": 90,
   "cat": "תחבורה"
  },
  "s_1_4": {
   "baht": 90,
   "cat": "תחבורה"
  },
  "s_1_5": {
   "baht": null,
   "cat": "אחר"
  },
  "s_1_6": {
   "baht": null,
   "cat": "אחר"
  },
  "s_1_7": {
   "baht": 700,
   "cat": "אוכל"
  },
  "s_1_8": {
   "baht": 180,
   "cat": "תחבורה"
  },
  "s_1_9": {
   "baht": 4186.67,
   "cat": "לינה"
  },
  "s_2_0": {
   "baht": 250,
   "cat": "אוכל"
  },
  "s_2_1": {
   "baht": 130,
   "cat": "תחבורה"
  },
  "s_2_2": {
   "baht": 1000,
   "cat": "אטרקציות"
  },
  "s_2_3": {
   "baht": 600,
   "cat": "אטרקציות"
  },
  "s_2_4": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_2_5": {
   "baht": 130,
   "cat": "אחר"
  },
  "s_2_6": {
   "baht": 150,
   "cat": "אטרקציות"
  },
  "s_2_7": {
   "baht": 2800,
   "cat": "אוכל"
  },
  "s_2_8": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_2_9": {
   "baht": 300,
   "cat": "תחבורה"
  },
  "s_2_10": {
   "baht": 4186.67,
   "cat": "לינה"
  },
  "s_3_0": {
   "baht": 120,
   "cat": "תחבורה"
  },
  "s_3_1": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_3_2": {
   "baht": 300,
   "cat": "אוכל"
  },
  "s_3_3": {
   "baht": 500,
   "cat": "תחבורה"
  },
  "s_3_4": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_3_5": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_3_6": {
   "baht": 500,
   "cat": "תחבורה"
  },
  "s_3_7": {
   "baht": 700,
   "cat": "אטרקציות"
  },
  "s_3_8": {
   "baht": 200,
   "cat": "תחבורה"
  },
  "s_3_9": {
   "baht": 2000,
   "cat": "אטרקציות"
  },
  "s_3_10": {
   "baht": 800,
   "cat": "אוכל"
  },
  "s_3_11": {
   "baht": 180,
   "cat": "תחבורה"
  },
  "s_3_12": {
   "baht": 4186.67,
   "cat": "לינה"
  },
  "s_3_dream": {
   "baht": 2400,
   "cat": "אטרקציות"
  },
  "s_4_0": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_1": {
   "baht": 400,
   "cat": "תחבורה"
  },
  "s_4_2": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_3": {
   "baht": 4720,
   "cat": "תחבורה"
  },
  "s_4_4": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_5": {
   "baht": 800,
   "cat": "תחבורה"
  },
  "s_4_6": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_7": {
   "baht": 1100,
   "cat": "תחבורה"
  },
  "s_4_8": {
   "baht": 200,
   "cat": "תחבורה"
  },
  "s_4_9": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_10": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_4_11": {
   "baht": null,
   "cat": "אחר"
  },
  "s_4_12": {
   "baht": 0,
   "cat": "אטרקציות"
  },
  "s_4_13": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_4_14": {
   "baht": 4860,
   "cat": "לינה"
  },
  "s_5_0": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_5_1": {
   "baht": 0,
   "cat": "אטרקציות"
  },
  "s_5_2": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_5_3": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_5_4": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_5_5": {
   "baht": null,
   "cat": "אחר"
  },
  "s_5_6": {
   "baht": 0,
   "cat": "אטרקציות"
  },
  "s_5_7": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_5_8": {
   "baht": 4860,
   "cat": "לינה"
  },
  "s_5_moto": {
   "baht": 500,
   "cat": "תחבורה"
  },
  "s_6_0": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_6_1": {
   "baht": 0,
   "cat": "אטרקציות"
  },
  "s_6_2": {
   "baht": 0,
   "cat": "אוכל"
  },
  "s_6_3": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_6_4": {
   "baht": 150,
   "cat": "תחבורה"
  },
  "s_6_5": {
   "baht": 1500,
   "cat": "אטרקציות"
  },
  "s_6_6": {
   "baht": 150,
   "cat": "תחבורה"
  },
  "s_6_7": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_6_8": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_6_9": {
   "baht": 4860,
   "cat": "לינה"
  },
  "s_7_0": {
   "baht": null,
   "cat": "אוכל"
  },
  "s_7_1": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_7_2": {
   "baht": null,
   "cat": "אחר"
  },
  "s_7_3": {
   "baht": 200,
   "cat": "תחבורה"
  },
  "s_7_4": {
   "baht": 1200,
   "cat": "תחבורה"
  },
  "s_7_5": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_7_6": {
   "baht": null,
   "cat": "אחר"
  },
  "s_7_7": {
   "baht": null,
   "cat": "אחר"
  },
  "s_7_8": {
   "baht": 600,
   "cat": "אטרקציות"
  },
  "s_7_9": {
   "baht": 700,
   "cat": "אוכל"
  },
  "s_7_10": {
   "baht": 6825.67,
   "cat": "לינה"
  },
  "s_7_moto": {
   "baht": 500,
   "cat": "תחבורה"
  },
  "s_8_0": {
   "baht": null,
   "cat": "אוכל"
  },
  "s_8_1": {
   "baht": 300,
   "cat": "תחבורה"
  },
  "s_8_2": {
   "baht": 3000,
   "cat": "אטרקציות"
  },
  "s_8_3": {
   "baht": 500,
   "cat": "אוכל"
  },
  "s_8_4": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_8_5": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_8_6": {
   "baht": 300,
   "cat": "תחבורה"
  },
  "s_8_7": {
   "baht": 700,
   "cat": "אוכל"
  },
  "s_8_8": {
   "baht": 6825.67,
   "cat": "לינה"
  },
  "s_9_0": {
   "baht": null,
   "cat": "אוכל"
  },
  "s_9_1": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_9_2": {
   "baht": 1600,
   "cat": "אטרקציות"
  },
  "s_9_3": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_9_4": {
   "baht": 800,
   "cat": "אטרקציות"
  },
  "s_9_5": {
   "baht": 750,
   "cat": "אוכל"
  },
  "s_9_6": {
   "baht": 6825.67,
   "cat": "לינה"
  },
  "s_10_0": {
   "baht": null,
   "cat": "אוכל"
  },
  "s_10_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_10_2": {
   "baht": 3500,
   "cat": "תחבורה"
  },
  "s_10_3": {
   "baht": 150,
   "cat": "אוכל"
  },
  "s_10_4": {
   "baht": null,
   "cat": "אחר"
  },
  "s_10_5": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_10_6": {
   "baht": null,
   "cat": "אחר"
  },
  "s_10_7": {
   "baht": null,
   "cat": "אחר"
  },
  "s_10_8": {
   "baht": 800,
   "cat": "אוכל"
  },
  "s_10_9": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_10_moto": {
   "baht": 1000,
   "cat": "תחבורה"
  },
  "s_11_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_11_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_11_2": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_11_3": {
   "baht": 1600,
   "cat": "אטרקציות"
  },
  "s_11_4": {
   "baht": 850,
   "cat": "אוכל"
  },
  "s_11_5": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_12_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_12_1": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_12_2": {
   "baht": 7800,
   "cat": "אטרקציות"
  },
  "s_12_3": {
   "baht": null,
   "cat": "אוכל"
  },
  "s_12_4": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_12_5": {
   "baht": null,
   "cat": "אחר"
  },
  "s_12_6": {
   "baht": 800,
   "cat": "אוכל"
  },
  "s_12_7": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_13_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_13_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_13_2": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_13_3": {
   "baht": 800,
   "cat": "אטרקציות"
  },
  "s_13_4": {
   "baht": 850,
   "cat": "אוכל"
  },
  "s_13_5": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_14_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_14_zip": {
   "baht": 5000,
   "cat": "אטרקציות"
  },
  "s_14_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_14_2": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_14_3": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_14_4": {
   "baht": 850,
   "cat": "אוכל"
  },
  "s_14_5": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_15_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_15_1": {
   "baht": 7800,
   "cat": "אטרקציות"
  },
  "s_15_3": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_15_2": {
   "baht": null,
   "cat": "אטרקציות"
  },
  "s_15_4": {
   "baht": 900,
   "cat": "אוכל"
  },
  "s_15_5": {
   "baht": 7476.83,
   "cat": "לינה"
  },
  "s_16_0": {
   "baht": 400,
   "cat": "אוכל"
  },
  "s_16_1": {
   "baht": null,
   "cat": "אחר"
  },
  "s_16_2": {
   "baht": null,
   "cat": "אחר"
  },
  "s_16_3": {
   "baht": 450,
   "cat": "אוכל"
  },
  "s_16_4": {
   "baht": 1800,
   "cat": "תחבורה"
  },
  "s_16_5": {
   "baht": null,
   "cat": "אחר"
  },
  "s_16_6": {
   "baht": null,
   "cat": "תחבורה"
  },
  "s_16_7": {
   "baht": null,
   "cat": "אחר"
  },
  "s_16_8": {
   "baht": null,
   "cat": ""
  }
 },
 "campPayment": {
  "title": "תשלום למחנה בקו יאו נוי",
  "lines": [
   "סה״כ ฿12,150 לשהייה. מקדמה 50% — ฿6,075 — ב-Wise מראש; היתרה ฿6,075 במזומן בהגעה.",
   "במקום לא מקבלים כרטיסי אשראי ולא העברות בנקאיות — להגיע עם המזומן.",
   "פרטי החשבון שנשלחו: Government Savings Bank (GSB) תאילנד · חשבון 020488417021 · SWIFT GSBATHBKXXX · על שם Pattama Srikanha.",
   "לפני ההעברה — לאשר את פרטי החשבון בערוץ שני (טלפון או וואטסאפ למחנה). פרטי בנק שמגיעים במייל הם הדבר הכי מזויף בהזמנות טיולים, והחשבון כאן הוא על שם פרטי ובכתובת בחון קאן ולא באי.",
   "המחיר תוקן מ-฿14,580 ל-฿12,150 — לוודא שהסכום בבקשת התשלום תואם."
  ]
 }
};

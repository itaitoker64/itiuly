/*
 * המסלול מ-2/12: פי פי, שני לילות בקאו סוק, קאו לאק עם סימילן, ולילה אחרון
 * ביחד בבנגקוק — איתי טס הביתה ב-10/12 וטליה ממשיכה. וגם שמסמך שנשמר לפני
 * השינוי (מלפני הכל, או מסידור קופנגן) עובר אליו בלי לאבד שורות שנוספו
 * ידנית, ובלי לזוז פעמיים. בנוסף: המלון בבנגקוק, תאריך לוי קראתונג וחיי הלילה.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

function boot(user='itai'){
  const ctx = vm.createContext({
    window:{TRIP_USER:{username:user}},
    document:{addEventListener(){}, getElementById(){ return {addEventListener(){}}; }},
    console
  });
  vm.runInContext(read('public/shared-seed.js'), ctx);
  vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/, ''), ctx);
  vm.runInContext('STATE=seedData(); ensureDefaults();', ctx);
  return s => vm.runInContext(s, ctx);
}
const day = (run, date) => JSON.parse(run(`JSON.stringify(sh().days.find(d=>d.date==="${date}"))`));
const acts = d => d.rows.map(r => r.act).join(' | ');

const run = boot();
assert.equal(run('STATE.schema'), 20);

// --- the plan from 2/12 ---------------------------------------------------------
const all = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.day,d.date,d.dow,d.id,d.dest,d.owner||""]))'));
assert.equal(all.length, 18);
assert.deepEqual(all.slice(9).map(d => [d[1], d[2], d[3], d[4], d[5]]), [
  ['2026-12-02','ד׳','day_10','קו פי פי',''], ['2026-12-03','ה׳','day_11','קו פי פי',''], ['2026-12-04','ו׳','day_12','קאו סוק',''],
  ['2026-12-05','ש׳','day_13','קאו סוק',''], ['2026-12-06','א׳','day_14','קאו לאק',''], ['2026-12-07','ב׳','day_15','קאו לאק',''],
  ['2026-12-08','ג׳','day_16','קאו לאק',''], ['2026-12-09','ד׳','day_17','בנגקוק',''], ['2026-12-10','ה׳','day_18','בנגקוק → הביתה','']]);

assert.ok(/מעבורת · אאו נאנג → קו פי פי/.test(acts(day(run, '2026-12-02'))));
assert.ok(/Loh Dalum/.test(acts(day(run, '2026-12-02'))), 'a beach party on the first night');
assert.ok(/מאיה ביי/.test(acts(day(run, '2026-12-03'))));
const d4 = day(run, '2026-12-04');
assert.equal(d4.rows.find(r => r.id === 's_g4_1').time, '09:00');
assert.ok(d4.rows.some(r => /Palmview/.test(r.act) && r.cat === 'לינה' && r.status === 'להזמין'), 'the jungle nights, still to book');
const d5 = day(run, '2026-12-05');
assert.ok(/צ׳או לאן/.test(acts(d5)) && /Palmview/.test(acts(d5)), 'the lake on the full day, and back to the jungle for a second night');
assert.ok(/ג׳ונגל/.test(acts(day(run, '2026-12-06'))) && /קלימה/.test(acts(day(run, '2026-12-06'))), 'a morning in the jungle, then Khao Lak');
assert.ok(/סימילן/.test(acts(day(run, '2026-12-07'))));
assert.ok(/גיבוי/.test(day(run, '2026-12-08').summary), '8/12 is the Similan backup');
assert.ok(/קלימה|Kalima/.test(acts(day(run, '2026-12-08'))));
assert.ok(/HKT → בנגקוק/.test(acts(day(run, '2026-12-09'))));
const home = day(run, '2026-12-10').rows.find(r => r.id === 's_f10_2');
assert.equal(home.time, '11:15');
assert.ok(/IZ592/.test(home.act));
// Nothing left of Koh Phangan, the van, or the Phuket flight home.
const allDays = JSON.parse(run('JSON.stringify(sh().days)'));
assert.ok(!allDays.some(d => d.rows.some(r => /Halfmoon|Lomprayah|Sarana|ואן משותף לקאו לק|IZ598|צ׳יאנג מאי|Bangla|פטונג/.test(r.act))), 'no Phangan, no Patong');
for (const d of allDays.filter(d => d.date >= '2026-12-02')) {
  const t = d.rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order');
}

// Together until 10/12: both see the same days, and part in Bangkok.
const talia = boot('talia');
assert.equal(run('myDays().length'), 18);
assert.equal(talia('myDays().length'), 18);
assert.equal(run('splitDate()'), '2026-12-10');
assert.equal(run('homeDate()'), '2026-12-10');
const destDays = (r, name) => JSON.parse(r(`JSON.stringify(daysForDest(myDestinations().find(d=>d.name==="${name}")).map(d=>d.date))`));
assert.deepEqual(destDays(run, 'קו פי פי'), ['2026-12-02','2026-12-03']);
assert.deepEqual(destDays(run, 'קאו סוק'), ['2026-12-04','2026-12-05']);
assert.deepEqual(destDays(run, 'קאו לאק'), ['2026-12-06','2026-12-07','2026-12-08']);
assert.ok(!run('myDestinations().some(d=>d.name==="פטונג")'));
assert.deepEqual(destDays(run, 'בנגקוק — לילה אחרון'), ['2026-12-09','2026-12-10']);
assert.deepEqual(destDays(talia, 'בנגקוק — לילה אחרון'), ['2026-12-09','2026-12-10']);
// After 10/12 Talia waits for Melach in Bangkok, then the north, Sri Lanka, India as a draft, and Phangan in February.
const tRoute = JSON.parse(talia('JSON.stringify(myDestinations().filter(d=>d.owner==="talia").map(d=>d.name+" "+d.arrival))'));
assert.deepEqual(tRoute.slice(0, 13), ['בנגקוק — מחכה למלח 2026-12-10',"צ'יאנג מאי 2026-12-11",'פאי 2026-12-15',"צ'יאנג ראי 2026-12-18",
  'בנגקוק — לפני סרי לנקה 2026-12-20','נגומבו 2026-12-21','ולגמה 2026-12-22','טיסמהרמה · יאלה 2027-01-01','אלה 2027-01-02',
  'קנדי 2027-01-05','סיגיריה · דמבולה 2027-01-07','נגומבו — לילה לפני הטיסה 2027-01-10','וארקלה 2027-01-11']);
assert.equal(talia('myDestinations().find(d=>d.name==="ולגמה").nights'), 10);
assert.ok(talia('myDestinations().filter(d=>/הודו/.test(d.countryName)).every(d=>d.status==="optional")'), 'India is a draft');
assert.ok(talia('myDestinations().some(d=>d.name==="קופנגן — פברואר" && d.arrival==="2027-02-14")'));
assert.ok(!run('myDestinations().some(d=>d.owner==="talia")'), 'none of it shows up for Itai');
assert.ok(talia('STATE.masterChecklist.some(t=>t.title==="לינה בוולגמה 22/12–1/1 — חגים, להזמין מוקדם" && t.owner==="talia")'));
assert.ok(talia('renderRouteTab()').includes('נפרדים בבנגקוק'));

// The ledger: Kalima for 6–9/12, the Bangkok night shared, nothing for Phangan.
assert.equal(run('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(run('wallet().expenses.find(x=>/Eleven Bangkok/.test(x.title)).split'), 'ratio');
assert.equal(run('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(run('wallet().expenses.filter(x=>x.paidBy==="talia").length'), 0);
// The tasks: what to book and what to cancel.
for (const t of ['להזמין לינה בפי פי, 2–4/12', 'להזמין לינה בקאו סוק, 4–6/12',
                 'לעדכן את Eleven Bangkok לשני אנשים', 'להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם', 'לבטל את Sarana Bungalows — חינם עד 28/11']) {
  assert.ok(run(`STATE.masterChecklist.some(t=>t.title===${JSON.stringify(t)})`), t);
}
assert.ok(!run('STATE.masterChecklist.some(t=>/Halfmoon|Lomprayah|ואן משותף|לצ׳יאנג מאי ב-8|פטונג/.test(t.title))'));
// Kalima rebooked for 6–9/12 (non-refundable, no breakfast); the old booking and Our Jungle House are cancelled.
assert.equal(run('sh().bookings.find(b=>b.what==="Kalima Resort and Villas").ref'), '7195273990380466772');
assert.ok(/לא מוחזר/.test(run('sh().hotels.find(h=>h.hotel==="Kalima Resort and Villas Khao Lak").freeCancel')));
assert.ok(/בוטל/.test(run('sh().bookings.find(b=>b.what==="Our Jungle House").freeCancel')));
assert.equal(day(run, '2026-12-08').rows.find(r => r.id === 's_g8_0').baht, 1480, 'breakfast at Kalima is paid for now');
assert.ok(!run('STATE.masterChecklist.some(t=>t.title==="לשנות את קלימה ל-6–9/12 בבוקינג"||t.title==="לבטל את Our Jungle House — חינם עד 8/11")'), 'done, so not on a fresh list');
const k18 = boot();
k18(`STATE=seedData();
STATE.masterChecklist.push({id:'m_k',owner:'both',title:'לשנות את קלימה ל-6–9/12 בבוקינג',status:'todo'},{id:'m_j',owner:'itai',title:'לבטל את Our Jungle House — חינם עד 8/11',status:'todo'});
Object.assign(sh().bookings.find(b=>b.what==="Kalima Resort and Villas"),{ref:'5770154448'});
Object.assign(wallet().expenses.find(x=>/Kalima/.test(x.title)),{amount:2072});
sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_g8_0').baht=400;
STATE.schema=18; ensureDefaults();`);
assert.equal(k18('STATE.masterChecklist.find(t=>t.id==="m_k").status'), 'done');
assert.equal(k18('STATE.masterChecklist.find(t=>t.id==="m_j").status'), 'done');
assert.equal(k18('sh().bookings.find(b=>b.what==="Kalima Resort and Villas").ref'), '7195273990380466772');
assert.equal(k18('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(k18('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_g8_0").baht'), 1480);

// --- a document saved before any of this (schema 14) ------------------------------
const old = boot();
old(`STATE=seedData();
sh().days=sh().days.filter(d=>d.date<'2026-12-02').concat([
  {day:11,date:'2026-12-03',dow:'ה׳',id:'day_11',dest:'קאו לק',summary:'סימילן',rows:[
    {id:'s_15_1',act:'סימילן — יום שנורקלינג',time:'07:00',done:true},{id:'custom-towel',act:'לקחת מגבת',done:false}]},
  {day:16,date:'2026-12-08',dow:'ג׳',id:'day_16',dest:'קאו לק → הביתה',summary:'הביתה',rows:[
    {id:'s_16_6',act:'ארקיע IZ598 · פוקט → תל אביב',time:'17:20'}]}]);
const n30=sh().days.find(d=>d.date==='2026-11-30'), n1=sh().days.find(d=>d.date==='2026-12-01');
const night=n30.rows.splice(n30.rows.findIndex(r=>r.id==='s_9_night'),1)[0]; night.time='22:00'; night.done=true; n1.rows.push(night);
STATE.trip.splitDate='2026-12-08'; delete STATE.trip.itai.homeDate; STATE.trip.itai.homeFlight='ארקיע IZ598 · פוקט → תל אביב · 8/12, 17:20';
STATE.trip.talia.onwardDate='2026-12-08'; STATE.trip.talia.onwardFlight='פוקט → צ׳יאנג מאי · 8/12 — באותו יום שאיתי טס הביתה';
const ex=wallet().expenses;
Object.assign(ex.find(x=>/IZ592/.test(x.title)),{title:'ארקיע IZ598 · פוקט → תל אביב'});
Object.assign(ex.find(x=>/Kalima/.test(x.title)),{title:'Kalima Resort · 6 לילות בקאו לק',amount:4029});
wallet().expenses=ex.filter(x=>!/Eleven|שינוי טיסה/.test(x.title));
const thai=STATE.countries.find(c=>c.id==='thailand');
thai.destinations=thai.destinations.filter(d=>!['קו פי פי','קאו סוק','פטונג','בנגקוק — לילה אחרון'].includes(d.name));
Object.assign(thai.destinations.find(d=>d.name==='קאו לאק'),{name:'קאו לק',arrival:'2026-12-02',departure:'2026-12-08',nights:6});
thai.destinations=thai.destinations.filter(d=>d.owner!=='talia').concat([
  {id:'d_cm',owner:'talia',name:"צ'יאנג מאי",arrival:'2026-12-08',departure:'2026-12-09',nights:1,transport:'טיסה מפוקט — באותו יום שאיתי טס הביתה'},
  {id:'d_pai',owner:'talia',name:'פאי — קורס מורים ליוגה',arrival:'2026-12-09',departure:'2027-01-08',nights:30}]);
const sl=STATE.countries.find(c=>c.id==='srilanka');
sl.destinations=[{id:'d_col',owner:'talia',name:'קולומבו',arrival:'2027-01-08'},{id:'d_aru',owner:'talia',name:'ארוגם ביי',arrival:'2027-01-19'}];
STATE.countries=STATE.countries.filter(c=>c.id!=='india');
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!WEST_TASKS.some(p=>p.title===t.title));
STATE.masterChecklist.push({id:'m_van',owner:'both',category:'הזמנות',title:'להזמין ואן משותף מאאו נאנג לקאו לק',status:'todo'});
STATE.schema=14;
ensureDefaults();`);
assert.equal(old('STATE.schema'), 20);
assert.deepEqual(JSON.parse(old('JSON.stringify(sh().days.map(d=>d.date))')).slice(9),
  ['2026-12-02','2026-12-03','2026-12-04','2026-12-05','2026-12-06','2026-12-07','2026-12-08','2026-12-09','2026-12-10']);
const o3 = day(old, '2026-12-03');
assert.ok(/מאיה ביי/.test(acts(o3)), '3/12 is the new day');
assert.ok(!o3.rows.some(r => r.id === 's_15_1'), 'the old Similan row is gone with its day');
assert.equal(o3.rows[o3.rows.length - 1].id, 'custom-towel', 'a row added by hand stays on its date');
assert.equal(old('splitDate()'), '2026-12-10');
assert.ok(/IZ592/.test(old('STATE.trip.itai.homeFlight')));
assert.equal(old('STATE.trip.talia.onwardDate'), '2026-12-10');
assert.ok(/IZ592/.test(old('wallet().expenses.find(x=>x.amount===1891).title')));
assert.equal(old('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(old('wallet().expenses.filter(x=>/Eleven|שינוי טיסה/.test(x.title)).length'), 2);
const names = JSON.parse(old('JSON.stringify(STATE.countries.find(c=>c.id==="thailand").destinations.map(d=>d.name+" "+d.arrival))'));
assert.deepEqual(names.slice(3, 9), ['קו פי פי 2026-12-02','קאו סוק 2026-12-04','קאו לאק 2026-12-06',
  'בנגקוק — לילה אחרון 2026-12-09','בנגקוק — מחכה למלח 2026-12-10',"צ'יאנג מאי 2026-12-11"]);
assert.ok(!names.some(n => /קורס מורים|ארוגם|קולומבו/.test(n)), 'the old onward plan is gone');
assert.ok(old('STATE.countries.some(c=>c.id==="india")'));
assert.equal(old('STATE.masterChecklist.find(t=>t.title==="הארכת שהייה — הפטור קוצר ל-30 יום").status'), 'done');
assert.ok(!old('STATE.masterChecklist.some(t=>/ואן משותף/.test(t.title))'), 'the van task is dropped');
// The big Ao Nang night moved to 30/11 with its tick.
const moved = day(old, '2026-11-30').rows.find(r => r.id === 's_9_night');
assert.ok(moved && moved.done === true);
assert.ok(!day(old, '2026-12-01').rows.some(r => r.id === 's_9_night'));
// Running it again changes nothing.
const settled = old('JSON.stringify(STATE)');
old('ensureDefaults();');
assert.equal(old('JSON.stringify(STATE)'), settled);
old('STATE.schema=15; ensureDefaults();');
assert.equal(old('wallet().expenses.length'), JSON.parse(settled).money.expenses.length, 'no second copy of the bookings');
assert.equal(old('STATE.masterChecklist.length'), JSON.parse(settled).masterChecklist.length);
assert.equal(old('STATE.countries.find(c=>c.id==="thailand").destinations.length'), JSON.parse(settled).countries.find(c=>c.id==='thailand').destinations.length);
assert.equal(old('JSON.stringify(sh().days)'), JSON.stringify(JSON.parse(settled).shared.days));

// --- a document saved with the Koh Phangan plan (schema 15) -----------------------
const ph = boot();
ph(`STATE=seedData();
const d2=sh().days.find(d=>d.date==='2026-12-02');
d2.rows=[{id:'s_p2_2',act:'Lomprayah · אאו נאנג → Thong Sala',time:'08:00',done:true},{id:'custom-earplugs',act:'אטמי אוזניים',done:false}];
const thai=STATE.countries.find(c=>c.id==='thailand');
Object.assign(thai.destinations.find(d=>d.name==='קו פי פי'),{name:'קופנגן',departure:'2026-12-05',nights:3});
thai.destinations.push({id:'d_solo',name:'קאו לאק — עוד לילה',owner:'itai',arrival:'2026-12-08',departure:'2026-12-09',nights:1});
wallet().expenses.push({id:'x_sarana',title:'Sarana Bungalows · 3 לילות בקופנגן',amount:3060,currency:'THB',paidBy:'itai',split:'ratio',status:'due'},
  {id:'x_jungle',title:'Our Jungle House · לילה בקאו סוק',amount:514,currency:'ILS',paidBy:'itai',split:'ratio',status:'paid'});
Object.assign(wallet().expenses.find(x=>/Kalima/.test(x.title)),{amount:2103});
Object.assign(wallet().expenses.find(x=>/Eleven/.test(x.title)),{split:'full-itai'});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>t.title!=='לשנות את קלימה ל-6–9/12 בבוקינג');
STATE.masterChecklist.push(
  {id:'m_hm',owner:'both',title:'כרטיסים ל-Halfmoon, 2–3/12',status:'done'},
  {id:'m_lp',owner:'both',title:'להזמין Lomprayah מאאו נאנג לקופנגן',status:'todo'},
  {id:'m_i9',owner:'itai',title:'להזמין טיסה מפוקט לבנגקוק ב-9/12',status:'done'},
  {id:'m_k',owner:'both',title:'לשנות את קלימה ל-6–9/12 בבוקינג',status:'done'});
sh().planB={done:{}};
STATE.schema=15; ensureDefaults();`);
assert.equal(ph('STATE.schema'), 20);
const p2 = day(ph, '2026-12-02');
assert.ok(!p2.rows.some(r => /Lomprayah/.test(r.act)));
assert.ok(p2.rows.some(r => r.id === 'custom-earplugs'), 'a hand-added row survives');
assert.ok(ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="קו פי פי")'));
assert.ok(!ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>/^קופנגן$|עוד לילה/.test(d.name))'));
assert.equal(ph('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(ph('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(ph('wallet().expenses.find(x=>/Eleven/.test(x.title)).split'), 'ratio');
// Tickets already bought become a reminder to cancel; what was never booked just goes.
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_hm").title'), 'לבטל: כרטיסים ל-Halfmoon, 2–3/12');
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_hm").status'), 'todo');
assert.ok(!ph('STATE.masterChecklist.some(t=>t.id==="m_lp")'));
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_i9").title'), 'להוסיף את טליה לטיסה לבנגקוק ב-9/12');
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_k").status'), 'done', 'Kalima already moved to 6–9/12 — which is the plan again');

// --- a document saved with Patong (schema 16) -------------------------------------
const pt = boot();
pt(`STATE=seedData();
const ks=sh().days.find(d=>d.date==='2026-12-05'); ks.dest='קאו לאק'; ks.rows.push({id:'custom-sunscreen',act:'קרם הגנה',done:false});
const thai=STATE.countries.find(c=>c.id==='thailand');
thai.destinations.push({id:'d_patong',name:'פטונג',owner:'both',arrival:'2026-12-08',departure:'2026-12-09',nights:1});
Object.assign(thai.destinations.find(d=>d.name==='קאו סוק'),{departure:'2026-12-05',nights:1});
sh().hotels.push({dest:'פטונג',hotel:'Patong Beach Hotel by See2Sea',choice:'הבחירה'});
Object.assign(wallet().expenses.find(x=>/Kalima/.test(x.title)),{amount:2661});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!/קאו סוק, 4–6|ל-6–9|סימילן, 7/.test(t.title));
STATE.masterChecklist.push(
  {id:'m_pt',owner:'both',title:'להזמין לינה בפטונג, 8/12',status:'done'},
  {id:'m_ks',owner:'both',title:'להזמין לינה בקאו סוק, 4/12',status:'done'},
  {id:'m_k58',owner:'both',title:'לשנות את קלימה ל-5–8/12 בבוקינג',status:'todo'},
  {id:'m_sim',owner:'both',title:'להזמין סימילן, 6/12',status:'done'});
STATE.schema=16; ensureDefaults();`);
assert.equal(pt('STATE.schema'), 20);
assert.ok(!pt('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="פטונג")'));
assert.equal(pt('STATE.countries.find(c=>c.id==="thailand").destinations.find(d=>d.name==="קאו סוק").nights'), 2);
assert.ok(!pt('sh().hotels.some(h=>h.dest==="פטונג")'));
assert.equal(day(pt, '2026-12-05').dest, 'קאו סוק');
assert.ok(day(pt, '2026-12-05').rows.some(r => r.id === 'custom-sunscreen'), 'a hand-added row survives');
assert.equal(pt('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_pt").title'), 'לבטל: לינה בפטונג, 8/12');
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_ks").title'), 'להוסיף לילה בקאו סוק — 5/12');
assert.ok(!pt('STATE.masterChecklist.some(t=>t.id==="m_k58")'), 'the 5–8/12 Kalima change is replaced by 6–9/12');
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_sim").title'), 'להזיז את סימילן ל-7/12');
const ptSettled = pt('JSON.stringify(STATE)');
pt('ensureDefaults();');
assert.equal(pt('JSON.stringify(STATE)'), ptSettled);
assert.equal(ph('sh().planB'), undefined);

// --- the Bangkok hotel, booked direct ---------------------------------------
const bkk = boot();
const mx = JSON.parse(bkk('JSON.stringify(wallet().expenses.find(x=>/Montraj Coach/.test(x.title)))'));
assert.equal(mx.amount, 8169.87);
assert.equal(mx.currency, 'THB');
assert.equal(mx.status, 'due', 'paid at the hotel, so still due');
assert.ok(/3051425/.test(mx.note));
// The forecast takes the price from the ledger, once, split across the three nights.
const nightIls = bkk('sharedRowPrice(sh().days[0].rows.find(r=>r.id==="s_1_9")).base');
assert.ok(Math.abs(nightIls - 8169.87 * bkk('rate()') / 3) < 0.001);
const mb = JSON.parse(bkk('JSON.stringify(sh().bookings.find(b=>b.what==="Montraj Coach Sukhumvit"))'));
assert.equal(mb.ref, '3051425');
assert.ok(/21\/11/.test(mb.freeCancel));
const mh = JSON.parse(bkk('JSON.stringify(sh().hotels.find(h=>h.hotel==="Montraj Coach Sukhumvit"))'));
assert.equal(mh.perNight, 2723.29);
assert.ok(!/booking\.com/.test(mh.linkLink), 'links to the hotel, not Booking');
for (const id of ['s_1_9', 's_2_10', 's_3_12']) {
  const r = JSON.parse(bkk(`JSON.stringify(sh().days.flatMap(d=>d.rows).find(r=>r.id==="${id}"))`));
  assert.equal(r.baht, 2723.29, id);
  assert.ok(!/5123136373/.test(r.notes || ''), 'no Booking reference left on ' + id);
}
assert.ok(/12:00/.test(bkk('sh().days[0].rows.find(r=>r.id==="s_1_5").notes')), 'check-out time from the confirmation');
// A reminder to cancel the Booking reservation, so there are not two.
assert.ok(bkk('STATE.masterChecklist.some(t=>/לבטל את הזמנת בוקינג של Montraj/.test(t.title) && t.owner==="itai")'));

// A saved document still holding the Booking reservation is moved over...
const oldBkk = boot();
oldBkk(`STATE=seedData();
const x=wallet().expenses.find(e=>/Montraj Coach/.test(e.title));
Object.assign(x,{amount:1128,currency:'ILS',note:'אישור 5123136373'});
sh().days[0].rows.find(r=>r.id==='s_1_9').done=true;
STATE.schema=12;
ensureDefaults();`);
assert.equal(oldBkk('wallet().expenses.find(e=>/Montraj Coach/.test(e.title)).amount'), 8169.87);
assert.equal(oldBkk('sh().days[0].rows.find(r=>r.id==="s_1_9").done'), true, 'keeping the tick');
assert.equal(oldBkk('sh().bookings.find(b=>b.what==="Montraj Coach Sukhumvit").ref'), '3051425');
// ...but an amount someone corrected by hand is left alone.
const edited = boot();
edited(`STATE=seedData();
Object.assign(wallet().expenses.find(e=>/Montraj Coach/.test(e.title)),{amount:9000,currency:'THB'});
STATE.schema=12; ensureDefaults();`);
assert.equal(edited('wallet().expenses.find(e=>/Montraj Coach/.test(e.title)).amount'), 9000);


// Loy Krathong: the Thai calendar date, and a warning about the wrong one.
const lanterns = day(run, '2026-11-24').rows.find(r => r.id === 's_2_8');
assert.ok(/24\/11/.test(lanterns.notes) && /25\/11/.test(lanterns.notes));


console.log('PASS: Phi Phi, two nights in Khao Sok, Khao Lak and Bangkok from 2/12, together until 10/12; moves from schema 14, 15 and 16 without losing hand-added rows, once; Bangkok hotel booked direct; Loy Krathong date.');

// --- nightlife --------------------------------------------------------------
{
  const n = boot();
  const nights = JSON.parse(n('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/_night$/.test(r.id)).map(r=>d.date)))'));
  assert.deepEqual(nights, ['2026-11-23','2026-11-29','2026-11-30','2026-12-02','2026-12-03','2026-12-08','2026-12-09']);
  // never the night before an early start
  for (const date of nights) {
    const i = JSON.parse(n('JSON.stringify(sh().days.map(d=>d.date))')).indexOf(date);
    const next = JSON.parse(n(`JSON.stringify(sh().days[${i+1}].rows.find(r=>r.time))`));
    assert.ok(next.time >= '07:15', date + ' is followed by ' + next.time);
  }
  const d1 = JSON.parse(n('JSON.stringify(sh().days[0].rows.map(r=>r.act))'));
  assert.ok(d1.indexOf('גראב חזרה למלון') > d1.findIndex(a=>a.startsWith('חאו סן')), 'the ride home comes after Khao San');
  // a saved document gets the nights once
  const o = boot();
  o(`STATE=seedData(); sh().days.forEach(d=>d.rows=d.rows.filter(r=>!/_night$/.test(r.id))); STATE.schema=13; ensureDefaults();`);
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 7);
  o('STATE.schema=13; ensureDefaults();');
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 7);
  console.log('PASS: nightlife on seven evenings, none before an early start, migration once.');
}

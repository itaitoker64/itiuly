/*
 * המסלול מ-2/12: לילה רביעי באאו נאנג (פי פי בטיול יום), שלושה לילות בקאו סוק, שלושה
 * בקאו לאק עם סימילן, ולילה אחרון ביחד בבנגקוק — איתי טס הביתה ב-10/12 וטליה ממשיכה. וגם שמסמך שנשמר לפני
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
const allRowsOf = run => JSON.parse(run('JSON.stringify(sh().days.flatMap(d=>d.rows))'));

const run = boot();
assert.equal(run('STATE.schema'), 25);

// --- the plan: north first, then the Andaman, and Bangkok at the end -------------
const all = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.day,d.date,d.dow,d.id,d.dest,d.owner||""]))'));
assert.equal(all.length, 18);
assert.deepEqual(all.map(d => d[4]), ['צ׳יאנג מאי','צ׳יאנג מאי','צ׳יאנג מאי','קו יאו נוי','קו יאו נוי','קו יאו נוי',
  'אאו נאנג','אאו נאנג','אאו נאנג','אאו נאנג','קאו סוק','קאו סוק','קאו לאק','קאו לאק','קאו לאק','בנגקוק','בנגקוק','בנגקוק → הביתה']);
assert.deepEqual(all.slice(9).map(d => [d[1], d[2], d[3]]), [
  ['2026-12-02','ד׳','day_10'], ['2026-12-03','ה׳','day_11'], ['2026-12-04','ו׳','day_12'], ['2026-12-05','ש׳','day_13'], ['2026-12-06','א׳','day_14'],
  ['2026-12-07','ב׳','day_15'], ['2026-12-08','ג׳','day_16'], ['2026-12-09','ד׳','day_17'], ['2026-12-10','ה׳','day_18']]);
// 23/11: off the overnight flight and straight on to Chiang Mai — no night in Bangkok.
const d23 = day(run, '2026-11-23');
assert.ok(d23.rows.some(r => r.id === 's_1_cnx' && /צ׳יאנג מאי/.test(r.act) && r.status === 'להזמין' && r.time >= '16:30'), 'a flight north, with time for immigration and bags');
assert.ok(!d23.rows.some(r => /Montraj|מונטראג׳|חאו סן/.test(r.act)), 'no Bangkok on the first night');
assert.ok(d23.rows.some(r => r.cat === 'לינה' && /צ׳יאנג מאי/.test(r.act)));
assert.ok(/לוי קראתונג/.test(acts(day(run, '2026-11-24'))), 'Loy Krathong on 24/11, in Chiang Mai');
assert.ok(/24\/11/.test(day(run, '2026-11-24').rows.find(r => r.id === 's_c2_6').notes));
assert.ok(/פילים/.test(acts(day(run, '2026-11-25'))) && /דוי סותפ/.test(acts(day(run, '2026-11-25'))));
// 26/11: the camp is unchanged — a morning flight from Chiang Mai, and the 16:00 session.
const d26 = day(run, '2026-11-26');
assert.ok(/צ׳יאנג מאי → פוקט/.test(d26.rows.find(r => r.id === 's_4_3').act));
assert.equal(d26.rows.find(r => r.id === 's_4_12').time, '16:00');
assert.ok(!allRowsOf(run).some(r => /TG203/.test(r.act)), 'no flight from Bangkok to Phuket');
// Phi Phi is a day trip from Ao Nang — a fourth night at Chermantra.
const d2 = day(run, '2026-12-02');
assert.ok(d2.rows.some(r => /מאיה ביי/.test(r.act) && r.status === 'אופציונלי'));
assert.ok(d2.rows.some(r => /Chermantra/.test(r.act) && r.cat === 'לינה' && r.status === 'להזמין'));
assert.ok(!allRowsOf(run).some(r => /מעבורת|ChaoKoh|Loh Dalum|טונסאי|נאם טאלו/.test(r.act + ' ' + r.loc)));
// Khao Sok for two nights, Khao Lak 5–8/12.
assert.equal(day(run, '2026-12-03').rows.find(r => r.id === 's_g4_1').act, 'ואן · אאו נאנג → קאו סוק');
const d4 = day(run, '2026-12-04');
assert.ok(/צ׳או לאן/.test(acts(d4)) && /Palmview/.test(acts(d4)));
const d5 = day(run, '2026-12-05');
assert.ok(/ג׳ונגל/.test(acts(d5)) && /קלימה/.test(acts(d5)), 'a morning in the jungle, then Khao Lak');
assert.ok(d5.rows.some(r => /Kalima.*לילה נוסף/.test(r.act) && r.status === 'להזמין'), 'the extra Kalima night, booked separately');
assert.ok(/סימילן/.test(acts(day(run, '2026-12-06'))));
assert.ok(/גיבוי/.test(day(run, '2026-12-07').summary), '7/12 is the Similan backup');
// The Kalima booking is counted in full on the two nights it is used.
const kal = allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'Kalima');
assert.deepEqual(kal.map(r => r.id), ['s_g7_stay', 's_g8_stay']);
assert.ok(kal.every(r => r.priceEstimate.booking.rows === 2));
assert.equal(allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'Chermantra').length, 3);
// Two nights in Bangkok at the end, at Montraj: ISB on the way in, the river day on 9/12.
const d8 = day(run, '2026-12-08');
assert.ok(/HKT → DMK/.test(d8.rows.find(r => r.id === 's_g9_2').loc));
assert.ok(/ISB/.test(acts(d8)) && /צ׳אנגוואטנה/.test(acts(d8)));
const d9 = day(run, '2026-12-09');
const seq = ['s_2_canal','s_2_arun','s_2_ferry','s_2_3','s_2_tuk','s_2_2','s_2_swing','s_2_saket','s_3_9'];
assert.deepEqual(d9.rows.filter(r => seq.includes(r.id)).map(r => r.id), seq, 'canals to Wat Arun, Wat Pho, the palace, the Golden Mount, then Rajadamnern');
assert.deepEqual(allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'Montraj Coach').map(r => r.id), ['s_1_9','s_2_10']);
assert.ok(!allRowsOf(run).some(r => /Eleven/.test(r.act)));
const home = day(run, '2026-12-10').rows.find(r => r.id === 's_f10_2');
assert.equal(home.time, '11:15');
assert.ok(/IZ592/.test(home.act));
const allDays = JSON.parse(run('JSON.stringify(sh().days)'));
assert.ok(!allDays.some(d => d.rows.some(r => /Halfmoon|Lomprayah|Sarana|ואן משותף לקאו לק|IZ598|Bangla|פטונג/.test(r.act))), 'no Phangan, no Patong');
for (const d of allDays) {
  const t = d.rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order');
}
// The workouts, by date: strength Sun/Wed lower, Mon/Thu upper, runs Tue and Fri, rest on Saturday; Muay Thai at the camp stands in for strength.
const w = JSON.parse(run('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/^s_w_/.test(r.id)).map(r=>[d.date,d.dow,r.act,r.loc])))'));
const kinds = {'א׳':/תחתון/,'ד׳':/תחתון/,'ב׳':/עליון/,'ה׳':/עליון/,'ג׳':/ריצה/,'ו׳':/ריצה ארוכה/};
for (const [date, dow, act, loc] of w) {
  assert.ok(kinds[dow] && kinds[dow].test(act), date + ' ' + dow + ' ' + act);
  assert.equal(loc, '', 'dates only, no places');
}
assert.ok(!w.some(x => x[1] === 'ש׳'), 'Saturday is rest');
assert.ok(!w.some(x => x[0] === '2026-11-26'), 'the camp session replaces strength on 26/11');
assert.ok(!w.some(x => x[0] === '2026-12-08'), 'a travel day: the Tuesday run goes first');
assert.deepEqual(w.filter(x => /ריצה/.test(x[2])).map(x => x[0]), ['2026-11-24','2026-11-27','2026-12-01','2026-12-04']);
assert.ok(run('sh().info.some(i=>i.topic==="אימונים")'));

// Together until 10/12: both see the same days, and part in Bangkok.
const talia = boot('talia');
assert.equal(run('myDays().length'), 18);
assert.equal(talia('myDays().length'), 18);
assert.equal(run('splitDate()'), '2026-12-10');
assert.equal(run('homeDate()'), '2026-12-10');
const destDays = (r, name) => JSON.parse(r(`JSON.stringify(daysForDest(myDestinations().find(d=>d.name==="${name}")).map(d=>d.date))`));
assert.ok(!run('myDestinations().some(d=>d.name==="קו פי פי")'));
assert.deepEqual(destDays(run, 'אאו נאנג וריילאי'), ['2026-11-29','2026-11-30','2026-12-01','2026-12-02']);
assert.deepEqual(destDays(run, 'צ׳יאנג מאי — לוי קראתונג'), ['2026-11-23','2026-11-24','2026-11-25']);
assert.deepEqual(destDays(run, 'קאו סוק'), ['2026-12-03','2026-12-04']);
assert.deepEqual(destDays(run, 'קאו לאק'), ['2026-12-05','2026-12-06','2026-12-07']);
assert.ok(!run('myDestinations().some(d=>d.name==="פטונג"||d.name==="בנגקוק")'));
assert.deepEqual(destDays(run, 'בנגקוק — סוף הטיול'), ['2026-12-08','2026-12-09','2026-12-10']);
assert.deepEqual(destDays(talia, 'בנגקוק — סוף הטיול'), ['2026-12-08','2026-12-09','2026-12-10']);
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
// Talia has no return ticket: the Colombo flight is her proof of exit, due before she flies out on 22/11.
assert.equal(talia('STATE.masterChecklist.find(t=>t.title==="טיסה מתאילנד לסרי לנקה").deadline'), '2026-11-20');
assert.ok(/22\/12/.test(talia('STATE.masterChecklist.find(t=>t.title==="טיסה מתאילנד לסרי לנקה").notes')));
const o20 = boot('talia');
o20(`STATE=seedData(); Object.assign(STATE.masterChecklist.find(t=>t.title==="טיסה מתאילנד לסרי לנקה"),{deadline:'2026-11-30',notes:''}); STATE.schema=20; ensureDefaults();`);
assert.equal(o20('STATE.masterChecklist.find(t=>t.title==="טיסה מתאילנד לסרי לנקה").deadline'), '2026-11-20');
assert.ok(talia('renderRouteTab()').includes('נפרדים בבנגקוק'));

// The ledger: Kalima for 6–9/12, the Bangkok night shared, nothing for Phangan.
assert.equal(run('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(run('wallet().expenses.filter(x=>/Eleven Bangkok/.test(x.title)).length'), 0, 'Bangkok moved to Montraj');
assert.equal(run('wallet().expenses.find(x=>/Montraj Coach/.test(x.title)).amount'), 5446.58);
assert.equal(run('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(run('wallet().expenses.filter(x=>x.paidBy==="talia").length'), 0);
// The tasks: what to book and what to cancel.
for (const t of ['להאריך את צ׳רמנטרה בלילה — 2/12', 'להזמין לינה בקאו סוק, 3–5/12', 'להזמין לילה נוסף בקלימה — 5/12', 'להזמין ואן מאאו נאנג לקאו סוק, 3/12',
                 'להזמין מלון בצ׳יאנג מאי, 23–26/11', 'להזמין טיסה סובארנבומי → צ׳יאנג מאי, 23/11', 'להזמין טיסה צ׳יאנג מאי → פוקט, 26/11 בבוקר',
                 'להזיז את מונטראג׳ ל-8–10/12', 'לבטל את Eleven Bangkok — חינם עד 5/12',
                 'להזמין טיסה מפוקט לבנגקוק ב-8/12 — לשניכם', 'לבטל את Sarana Bungalows — חינם עד 28/11']) {
  assert.ok(run(`STATE.masterChecklist.some(t=>t.title===${JSON.stringify(t)})`), t);
}
assert.ok(!run('STATE.masterChecklist.some(t=>/Halfmoon|Lomprayah|ואן משותף|לצ׳יאנג מאי ב-8|פטונג|TG203|נאם טאלו|Eleven Bangkok לשני/.test(t.title))'));
// Kalima rebooked for 6–9/12 (non-refundable, no breakfast); the old booking and Our Jungle House are cancelled.
assert.equal(run('sh().bookings.find(b=>b.what==="Kalima Resort and Villas").ref'), '7195273990380466772');
assert.ok(/לא מוחזר/.test(run('sh().hotels.find(h=>h.hotel==="Kalima Resort and Villas Khao Lak").freeCancel')));
assert.ok(/בוטל/.test(run('sh().bookings.find(b=>b.what==="Our Jungle House").freeCancel')));
assert.equal(day(run, '2026-12-07').rows.find(r => r.id === 's_g8_0').baht, 1480, 'breakfast at Kalima is paid for now');
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
assert.equal(old('STATE.schema'), 25);
assert.deepEqual(JSON.parse(old('JSON.stringify(sh().days.map(d=>d.date))')).slice(9),
  ['2026-12-02','2026-12-03','2026-12-04','2026-12-05','2026-12-06','2026-12-07','2026-12-08','2026-12-09','2026-12-10']);
const o3 = day(old, '2026-12-03');
assert.ok(/ואן · אאו נאנג → קאו סוק/.test(acts(o3)), '3/12 is the new day');
assert.ok(!o3.rows.some(r => r.id === 's_15_1'), 'the old Similan row is gone with its day');
assert.equal(o3.rows[o3.rows.length - 1].id, 'custom-towel', 'a row added by hand stays on its date');
assert.equal(old('splitDate()'), '2026-12-10');
assert.ok(/IZ592/.test(old('STATE.trip.itai.homeFlight')));
assert.equal(old('STATE.trip.talia.onwardDate'), '2026-12-10');
assert.ok(/IZ592/.test(old('wallet().expenses.find(x=>x.amount===1891).title')));
assert.equal(old('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(old('wallet().expenses.filter(x=>/Eleven|שינוי טיסה/.test(x.title)).length'), 1, 'the change fee; Eleven is cancelled');
const names = JSON.parse(old('JSON.stringify(STATE.countries.find(c=>c.id==="thailand").destinations.map(d=>d.name+" "+d.arrival))'));
assert.deepEqual(names.slice(0, 8), ['צ׳יאנג מאי — לוי קראתונג 2026-11-23','קו יאו נוי — מחנה מואיי תאי 2026-11-26','אאו נאנג וריילאי 2026-11-29','קאו סוק 2026-12-03','קאו לאק 2026-12-05',
  'בנגקוק — סוף הטיול 2026-12-08','בנגקוק — מחכה למלח 2026-12-10',"צ'יאנג מאי 2026-12-11"]);
assert.ok(!names.some(n => /קורס מורים|ארוגם|קולומבו/.test(n)), 'the old onward plan is gone');
assert.equal(names.filter(n => /^בנגקוק — סוף הטיול/.test(n)).length, 1);
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
thai.destinations.push({id:'d_ph',owner:'both',name:'קופנגן',arrival:'2026-12-02',departure:'2026-12-05',nights:3});
thai.destinations.push({id:'d_solo',name:'קאו לאק — עוד לילה',owner:'itai',arrival:'2026-12-08',departure:'2026-12-09',nights:1});
wallet().expenses.push({id:'x_sarana',title:'Sarana Bungalows · 3 לילות בקופנגן',amount:3060,currency:'THB',paidBy:'itai',split:'ratio',status:'due'},
  {id:'x_jungle',title:'Our Jungle House · לילה בקאו סוק',amount:514,currency:'ILS',paidBy:'itai',split:'ratio',status:'paid'});
Object.assign(wallet().expenses.find(x=>/Kalima/.test(x.title)),{amount:2103});
wallet().expenses.push(Object.assign({id:'x_el'},ELEVEN_EXPENSE_16,{split:'full-itai'}));
STATE.masterChecklist=STATE.masterChecklist.filter(t=>t.title!=='לשנות את קלימה ל-6–9/12 בבוקינג');
STATE.masterChecklist.push(
  {id:'m_hm',owner:'both',title:'כרטיסים ל-Halfmoon, 2–3/12',status:'done'},
  {id:'m_lp',owner:'both',title:'להזמין Lomprayah מאאו נאנג לקופנגן',status:'todo'},
  {id:'m_i9',owner:'itai',title:'להזמין טיסה מפוקט לבנגקוק ב-9/12',status:'done'},
  {id:'m_k',owner:'both',title:'לשנות את קלימה ל-6–9/12 בבוקינג',status:'done'});
sh().planB={done:{}};
STATE.schema=15; ensureDefaults();`);
assert.equal(ph('STATE.schema'), 25);
const p2 = day(ph, '2026-12-02');
assert.ok(!p2.rows.some(r => /Lomprayah/.test(r.act)));
assert.ok(p2.rows.some(r => r.id === 'custom-earplugs'), 'a hand-added row survives');
assert.ok(!ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="קו פי פי")'));
assert.ok(!ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>/^קופנגן$|עוד לילה/.test(d.name))'));
assert.equal(ph('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(ph('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(ph('wallet().expenses.filter(x=>/Eleven/.test(x.title)).length'), 0, 'not paid yet, and no longer on the route');
// Tickets already bought become a reminder to cancel; what was never booked just goes.
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_hm").title'), 'לבטל: כרטיסים ל-Halfmoon, 2–3/12');
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_hm").status'), 'todo');
assert.ok(!ph('STATE.masterChecklist.some(t=>t.id==="m_lp")'));
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_i9").title'), 'להוסיף את טליה לטיסה לבנגקוק ב-9/12');
assert.equal(ph('STATE.masterChecklist.find(t=>t.id==="m_k").status'), 'done', 'Kalima already moved to 6–9/12 — which is the plan again');

// --- a document saved with Patong (schema 16) -------------------------------------
const pt = boot();
pt(`STATE=seedData();
const ks=sh().days.find(d=>d.date==='2026-12-04'); ks.dest='קאו לאק'; ks.rows.push({id:'custom-sunscreen',act:'קרם הגנה',done:false});
const thai=STATE.countries.find(c=>c.id==='thailand');
thai.destinations.push({id:'d_patong',name:'פטונג',owner:'both',arrival:'2026-12-08',departure:'2026-12-09',nights:1});
Object.assign(thai.destinations.find(d=>d.name==='קאו סוק'),{departure:'2026-12-05',nights:1});
sh().hotels.push({dest:'פטונג',hotel:'Patong Beach Hotel by See2Sea',choice:'הבחירה'});
Object.assign(wallet().expenses.find(x=>/Kalima/.test(x.title)),{amount:2661});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!/קאו סוק, 3–5|ל-6–9|סימילן ל-6/.test(t.title));
STATE.masterChecklist.push(
  {id:'m_pt',owner:'both',title:'להזמין לינה בפטונג, 8/12',status:'done'},
  {id:'m_ks',owner:'both',title:'להזמין לינה בקאו סוק, 4/12',status:'done'},
  {id:'m_k58',owner:'both',title:'לשנות את קלימה ל-5–8/12 בבוקינג',status:'todo'},
  {id:'m_sim',owner:'both',title:'להזמין סימילן, 6/12',status:'done'});
STATE.schema=16; ensureDefaults();`);
assert.equal(pt('STATE.schema'), 25);
assert.ok(!pt('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="פטונג")'));
assert.equal(pt('STATE.countries.find(c=>c.id==="thailand").destinations.find(d=>d.name==="קאו סוק").nights'), 2);
assert.ok(!pt('sh().hotels.some(h=>h.dest==="פטונג")'));
assert.equal(day(pt, '2026-12-04').dest, 'קאו סוק');
assert.ok(day(pt, '2026-12-04').rows.some(r => r.id === 'custom-sunscreen'), 'a hand-added row survives');
assert.equal(pt('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_pt").title'), 'לבטל: לינה בפטונג, 8/12');
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_ks").title'), 'להוסיף לילה בקאו סוק — 5/12');
assert.ok(!pt('STATE.masterChecklist.some(t=>t.id==="m_k58")'), 'the 5–8/12 Kalima change is replaced by 6–9/12');
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_sim").title'), 'להזמין סימילן ל-6/12', 'booked for 6/12 — the date again');
assert.equal(pt('STATE.masterChecklist.find(t=>t.id==="m_sim").status'), 'done');
assert.ok(!pt('STATE.masterChecklist.some(t=>t.title==="להזמין סימילן ל-6/12" && t.id!=="m_sim")'), 'no second copy');
const ptSettled = pt('JSON.stringify(STATE)');
pt('ensureDefaults();');
assert.equal(pt('JSON.stringify(STATE)'), ptSettled);
assert.equal(ph('sh().planB'), undefined);

// --- a document saved with Phi Phi as a base (schema 22) ---------------------------
const pp = boot();
pp(`STATE=seedData();
const D=date=>sh().days.find(d=>d.date===date);
D('2026-12-02').dest='קו פי פי';
D('2026-12-02').rows=[{id:'s_f2_2',act:'מעבורת · אאו נאנג → קו פי פי',time:'10:30'},{id:'s_f2_stay',act:'לינה — ChaoKoh Phi Phi',cat:'לינה'}];
D('2026-12-03').rows=[{id:'s_f3_1',act:'לונג-טייל — מאיה ביי',time:'09:30'},{id:'custom-hat',act:'כובע',done:false}];
const lake=D('2026-12-04').rows.find(r=>r.id==='s_g5_1'); D('2026-12-04').rows=D('2026-12-04').rows.filter(r=>r!==lake);
lake.done=true; lake.talk=[{by:'talia',text:'הזמנתי'}]; D('2026-12-05').rows.push(lake);
const thai=STATE.countries.find(c=>c.id==='thailand');
thai.destinations.push({id:'d_pp',owner:'both',name:'קו פי פי',arrival:'2026-12-02',departure:'2026-12-04',nights:2});
Object.assign(thai.destinations.find(d=>d.name==='אאו נאנג וריילאי'),{departure:'2026-12-02',nights:3,notes:'ישן'});
sh().hotels.push({dest:'קו פי פי',hotel:'ChaoKoh Phi Phi',choice:'הבחירה'});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!WEST_TASKS.some(p=>p.title===t.title));
STATE.masterChecklist.push(
  {id:'m_pp',owner:'both',title:'להזמין לינה בפי פי, 2–4/12',status:'done'},
  {id:'m_fe',owner:'both',title:'להזמין מעבורת מאאו נאנג לפי פי, 2/12',status:'todo'},
  {id:'m_ks4',owner:'both',title:'להזמין לינה בקאו סוק, 4–6/12',status:'done'},
  {id:'m_lk5',owner:'both',title:'להזמין סיור אגם צ׳או לאן, 5/12',status:'todo'});
STATE.schema=22; ensureDefaults();`);
assert.equal(pp('STATE.schema'), 25);
assert.equal(day(pp, '2026-12-02').dest, 'אאו נאנג');
assert.ok(!JSON.parse(pp('JSON.stringify(sh().days.flatMap(d=>d.rows))')).some(r => /ChaoKoh|מעבורת/.test(r.act)));
assert.equal(day(pp, '2026-12-03').rows.at(-1).id, 'custom-hat', 'a hand-added row stays on its date');
const lake23 = day(pp, '2026-12-04').rows.find(r => r.id === 's_g5_1');
assert.ok(lake23.done && lake23.talk.length === 1, 'the tick and the talk move with the lake to 4/12');
assert.ok(!day(pp, '2026-12-05').rows.some(r => r.id === 's_g5_1'));
const ppDest = JSON.parse(pp('JSON.stringify(STATE.countries.find(c=>c.id==="thailand").destinations.filter(d=>d.owner==="both").map(d=>[d.name,d.arrival,d.nights]))'));
assert.ok(!ppDest.some(d => d[0] === 'קו פי פי'));
assert.deepEqual(ppDest.find(d => d[0] === 'אאו נאנג וריילאי'), ['אאו נאנג וריילאי','2026-11-29',4]);
assert.deepEqual(ppDest.find(d => d[0] === 'קאו סוק'), ['קאו סוק','2026-12-03',2]);
assert.deepEqual(ppDest.find(d => d[0] === 'קאו לאק'), ['קאו לאק','2026-12-05',3]);
assert.ok(!pp('sh().hotels.some(h=>h.dest==="קו פי פי")'));
assert.equal(pp('sh().hotels.filter(h=>h.hotel==="Kalima Resort and Villas · לילה נוסף").length'), 1);
assert.equal(pp('STATE.masterChecklist.find(t=>t.id==="m_pp").title'), 'לבטל: לינה בפי פי, 2–4/12');
assert.equal(pp('STATE.masterChecklist.find(t=>t.id==="m_pp").status'), 'todo');
assert.ok(!pp('STATE.masterChecklist.some(t=>t.id==="m_fe"||t.id==="m_lk5")'), 'never booked, so just gone');
assert.equal(pp('STATE.masterChecklist.find(t=>t.id==="m_ks4").title'), 'להזיז את הלינה בקאו סוק ל-3–5/12');
// --- a document saved with four nights in Khao Lak (schema 23) ---------------------
const k23 = boot();
k23(`STATE=seedData();
const D=date=>sh().days.find(d=>d.date===date);
D('2026-12-05').dest='קאו לאק';
D('2026-12-05').rows=[{id:'s_g6_0',act:'הליכה מודרכת בג׳ונגל',time:'07:00',done:true},{id:'s_g6_stay',act:'לינה — Kalima Resort and Villas · לילה נוסף',cat:'לינה',status:'להזמין'},{id:'custom-bag',act:'תיק אטום'}];
sh().hotels.push({dest:'קאו לאק',hotel:'Kalima Resort and Villas · לילה נוסף',choice:'להזמין'});
const ks=STATE.countries.find(c=>c.id==='thailand').destinations.find(d=>d.name==='קאו סוק'); Object.assign(ks,{departure:'2026-12-05',nights:2});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!WEST_TASKS.some(p=>p.title===t.title));
STATE.masterChecklist.push(
  {id:'m_k5',owner:'both',title:'להזמין לילה נוסף בקלימה — 5/12',status:'done'},
  {id:'m_ks35',owner:'both',title:'להזמין לינה בקאו סוק, 3–5/12',status:'todo'});
STATE.schema=23; ensureDefaults();`);
assert.equal(k23('STATE.schema'), 25);
// Through 24 (a third Khao Sok night) and back in 25 (Khao Lak from 5/12): what was booked for 5/12 fits again.
assert.equal(day(k23, '2026-12-05').dest, 'קאו לאק');
assert.equal(day(k23, '2026-12-05').rows.at(-1).id, 'custom-bag');
assert.equal(day(k23, '2026-12-05').rows.find(r => r.id === 's_g6_0').done, true, 'the jungle tick stays with its row');
assert.equal(k23('STATE.countries.find(c=>c.id==="thailand").destinations.find(d=>d.name==="קאו סוק").nights'), 2);
assert.equal(k23('sh().hotels.filter(h=>/לילה נוסף/.test(h.hotel)).length'), 1);
assert.equal(k23('STATE.masterChecklist.find(t=>t.id==="m_k5").title'), 'להזמין לילה נוסף בקלימה — 5/12');
assert.equal(k23('STATE.masterChecklist.find(t=>t.id==="m_k5").status'), 'done');
assert.equal(k23('STATE.masterChecklist.filter(t=>t.title==="להזמין לילה נוסף בקלימה — 5/12").length'), 1);
assert.ok(!k23('STATE.masterChecklist.some(t=>t.id==="m_ks35")'));
assert.ok(k23('STATE.masterChecklist.some(t=>t.title==="להזמין לינה בקאו סוק, 3–5/12")'));
const k23Settled = k23('JSON.stringify(STATE)');
k23('ensureDefaults();');
assert.equal(k23('JSON.stringify(STATE)'), k23Settled);
assert.ok(pp('STATE.masterChecklist.some(t=>t.title==="להאריך את צ׳רמנטרה בלילה — 2/12")'));
const ppSettled = pp('JSON.stringify(STATE)');
pp('ensureDefaults();');
assert.equal(pp('JSON.stringify(STATE)'), ppSettled);

// --- a document saved just before the north (schema 24) ---------------------------
const n24 = boot();
n24(`STATE=seedData();
sh().days.forEach(d=>{ d.rows=d.rows.filter(r=>!/^s_w_/.test(r.id)); });
sh().days.find(d=>d.date==='2026-12-01').rows.push({id:'custom-sun',act:'קרם הגנה'});
Object.assign(wallet().expenses.find(x=>/Montraj/.test(x.title)),{title:'Montraj Coach Sukhumvit · 3 לילות בבנגקוק',amount:8169.87,date:'2026-11-23'});
wallet().expenses.push(Object.assign({id:'x_el'},ELEVEN_EXPENSE_16));
const thai=STATE.countries.find(c=>c.id==='thailand');
Object.assign(thai.destinations.find(d=>d.name==='צ׳יאנג מאי — לוי קראתונג'),{name:'בנגקוק'});
Object.assign(thai.destinations.find(d=>d.name==='בנגקוק — סוף הטיול'),{name:'בנגקוק — לילה אחרון',arrival:'2026-12-09',nights:1});
STATE.masterChecklist.push({id:'m_tg',owner:'both',title:'להזמין את טיסת TG203 לפוקט',status:'todo'},{id:'m_el',owner:'both',title:'לעדכן את Eleven Bangkok לשני אנשים',status:'done'});
STATE.schema=24; ensureDefaults();`);
assert.equal(n24('STATE.schema'), 25);
const w24 = JSON.parse(n24('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/^s_w_/.test(r.id)).map(r=>d.date)))'));
assert.equal(w24.length, JSON.parse(run('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/^s_w_/.test(r.id))))')).length, 'every workout, once');
for (const d of JSON.parse(n24('JSON.stringify(sh().days)'))) {
  const t = d.rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order after the workouts go in');
}
assert.equal(day(n24, '2026-12-01').rows.at(-1).id, 'custom-sun');
assert.equal(n24('wallet().expenses.find(x=>/Montraj/.test(x.title)).amount'), 5446.58);
assert.equal(n24('wallet().expenses.filter(x=>/Eleven/.test(x.title)).length'), 0);
assert.ok(n24('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="צ׳יאנג מאי — לוי קראתונג" && d.arrival==="2026-11-23")'));
assert.ok(n24('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="בנגקוק — סוף הטיול" && d.nights===2)'));
assert.ok(!n24('STATE.masterChecklist.some(t=>t.id==="m_tg"||t.id==="m_el")'), 'not booked, or no longer needed');
const n24Settled = n24('JSON.stringify(STATE)');
n24('ensureDefaults();');
assert.equal(n24('JSON.stringify(STATE)'), n24Settled);

// --- the Bangkok hotel, booked direct ---------------------------------------
const bkk = boot();
const mx = JSON.parse(bkk('JSON.stringify(wallet().expenses.find(x=>/Montraj Coach/.test(x.title)))'));
assert.equal(mx.amount, 5446.58, 'two nights at the end now');
assert.equal(mx.currency, 'THB');
assert.equal(mx.status, 'due', 'paid at the hotel, so still due');
assert.ok(/3051425/.test(mx.note));
// The forecast takes the price from the ledger, once, split across the two nights.
const nightIls = bkk('sharedRowPrice(sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_1_9")).base');
assert.ok(Math.abs(nightIls - 5446.58 * bkk('rate()') / 2) < 0.001);
const mb = JSON.parse(bkk('JSON.stringify(sh().bookings.find(b=>b.what==="Montraj Coach Sukhumvit"))'));
assert.equal(mb.ref, '3051425');
assert.ok(/21\/11/.test(mb.freeCancel));
const mh = JSON.parse(bkk('JSON.stringify(sh().hotels.find(h=>h.hotel==="Montraj Coach Sukhumvit"))'));
assert.equal(mh.perNight, 2723.29);
assert.ok(!/booking\.com/.test(mh.linkLink), 'links to the hotel, not Booking');
for (const id of ['s_1_9', 's_2_10']) {
  const r = JSON.parse(bkk(`JSON.stringify(sh().days.flatMap(d=>d.rows).find(r=>r.id==="${id}"))`));
  assert.equal(r.baht, 2723.29, id);
  assert.ok(!/5123136373/.test(r.notes || ''), 'no Booking reference left on ' + id);
}
assert.ok(/12:00/.test(bkk('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_1_5").notes')), 'check-out time from the confirmation');
// A reminder to cancel the Booking reservation, so there are not two.
assert.ok(bkk('STATE.masterChecklist.some(t=>/לבטל את הזמנת בוקינג של Montraj/.test(t.title) && t.owner==="itai")'));

// A saved document still holding the Booking reservation is moved over...
const oldBkk = boot();
oldBkk(`STATE=seedData();
const x=wallet().expenses.find(e=>/Montraj Coach/.test(e.title));
Object.assign(x,{amount:1128,currency:'ILS',note:'אישור 5123136373'});
const d8=sh().days.find(d=>d.date==='2026-12-08'); const n=d8.rows.find(r=>r.id==='s_1_9'); d8.rows=d8.rows.filter(r=>r!==n); n.done=true; sh().days[0].rows.push(n); // where it sat before 25
STATE.schema=12;
ensureDefaults();`);
assert.equal(oldBkk('wallet().expenses.find(e=>/Montraj Coach/.test(e.title)).amount'), 5446.58);
assert.equal(oldBkk('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_1_9").done'), true, 'keeping the tick, on 8/12 now');
assert.equal(oldBkk('sh().bookings.find(b=>b.what==="Montraj Coach Sukhumvit").ref'), '3051425');
// ...but an amount someone corrected by hand is left alone.
const edited = boot();
edited(`STATE=seedData();
Object.assign(wallet().expenses.find(e=>/Montraj Coach/.test(e.title)),{amount:9000,currency:'THB'});
STATE.schema=12; ensureDefaults();`);
assert.equal(edited('wallet().expenses.find(e=>/Montraj Coach/.test(e.title)).amount'), 9000);


// 9/12: canals ending at Wat Arun, the ferry to Wat Pho, the palace by tuk-tuk, the Giant Swing and the Golden Mount, then Rajadamnern.
{
  const b = boot();
  const d9 = day(b, '2026-12-09');
  assert.ok(d9.rows.find(r => r.id === 's_2_2').time <= '15:30', 'the palace before its last entry');
  // A saved document keeps its ticks and its own rows: the tick moves to 9/12, the hand-added row stays on 24/11.
  const o = boot();
  o(`STATE=seedData(); const d=sh().days.find(x=>x.date==='2026-11-24');
  d.rows=d.rows.filter(r=>!/^s_c2_/.test(r.id)).concat([{id:'s_2_3',act:'ואט פו — הבודהה השוכב',time:'11:25',done:true},{id:'custom-x',act:'קרם הגנה'}]);
  const n9=sh().days.find(x=>x.date==='2026-12-09'); n9.rows=n9.rows.filter(r=>r.id!=='s_2_3');
  STATE.schema=21; ensureDefaults();`);
  assert.equal(day(o, '2026-12-09').rows.find(r => r.id === 's_2_3').done, true);
  const o24 = day(o, '2026-11-24');
  assert.equal(o24.rows[o24.rows.length-1].id, 'custom-x');
  assert.ok(!o24.rows.some(r => r.id === 's_2_3'));
}

// Loy Krathong: the Thai calendar date, and a warning about the wrong one.
const lanterns = day(run, '2026-11-24').rows.find(r => r.id === 's_c2_6');
assert.ok(/24\/11/.test(lanterns.notes) && /25\/11/.test(lanterns.notes));


console.log('PASS: Chiang Mai first with Loy Krathong, the camp as booked, four nights in Ao Nang, two in Khao Sok, three in Khao Lak and two in Bangkok, together until 10/12; workouts by date; moves from schema 14, 15, 16, 22, 23 and 24 without losing hand-added rows, once; Bangkok hotel booked direct; Loy Krathong date.');

// --- nightlife --------------------------------------------------------------
{
  const n = boot();
  const nights = JSON.parse(n('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/_night$/.test(r.id)).map(r=>d.date)))'));
  assert.deepEqual(nights, ['2026-11-25','2026-11-29','2026-11-30','2026-12-02','2026-12-07']);
  // never the night before an early start
  for (const date of nights) {
    const i = JSON.parse(n('JSON.stringify(sh().days.map(d=>d.date))')).indexOf(date);
    const next = JSON.parse(n(`JSON.stringify(sh().days[${i+1}].rows.find(r=>r.time))`));
    assert.ok(next.time >= '07:15', date + ' is followed by ' + next.time);
  }
  // a saved document gets the nights once
  const o = boot();
  o(`STATE=seedData(); sh().days.forEach(d=>d.rows=d.rows.filter(r=>!/_night$/.test(r.id))); STATE.schema=13; ensureDefaults();`);
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 5);
  o('STATE.schema=13; ensureDefaults();');
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 5);
  console.log('PASS: nightlife on five evenings, none before an early start, migration once.');
}

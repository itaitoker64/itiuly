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
assert.equal(run('STATE.schema'), 32);

// --- the plan: Bangkok, the camp, the Andaman, and a last night in Bangkok -------
const all = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.day,d.date,d.dow,d.id,d.dest,d.owner||""]))'));
assert.equal(all.length, 18);
assert.deepEqual(all.map(d => d[4]), ['בנגקוק','בנגקוק','בנגקוק','קו יאו נוי','קו יאו נוי','קו יאו נוי',
  'אאו נאנג','אאו נאנג','אאו נאנג','אאו נאנג','קאו סוק','קאו סוק','קאו לאק','קאו לאק','קאו לאק','קאו לאק','בנגקוק','בנגקוק → הביתה']);
assert.deepEqual(all.slice(9).map(d => [d[1], d[2], d[3]]), [
  ['2026-12-02','ד׳','day_10'], ['2026-12-03','ה׳','day_11'], ['2026-12-04','ו׳','day_12'], ['2026-12-05','ש׳','day_13'], ['2026-12-06','א׳','day_14'],
  ['2026-12-07','ב׳','day_15'], ['2026-12-08','ג׳','day_16'], ['2026-12-09','ד׳','day_17'], ['2026-12-10','ה׳','day_18']]);
// No north: three nights in Bangkok at the start, Loy Krathong on 24/11, ISB on 25/11.
assert.ok(!allRowsOf(run).some(r => /צ׳יאנג מאי|CNX|יי פנג|Centara/.test(r.act + ' ' + r.loc)), 'nothing left of Chiang Mai');
assert.ok(day(run, '2026-11-23').rows.some(r => /ASAI/.test(r.act) && r.cat === 'לינה' && r.status === 'מוזמן'), 'ASAI in Chinatown, booked');
assert.ok(day(run, '2026-11-23').rows.some(r => /418673284/.test(r.notes)), 'the free Booking taxi from the airport');
assert.ok(!allRowsOf(run).some(r => /Montraj|מונטראג׳|Chermantra|צ׳רמנטרה|Palmview|TG203/.test(r.act + ' ' + r.loc)), 'nothing left of the cancelled bookings');
const seq = ['s_2_canal','s_2_arun','s_2_ferry','s_2_3','s_2_tuk','s_2_2','s_2_swing','s_2_saket','s_2_7'];
assert.deepEqual(day(run, '2026-11-24').rows.filter(r => seq.includes(r.id)).map(r => r.id), seq, 'canals to Wat Arun, Wat Pho, the palace, the Golden Mount, then the Loy Krathong dinner');
assert.ok(/ISB/.test(acts(day(run, '2026-11-25'))) && /צ׳אנגוואטנה/.test(acts(day(run, '2026-11-25'))) && /רג׳אדמנרן/.test(acts(day(run, '2026-11-25'))));
// 26/11: VietJet VZ300 to Phuket (booked, MSR6JW), the camp as booked, and the 16:00 session.
const d26 = day(run, '2026-11-26');
assert.ok(/VZ300/.test(d26.rows.find(r => r.id === 's_4_3').act) && d26.rows.find(r => r.id === 's_4_3').status === 'מוזמן');
assert.ok(d26.rows.find(r => r.id === 's_4_7').time < '17:00', 'on a boat before the last one at 17:00');
assert.equal(d26.rows.find(r => r.id === 's_4_12').time, '16:00');
// Ao Nang four nights, Phi Phi as a day trip.
const d2 = day(run, '2026-12-02');
assert.ok(d2.rows.some(r => /מאיה ביי/.test(r.act) && r.status === 'אופציונלי'));
assert.ok(d2.rows.some(r => /COSI/.test(r.act) && r.cat === 'לינה' && r.status === 'מוזמן'));
// Khao Sok: River Lodge on 3/12, a night on the lake on 4/12; Kalima 5–9/12.
assert.equal(day(run, '2026-12-03').rows.find(r => r.id === 's_g4_1').act, 'ואן · אאו נאנג → קאו סוק');
assert.ok(day(run, '2026-12-03').rows.some(r => /River Lodge/.test(r.act) && r.cat === 'לינה' && r.status === 'מוזמן'));
assert.ok(/צ׳או לאן/.test(acts(day(run, '2026-12-04'))) && /Panvaree/.test(acts(day(run, '2026-12-04'))));
const d5 = day(run, '2026-12-05');
assert.ok(/זריחה/.test(acts(d5)) && /קלימה/.test(acts(d5)));
assert.ok(d5.rows.some(r => /Kalima.*לילה נוסף/.test(r.act) && r.status === 'מוזמן'), 'the extra Kalima night, booked and paid directly');
assert.ok(/סימילן/.test(acts(day(run, '2026-12-06'))));
assert.ok(/גיבוי/.test(day(run, '2026-12-07').summary), '7/12 is the Similan backup');
assert.ok(/לאם רו/.test(acts(day(run, '2026-12-08'))) && /813/.test(acts(day(run, '2026-12-08'))), 'a free last day in Khao Lak');
// The Kalima booking counts in full across the three nights it covers, and the 5/12 night once.
const kal = allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'Kalima');
assert.deepEqual(kal.map(r => r.id), ['s_g7_stay', 's_g8_stay', 's_k8_stay']);
assert.ok(kal.every(r => r.priceEstimate.booking.rows === 3));
assert.equal(allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'COSI').length, 4);
assert.equal(allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'ASAI').length, 3);
assert.equal(allRowsOf(run).filter(r => r.priceEstimate && r.priceEstimate.booking && r.priceEstimate.booking.match === 'MSR6JW').length, 2);
// 9/12: Kalima to Phuket, VZ303 at 14:00, the free taxi and the last night at Eleven.
const d9 = day(run, '2026-12-09');
assert.ok(/VZ303/.test(acts(d9)) && /Eleven/.test(acts(d9)));
assert.equal(d9.rows.find(r => r.id === 's_g9_2').time, '14:00');
assert.ok(d9.rows.find(r => r.id === 's_g9_1').time <= '11:00', 'out of Kalima in time for a 14:00 flight');
assert.ok(/1,800/.test(d9.rows.find(r => r.id === 's_g9_1').notes), "Kalima's transfer price");
const home = day(run, '2026-12-10').rows.find(r => r.id === 's_f10_2');
assert.equal(home.time, '11:15');
assert.ok(/IZ592/.test(home.act));
const allDays = JSON.parse(run('JSON.stringify(sh().days)'));
assert.ok(!allDays.some(d => d.rows.some(r => /Halfmoon|Lomprayah|Sarana|ואן משותף לקאו לק|IZ598|Bangla|פטונג|ChaoKoh|Loh Dalum/.test(r.act))), 'no Phangan, Patong or Phi Phi base');
const late = t => t < '05:00' ? String(Number(t.slice(0,2))+24)+t.slice(2) : t.padStart(5,'0');   // 00:30 is after Khao San, not before breakfast
for (const d of allDays) {
  const t = d.rows.filter(r => r.time).map(r => late(r.time));
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order');
  assert.ok(d.sun && d.sun.rise && d.sun.set, d.date + ' has sunrise and sunset');
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
assert.deepEqual(w.filter(x => /ריצה/.test(x[2])).map(x => x[0]), ['2026-11-24','2026-11-27','2026-12-01','2026-12-04','2026-12-08']);
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
assert.deepEqual(destDays(run, 'בנגקוק'), ['2026-11-23','2026-11-24','2026-11-25']);
assert.deepEqual(destDays(run, 'קאו סוק'), ['2026-12-03','2026-12-04']);
assert.deepEqual(destDays(run, 'קאו לאק'), ['2026-12-05','2026-12-06','2026-12-07','2026-12-08']);
assert.ok(!run('myDestinations().some(d=>d.name==="פטונג"||/צ׳יאנג מאי —/.test(d.name))'));
assert.deepEqual(destDays(run, 'בנגקוק — לילה אחרון'), ['2026-12-09','2026-12-10']);
assert.deepEqual(destDays(talia, 'בנגקוק — לילה אחרון'), ['2026-12-09','2026-12-10']);
// After 10/12 Talia waits for Melach in Bangkok, then the north, Sri Lanka, India as a draft, and Phangan in February.
const tRoute = JSON.parse(talia('JSON.stringify(myDestinations().filter(d=>d.owner==="talia").map(d=>d.name+" "+d.arrival))'));
assert.deepEqual(tRoute.slice(0, 13), ['בנגקוק — מחכה למלח 2026-12-10',"צ'יאנג מאי 2026-12-12",'פאי 2026-12-15',"צ'יאנג ראי 2026-12-18",
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
assert.equal(run('wallet().expenses.find(x=>/Eleven Bangkok/.test(x.title)).split'), 'ratio');
assert.equal(run('wallet().expenses.filter(x=>/Montraj|Chermantra/.test(x.title)).length'), 0, 'cancelled, so out of the ledger');
assert.equal(run('wallet().expenses.find(x=>/^ASAI/.test(x.title)).amount'), 10398.09);
assert.equal(run('wallet().expenses.find(x=>/MSR6JW/.test(x.title)).status'), 'paid');
assert.equal(run('wallet().expenses.find(x=>/^Eleven Bangkok/.test(x.title)).amount'), 8411.85);
assert.equal(run('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(run('wallet().expenses.filter(x=>x.paidBy==="talia").length'), 0);
// The tasks: what to book and what to cancel.
for (const t of ['להזמין לינה בקאו סוק, 3/12', 'להזמין לילה נוסף בקלימה — 5/12', 'להזמין ואן מאאו נאנג לקאו סוק, 3/12',
                 'להזמין טיסות VietJet בנגקוק ↔ פוקט', 'להזמין לילה על אגם צ׳או לאן — Panvaree The Greenery, 4–5/12', 'לשלם ל-River Lodge בהעברה בנקאית', 'לעדכן את Eleven Bangkok לשני אנשים', 'לתקן מול קלימה: נשארים עד 9/12',
                 'להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם', 'לבטל את Sarana Bungalows — חינם עד 28/11']) {
  assert.ok(run(`STATE.masterChecklist.some(t=>t.title===${JSON.stringify(t)})`), t);
}
assert.ok(!run('STATE.masterChecklist.some(t=>/Halfmoon|Lomprayah|ואן משותף|לצ׳יאנג מאי ב-8|פטונג|נאם טאלו|צ׳יאנג מאי, 23|מקלט פילים|ל-8–10\\/12/.test(t.title))'));
// Kalima rebooked for 6–9/12 (non-refundable, no breakfast); the old booking and Our Jungle House are cancelled.
assert.equal(run('sh().bookings.find(b=>b.what==="Kalima Resort and Villas").ref'), '7195273990380466772');
assert.ok(/לא מוחזר/.test(run('sh().hotels.find(h=>h.hotel==="Kalima Resort and Villas Khao Lak").freeCancel')));
assert.ok(/בוטל/.test(run('sh().bookings.find(b=>b.what==="Our Jungle House").freeCancel')));
assert.equal(day(run, '2026-12-07').rows.find(r => r.id === 's_g8_0').baht, 1200, 'breakfast at Kalima: ฿600 a person, from the hotel');
assert.equal(day(run, '2026-12-06').rows.find(r => r.id === 's_g7_0').priceEstimate.kind, 'included', 'the 5/12 night includes breakfast');
assert.equal(day(run, '2026-12-05').rows.find(r => r.id === 's_g6_stay').baht, 8800);
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
assert.equal(k18('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_g8_0").baht'), 1200, 'the hotel price, 5/11');

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
assert.equal(old('STATE.schema'), 32);
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
assert.equal(old('wallet().expenses.filter(x=>/Eleven|שינוי טיסה/.test(x.title)).length'), 2, 'the change fee and the last night at Eleven');
const names = JSON.parse(old('JSON.stringify(STATE.countries.find(c=>c.id==="thailand").destinations.map(d=>d.name+" "+d.arrival))'));
assert.deepEqual(names.slice(0, 8), ['בנגקוק 2026-11-23','קו יאו נוי — מחנה מואיי תאי 2026-11-26','אאו נאנג וריילאי 2026-11-29','קאו סוק 2026-12-03','קאו לאק 2026-12-05',
  'בנגקוק — לילה אחרון 2026-12-09','בנגקוק — מחכה למלח 2026-12-10',"צ'יאנג מאי 2026-12-12"]);
assert.ok(!names.some(n => /קורס מורים|ארוגם|קולומבו/.test(n)), 'the old onward plan is gone');
assert.equal(names.filter(n => /^בנגקוק — לילה אחרון/.test(n)).length, 1);
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
assert.equal(ph('STATE.schema'), 32);
const p2 = day(ph, '2026-12-02');
assert.ok(!p2.rows.some(r => /Lomprayah/.test(r.act)));
assert.ok(p2.rows.some(r => r.id === 'custom-earplugs'), 'a hand-added row survives');
assert.ok(!ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="קו פי פי")'));
assert.ok(!ph('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>/^קופנגן$|עוד לילה/.test(d.name))'));
assert.equal(ph('wallet().expenses.filter(x=>/Sarana|Our Jungle/.test(x.title)).length'), 0);
assert.equal(ph('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 1931.44);
assert.equal(ph('wallet().expenses.filter(x=>/Eleven/.test(x.title)).length'), 1, 'one last night at Eleven');
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
assert.equal(pt('STATE.schema'), 32);
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
assert.equal(pp('STATE.schema'), 32);
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
assert.deepEqual(ppDest.find(d => d[0] === 'קאו לאק'), ['קאו לאק','2026-12-05',4]);
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
assert.equal(k23('STATE.schema'), 32);
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
assert.ok(k23('STATE.masterChecklist.some(t=>t.title==="להזמין לינה בקאו סוק, 3/12" && t.status==="done")'), 'River Lodge, booked 12/11');
const k23Settled = k23('JSON.stringify(STATE)');
k23('ensureDefaults();');
assert.equal(k23('JSON.stringify(STATE)'), k23Settled);
assert.ok(!pp('STATE.masterChecklist.some(t=>t.title==="להאריך את צ׳רמנטרה בלילה — 2/12")'), 'Chermantra was cancelled — COSI instead');
const ppSettled = pp('JSON.stringify(STATE)');
pp('ensureDefaults();');
assert.equal(pp('JSON.stringify(STATE)'), ppSettled);

// --- a document saved just before the north (schema 24) — through the north and back ---
const n24 = boot();
n24(`STATE=seedData();
sh().days.forEach(d=>{ d.rows=d.rows.filter(r=>!/^s_w_/.test(r.id)); delete d.sun; });
sh().days.find(d=>d.date==='2026-12-01').rows.push({id:'custom-sun',act:'קרם הגנה'});
sh().days.find(d=>d.date==='2026-11-24').rows.find(r=>r.id==='s_2_canal').done=true;
STATE.schema=24; ensureDefaults();`);
assert.equal(n24('STATE.schema'), 32);
const w24 = JSON.parse(n24('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/^s_w_/.test(r.id)).map(r=>d.date)))'));
assert.equal(w24.length, JSON.parse(run('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/^s_w_/.test(r.id))))')).length, 'every workout, once');
for (const d of JSON.parse(n24('JSON.stringify(sh().days)'))) {
  const t = d.rows.filter(r => r.time).map(r => late(r.time));
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order');
  assert.ok(d.sun, d.date + ' has the sun');
}
assert.equal(day(n24, '2026-12-01').rows.at(-1).id, 'custom-sun');
assert.equal(day(n24, '2026-11-24').rows.find(r => r.id === 's_2_canal').done, true, 'the tick survives the north and back');
assert.equal(n24('wallet().expenses.filter(x=>/Montraj/.test(x.title)).length'), 0);
assert.equal(n24('wallet().expenses.filter(x=>/^Eleven/.test(x.title)).length'), 1);
const n24d = JSON.parse(n24('JSON.stringify(STATE.countries.find(c=>c.id==="thailand").destinations.filter(d=>d.owner==="both").map(d=>[d.name,d.arrival,d.nights]))'));
assert.deepEqual(n24d.find(d => d[0] === 'בנגקוק'), ['בנגקוק','2026-11-23',3]);
assert.deepEqual(n24d.find(d => d[0] === 'בנגקוק — לילה אחרון'), ['בנגקוק — לילה אחרון','2026-12-09',1]);
assert.ok(!n24d.some(d => /צ׳יאנג מאי|סוף הטיול/.test(d[0])));
assert.ok(n24('STATE.masterChecklist.some(t=>t.title==="להזמין טיסות VietJet בנגקוק ↔ פוקט" && t.status==="done")'));
assert.ok(!n24('STATE.masterChecklist.some(t=>/צ׳יאנג מאי, 23|ל-8–10\\/12/.test(t.title))'));
assert.ok(!n24('sh().hotels.some(h=>/Centara/.test(h.hotel))'));
assert.ok(n24('sh().hotels.some(h=>/Eleven/.test(h.hotel)) && sh().hotels.some(h=>/Sala Rattanakosin/.test(h.hotel))'));
const n24Settled = n24('JSON.stringify(STATE)');
n24('ensureDefaults();');
assert.equal(n24('JSON.stringify(STATE)'), n24Settled);

// --- a document saved with the north (schema 30), and what was booked for it ----------------
{
  const n30 = boot();
  n30(`STATE=seedData();
  const thai=STATE.countries.find(c=>c.id==='thailand');
  Object.assign(thai.destinations.find(d=>d.owner==='both'&&d.name==='בנגקוק'),{name:'צ׳יאנג מאי — לוי קראתונג'});
  Object.assign(thai.destinations.find(d=>d.name==='בנגקוק — לילה אחרון'),{name:'בנגקוק — סוף הטיול',arrival:'2026-12-08',nights:2});
  wallet().expenses.push({id:'x_mt',title:'Montraj Coach Sukhumvit · 2 לילות בבנגקוק',amount:5446.58,currency:'THB',paidBy:'itai',split:'ratio',status:'due'});
  wallet().expenses=wallet().expenses.filter(x=>!/^Eleven/.test(x.title));
  sh().hotels.push({dest:'צ׳יאנג מאי',hotel:'Centara Riverside Hotel Chiang Mai',choice:'הבחירה'});
  sh().days.find(d=>d.date==='2026-11-24').rows.push({id:'custom-lantern',act:'פנס'});
  STATE.masterChecklist=STATE.masterChecklist.filter(t=>!/TG203|Eleven Bangkok לשני|מפוקט לבנגקוק ב-9/.test(t.title));
  STATE.masterChecklist.push(
    {id:'m_cm',owner:'both',title:'להזמין מלון בצ׳יאנג מאי, 23–26/11',status:'done'},
    {id:'m_cnx',owner:'both',title:'להזמין טיסה סובארנבומי → צ׳יאנג מאי, 23/11',status:'todo'},
    {id:'m_kyn',owner:'both',title:'להחליט על KYN: להישאר ב-26–29/11, או דירת שני חדרים ל-30/11–3/12',status:'todo'},
    {id:'m_el',owner:'both',title:'לבטל את Eleven Bangkok — חינם עד 5/12',status:'todo'});
  STATE.schema=30; ensureDefaults();`);
  assert.equal(n30('STATE.schema'), 32);
  assert.ok(n30('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="בנגקוק" && d.owner==="both" && d.nights===3)'));
  assert.ok(n30('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="בנגקוק — לילה אחרון" && d.arrival==="2026-12-09")'));
  assert.equal(n30('wallet().expenses.filter(x=>/Montraj/.test(x.title)).length'), 0, 'Montraj was cancelled on 12/11');
  assert.equal(n30('wallet().expenses.filter(x=>/^Eleven/.test(x.title)).length'), 1, 'the last night is back in the ledger');
  assert.ok(!n30('sh().hotels.some(h=>/Centara/.test(h.hotel))'));
  assert.equal(day(n30, '2026-11-24').rows.at(-1).id, 'custom-lantern', 'a hand-added row stays on its date');
  assert.equal(n30('STATE.masterChecklist.find(t=>t.id==="m_cm").title'), 'לבטל: מלון בצ׳יאנג מאי, 23–26/11', 'booked for the north, so a reminder to cancel');
  assert.ok(!n30('STATE.masterChecklist.some(t=>t.id==="m_cnx"||t.id==="m_el")'), 'never booked, so just gone');
  assert.equal(n30('STATE.masterChecklist.find(t=>t.id==="m_kyn").status'), 'done');
  for (const t of ['להזמין טיסות VietJet בנגקוק ↔ פוקט','לעדכן את Eleven Bangkok לשני אנשים','להזמין טיסה מפוקט לבנגקוק ב-9/12 — לשניכם','לתקן מול קלימה: נשארים עד 9/12'])
    assert.equal(n30(`STATE.masterChecklist.filter(t=>t.title===${JSON.stringify(t)}).length`), 1, t);
  const settled = n30('JSON.stringify(STATE)'); n30('ensureDefaults();');
  assert.equal(n30('JSON.stringify(STATE)'), settled);
}

// --- sunrise and sunset, and the day fitted to them (schema 26) ----------------------
{
  const sun = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.date,d.sun]))'));
  assert.ok(sun.every(([, x]) => x && /^\d\d:\d\d$/.test(x.rise) && /^\d\d:\d\d$/.test(x.set)), 'every day has both');
  assert.deepEqual(sun.find(x => x[0] === '2026-11-24')[1], {rise:'06:22', set:'17:47'}, 'Bangkok');
  assert.deepEqual(sun.find(x => x[0] === '2026-12-09')[1], {rise:'06:30', set:'17:50'}, 'Bangkok');
  // no run before first light, and the evening plans wait for the sunset
  const runs = allRowsOf(run).filter(r => /^s_w_/.test(r.id) && /ריצה/.test(r.act));
  for (const r of runs) assert.ok(r.time >= '06:00', r.id + ' at ' + r.time);
  assert.equal(day(run, '2026-12-04').rows.find(r => r.id === 's_w_1204').time, '15:45');
  assert.ok(day(run, '2026-11-30').rows.find(r => r.id === 's_8_6').time > '18:04', 'back from Railay after the sunset');
  const saket = day(run, '2026-11-24').rows.find(r => r.id === 's_2_saket');
  assert.ok(saket.time < '17:47', 'the Golden Mount before sunset');
  assert.ok(/17:00/.test(day(run, '2026-11-26').rows.find(r => r.id === 's_4_7').notes), 'the last boat to the island');
  assert.ok(run('renderDayCard(sh().days[0])').includes('🌅 06:21'));
  // a document saved before gets the same, once, in time order
  const s25 = boot();
  s25(`STATE=seedData(); sh().days.forEach(d=>{ delete d.sun; d.rows=d.rows.filter(r=>r.id!=='s_h7_sun'); });
  const d4=sh().days.find(d=>d.date==='2026-12-04'); const w=d4.rows.find(r=>r.id==='s_w_1204'); Object.assign(w,{time:'05:45'}); d4.rows=[w,...d4.rows.filter(r=>r!==w)];
  w.done=true; d4.rows.push({id:'custom-lamp',act:'פנס ראש'});
  STATE.schema=25; ensureDefaults();`);
  assert.equal(s25('STATE.schema'), 32);
  const s4 = day(s25, '2026-12-04');
  assert.equal(s4.rows.find(r => r.id === 's_w_1204').time, '15:45');
  assert.equal(s4.rows.find(r => r.id === 's_w_1204').done, true);
  assert.equal(s4.rows.at(-1).id, 'custom-lamp');
  for (const d of JSON.parse(s25('JSON.stringify(sh().days)'))) {
    const t = d.rows.filter(r => r.time).map(r => late(r.time));
    assert.deepEqual(t, [...t].sort(), d.date + ' in time order');
    assert.ok(d.sun, d.date + ' has the sun');
  }
  assert.equal(day(s25, '2026-12-07').rows.filter(r => r.id === 's_h7_sun').length, 1);
  const settled = s25('JSON.stringify(STATE)'); s25('ensureDefaults();');
  assert.equal(s25('JSON.stringify(STATE)'), settled);
}

// --- 5/11: the extra Kalima night agreed with the hotel (schema 27) ----------------------
{
  const k26 = boot();
  k26(`STATE=seedData();
  const r=sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_g6_stay'); Object.assign(r,{baht:7742}); r.done=true;
  sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_g8_0').baht=1480;
  STATE.masterChecklist.forEach(t=>{ if(/מקדמה|פרטי החשבון של המחנה/.test(t.title)) t.status='todo'; });
  STATE.schema=26; ensureDefaults();`);
  assert.equal(k26('STATE.schema'), 32);
  const kr = JSON.parse(k26('JSON.stringify(sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_g6_stay"))'));
  assert.equal(kr.baht, 8800);
  assert.equal(kr.done, true, 'a tick survives');
  assert.equal(k26('STATE.masterChecklist.find(t=>t.title==="להזמין לילה נוסף בקלימה — 5/12").status'), 'done', 'paid on 5/11');
  assert.equal(k26('wallet().expenses.filter(x=>/^קלימה · לילה נוסף/.test(x.title)).length'), 1, 'in the ledger once');
  assert.equal(k26('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_g8_0").baht'), 1200);
  assert.ok(k26('STATE.masterChecklist.filter(t=>/מקדמה ฿6,075 ב-Wise|פרטי החשבון של המחנה/.test(t.title)).every(t=>t.status==="done")'), 'the camp confirmed the deposit on 27/9');
  const settled = k26('JSON.stringify(STATE)'); k26('ensureDefaults();');
  assert.equal(k26('JSON.stringify(STATE)'), settled);
}

// --- 12/11: what was booked — ASAI, VietJet, COSI, River Lodge, Eleven to 12/12 ---------------
const bkk = boot();
const ax = JSON.parse(bkk('JSON.stringify(wallet().expenses.find(x=>/^ASAI/.test(x.title)))'));
assert.equal(ax.amount, 10398.09);
assert.equal(ax.currency, 'THB');
assert.equal(ax.status, 'due', 'Booking charges it later');
// The forecast takes the price from the ledger, once, split across the nights or the flights.
const nightIls = bkk('sharedRowPrice(sh().days[0].rows.find(r=>r.id==="s_1_9")).base');
assert.ok(Math.abs(nightIls - 10398.09 * bkk('rate()') / 3) < 0.001);
const flightIls = bkk('sharedRowPrice(sh().days[3].rows.find(r=>r.id==="s_4_3")).base');
assert.ok(Math.abs(flightIls - 12515.52 * bkk('rate()') / 2) < 0.001);
assert.equal(JSON.parse(bkk('JSON.stringify(sh().bookings.find(b=>b.what==="ASAI Bangkok Chinatown"))')).ref, '5547616403');
assert.equal(JSON.parse(bkk('JSON.stringify(sh().bookings.find(b=>b.what==="Thai Vietjet · MSR6JW"))')).ref, 'MSR6JW');
assert.equal(bkk('sh().hotels.find(h=>h.hotel==="Montraj Coach Sukhumvit").choice'), 'בוטל');
assert.equal(bkk('sh().hotels.find(h=>h.hotel==="Eleven Bangkok Sukhumvit 11").dates'), '9–12/12');
assert.ok(bkk('sh().flights.some(f=>/VZ300/.test(f.what)) && sh().flights.some(f=>/VZ303/.test(f.what)) && !sh().flights.some(f=>/TG203/.test(f.what))'));
assert.ok(bkk('STATE.masterChecklist.some(t=>/להוסיף את טליה כאורחת ב-Eleven/.test(t.title) && t.status==="todo")'));
assert.ok(!bkk('STATE.masterChecklist.some(t=>t.title==="להאריך את צ׳רמנטרה בלילה — 2/12")'));
assert.equal(bkk('STATE.masterChecklist.find(t=>t.title==="לסגור את צ׳רמנטרה לפני הדדליין").status'), 'done');

// A document saved before 12/11 (schema 31) moves over: ticks and hand-added rows stay, the cancelled bookings go.
{
  const o31 = boot();
  o31(`STATE=seedData();
  wallet().expenses=wallet().expenses.filter(x=>!/^ASAI|^COSI|^Khao Sok River|MSR6JW/.test(x.title));
  wallet().expenses.push({id:'x_mt',title:'Montraj Coach Sukhumvit · 3 לילות בבנגקוק',amount:8169.87,currency:'THB',paidBy:'itai',split:'ratio',status:'due'},
    {id:'x_ch',title:'Chermantra Aonang · 3 לילות',amount:1839,currency:'ILS',paidBy:'itai',split:'ratio',status:'paid'});
  const el=wallet().expenses.find(x=>/^Eleven/.test(x.title)); Object.assign(el,{title:'Eleven Bangkok Sukhumvit 11 · לילה אחרון',amount:3010.10});
  const d24=sh().days.find(d=>d.date==='2026-11-24'); d24.rows.find(r=>r.id==='s_2_canal').done=true; d24.rows.push({id:'custom-31',act:'שלי'});
  const d4=sh().days.find(d=>d.date==='2026-12-04'); d4.rows=d4.rows.filter(r=>!/^s_g5_(fee|lunch|kayak|sunset|dinner)$/.test(r.id));
  STATE.masterChecklist=STATE.masterChecklist.filter(t=>!/River Lodge בהעברה|כאורחת ב-Eleven/.test(t.title));
  Object.assign(STATE.masterChecklist.find(t=>t.title==='להזמין טיסות VietJet בנגקוק ↔ פוקט'),{title:'להזמין את טיסת TG203 לפוקט',status:'todo'});
  STATE.masterChecklist.push({id:'m_ch',owner:'both',title:'להאריך את צ׳רמנטרה בלילה — 2/12',status:'todo'});
  STATE.schema=31; ensureDefaults();`);
  assert.equal(o31('STATE.schema'), 32);
  assert.equal(o31('wallet().expenses.filter(x=>/Montraj|Chermantra/.test(x.title)).length'), 0);
  assert.equal(o31('wallet().expenses.filter(x=>/^ASAI|^COSI|^Khao Sok River|MSR6JW/.test(x.title)).length'), 4);
  assert.equal(o31('wallet().expenses.find(x=>/^Eleven/.test(x.title)).amount'), 8411.85);
  assert.equal(day(o31, '2026-11-24').rows.find(r => r.id === 's_2_canal').done, true, 'the tick survives');
  assert.equal(day(o31, '2026-11-24').rows.at(-1).id, 'custom-31', 'a hand-added row stays on its date');
  assert.ok(day(o31, '2026-12-04').rows.some(r => r.id === 's_g5_sunset'));
  assert.equal(o31('STATE.masterChecklist.filter(t=>t.title==="להזמין טיסות VietJet בנגקוק ↔ פוקט" && t.status==="done").length'), 1);
  assert.ok(!o31('STATE.masterChecklist.some(t=>/צ׳רמנטרה בלילה|TG203/.test(t.title))'));
  assert.ok(o31('STATE.masterChecklist.some(t=>/River Lodge בהעברה/.test(t.title))'));
  const settled = o31('JSON.stringify(STATE)'); o31('ensureDefaults();');
  assert.equal(o31('JSON.stringify(STATE)'), settled, 'once');
}

// 24/11: canals ending at Wat Arun, the ferry to Wat Pho, the palace by tuk-tuk, the Giant Swing and the Golden Mount before the Loy Krathong dinner.
{
  const b = boot();
  const d24 = day(b, '2026-11-24');
  const at = id => d24.rows.findIndex(r => r.id === id);
  const seq = ['s_2_canal','s_2_arun','s_2_ferry','s_2_3','s_2_tuk','s_2_2','s_2_swing','s_2_saket','s_2_7'];
  assert.deepEqual(seq.map(at), [...seq.map(at)].sort((x,y)=>x-y), 'in the order asked');
  assert.ok(seq.every(id => at(id) >= 0));
  const t = d24.rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t, [...t].sort(), '24/11 is in time order');
  assert.ok(d24.rows.find(r => r.id === 's_2_2').time <= '15:30', 'the palace before its last entry');
  assert.ok(/צ׳אנגוואטנה/.test(acts(day(b, '2026-11-25'))));
  const t25 = day(b, '2026-11-25').rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t25, [...t25].sort(), '25/11 is in time order');
  // A saved document keeps its ticks and its own rows.
  const o = boot();
  o(`STATE=seedData(); const d=sh().days.find(x=>x.date==='2026-11-24');
  d.rows=d.rows.filter(r=>!['s_2_canal','s_2_arun','s_2_ferry','s_2_tuk','s_2_swing','s_2_saket'].includes(r.id));
  d.rows.find(r=>r.id==='s_2_3').done=true; d.rows.push({id:'custom-x',act:'קרם הגנה'});
  STATE.schema=21; ensureDefaults();`);
  const o24 = day(o, '2026-11-24');
  assert.ok(o24.rows.some(r => r.id === 's_2_saket'));
  assert.equal(o24.rows.find(r => r.id === 's_2_3').done, true);
  assert.equal(o24.rows[o24.rows.length-1].id, 'custom-x');
}

// Loy Krathong: the Thai calendar date, and a warning about the wrong one.
const lanterns = day(run, '2026-11-24').rows.find(r => r.id === 's_2_8');
assert.ok(/24\/11/.test(lanterns.notes) && /25\/11/.test(lanterns.notes));


console.log('PASS: Bangkok first with Loy Krathong, the camp as booked, four nights in Ao Nang, two in Khao Sok, four at Kalima and a last night in Bangkok, together until 10/12; workouts by date; sunrise and sunset; moves from schema 14, 15, 16, 22, 23, 24, 25, 26, 30 and 31 without losing hand-added rows, once; the 12/11 bookings (ASAI, VietJet, COSI, River Lodge, the lake, Eleven to 12/12); Loy Krathong date.');

// --- nightlife --------------------------------------------------------------
{
  const n = boot();
  const nights = JSON.parse(n('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/_night$/.test(r.id)).map(r=>d.date)))'));
  assert.deepEqual(nights, ['2026-11-23','2026-11-29','2026-11-30','2026-12-02','2026-12-07','2026-12-09']);
  // never the night before an early start
  for (const date of nights) {
    const i = JSON.parse(n('JSON.stringify(sh().days.map(d=>d.date))')).indexOf(date);
    const next = JSON.parse(n(`JSON.stringify(sh().days[${i+1}].rows.find(r=>r.time && !/^s_w_/.test(r.id)))`)); // a workout the morning after is optional
    assert.ok(next.time >= '07:15', date + ' is followed by ' + next.time);
  }
  const d1 = JSON.parse(n('JSON.stringify(sh().days[0].rows.map(r=>r.act))'));
  assert.ok(d1.indexOf('גראב חזרה למלון') > d1.findIndex(a=>a.startsWith('חאו סן')), 'the ride home comes after Khao San');
  // a saved document gets the nights once
  const o = boot();
  o(`STATE=seedData(); sh().days.forEach(d=>d.rows=d.rows.filter(r=>!/_night$/.test(r.id))); STATE.schema=13; ensureDefaults();`);
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 6);
  o('STATE.schema=13; ensureDefaults();');
  assert.equal(o('sh().days.flatMap(d=>d.rows).filter(r=>/_night$/.test(r.id)).length'), 6);
  console.log('PASS: nightlife on six evenings, none before an early start, migration once.');
}

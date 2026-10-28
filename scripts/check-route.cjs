/*
 * המסלול מ-2/12: קופנגן (Halfmoon), לילה בקאו סוק, קאו לאק עם סימילן, טליה
 * לצ׳יאנג מאי ב-8/12 ואיתי הביתה מבנגקוק ב-10/12. וגם שמסמך שנשמר לפני
 * השינוי עובר אליו בלי לאבד שורות שנוספו ידנית, ובלי לזוז פעמיים. בנוסף:
 * המלון בבנגקוק, תאריך לוי קראתונג וחיי הלילה.
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
assert.equal(run('STATE.schema'), 15);

// --- the plan from 2/12 ---------------------------------------------------------
const all = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.day,d.date,d.dow,d.id,d.owner||""]))'));
assert.equal(all.length, 18);
assert.deepEqual(all.slice(9), [
  [10,'2026-12-02','ד׳','day_10',''], [11,'2026-12-03','ה׳','day_11',''], [12,'2026-12-04','ו׳','day_12',''],
  [13,'2026-12-05','ש׳','day_13',''], [14,'2026-12-06','א׳','day_14',''], [15,'2026-12-07','ב׳','day_15',''],
  [16,'2026-12-08','ג׳','day_16',''], [17,'2026-12-09','ד׳','day_17','itai'], [18,'2026-12-10','ה׳','day_18','itai']]);

const d2 = day(run, '2026-12-02');
const boat = d2.rows.find(r => r.id === 's_p2_2');
assert.equal(boat.time, '08:00');
assert.ok(boat.link.includes('lomprayah'));
assert.equal(boat.status, 'להזמין');
assert.equal(d2.dest, 'קופנגן');
assert.ok(/Halfmoon/.test(acts(d2)) && /Halfmoon/.test(acts(day(run, '2026-12-03'))), 'Halfmoon on both nights');
assert.ok(!/Halfmoon/.test(acts(day(run, '2026-12-04'))), 'and 4/12 is for recovering');
assert.ok(/Sarana/.test(acts(day(run, '2026-12-04'))));
const d5 = day(run, '2026-12-05');
assert.equal(d5.dest, 'קאו סוק');
assert.ok(d5.rows.some(r => /Our Jungle House/.test(r.act) && r.cat === 'לינה'), 'a night in the jungle');
assert.ok(/צ׳או לאן/.test(acts(day(run, '2026-12-06'))) && /קלימה/.test(acts(day(run, '2026-12-06'))), 'the lake, then Khao Lak');
assert.ok(/סימילן/.test(acts(day(run, '2026-12-07'))));
const d8 = day(run, '2026-12-08');
assert.equal(d8.rows.find(r => r.id === 's_p8_1').priceEstimate.split, 'full-talia', 'Talia pays her own ride to the airport');
assert.equal(d8.rows.find(r => r.id === 's_p8_zip').status, 'אופציונלי');
const home = day(run, '2026-12-10').rows.find(r => r.id === 's_p10_2');
assert.equal(home.time, '11:15');
assert.ok(/IZ592/.test(home.act) && /בנגקוק → תל אביב/.test(home.act));
// Nothing left of the old Khao Lak week.
const allRows = run('JSON.stringify(sh().days)');
assert.ok(!/tripstorekrabi|ואן משותף לקאו לק/.test(allRows), 'no van');
assert.ok(!JSON.parse(allRows).some(d => d.rows.some(r => /IZ598/.test(r.act))), 'no Phuket flight home');
// Each new day reads in time order.
for (const d of JSON.parse(run('JSON.stringify(sh().days.filter(d=>d.date>="2026-12-02"))'))) {
  const t = d.rows.filter(r => r.time).map(r => r.time);
  assert.deepEqual(t, [...t].sort(), d.date + ' is in time order');
}

// Itai sees his two extra days; Talia's view still ends when she flies on 8/12.
assert.equal(run('myDays().length'), 18);
assert.equal(run('myDays()[myDays().length-1].date'), '2026-12-10');
const talia = boot('talia');
assert.equal(talia('myDays().length'), 16);
assert.equal(talia('myDays()[myDays().length-1].date'), '2026-12-08');
assert.ok(!talia('myDestinations().some(d=>d.name==="בנגקוק — לילה אחרון")'));
const destDays = (r, name) => JSON.parse(r(`JSON.stringify(daysForDest(myDestinations().find(d=>d.name==="${name}")).map(d=>d.date))`));
assert.deepEqual(destDays(run, 'קופנגן'), ['2026-12-02','2026-12-03','2026-12-04']);
assert.deepEqual(destDays(run, 'קאו סוק'), ['2026-12-05']);
assert.deepEqual(destDays(run, 'קאו לאק'), ['2026-12-06','2026-12-07','2026-12-08']);
assert.deepEqual(destDays(run, 'בנגקוק — לילה אחרון'), ['2026-12-09','2026-12-10']);
assert.deepEqual(destDays(talia, 'קאו לאק'), ['2026-12-06','2026-12-07','2026-12-08']);
assert.equal(run('homeDate()'), '2026-12-10');
assert.ok(/IZ592/.test(run('STATE.trip.itai.homeFlight')));

// The ledger: the new stays, Kalima for three nights, and still nothing paid by Talia.
for (const re of ['Sarana', 'Our Jungle House', 'Eleven Bangkok', 'שינוי טיסה']) {
  assert.equal(run(`wallet().expenses.filter(x=>/${re}/.test(x.title)).length`), 1, re);
}
assert.equal(run('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 2103);
assert.equal(run('wallet().expenses.find(x=>/Eleven Bangkok/.test(x.title)).split'), 'full-itai');
assert.equal(run('wallet().expenses.filter(x=>x.paidBy==="talia").length'), 0);
// The tasks the move needs, and no van to book.
for (const t of ['להזמין Lomprayah מאאו נאנג לקופנגן', 'לשנות את קלימה ל-6–9/12 בבוקינג', 'כרטיסים ל-Halfmoon, 2–3/12']) {
  assert.ok(run(`STATE.masterChecklist.some(t=>t.title===${JSON.stringify(t)})`), t);
}
assert.ok(!run('STATE.masterChecklist.some(t=>/ואן משותף/.test(t.title))'));
assert.equal(run('STATE.masterChecklist.find(t=>t.title.includes("לצ׳יאנג מאי ב-8")).owner'), 'talia');

// --- a document saved before the move -------------------------------------------
const old = boot();
old(`STATE=seedData();
const keep=sh().days.filter(d=>d.date<'2026-12-02');
sh().days=keep.concat([
  {day:11,date:'2026-12-03',dow:'ה׳',id:'day_11',dest:'קאו לק',summary:'סימילן',rows:[
    {id:'s_15_1',act:'סימילן — יום שנורקלינג',time:'07:00',done:true},{id:'custom-towel',act:'לקחת מגבת',done:false}]},
  {day:16,date:'2026-12-08',dow:'ג׳',id:'day_16',dest:'קאו לק → הביתה',summary:'הביתה',rows:[
    {id:'s_16_6',act:'ארקיע IZ598 · פוקט → תל אביב',time:'17:20'}]}]);
const n30=sh().days.find(d=>d.date==='2026-11-30'), n1=sh().days.find(d=>d.date==='2026-12-01');
const night=n30.rows.splice(n30.rows.findIndex(r=>r.id==='s_9_night'),1)[0]; night.time='22:00'; night.done=true; n1.rows.push(night);
delete STATE.trip.itai.homeDate; STATE.trip.itai.homeFlight='ארקיע IZ598 · פוקט → תל אביב · 8/12, 17:20';
const ex=wallet().expenses;
Object.assign(ex.find(x=>/IZ592/.test(x.title)),{title:'ארקיע IZ598 · פוקט → תל אביב'});
Object.assign(ex.find(x=>/Kalima/.test(x.title)),{title:'Kalima Resort · 6 לילות בקאו לק',amount:4029});
wallet().expenses=ex.filter(x=>!/Sarana|Our Jungle|Eleven|שינוי טיסה/.test(x.title));
const thai=STATE.countries.find(c=>c.id==='thailand');
thai.destinations=thai.destinations.filter(d=>!['קופנגן','קאו סוק','קאו לאק — עוד לילה','בנגקוק — לילה אחרון'].includes(d.name));
Object.assign(thai.destinations.find(d=>d.name==='קאו לאק'),{name:'קאו לק',arrival:'2026-12-02',departure:'2026-12-08',nights:6});
STATE.masterChecklist=STATE.masterChecklist.filter(t=>!PHANGAN_TASKS.some(p=>p.title===t.title));
STATE.masterChecklist.push({id:'m_van',owner:'both',category:'הזמנות',title:'להזמין ואן משותף מאאו נאנג לקאו לק',status:'todo'});
sh().planB={done:{lomprayah:true},stays:{}};
STATE.schema=14;
ensureDefaults();`);
assert.equal(old('STATE.schema'), 15);
assert.deepEqual(JSON.parse(old('JSON.stringify(sh().days.map(d=>d.date))')).slice(9),
  ['2026-12-02','2026-12-03','2026-12-04','2026-12-05','2026-12-06','2026-12-07','2026-12-08','2026-12-09','2026-12-10']);
const o3 = day(old, '2026-12-03');
assert.ok(/Halfmoon/.test(acts(o3)), '3/12 is the new day');
assert.ok(!o3.rows.some(r => r.id === 's_15_1'), 'the old Similan row is gone with its day');
assert.equal(o3.rows[o3.rows.length - 1].id, 'custom-towel', 'a row added by hand stays on its date');
assert.ok(/IZ592/.test(acts(day(old, '2026-12-10'))));
assert.equal(old('homeDate()'), '2026-12-10');
assert.ok(/IZ592/.test(old('STATE.trip.itai.homeFlight')));
assert.ok(/IZ592/.test(old('wallet().expenses.find(x=>x.amount===1891).title')));
assert.equal(old('wallet().expenses.find(x=>/Kalima/.test(x.title)).amount'), 2103);
assert.equal(old('wallet().expenses.filter(x=>/Sarana|Our Jungle|Eleven|שינוי טיסה/.test(x.title)).length'), 4);
assert.equal(old('STATE.countries.find(c=>c.id==="thailand").destinations.filter(d=>/קאו לק|קאו לאק$/.test(d.name)).length'), 1, 'Khao Lak updated, not duplicated');
assert.equal(old('STATE.countries.find(c=>c.id==="thailand").destinations.find(d=>d.name==="קאו לאק").arrival'), '2026-12-06');
assert.ok(old('STATE.countries.find(c=>c.id==="thailand").destinations.some(d=>d.name==="קופנגן")'));
assert.ok(!old('STATE.masterChecklist.some(t=>/ואן משותף/.test(t.title))'), 'the van task is dropped');
assert.equal(old('STATE.masterChecklist.find(t=>t.title==="להזמין Lomprayah מאאו נאנג לקופנגן").status'), 'done', 'a tick from the Plan B tab carries over');
assert.equal(old('sh().planB'), undefined);
// The big Ao Nang night moved to 30/11 with its tick — on 1/12 the boat leaves at 07:15.
const moved = day(old, '2026-11-30').rows.find(r => r.id === 's_9_night');
assert.ok(moved && moved.done === true);
assert.equal(moved.time, '21:30');
assert.ok(!day(old, '2026-12-01').rows.some(r => r.id === 's_9_night'));
// A van that was already booked turns into a reminder to cancel it.
const booked = boot();
booked(`STATE=seedData(); STATE.masterChecklist.push({id:'m_van',owner:'both',title:'להזמין ואן משותף מאאו נאנג לקאו לק',status:'done'}); STATE.schema=14; ensureDefaults();`);
assert.equal(booked('STATE.masterChecklist.find(t=>t.id==="m_van").title'), 'לבטל את הוואן לקאו לק');
assert.equal(booked('STATE.masterChecklist.find(t=>t.id==="m_van").status'), 'todo');

// Running it again changes nothing.
const settled = old('JSON.stringify(STATE)');
old('ensureDefaults();');
assert.equal(old('JSON.stringify(STATE)'), settled);
old('STATE.schema=14; ensureDefaults();');
assert.equal(old('wallet().expenses.length'), JSON.parse(settled).money.expenses.length, 'no second copy of the bookings');
assert.equal(old('STATE.masterChecklist.length'), JSON.parse(settled).masterChecklist.length);
assert.equal(old('JSON.stringify(sh().days)'), JSON.stringify(JSON.parse(settled).shared.days));

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


console.log('PASS: Koh Phangan from 2/12, Khao Sok, Khao Lak, Talia to Chiang Mai on 8/12 and Itai home from Bangkok on 10/12; saved-document move and idempotence; Bangkok hotel booked direct; Loy Krathong date.');

// --- nightlife --------------------------------------------------------------
{
  const n = boot();
  const nights = JSON.parse(n('JSON.stringify(sh().days.flatMap(d=>d.rows.filter(r=>/_night$/.test(r.id)).map(r=>d.date)))'));
  assert.deepEqual(nights, ['2026-11-23','2026-11-29','2026-11-30','2026-12-02','2026-12-03','2026-12-07','2026-12-09']);
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

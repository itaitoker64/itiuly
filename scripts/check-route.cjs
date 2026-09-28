/*
 * סידור ימי קאו לק: סימילן ב-3/12 עם שני ימי גיבוי, קאו סוק כטיול יום ב-5/12,
 * ההסעה מאאו נאנג עם קישור הזמנה, ותאריך לוי קראתונג. וגם שמסמך שנשמר לפני
 * השינוי מסודר מחדש בלי לאבד סימונים והערות, ובלי לזוז פעמיים.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

function boot(){
  const ctx = vm.createContext({
    window:{TRIP_USER:{username:'itai'}},
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
assert.equal(run('STATE.schema'), 12);

// Similan moved to 3/12, with two free days after it that can take it if the sea says no.
const d3 = day(run, '2026-12-03'), d4 = day(run, '2026-12-04');
const d5 = day(run, '2026-12-05'), d6 = day(run, '2026-12-06'), d7 = day(run, '2026-12-07');
assert.ok(/סימילן/.test(acts(d3)), 'Similan is on 3/12');
assert.ok(!/סימילן — יום/.test(acts(d7)), 'and no longer on the day before the flight');
assert.ok(!/סימילן — יום|צ׳או לאן|זיפליין/.test(acts(d4)), '4/12 is free — the first backup');
assert.ok(!/סימילן — יום|צ׳או לאן|זיפליין/.test(acts(d7)), '7/12 is free — the second backup');
assert.ok(/ריזורט וספא/.test(d7.summary));

// The two long days are not back to back.
assert.ok(/צ׳או לאן/.test(acts(d5)), 'Khao Sok is on 5/12');
assert.ok(/זיפליין/.test(acts(d6)), 'zipline stays on 6/12');
assert.equal(d5.dest, 'קאו סוק');

// Khao Sok is a day trip everywhere — no leftover overnight wording.
assert.ok(!/בוקר על האגם/.test(JSON.stringify(run('JSON.stringify(sh().days)'))));
assert.ok(d5.rows.some(r => /חזרה לריזורט/.test(r.act)), 'the day ends back at the resort');
const bungalow = JSON.parse(run('JSON.stringify(sh().hotels.find(h=>h.hotel==="בונגלו צף על אגם צ׳או לאן"))'));
assert.equal(bungalow.choice, 'לא נבחר');
assert.ok(!/משולם גם בלילה הזה/.test(bungalow.what));

// Wording that depends on the date moved with the plan.
assert.equal(d7.rows.find(r => r.id === 's_11_4').act, 'ארוחת ערב אחרונה');
assert.equal(d3.rows.find(r => r.id === 's_15_4').act, 'ארוחת ערב');
assert.ok(/סימילן/.test(d4.rows.find(r => r.id === 's_13_1').notes));
assert.ok(/מחר סימילן/.test(day(run, '2026-12-02').rows.find(r => r.id === 's_10_7').notes));
assert.ok(/4\/12 וב-7\/12/.test(d3.rows.find(r => r.id === 's_15_1').notes));

// Every date still has one day, and the day numbers and weekdays did not move.
const all = JSON.parse(run('JSON.stringify(sh().days.map(d=>[d.day,d.date,d.dow,d.id]))'));
assert.equal(all.length, 16);
assert.deepEqual(all.find(d => d[1] === '2026-12-03'), [11, '2026-12-03', 'ה׳', 'day_11']);
assert.deepEqual(all.find(d => d[1] === '2026-12-07'), [15, '2026-12-07', 'ב׳', 'day_15']);

// Ao Nang → Khao Lak by shared van, bookable from the app, at the checked price.
const d10 = day(run, '2026-12-02');
const transfer = d10.rows.find(r => r.id === 's_10_2');
assert.equal(transfer.act, 'ואן משותף לקאו לק');
assert.equal(transfer.baht, 900, '฿450 each for two');
assert.equal(transfer.status, 'להזמין');
assert.ok(transfer.link.includes('tripstorekrabi.com'));
assert.ok(/11:30 ל-14:30/.test(transfer.notes), 'the pickup window is stated, not a fake exact time');
assert.ok(run('STATE.masterChecklist.some(t=>t.title==="להזמין ואן משותף מאאו נאנג לקאו לק" && t.link.includes("tripstorekrabi"))'));
assert.ok(!run('STATE.masterChecklist.some(t=>t.title==="להזמין רכב מאאו נאנג לקאו לק")'), 'no stale private-car task');

// The day is built around the van: a slow morning at the villa, check-out, then the pickup window.
const at10 = id => d10.rows.findIndex(r => r.id === id);
assert.ok(at10('s_10_villa') > at10('s_10_0') && at10('s_10_villa') < at10('s_10_1'), 'pool morning between breakfast and check-out');
assert.equal(d10.rows.find(r => r.id === 's_10_1').time, '11:00');
assert.ok(at10('s_10_1') < at10('s_10_2'), 'check-out before the pickup');
// Rows run in time order (the day view lists them as they are stored).
const timed = d10.rows.filter(r => r.time).map(r => r.time);
assert.deepEqual(timed, [...timed].sort(), 'day 10 is in time order');

// A document saved with the private car gets the van, keeps a tick, and keeps a hand-added row.
const car = boot();
car(`STATE=seedData();
const d=sh().days.find(x=>x.date==='2026-12-02');
d.rows=d.rows.filter(r=>r.id!=='s_10_villa');
Object.assign(d.rows.find(r=>r.id==='s_10_2'),{act:'רכב פרטי לקאו לק',time:'09:40',baht:3300,done:true});
d.rows.push({id:'custom-snack',act:'לקנות מים לדרך',done:false});
const t=STATE.masterChecklist.find(x=>x.title==='להזמין ואן משותף מאאו נאנג לקאו לק');
t.title='להזמין רכב מאאו נאנג לקאו לק';
STATE.schema=11;
ensureDefaults();`);
const c10 = day(car, '2026-12-02');
const vanRow = c10.rows.find(r => r.id === 's_10_2');
assert.equal(vanRow.act, 'ואן משותף לקאו לק');
assert.equal(vanRow.baht, 900);
assert.equal(vanRow.done, true, 'the tick survives');
assert.ok(c10.rows.some(r => r.id === 's_10_villa'), 'the pool morning is added');
assert.equal(c10.rows[c10.rows.length - 1].id, 'custom-snack', 'a hand-added row stays, after the plan');
assert.ok(car('STATE.masterChecklist.some(t=>t.title==="להזמין ואן משותף מאאו נאנג לקאו לק")'));
assert.equal(car('STATE.masterChecklist.filter(t=>/מאאו נאנג לקאו לק/.test(t.title)).length'), 1, 'renamed, not duplicated');

// Loy Krathong: the Thai calendar date, and a warning about the wrong one.
const lanterns = day(run, '2026-11-24').rows.find(r => r.id === 's_2_8');
assert.ok(/24\/11/.test(lanterns.notes) && /25\/11/.test(lanterns.notes));

// --- a document saved before the move -----------------------------------------
const old = boot();
old(`STATE=seedData();
const days=sh().days, at=d=>days.find(x=>x.date===d);
const swap=(a,b)=>['dest','rows','summary'].forEach(k=>{const t=a[k];a[k]=b[k];b[k]=t;});
swap(at('2026-12-03'),at('2026-12-07')); swap(at('2026-12-04'),at('2026-12-05'));
at('2026-12-05').dest='קאו סוק → קאו לק'; at('2026-12-05').summary='בוקר על האגם, וחזרה';
const sim=at('2026-12-07').rows.find(r=>r.id==='s_15_1');
sim.done=true; sim.talk=[{by:'talia',text:'רוצה את זה!'}];
at('2026-12-04').rows.push({id:'custom-ks',act:'לקחת מגבת לאגם',done:false});
STATE.schema=10;
ensureDefaults();`);
assert.equal(old('STATE.schema'), 12);
const o3 = day(old, '2026-12-03'), o5 = day(old, '2026-12-05');
const moved = o3.rows.find(r => r.id === 's_15_1');
assert.ok(moved, 'Similan reached 3/12 in the saved document');
assert.equal(moved.done, true, 'with its tick');
assert.equal(moved.talk[0].text, 'רוצה את זה!', 'and its conversation');
assert.ok(o5.rows.some(r => r.id === 'custom-ks'), 'a row added by hand travels with its day');
assert.equal(o5.summary, 'טיול יום לאגם צ׳או לאן', 'the stale overnight title is gone');

// Running it again moves nothing.
const settled = old('JSON.stringify(STATE)');
old('STATE.schema=10; ensureDefaults();');
assert.equal(old('JSON.stringify(sh().days)'), JSON.stringify(JSON.parse(settled).shared.days),
  'the rows, not the date, decide whether to move — so a second pass is a no-op');

console.log('PASS: Similan with two backup days, Khao Sok as a day trip, shared van on 2/12, Loy Krathong date, saved-document move and idempotence.');

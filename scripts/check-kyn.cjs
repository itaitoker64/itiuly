const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const ctx = vm.createContext({window:{TRIP_USER:{username:'itai'}},document:{addEventListener(){},getElementById(){return {addEventListener(){}};}},console});
vm.runInContext(read('public/shared-seed.js'),ctx);
vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/,''),ctx);
const run = s=>vm.runInContext(s,ctx);
run('STATE=seedData(); ensureDefaults();');
assert.equal(run('STATE.schema'),6);
assert.equal(run('wallet().expenses.filter(x=>x.bookingKey==="kyn-2026-11").length'),1);
assert.equal(run('kynPackageExpense().amount'),14580);
assert.equal(run('kynPackageExpense().status'),'due');
assert.equal(run('sh().days.flatMap(d=>d.rows).filter(r=>r.act.startsWith("חבילת KYN")).reduce((sum,r)=>sum+r.baht,0)'),14580);
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_5_1").time'),'08:00');
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_5_6").time'),'17:00');
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_4_12").time'),'16:00');
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_7_1").status'),'אופציונלי');
// Model a saved v5 document with old schedule values and custom edits.
run(`STATE.schema=5;
STATE.money.expenses=STATE.money.expenses.filter(x=>!x.bookingKey);
STATE.shared.bookings=STATE.shared.bookings.filter(x=>x.id!=='kyn-2026-11');
const morning=sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_5_1');
Object.assign(morning,{time:'07:30',baht:850,status:'משלמים במקום',done:true,notes:'My own note'});
const evening=sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_5_6');
Object.assign(evening,{time:'18:00',baht:123,done:true});
sh().days[0].rows.push({id:'custom-row',act:'Custom activity',done:true});
ensureDefaults();`);
assert.equal(run('morning.time'),'08:00');
assert.equal(run('morning.baht'),0);
assert.equal(run('morning.done'),true);
assert.ok(run('morning.notes.startsWith("My own note")'));
assert.equal(run('evening.time'),'18:00');
assert.equal(run('evening.baht'),123);
assert.equal(run('sh().days[0].rows.find(r=>r.id==="custom-row").done'),true);
const migrated=run('JSON.stringify(STATE)');
run('ensureDefaults();');
assert.equal(run('JSON.stringify(STATE)'),migrated);
// Existing manually entered KYN booking is preserved, including its payment status.
run(`STATE=seedData(); STATE.schema=5;
STATE.money.expenses=[{id:'manual-kyn',title:'KYN Phoenix deposit',amount:7290,currency:'THB',paidBy:'talia',split:'equal',status:'paid'}];
ensureDefaults();`);
assert.equal(run('wallet().expenses.length'),1);
assert.equal(run('wallet().expenses[0].status'),'paid');
// A user-deleted package must not reappear after a reload of migrated data.
run('wallet().expenses=[]; ensureDefaults();');
assert.equal(run('wallet().expenses.length'),0);
run(`STATE=seedData(); STATE.money.rate=0.1;
STATE.money.expenses=[
{id:'a',title:'Hotel',category:'accommodation',amount:1000,currency:'THB',paidBy:'itai',split:'equal',status:'due'},
{id:'b',title:'Lunch',category:'food',amount:50,currency:'ILS',paidBy:'talia',split:'full-talia',status:'paid'},
{id:'c',title:'Legacy',category:'unknown',amount:20,currency:'ILS',paidBy:'itai',split:'full-itai',status:'paid'}];`);
assert.equal(run('moneyTotals(wallet().expenses).paid'),70);
assert.equal(run('moneyTotals(wallet().expenses).due'),100);
assert.equal(run('moneyTotals(wallet().expenses).share'),70);
run('window.TRIP_USER.username="talia";');
assert.equal(run('moneyTotals(wallet().expenses).share'),100);
run('moneyCategory="accommodation";moneyPayment="due";');
assert.equal(run('filteredMoneyExpenses().length'),1);
run('moneyPayment="paid";');
assert.equal(run('filteredMoneyExpenses().length'),0);
assert.ok(run('renderExpenseList().includes("אין הוצאות במסננים שנבחרו")'));
run('moneyCategory="other";moneyPayment="";');
assert.equal(run('filteredMoneyExpenses()[0].id'),'c');
// Pending package must not change the current paid balance.
const net=run('balance().net');
run('wallet().expenses=wallet().expenses.filter(x=>x.status!=="due");');
assert.equal(run('balance().net'),net);
const itinerary=JSON.parse(read('scripts/itinerary.json'));
const extra=JSON.parse(read('scripts/shared-extra.json'));
const seed=ctx.window.SHARED_SEED;
for(const day of itinerary) for(const row of day.rows){
 const match=seed.days.find(d=>d.date===day.date)?.rows.find(r=>r.act===row.act && r.time===row.time);
 // Scooter additions and prior source differences are outside this update.
 if(row.act.includes('KYN') || row.status==='כלול בחבילה'){
   assert.ok(match,'Source row exists in shared seed: '+row.act);
   assert.equal(match.baht,row.baht);
   assert.equal(match.notes,row.notes);
 }
}
assert.deepEqual(extra.bookings.find(b=>b.id==='kyn-2026-11'),JSON.parse(JSON.stringify(seed.bookings.find(b=>b.id==='kyn-2026-11'))));
console.log('PASS: KYN rates/schedules, pending balance, migration preservation/idempotence, category filters/totals, source consistency.');

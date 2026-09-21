const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ctx=vm.createContext({window:{TRIP_USER:{username:'itai'}},document:{addEventListener(){},getElementById(){return{addEventListener(){}};}},console});
vm.runInContext(read('public/shared-seed.js'),ctx);
vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/,''),ctx);
const run=s=>vm.runInContext(s,ctx),near=(a,b)=>assert.ok(Math.abs(a-b)<.00001,`${a} != ${b}`);
run('STATE=seedData();ensureDefaults();');
const expenses=run('JSON.stringify(wallet())'),countries=run('JSON.stringify(STATE.countries)');
const f=run('sharedForecast()');
assert.equal(f.days.length,16);
assert.ok(f.low<=f.base&&f.base<=f.high);
near(f.itai+f.talia,f.base);
near(Object.values(f.categories).reduce((a,b)=>a+b,0)+f.reserve,f.base);
near(run('sharedEstimateDays().reduce((s,d)=>s+dayTotalBaht(d)*rate(),0)')+f.reserve,f.base);
near(f.categories.flights,3777+1891+4720*.08981); // Includes domestic flight classified below.
assert.ok(f.optional>0);
near(f.categories.accommodation,1128+1839+4029+12150*.08981); // KYN corrected from 14,580.
near(run('sharedRowPrice(sh().days[0].rows.find(r=>r.id==="s_1_0")).base'),3777);
near(run('sharedRowPrice(sh().days[15].rows.find(r=>r.id==="s_16_6")).shares.itai'),1891);
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_15_3").baht'),0);
assert.equal(run('sh().days.flatMap(d=>d.rows).find(r=>r.id==="s_8_1").baht'),0);
assert.equal(run('JSON.stringify(wallet())'),expenses);
assert.equal(run('JSON.stringify(STATE.countries)'),countries);
// New onward-trip rows cannot leak into this shared forecast.
run('sh().days.push({id:"solo",date:"2026-12-09",dest:"Pai",rows:[{baht:999999,cat:"לינה"}]});');
near(run('sharedForecast().base'),f.base);
// Simulate a v6 saved trip with edits, completion flags, and missing price metadata.
run(`STATE=seedData();delete STATE.shared.priceEstimateVersion;
for(const day of sh().days){day.rows=day.rows.filter(r=>!['s_1_atm','s_1_laundry','s_1_tips','s_5_fuel','s_5_private','s_1_insurance','s_1_airport_il'].includes(r.id));for(const row of day.rows)delete row.priceEstimate;}
const sim=sh().days[0].rows.find(r=>r.id==='s_1_2');sim.baht=800;sim.notes='Custom note';sim.done=true;
const lunch=sh().days.flatMap(d=>d.rows).find(r=>r.id==='s_15_3');lunch.baht=999;
const beforeCountries=JSON.stringify(STATE.countries),beforeMoney=JSON.stringify(STATE.money);
ensureDefaults();`);
assert.equal(run('sim.baht'),1600);
assert.equal(run('sim.done'),true);
assert.equal(run('sim.notes'),'Custom note');
assert.equal(run('lunch.baht'),999);
near(run('sharedRowPrice(lunch).base'),999*.08981);
assert.equal(run('JSON.stringify(STATE.countries)===beforeCountries'),true);
assert.equal(run('JSON.stringify(STATE.money)===beforeMoney'),true);
const migrated=run('JSON.stringify(STATE)');run('ensureDefaults();');
assert.equal(run('JSON.stringify(STATE)'),migrated);
run('sh().days[0].rows=sh().days[0].rows.filter(r=>r.id!=="s_1_atm");ensureDefaults();');
assert.equal(run('sh().days[0].rows.some(r=>r.id==="s_1_atm")'),false);
// Explicit shekel edits stay fixed if the saved FX rate changes.
run('lunch.priceEstimate.fixedIls=123.45;wallet().rate=.1;');
near(run('sharedRowPrice(lunch).base'),123.45);
near(run('sharedRowPrice(sh().days[0].rows.find(r=>r.id==="s_1_0")).base'),3777);
assert.equal(run('renderSharedForecast().includes("฿")'),false);
const source=JSON.parse(read('scripts/itinerary.json'));
assert.equal(source.length,16);
console.log('PASS: ILS forecast, both flights, no duplicate bookings/inclusions, sums/shares/ranges, optional separation, scope, migration preservation and fixed ILS edits.');
console.log(JSON.stringify({base:f.base,low:f.low,high:f.high,itai:f.itai,optional:f.optional}));

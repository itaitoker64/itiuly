/*
 * רשימת הקניות: שרק מה שבאמת קונים מסומן כך, שהמחירים והמקומות נכונים,
 * שהמיגרציה מתקנת מסמך שמור בלי לדרוס עריכות, ושהיא רצה פעמיים בלי לשנות.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

function boot(username){
  const ctx = vm.createContext({
    window:{TRIP_USER:{username}},
    document:{addEventListener(){}, getElementById(){ return {addEventListener(){}}; }},
    console
  });
  vm.runInContext(read('public/shared-seed.js'), ctx);
  vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/, ''), ctx);
  vm.runInContext('STATE=seedData(); ensureDefaults();', ctx);
  return s => vm.runInContext(s, ctx);
}

const itai = boot('itai');
const talia = boot('talia');

// A fresh document is already precise: most of the list is owned, not bought.
assert.equal(itai('STATE.schema'), 10);
for(const [run, who] of [[itai,'itai'], [talia,'talia']]){
  const mineAll = run('STATE.packingList.filter(mine)');
  assert.ok(run('STATE.packingList.filter(mine).filter(p=>p.status==="have").length') > 20,
    who + ' owns most of the list already');
  // Nothing is a purchase without both a place to buy it and a real name.
  assert.equal(run('shoppingItems().filter(p=>!["il","th"].includes(p.buyIn)).length'), 0);
  assert.equal(run('shoppingItems().filter(p=>p.cost===undefined||p.cost===null).length'), 0);
  // Everything outside the shopping list carries no price at all.
  assert.equal(run('STATE.packingList.filter(mine).filter(p=>!p.buyIn && p.cost).length'), 0);
  void mineAll;
}

// A passport is not a purchase; it stays an open task with no price.
assert.equal(itai('STATE.packingList.find(p=>p.item==="דרכון — תוקף 6+ חודשים").status'), 'need');
assert.equal(itai('STATE.packingList.find(p=>p.item==="דרכון — תוקף 6+ חודשים").buyIn'), '');
// Socks are not a purchase either — they are packed.
assert.equal(itai('STATE.packingList.find(p=>p.item==="4 זוגות גרביים").status'), 'have');

// The two rules that decide where each thing is bought.
assert.equal(itai('STATE.packingList.find(p=>p.item==="מגן שיניים — לקנות בארץ").buyIn'), 'il');
assert.equal(itai('STATE.packingList.find(p=>p.item==="תחבושות ידיים — 2 זוגות").buyIn'), 'th');
assert.equal(talia('STATE.packingList.find(p=>p.item==="מוצרי מחזור").buyIn'), 'il');
assert.equal(talia('STATE.packingList.find(p=>p.item==="סרונג").buyIn'), 'th');

// Totals: shekels for Israel, baht converted at the saved rate, optional excluded.
const t = JSON.parse(itai('JSON.stringify(shoppingTotals())'));
const near = (a,b) => assert.ok(Math.abs(a-b) < 0.001, a + ' != ' + b);
near(t.thIls, t.th * itai('rate()'));
near(t.total, t.il + t.thIls);
assert.ok(t.il > 0 && t.th > 0);
// Gloves are optional (the camp lends them) so they stay out of the total.
assert.equal(itai('STATE.packingList.find(p=>/כפפות 12–14/.test(p.item)).optional'), true);
const withGloves = itai('shoppingItems().filter(p=>p.buyIn==="th"&&p.status==="need").reduce((s,p)=>s+p.cost,0)');
assert.ok(withGloves > t.th, 'optional items are excluded from the total');

// Marking something bought drops it from the list and from the sum.
itai(`const wraps=STATE.packingList.find(p=>p.item==="תחבושות ידיים — 2 זוגות");
const before=shoppingTotals().th; wraps.status='have';`);
assert.equal(itai('shoppingTotals().th'), itai('before') - 300);
assert.equal(itai('shoppingItems().filter(p=>p.status==="need"&&p.item===wraps.item).length'), 0);

// The view renders, names both places, and says where to buy gear in Bangkok.
const view = itai('renderShopping()');
assert.ok(view.includes('בארץ, לפני הטיסה'));
assert.ok(view.includes('שם — זול יותר וטוב יותר'));
assert.ok(view.includes('MBK'), 'Itai sees where to buy gear');
assert.ok(!talia('renderShopping()').includes('MBK'), 'Talia does not — she buys no gear');
assert.ok(view.includes('צ׳טוצ׳אק'), 'warns that the weekend market is shut on their days');
assert.ok(itai('renderPacking()').includes('buy-tag'), 'the packing list shows where and how much');

// --- what the list does when you use it ---------------------------------

const live = boot('itai');

// Progress counts only the things you must buy, not the optional ones.
const p0 = JSON.parse(live('JSON.stringify(shoppingTotals())'));
assert.equal(p0.doneMust, 0);
assert.ok(p0.countMust < p0.count, 'optional items sit outside the progress count');
assert.equal(p0.spent, 0);

// Marking something bought moves it to spent at the estimate...
live(`const wrap=STATE.packingList.find(p=>p.item==="תחבושות ידיים — 2 זוגות"); wrap.status='have';`);
const p1 = JSON.parse(live('JSON.stringify(shoppingTotals())'));
assert.equal(p1.doneMust, 1);
near(p1.spent, 300 * live('rate()'));
assert.equal(p1.th, p0.th - 300);

// ...and recording what was actually paid overrides the estimate, not the plan.
live(`wrap.paid=420;`);
const p2 = JSON.parse(live('JSON.stringify(shoppingTotals())'));
near(p2.spent, 420 * live('rate()'));
assert.equal(live('wrap.cost'), 300, 'the estimate is kept so the difference stays visible');
live('shopBoughtOpen.th=true;');
assert.ok(live('renderShopping()').includes('האומדן היה'), 'an overpay is shown against the estimate');
live('shopBoughtOpen.th=false;');

// A price of zero is a real answer, not a missing one.
live(`wrap.paid=0;`);
near(JSON.parse(live('JSON.stringify(shoppingTotals())')).spent, 0);

// Un-ticking puts it back on the list and forgets what was paid.
live(`wrap.status='need'; delete wrap.paid;`);
const p3 = JSON.parse(live('JSON.stringify(shoppingTotals())'));
assert.equal(p3.th, p0.th);
assert.equal(p3.spent, 0);

// The filter chips narrow the view without touching the totals.
live('shopFilter="il";');
assert.equal(live('shopVisible("th").length'), 0);
assert.ok(live('shopVisible("il").length') > 0);
assert.equal(JSON.parse(live('JSON.stringify(shoppingTotals())')).th, p0.th, 'filtering is not deleting');
assert.ok(!live('renderShopping()').includes('זול יותר וטוב יותר'), 'the Thai group is hidden');
live('shopFilter="all";');
assert.ok(live('renderShopping()').includes('זול יותר וטוב יותר'));

// Bought items are folded away until asked for.
live(`STATE.packingList.find(p=>p.item==="מגן שיניים — לקנות בארץ").status='have';`);
assert.ok(live('renderShopping()').includes('כבר נקנו'));
assert.ok(!live('renderShopping()').includes('unbuyItem'), 'folded shut by default');
live('shopBoughtOpen.il=true;');
assert.ok(live('renderShopping()').includes('unbuyItem'), 'and openable');

// Every row can be swiped, ticked and re-priced.
const row = live('renderShopping()');
assert.ok(row.includes('data-swipe-buy'));
assert.ok(row.includes('data-action="buyItem"'));
assert.ok(row.includes('data-action="editPrice"'));
assert.ok(row.includes('progress-fill'));

// Adding something new from the shopping tab keeps it a purchase.
live(`STATE.packingList.push({id:'p_new', owner:'itai', category:'🧳 ציוד', item:'מנעול TSA',
  status:'need', quantity:'', notes:'', buyIn:'il', cost:45, optional:false});`);
assert.equal(live('shoppingItems().filter(p=>p.id==="p_new").length'), 1);
assert.equal(JSON.parse(live('JSON.stringify(shoppingTotals())')).il, p0.il - 90 + 45);

// A saved document from before this change gets corrected...
const old = boot('itai');
old(`STATE=seedData(); STATE.schema=9;
STATE.packingList.forEach(p=>{ p.status='need'; delete p.buyIn; delete p.cost; delete p.optional; });
const edited=STATE.packingList.find(p=>p.item==="בגד ים");
edited.status='packed'; edited.notes='כבר בתיק';
ensureDefaults();`);
assert.equal(old('STATE.schema'), 10);
assert.equal(old('STATE.packingList.find(p=>p.item==="4 זוגות גרביים").status'), 'have');
assert.equal(old('STATE.packingList.find(p=>p.item==="מגן שיניים — לקנות בארץ").buyIn'), 'il');
// ...without touching anything the user edited by hand.
assert.equal(old('edited.status'), 'packed');
assert.equal(old('edited.notes'), 'כבר בתיק');

// Running it again changes nothing.
const settled = old('JSON.stringify(STATE)');
old('ensureDefaults();');
assert.equal(old('JSON.stringify(STATE)'), settled);

// Every entry in the table matches a real item, so no price is silently lost.
const names = new Set(JSON.parse(itai('JSON.stringify(STATE.packingList.map(p=>p.owner+"|"+p.item))')));
for(const owner of ['itai', 'talia']){
  for(const item of JSON.parse(itai(`JSON.stringify(Object.keys(SHOPPING.${owner}))`))){
    assert.ok(names.has(owner + '|' + item), 'shopping entry has no matching packing item: ' + item);
  }
}
for(const item of JSON.parse(itai('JSON.stringify([...PACKING_TASKS])'))){
  assert.ok([...names].some(n => n.endsWith('|' + item)), 'task entry has no matching item: ' + item);
}

console.log('PASS: shopping list split, prices, totals, optional items, rendering, migration and idempotence.');

// Three-way merge behaviour: both people edit at once and neither loses work.
const assert=require('node:assert/strict');
const {execSync}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const out=fs.mkdtempSync(path.join(os.tmpdir(),'merge-'));
execSync(`npx tsc lib/merge.ts --outDir ${out} --module commonjs --target es2020 --skipLibCheck`,
         {cwd:path.join(__dirname,'..'),stdio:'inherit'});
const {mergeTripState}=require(path.join(out,'merge.js'));
const merge=(b,m,t)=>mergeTripState(b,m,t);

const base={days:[{id:'d1',rows:[{id:'r1',done:false,baht:100},{id:'r2',done:false}]}],
            money:{expenses:[{id:'x1',amount:10}]},rate:0.089};

// 1. different corners → both survive
let mine=JSON.parse(JSON.stringify(base)); mine.days[0].rows[0].done=true;
let theirs=JSON.parse(JSON.stringify(base)); theirs.money.expenses.push({id:'x2',amount:55});
let r=merge(base,mine,theirs);
assert.equal(r.merged.days[0].rows[0].done,true,'my tick survives');
assert.equal(r.merged.money.expenses.length,2,'their expense survives');
assert.deepEqual(r.conflicts,[]);

// 2. same field, both changed → saved value wins and is reported
mine=JSON.parse(JSON.stringify(base)); mine.rate=0.1;
theirs=JSON.parse(JSON.stringify(base)); theirs.rate=0.095;
r=merge(base,mine,theirs);
assert.equal(r.merged.rate,0.095); assert.deepEqual(r.conflicts,['rate']);

// 3. additions on both sides to the same list
mine=JSON.parse(JSON.stringify(base)); mine.money.expenses.push({id:'a',amount:1});
theirs=JSON.parse(JSON.stringify(base)); theirs.money.expenses.push({id:'b',amount:2});
r=merge(base,mine,theirs);
assert.deepEqual(r.merged.money.expenses.map(x=>x.id).sort(),['a','b','x1']);

// 4. one deletes, the other leaves alone → stays deleted
mine=JSON.parse(JSON.stringify(base));
theirs=JSON.parse(JSON.stringify(base)); theirs.money.expenses=[];
r=merge(base,mine,theirs);
assert.equal(r.merged.money.expenses.length,0,'deletion sticks');

// 5. one deletes, the other edits it → the edit keeps it alive
mine=JSON.parse(JSON.stringify(base)); mine.money.expenses[0].amount=99;
theirs=JSON.parse(JSON.stringify(base)); theirs.money.expenses=[];
r=merge(base,mine,theirs);
assert.equal(r.merged.money.expenses.length,1);
assert.equal(r.merged.money.expenses[0].amount,99);

// 6. same row, different fields → both applied
mine=JSON.parse(JSON.stringify(base)); mine.days[0].rows[0].done=true;
theirs=JSON.parse(JSON.stringify(base)); theirs.days[0].rows[0].baht=250;
r=merge(base,mine,theirs);
assert.equal(r.merged.days[0].rows[0].done,true);
assert.equal(r.merged.days[0].rows[0].baht,250);
assert.deepEqual(r.conflicts,[]);

console.log('PASS: merge keeps both sides, respects deletes, reports real clashes.');
